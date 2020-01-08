import React from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import {XR as awsXR} from 'aws-amplify'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import * as mutations from '../graphql/mutations';
import {API, graphqlOperation} from 'aws-amplify';

class AR extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {}
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
      </div>
    );
  }

  moveToMain() {
    window.location.href = "/";
  };

  componentDidMount() {
    this.loadAndStartScene();

    var receiveMessage = function(event)
    {
      switch (event.data){
        case "sumerian-open-packet":
          API.graphql(graphqlOperation(mutations.openPrivateRedPacket, 
            {
              UserEmail: "214706257@qq.com", // TODO: need to be variable
              ProductType: "1"
            })).then(luckyMoney => {
              console.log(luckyMoney)
              // TODO: Add a notice message to info user how much they earned.
            }).catch(err => {
              console.error(err)
              // 有可能已经扫描过了
            })
          break;
        case "sumerian-close-packet":
          window.location.href = "/"; // 
          break;
        case "sumerian-share-packet":
          API.graphql(graphqlOperation(mutations.shareRedPacket, {
            UserEmail: "214706257@qq.com", // TODO: need to be variable
            ProductType: "1"
          })).then(luckyMoney => {
            console.log(luckyMoney)
            window.location.href = "/";
          }).catch(err => {
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
