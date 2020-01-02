sumerian steps
## suemrian basic config
1. create new project
    1. enter new project name"lucky money"
    2. click "create" button
    ![](https://codevpc.s3.amazonaws.com/WechatIMG3.png)
2. create new scene
    1. enter new scene name "red pack"
    2. click "create" button
    ![](https://codevpc.s3.amazonaws.com/WechatIMG4.png)
3. after loading for a few seconds, we came into suemrian console panel.

## sumerian entity create
1. in the assets panel, click file button and choose the obj file we give you.
![](https://codevpc.s3.amazonaws.com/WechatIMG5.png)
2. duplicate the entity and you will see there are two entities listed.
3. click the arrow button and drag and we will see two seperate entities.
![](https://codevpc.s3.amazonaws.com/WechatIMG6.png)
## action config asset
### default red pack action setting
1. click one red pack entity and click "add component" button, choose "state machine"


![](https://codevpc.s3.amazonaws.com/WechatIMG7.png)


2. click the "+"(plus) button 


![](https://codevpc.s3.amazonaws.com/WechatIMG8.png)


3. input the behavior name and input the state name"wait to be clicked"


![](https://codevpc.s3.amazonaws.com/WechatIMG10.png)


4. click add action


![](https://codevpc.s3.amazonaws.com/WechatIMG11.png)


5. input "click" in the search area and choose the "click/tap on entity"


![](https://codevpc.s3.amazonaws.com/WechatIMG12.png)


6. click "add state"  


![](https://codevpc.s3.amazonaws.com/WechatIMG13.png)


7. drag the "state 1" rectangle to the right side


![](https://codevpc.s3.amazonaws.com/WechatIMG14.png)


8. name the state "hide"


![](https://codevpc.s3.amazonaws.com/WechatIMG15.png)


9. click "Add action" and search hide, click add


![](https://codevpc.s3.amazonaws.com/WechatIMG16.png)


10. click "add action" and search emit, click add

![](https://codevpc.s3.amazonaws.com/WechatIMG17.png)


11. inside the channel, input "showMoney"

![](https://codevpc.s3.amazonaws.com/WechatIMG18.png)


12. click the "on click/tap entity" and drag a line to "hide" state

![](https://codevpc.s3.amazonaws.com/WechatIMG19.png)


### red pack and money action setting
1. click the other red pack entity.


![](https://codevpc.s3.amazonaws.com/WechatIMG20.png)


2. click "add component" button, choose "state machine"


![](https://codevpc.s3.amazonaws.com/WechatIMG21.png)


3. click the "+"(plus) button 


![](https://codevpc.s3.amazonaws.com/WechatIMG22.png)


4. input the behavior name and input the state name"listen"


![](https://codevpc.s3.amazonaws.com/WechatIMG23.png)


5. click add action


![](https://codevpc.s3.amazonaws.com/WechatIMG24.png)


6. input "listen" in the search area and choose the "listen" click "add"

![](https://codevpc.s3.amazonaws.com/WechatIMG25.png)


7. click "add state"

8. drag the "state 1" rectangle to the right side

![](https://codevpc.s3.amazonaws.com/WechatIMG26.png)

9. name the state "show"


10. click "Add action" and search show, click show


11. click the "listen" and drag a line to "show" state


12. do that again on 3 mmoney entities

## config set
1. click the eye button on the left console, the corresponding entity will be disappear.

![](https://codevpc.s3.amazonaws.com/WechatIMG27.png)
