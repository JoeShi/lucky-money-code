# Sumerian Setup Steps

This doc is to provide guide about how to setup sumerian.

## Create a new Sumerian Scene

1. Under **Create scene from template**, choose **Augmented Reality**.
   ![](assets/WechatIMG4_1.png)
    
1. Enter your new scene name **lucky money** and click **create** button.
   ![](assets/WechatIMG6_1.png)
    
1. After loading for a few seconds, sumerian console panel will show up.
   ![](assets/WechatIMG7_1.png)

## Create Sumerian Entity

1. In the assets panel, click file icon and choose the template file **template-bundle.zip** we prepare to upload **without unzipping** it. The zip file contains images of package and money. 
   ![](assets/WechatIMG5.png)
   > If you see any errors, please double check you are uploading **ZIP file** directly instead of unzipping files.

1. After loading you should be able to see the entities now.
   ![](assets/WechatIMG8_1.png)

1. Try to click any arrow button in three directions to drag around the entities.

##  Config Action Behaviors for Assets

###  Red Packet Behavior
1. Click the "box" entity and click **Add Component**, choose **State Machine**.    
   ![](assets/WechatIMG7.png)   
   
   ![](assets/WechatIMG8.png)   

1. Click the **+** button to add behavior.     
   ![](assets/WechatIMG11.png)

1. Name the behavior name and the state name **wait for click**.

1. Click **Add Action**    
   ![](assets/WechatIMG13.png)

1. Find **Click/Tap on entity** in the list or search it in the search bar. Don't forget to **Add** it.   
   ![](assets/WechatIMG14.png)

1. Click **Add State** and name it **hide**   
   ![](assets/WechatIMG15.png)
   
1. Click **Add Action**. Find and add **Hide**   
   ![](assets/WechatIMG19.png)

1. Add another action. Click **Add Action** and add **Emit Message**   
   ![](assets/WechatIMG21.png)

1. In the channel, enter **showMoney**      
   ![](assets/WechatIMG23.png)

1. Click the **wait for click** state and drag a line to **hide** state     
   ![](assets/WechatIMG18.png)

### Red Packet with Money Behavior

1. Click the **box with money** entity.   

1. Click **Add Component** button, choose **State Machine**    

1. Click the **+** button    

1. Name both the behavior name and the state name **listen**    

1. Click **Add Action**    

1. Find **Listen** and click **Add**    
   ![](assets/WechatIMG24.png)
    
1. Click **Add State** and name it **show**    

1. Click **Add action** and add **Show**    

1. Click the **listen** state and drag a line to **show** state   

### Money Behavior
1. Repeat the **Red Packet with Money Behavior** 3 times for the 3 money entities.

## Config Default Hidden
1. Click the eye button on the left console, the corresponding entity will be disappear.
   ![](assets/WechatIMG27.png)


## Conclusion
Congratulations! You have completed the sumerian settings. So far, we cannot test the final effects as it has not been integrated with our application yet.
Please proceed to the next chapter 'Integrate Sumerian with Amplify' and after that, you will be able to test both modules.
