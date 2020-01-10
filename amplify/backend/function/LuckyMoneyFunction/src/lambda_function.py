from __future__ import print_function
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

import os
import json
import boto3
import botocore.exceptions
import decimal
import operator
import random
import time

###########################################################################################################
advertisementMap={}
USER_POOL_ID = os.environ['COGNITO_USER_POOL_ID']
REGION_NAME = os.environ['REGION']

TABLE_ADVERTISEMENT = 'Advertisement' + os.environ['APPSYNC_ID'] + '-' + os.environ['env']
TABLE_USER_RANKING = 'User' + os.environ['APPSYNC_ID'] + '-' + os.environ['env']
TABLE_SHARED_RED_PACKET = 'SharedRedPacket' + os.environ['APPSYNC_ID'] + '-' + os.environ['env']

cognitoClient = boto3.client('cognito-idp')
dynamodbClient = boto3.resource("dynamodb", region_name=REGION_NAME)

###########################################################################################################
def getRandomList(sum,number):
    
    resultList=[]
    
    sums=sum
    base = sums / 10
    sums = sums - base * number

    for i in range(number):
        t = random.randint(0, sums)
        print(t + base)
        sums -= t
        
        resultList.append((t + base))
        
    return resultList
    
#############################################################################################
def userIsRanking(userEmail):
    print("----in method---- userIsRanking")
    
    table = dynamodbClient.Table(TABLE_USER_RANKING)
    
    response = table.get_item(
        Key={
            'UserEmail': userEmail
        }
    )
    
    print("response")
    print(response)
    
        
    if 'Item' in response:    
        return 'true'
    else:
        return 'false'

###########################################################################################################
def init():
    
    print("----in method---- init")
    
    #1.read all advertisements into one dict
    # table = dynamodbClient.Table('Advertisement')
    table = dynamodbClient.Table(TABLE_ADVERTISEMENT)
    
    ddbResponse = table.scan()
    
    for item in ddbResponse['Items']:
        advertisementMap[item["ProductType"]]= item
    
    while 'LastEvaluatedKey' in ddbResponse:
        ddbResponse = table.scan(
            ExclusiveStartKey=ddbResponse['LastEvaluatedKey'])
        for item in ddbResponse['Items']:
            advertisementMap[item["ProductType"]]= item

    print("advertisementMap")
    print(advertisementMap)

#############################################################################################
def handleGetFriends(event, context):
    
    print("----in method---- handleGetFriends")
    
    #1. read all the users in the User DDB table 
    resultUsers=[]
    
    ddbEmaliList=[]
    # table = dynamodbClient.Table('UserRanking')
    table = dynamodbClient.Table(TABLE_USER_RANKING)
    
    ddbResponse = table.scan()
    
    for item in ddbResponse['Items']:
        if not (event['arguments']['UserEmail'] == item["UserEmail"]):
            resultUsers.append(item)
            ddbEmaliList.append(item["UserEmail"])
    
    while 'LastEvaluatedKey' in ddbResponse:
        ddbResponse = table.scan(
            ExclusiveStartKey=ddbResponse['LastEvaluatedKey'])
        for item in ddbResponse['Items']:
            if not (event['arguments']['UserEmail'] == item["UserEmail"]):
                ddbEmaliList.append(item["UserEmail"])
                resultUsers.append(item)
            
    #2.read all the registered user from user pool(todo, read by page token)
    cognitoResponse = cognitoClient.list_users(
        UserPoolId=USER_POOL_ID,
        AttributesToGet=[
            'email'
        ],
    )
    
    print("cognitoResponse")
    print(cognitoResponse)
    
    #3. merge the users from two sources.
    for item in cognitoResponse['Users']:
        if not (event['arguments']['UserEmail'] == item["Attributes"][0]['Value']):
            if not (item["Attributes"][0]['Value'] in ddbEmaliList):
                user={}
                user["UserEmail"] = item["Attributes"][0]['Value']
                user["Balance"] = 0
                user["HasSharedRP"] = 'false'
                user["Group"] = "AKO2020"
                resultUsers.append(user)
    
    #4.sort the result
    resultUsers = sorted(resultUsers, key=operator.itemgetter('Balance'), reverse=True)
    
    print("resultUsers")
    print(resultUsers)
                    
    return resultUsers

