# Sumerian Demo

## How to Test

The application has been published via Amplify Console.

1. If you are iPhone user, fix [this issue](https://www.8thwall.com/docs/web/#device-not-authorized)
1. open (https://www.8thwall.com/diazvyab/lucky-money)[https://www.8thwall.com/diazvyab/lucky-money], Find the username and password in [Quip](https://quip-amazon.com/3g5UAAV1Tt2u/Lucky-Money-App)
1. 8th Wall WebAR Device Authorization. scan the QRCode with your camera
1. Visit the [https://develop.d100ntcyk3qzf1.amplifyapp.com/](https://develop.d100ntcyk3qzf1.amplifyapp.com/) to access the demo, you will have to register an account, if you have not registered yet. Scan the following QR Code using your camera to access the demo.
    ![QRCode](assets/qrcode.png)
1. Tap AR button, allow camera access
1. Scan the following picture using AR
    ![LuckyMoney](assets/luckymoney.png)
1. You can Share or Close.
1. Open **Sharing** page, you will see lucky money shared by others.

**High Priority**

- [ ] [iOS device not authorized issue](https://www.8thwall.com/docs/web/#device-not-authorized)
- [ ] iOS 不要使用无痕模式
- [ ] Ranking page 个人余额不正确，分享之后没有刷新，应该是页面问题, 和 Google 翻译有关
- [x] Ads 需要有create方法
- [x] User 如果用了 sort key 那么 get 函数的输入就必须有 sort key了，这不科学. 所以获取自己的
- [x] 获取 User Ranking 的时候必须有一个hash key, 这个hash key就用city字段吧
- [ ] Function CloudFormation 如何获得 Cognito User Pool ID
- [ ] Function CloudFormation 如何获得 3个 Table 的名称
- [x] schema add @function
- [x] listUsers 方法缺乏排序
- [x] Advertisement 表中的 ProductType 应该是 String, 因为后面的查询都是String
- [x] ScannedFlag 字段在表 RedPacket 中应该是没有作用的
- [x] 列出所有还未分享完的红包, 需要修改 SharedDoneFlag 字段，在定义中是 Boolean, 但实际存储到DDB 为 String
- [x] Ranking Page 列出余额top 10 的用户，并且列出自己的金额
- [x] Sharing Page
- [x] AR Page 捕获 `RedPacketShared`, `RedPacketOpened`, `RedPacketClosed` 事件， 并调用API
- [ ] 红包的金额改成随机，增加随机性. 随机在 20 ~ 200 之间，美分。包括openPrivateRedPacket, shareRedPacket, openSharedRedPacket
- [ ] 创建 API 的文档步骤
- [ ] SharedDatail 里面用 Array of object，也可以定义成一个type
- [ ] 更新创建 Sumerian 的文档，增加2个按钮
- [ ] 更新 AR.js, 当用户收到钱后需要增加提示
- [ ] 修改 Ranking Board 代码，适配新的API 接口

**Low Priority**

- [ ] GraphQL 定义中的字段改成小写，一般 GraphQL 的标准都是小写
- [ ] Schema 里面定义的是 FriendUserEmail, 但 query 中返回的是friend, 容易混淆
- [ ] 用 Cognito 里面的username字段可以不用查 Cognito, 应为在 lambda 的event 里面有 identity，里面包含这个字段
- [ ] 红包的金额在 Schema 中是Float, 但实际上都是用 Int
- [ ] 删除 Lambda 中的 user 部分代码
- [ ] HasSharedRP 在业务中没有使用
- [ ] 获取所有未分配完红包的时候过滤掉自己已经领过的

**Testing Script**
```
mutation {
  # Create the Advertisement
  createAdvertisement(input:{
    ProductType: "1",
    ADContent: "None"
    ImageUrl: "None"
    ProductDescription: "None",
    RPMoneyInside: 200
    RPMoneyToShare: 200
    RPShareBonus: 100
    RPMaxSharedNum: 5
  }) {
    ProductType
    ADContent
    ImageUrl
    ProductDescription
  }
  
  # Open AR Red Packet
  openPrivateRedPacket(ProductType: "1", UserEmail: "214706257@qq.com") {
    UserEmail
    Balance
    HasSharedRP
    Group
  }
  
  # Share AR Red Packet with Friends
  shareRedPacket(ProductType: "1", UserEmail: "214706257@qq.com") {
    UserEmail
    ProductType
    RPShareDetails
    SharedDoneFlag
    UpdateTime
  }
  
  # Open Shard AR Red Packet
  openSharedRedPacket(ProductType: "1", UserEmail: "214706257@qq.com", FriendUserEmail: "214706257@qq.com"){
    UserEmail
    ProductType
    RPShareDetails
    SharedDoneFlag
    UpdateTime
  }
}

query {
  usersByBalance(Group: "AKO2020", sortDirection: DESC, limit: 10) {
    items {
      UserEmail
      Balance
    }
  }

  redPacketsByProductType(ProductType: "1", filter:{
    SharedDoneFlag: {eq: false}}) {
      items {
        UserEmail
        ProductType
        RPShareDetails
        SharedDoneFlag
      }
    }

  listSharedRedPackets(ProductType: {eq: "1"}, UserEmail: "214706257@qq.com", filter: {
    SharedDoneFlag: { eq: false }
  } ) {
    items {
      UserEmail
      ProductType
      RPShareDetails
      SharedDoneFlag
    }
  }
}

```

## Run the demo and debug on Mobile

Install the depedencies.
```shell
npm install 
```

Run locally
```shell
npm start
```

## Resource

[Augmented Reality Using Amazon Sumerian, AWS Amplify, and 8th Wall](https://docs.sumerian.amazonaws.com/tutorials/create/intermediate/augmented-reality-using-sumerian-8thwall/)

