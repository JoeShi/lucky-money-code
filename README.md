# Sumerian Demo



**High Priority**

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
- [ ] AR Page 捕获 `RedPacketShared`, `RedPacketOpened`, `RedPacketClosed` 事件， 并调用API
- [ ] 红包的金额在 Schema 中是Float, 但实际上都是用 Int
- [ ] 创建 API 的文档步骤
- [ ] SharedDatail 里面用 Array of object，也可以定义成一个type
- [ ] 更新创建 Sumerian 的文档，增加2个按钮
- [ ] 更新 AR.js, 当用户收到钱后需要增加提示
- [ ] 修改 Ranking Board 代码，适配新的API 接口

**Low Priority**

- [ ] GraphQL 定义中的字段改成小写，一般 GraphQL 的标准都是小写
- [ ] Schema 里面定义的是 FriendUserEmail, 但 query 中返回的是friend, 容易混淆
- [ ] 用 Cognito 里面的username字段可以不用查 Cognito, 应为在 lambda 的event 里面有 identity，里面包含这个字段
- [ ] 红包的金额改成随机，增加随机性
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

1. clone this repo, `git clone git@github.com:JoeShi/sumerian-amplify-app.git`
1. Checkout the **develop** branch, `git checkout develop`
1. You will have to register an 8th Wall account to continue this demo
1. Replace the `APP_KEY` with your own value in `public/index.html`, skip this step if you are working on Joe's account
    ```html
    <script async src="https://apps.8thwall.com/xrweb?appKey=APP_KEY"></script>
    ```
1. commit `public/index.html` & push to **develop** branch
1. check Amplify Console for the auto deployment. The CI/CD has been configured
1. Visit the [https://develop.d100ntcyk3qzf1.amplifyapp.com/](https://develop.d100ntcyk3qzf1.amplifyapp.com/) to access the demo, you will have to register an account, if you have not registered yet

Scan the following QR Code using your camera to access the demo.

![QRCode](assets/qrcode.png)

## Launch the demo locally

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

