import React from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import {XR as awsXR} from 'aws-amplify'

class AR extends React.Component {
  render() {
    return (
      <div id="sumerian-scene-dom-id" style={ {height: '100vh'} }>
        <p id="loading-status">Loading...</p>
      </div>
    );
  }

  componentDidMount() {
    this.loadAndStartScene();
  }

  async loadAndStartScene() {
    await awsXR.loadScene('demo', 'sumerian-scene-dom-id');

    const world = awsXR.getSceneController('demo').sumerianRunner.world;

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

    awsXR.start('demo');
  }
};

export default withAuthenticator(AR);