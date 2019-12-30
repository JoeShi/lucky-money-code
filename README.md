# Sumerian Demo

## Run the demo and debug on Mobile

1. clone this repo, `git clone git@github.com:JoeShi/sumerian-amplify-app.git`
1. Checkout the **develop** branch, `git checkout develop`
1. You will have to register an 8th Wall account to continue this demo
1. Replace the `APP_KEY` with your own value in `src/index.html`
    ```html
    <script async src="https://apps.8thwall.com/xrweb?appKey=APP_KEY"></script>
    ```
1. commit `src/index.html` & push to **develop** branch
1. check Amplify Console for the auto deployment. The CI/CD has been configured
1. Visit the [https://develop.d100ntcyk3qzf1.amplifyapp.com/](https://develop.d100ntcyk3qzf1.amplifyapp.com/) to access the demo, you will have to register an account, if you have not registered yet

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

