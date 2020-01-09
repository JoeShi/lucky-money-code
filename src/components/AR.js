import React from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import {XR as awsXR, Auth} from 'aws-amplify'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import * as mutations from '../graphql/mutations';
import {API, graphqlOperation} from 'aws-amplify';
import './Toast.css'

class AR extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {},
      toastText: "aaaaaa"
    }
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.moveToMain.bind(this)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" >
            Find Lucky Money
            </Typography>
          </Toolbar>
        </AppBar>
        <div id="sumerian-scene-dom-id" style={ {height: '100vh'} }>
            <p id="loading-status">Loading...</p>
          </div>
        <div id="snackbar">{this.state.toastText}</div>
      </div>
    );
  }

  

  moveToMain() {
    window.location.href = "/";
  };

  componentDidMount() {
    const self = this
    this.loadAndStartScene();
    
    Auth.currentUserInfo().then(user => {
      this.setState({user: user})
    })

    var showToast = function(){
      let script = document.createElement('script')
      script.setAttribute("id","snackbar-script")
      if (document.getElementById('snackbar-script') != null) document.getElementById('snackbar-script').remove();
      script.text = 'var x = document.getElementById("snackbar");x.className = "show";setTimeout(function() {x.className = x.className.replace("show", "");}, 3000);'
      document.getElementById('snackbar').appendChild(script)
    }

    var receiveMessage = function(event)
    {
      switch (event.data){
        case "sumerian-open-packet":
          
          API.graphql(graphqlOperation(mutations.openPrivateRedPacket, 
            {
              UserEmail: self.state.user.attributes.email,
              ProductType: "1"
            })).then(user => {
              console.log(user)
              let toastText = "Success ! Balance:" + user.Balance
              self.setState({toastText: toastText})
              showToast()
              // TODO: Add a notice message to info user how much they earned.
            }).catch(err => {
              console.error(err)
              let toastText = "You have aleady opened this red packet !"
              self.setState({toastText: toastText})
              showToast()
              
              // TODO: add an error message
            })
          break;
        case "sumerian-close-packet":
          window.location.href = "/"; // 
          break;
        case "sumerian-share-packet":
          API.graphql(graphqlOperation(mutations.shareRedPacket, {
            UserEmail: self.state.user.attributes.email, 
            ProductType: "1"
          })).then(luckyMoney => {
            console.log("shared a lucky money")
            // TODO: Add a notice message to info user how much they earned for extra
            window.location.href = "/";
          }).catch(err => {
            // TODO: Add an error message to show
            console.error(err)
          })
          break;
        default:
          console.log(event.data)
      }
    }
    window.addEventListener("message", receiveMessage, false);
  }

  async loadAndStartScene() {
    await awsXR.loadScene('LuckyMoneyAR', 'sumerian-scene-dom-id');

    const world = awsXR.getSceneController('LuckyMoneyAR').sumerianRunner.world;

    window.sumerian.SystemBus.addListener('xrerror', (params) => {
      // Add error handling here
    });

    window.sumerian.SystemBus.addListener('xrready', () => {
      // Both the Sumerian scene and XR8 camera have loaded. Dismiss loading status
      const loadingStatus = window.document.getElementById('loading-status');
      if (loadingStatus && loadingStatus.parentNode) {
        loadingStatus.parentNode.removeChild(loadingStatus);
      }

      window.document.getElementById('sumerian').style.position = "inherit";
    });

    window.XR8.Sumerian.addXRWebSystem(world);

    window.sumerian.SystemBus.addListener('doshare', () => {
      // Add error handling here
      console.log ('DoShare is clicked');
    });

    window.sumerian.SystemBus.addListener('doclose', () => {
      // Add error handling here
      console.log ('DoClose is clicked');
    });

    awsXR.start('LuckyMoneyAR');
  }
};

export default withAuthenticator(AR);
