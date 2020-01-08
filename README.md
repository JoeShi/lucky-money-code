# Sumerian Demo

[ ] Ads 需要有create方法
[ ] User 如果用了 sort key 那么 get 函数的输入就必须有 sort key了，这不科学. 所以获取自己的
[ ] 获取 User Ranking 的时候必须有一个hash key, 这个hash key就用city字段吧
[ ] Function CloudFormation 如何获得 Cognito User Pool ID
[ ] schema add @function 

创建 **Advertisement** Item
```
mutation {
  createAdvertisement(input: {
    ProductType: 1
    ADContent: "hello"
    ImageUrl: "none"
    ProductDescription: "none"
    RPMaxSharedNum: 5
    RPMoneyInside: 2.6
    RPMoneyToShare: 2
    RPShareBonus: 1
  }) {
    ProductType
    ADContent
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

