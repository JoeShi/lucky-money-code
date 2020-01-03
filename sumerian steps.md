# Sumerian Steps
## Suemrian Basic Config
1. Create new scene
    1. Under "Create scene from template" choose "Augmented Reality" 
    ![](assets/WechatIMG4_1.png)
    
    2. Enter new scene name "red pack" and click "create" button
    ![](assets/WechatIMG6_1.png)
    
3. After loading for a few seconds, we came into suemrian console panel.
![](assets/WechatIMG7_1.png)
## Sumerian Entity Create
1. In the assets panel, click file button and choose the template file we offered.
![](assets/WechatIMG5.png)
2. After loading you can see the entities in template we offered.
![](assets/WechatIMG8_1.png)
3. Click the arrow button and drag to move the entities.
## action config asset
### Default Red pack Action Setting
1. Click the "box" entity and click "add component" button, choose "state machine"


![](assets/WechatIMG7.png)

![](assets/WechatIMG8.png)


2. Click the "+"(plus) button 


![](assets/WechatIMG11.png)
![](assets/WechatIMG12.png)


3. Input the behavior name and input the state name "wait to be clicked"
4. Click “add” action


![](assets/WechatIMG13.png)


5. Input "click" in the search area and choose the "click/tap on entity"


![](assets/WechatIMG14.png)


6. Click "add state"  


![](assets/WechatIMG15.png)
![](assets/WechatIMG16.png)


7. Drag the "state 1" rectangle to the right side

8. Name the state "hide"


![](assets/WechatIMG17.png)
![](assets/WechatIMG18.png)


9. Click "Add action" and search hide, click add


![](assets/WechatIMG19.png)



10. Click "add action" and search emit, click add

![](assets/WechatIMG20.png)
![](assets/WechatIMG21.png)



11. Inside the channel, input "showMoney"

![](assets/WechatIMG23.png)


12. Click the "on click/tap entity" and drag a line to "hide" state


### Red Pack and Money action setting
1. Click the "box with money" entity.

2. Click "add component" button, choose "state machine"


3. Click the "+"(plus) button 

4. Input the behavior name and input the state name"listen"

![](assets/WechatIMG24.png)


5. Click add action


6. Input "listen" in the search area and choose the "listen" click "add"

    ![](assets/WechatIMG25.png)


7. Click "add state"

8. Drag the "state 1" rectangle to the right side

9. Name the state "show"


10. Click "Add action" and search show, click show


11. Click the "listen" and drag a line to "show" state


12. Do that again on 3 mmoney entities

## Config default hidden
1. Click the eye button on the left console, the corresponding entity will be disappear.

    ![](assets/WechatIMG27.png)