#############################################################################################
def handleOpenSharedRedPacket(event, context):
    print("----in method---- OpenSharedRedPacket")
    
    #1.check for invalid operations.
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)

    response = table.get_item(
        Key={
            'ProductType': event['arguments']['ProductType'],
            'UserEmail': event['arguments']['UserEmail']
        }
    )
    
    print("scan SharedRedPacket table response")
    print(response)
    
    if not 'Item' in response: 
        raise Exception('not a shared red Packet !')
    
    if response['Item']['SharedDoneFlag'] == True:
        raise Exception('all the shared red Packets have been opened !')
    
    if not 'RPShareDetails' in response['Item']:
        raise Exception('the red Packets has not been shared yet !')
    
    if response['Item']['RPShareDetails'].find(event['arguments']['FriendUserEmail'])>=0:
        raise Exception('you have alread opened this shared red packet before !')
    
    if not response['Item']['RPShareDetails'].find("None")>=0:
        raise Exception('all the shared red Packets have been opened !')
   
    #2.replace one empty friend field with the new input email address
    tempRPShareDetails = response['Item']['RPShareDetails'];
    print("tempRPShareDetails = ")
    print(tempRPShareDetails) 
    
    tempRPShareDetails = tempRPShareDetails.replace('None', event['arguments']['FriendUserEmail'], 1)
    newSharedDoneFlag= False
    if not tempRPShareDetails.find("None")>=0:
        newSharedDoneFlag= True
    
    #3.update record
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)
    
    response = table.update_item(
        
        Key={
            'UserEmail': event['arguments']['UserEmail'],
            'ProductType': event['arguments']['ProductType']
        },
        UpdateExpression="set RPShareDetails = :newRPShareDetails, UpdateTime=:newUpdateTime, SharedDoneFlag=:newSharedDoneFlag",
        ExpressionAttributeValues={
            ':newRPShareDetails': tempRPShareDetails,
            ':newUpdateTime': decimal.Decimal(time.time()),
            ':newSharedDoneFlag': newSharedDoneFlag
        },
        ReturnValues="UPDATED_NEW"
    )
    
    #4. check and update the user ranking table
    response = table.query(
        KeyConditionExpression=Key('UserEmail').eq(event['arguments']['UserEmail'])
    )
    
    findUnopenedRedPacket='false'
    for item in response['Items']:
        if not 'RPShareDetails' in item:
            continue
        if item['RPShareDetails'].find("None")>=0:
            findUnopenedRedPacket='true'
            break
        
    #5.update user and friend in User table
    redPacketDict = json.loads(tempRPShareDetails)
    newIncome=0
    
    print("redPacketDict")
    print(redPacketDict)
    
    for item in redPacketDict["redPackets"]:
        if item['friend'] == event['arguments']['FriendUserEmail']:
            newIncome = item['money']
    
    print("newIncome")
    print(newIncome)
    
    # table = dynamodbClient.Table('UserRanking')
    table = dynamodbClient.Table(TABLE_USER_RANKING)
    
    #6.update the friend
    if userIsRanking(event['arguments']['FriendUserEmail']) =='false':
        response = table.put_item(
           Item={
                'UserEmail': event['arguments']['FriendUserEmail'],
                'Balance': decimal.Decimal(newIncome),
                'HasSharedRP':'false',
                'Group':'AKO2020'
            }
        )
    else:
        response = table.update_item(
            
            Key={
                'UserEmail': event['arguments']['FriendUserEmail']
            },
            UpdateExpression="set Balance = Balance + :addBalance",
            ExpressionAttributeValues={
                ':addBalance': decimal.Decimal(newIncome)
            },
            ReturnValues="UPDATED_NEW"
        )
        print(response)
    
    #7.update the email user
    response = table.update_item(
        
        Key={
            'UserEmail': event['arguments']['UserEmail']
        },
        UpdateExpression="set HasSharedRP = :newHasSharedRP",
        ExpressionAttributeValues={
            ':newHasSharedRP': findUnopenedRedPacket
        },
        ReturnValues="UPDATED_NEW"
    )
    
    #8.query and return ShareRedPacket record
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)
    
    response = table.get_item(
        Key={
            'ProductType': event['arguments']['ProductType'],
            'UserEmail': event['arguments']['UserEmail']
        }
    )
    
    return response['Item']
    
