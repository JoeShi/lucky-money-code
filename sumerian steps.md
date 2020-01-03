sumerian steps
## suemrian basic config
1. create new project
    1. enter new project name"lucky money"
    2. click "create" button
    ![](assets/WechatIMG3.png)
2. create new scene
    1. enter new scene name "red pack"
    2. click "create" button
    ![](assets/WechatIMG4.png)
3. after loading for a few seconds, we came into suemrian console panel.

## sumerian entity create
1. in the assets panel, click file button and choose the obj file we give you.
![](assets/WechatIMG5.png)
2. duplicate the entity and you will see there are two entities listed.
3. click the arrow button and drag and we will see two seperate entities.
![](assets/WechatIMG6.png)
## action config asset
### default red pack action setting
1. click one red pack entity and click "add component" button, choose "state machine"


![](assets/WechatIMG7.png)

![](assets/WechatIMG8.png)


2. click the "+"(plus) button 


![](assets/WechatIMG11.png)
![](assets/WechatIMG12.png)


3. input the behavior name and input the state name"wait to be clicked"
4. click add action


![](assets/WechatIMG13.png)


5. input "click" in the search area and choose the "click/tap on entity"


![](assets/WechatIMG14.png)


6. click "add state"  


![](assets/WechatIMG15.png)
![](assets/WechatIMG16.png)


7. drag the "state 1" rectangle to the right side

8. name the state "hide"


![](assets/WechatIMG17.png)
![](assets/WechatIMG18.png)


9. click "Add action" and search hide, click add


![](assets/WechatIMG19.png)



10. click "add action" and search emit, click add

![](assets/WechatIMG20.png)
![](assets/WechatIMG21.png)



11. inside the channel, input "showMoney"

![](assets/WechatIMG23.png)


12. click the "on click/tap entity" and drag a line to "hide" state


### red pack and money action setting
1. click the other red pack entity.

2. click "add component" button, choose "state machine"


3. click the "+"(plus) button 

4. input the behavior name and input the state name"listen"

![](assets/WechatIMG24.png)


5. click add action


6. input "listen" in the search area and choose the "listen" click "add"

    ![](assets/WechatIMG25.png)


7. click "add state"

8. drag the "state 1" rectangle to the right side

9. name the state "show"


10. click "Add action" and search show, click show


11. click the "listen" and drag a line to "show" state


12. do that again on 3 mmoney entities

## config set
1. click the eye button on the left console, the corresponding entity will be disappear.

    ![](assets/WechatIMG27.png)