#############################################################################################
def handleGetAdvertisement(event, context):
    print("----in method---- getAdvertisement")
    return advertisementMap[event['arguments']['ProductType']]
    
#############################################################################################
def handleGetSharedRedPacketsByUser(event, context):
    print("----in method---- getSharedRedPacketsByUser")
    
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)
    
    response = table.query(
        KeyConditionExpression=Key('UserEmail').eq(event['arguments']['UserEmail'])
    )
    
    return response['Items']

#############################################################################################
def handleShareRedPacket(event, context):
    print("----in method---- ShareRedPacket")
    
    #1.check whether current user has already performed this operation
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)


    response = table.get_item(
        Key={
            'ProductType': event['arguments']['ProductType'],
            'UserEmail': event['arguments']['UserEmail']
        }
    )
    
    print("scan SharedRedPacket table response")
    print(response)
    
    if 'Item' in response: 
        if 'RPShareDetails' in response['Item']:
            raise Exception('you have already shared it !')
    
    #3.calculate the redPacket items
    RPMoneyToShare = int(advertisementMap[event['arguments']['ProductType']]["RPMoneyToShare"])
    RPMaxSharedNum = int(advertisementMap[event['arguments']['ProductType']]["RPMaxSharedNum"])
    
    print(RPMoneyToShare)
    print(RPMaxSharedNum)
    
    sharedMoneyList = getRandomList(RPMoneyToShare,RPMaxSharedNum)
    print(sharedMoneyList);
    
    index=0
    redPackets=[]
    for num in sharedMoneyList:
        dict={}
        dict['id']=index
        dict['money']=num
        dict['friend']='None'
        
        redPackets.append(dict);
        
    RPShareDetails={}
    RPShareDetails["redPackets"]=redPackets
    
    print( "RPShareDetails")
    print( RPShareDetails)
    
    str_RPShareDetails = json.dumps( RPShareDetails )
    print(type(str_RPShareDetails))   
    
    #4.update the existing ShareRedPacket record to store the redPacket items
    
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)
    
    response = table.update_item(
        Key={
            'UserEmail': event['arguments']['UserEmail'],
            'ProductType': event['arguments']['ProductType']
        },
        UpdateExpression="set RPShareDetails = :newRPShareDetails, UpdateTime=:newUpdateTime",
        ExpressionAttributeValues={
            ':newRPShareDetails': str_RPShareDetails,
            ':newUpdateTime': decimal.Decimal(time.time()),
        },
        ReturnValues="UPDATED_NEW"
    )
    
    #5.add sharing bonus into current user's account, enable the sharing flag
    
    # table = dynamodbClient.Table('UserRanking')
    table = dynamodbClient.Table(TABLE_USER_RANKING)
    bonus = advertisementMap[event['arguments']['ProductType']]["RPShareBonus"]

    response = table.update_item(
        
        Key={
            'UserEmail': event['arguments']['UserEmail']
        },
        UpdateExpression="set Balance = Balance + :addBalance, HasSharedRP = :newHasSharedRP",
        ExpressionAttributeValues={
            ':addBalance': decimal.Decimal(bonus),
            ':newHasSharedRP': "true"
        },
        ReturnValues="UPDATED_NEW"
    )
    
    print("update UserRanking table response")
    print(response)
    
    
    #6.read and return
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)
    response = table.get_item(
        Key={
            'ProductType': event['arguments']['ProductType'],
            'UserEmail': event['arguments']['UserEmail']
        }
    )
    
    return response['Item']


#############################################################################################
def handleGetUser(event, context):
    print("----in method---- getUser")
    
    # table = dynamodbClient.Table('UserRanking')
    table = dynamodbClient.Table(TABLE_USER_RANKING)
    
    response = table.get_item(
        Key={
            'UserEmail': event['arguments']['UserEmail']
        }
    )
    
    print("response")
    print(response)
    
        
    if 'Item' in response:    
        return response['Item']
    else:
        user={}
        user["UserEmail"] = event['arguments']['UserEmail']
        user["Balance"] = 0
        user["HasSharedRP"] = 'false'
        user["Group"] = "AKO2020"
        return user
        



#############################################################################################
def handleGetBalanceRanking(event, context):
    print("----in method----getBalanceRanking")
    
    resultUsers=[]
    tempUsers=[]
    # table = dynamodbClient.Table('UserRanking')
    table = dynamodbClient.Table(TABLE_USER_RANKING)
    ddbResponse = table.scan()
    
    for item in ddbResponse['Items']:
        tempUsers.append(item)
            
    while 'LastEvaluatedKey' in ddbResponse:
        ddbResponse = table.scan(
            ExclusiveStartKey=ddbResponse['LastEvaluatedKey'])
        for item in ddbResponse['Items']:
            tempUsers.append(item)
            
    tempUsers = sorted(tempUsers, key=operator.itemgetter('Balance'), reverse=True)
    
    index=0
    for item in tempUsers:
        resultUsers.append(item)
        index=index+1
        if (index >= event['arguments']['Limit']):
            break
    
    return resultUsers

#############################################################################################
def handleOpenPrivateRedPacket(event, context):
    
    print("----in method----handleOpenPrivateRedPacket")
    
    #1.check whether current user has performed such operation
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)
    response = table.get_item(
        Key={
            'ProductType': event['arguments']['ProductType'],
            'UserEmail': event['arguments']['UserEmail']
        }
    )
    
    if 'Item' in response: 
        raise Exception('you have already opened it !')
    
    #2 create new recored in the SharedRedPacket to mark it.
    # table = dynamodbClient.Table('SharedRedPacket')
    table = dynamodbClient.Table(TABLE_SHARED_RED_PACKET)
    
    response = table.put_item(
       Item={
            'UserEmail': event['arguments']['UserEmail'],
            'ProductType': event['arguments']['ProductType'],
            'SharedDoneFlag': False,
            'UpdateTime': decimal.Decimal(time.time())
        }
    )

    #3.calculate the balance of the current user
    money = advertisementMap[event['arguments']['ProductType']]["RPMoneyInside"]
    
    print("money")
    print(money)
    
    # table = dynamodbClient.Table('UserRanking')
    table = dynamodbClient.Table(TABLE_USER_RANKING)
    
    response = table.get_item(
        Key={
            'UserEmail': event['arguments']['UserEmail']
        }
    )
    
    #4.create or update user in the UserRanking table
    if 'Item' in response: 
        # table = dynamodbClient.Table('UserRanking')
        table = dynamodbClient.Table(TABLE_USER_RANKING)
        response = table.update_item(
            
            Key={
                'UserEmail': event['arguments']['UserEmail']
            },
            UpdateExpression="set Balance = Balance + :addBalance",
            ExpressionAttributeValues={
                ':addBalance': money
            },
            ReturnValues="UPDATED_NEW"
        )
    else:
        response = table.put_item(
           Item={
                'UserEmail': event['arguments']['UserEmail'],
                'Balance': money,
                'HasSharedRP':'false',
                'Group':'AKO2020'
            }
        )
    
    #5.read and return
    response = table.get_item(
        Key={
            'UserEmail': event['arguments']['UserEmail']
        }
    )
    
    
    return response['Item']

############################################################################################    
    
    
    
    
    
    
    
    
    
    
    
#############################################################################################    
##########################   MAIN FUNCTION  #################################################
#############################################################################################
#############################################################################################
def lambda_handler(event, context):
    
    print("-------------------Input-------------------------")
    print(event)
    print("-------------------Input-------------------------")
    print(context)

    init()
    
    if event['fieldName'] == "getAdvertisement":
        return handleGetAdvertisement(event, context)
    elif event['fieldName'] == "getBalanceRanking":
        return handleGetBalanceRanking(event, context)
    elif event['fieldName'] == "getFriends":
        return handleGetFriends(event, context)
    elif event['fieldName'] == "getUser":
        return handleGetUser(event, context)
    elif event['fieldName'] == "openPrivateRedPacket":
        return handleOpenPrivateRedPacket(event, context)
    elif event['fieldName'] == "shareRedPacket":
        return handleShareRedPacket(event, context)
    elif event['fieldName'] == "openSharedRedPacket":
        return handleOpenSharedRedPacket(event, context)
    elif event['fieldName'] == "getSharedRedPacketsByUser":
        return handleGetSharedRedPacketsByUser(event, context)
    else:
        raise Exception('Unsupported operation !')
        
        
#############################################################################################    
#############################################################################################    
#############################################################################################
#############################################################################################
#############################################################################################
