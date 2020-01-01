import React, {Component} from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, {XR as awsXR} from 'aws-amplify';
import Aws_exports from './aws-exports';

Amplify.configure(Aws_exports);

class App extends Component {
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
    await awsXR.loadScene('LuckeyMonkeyAR', 'sumerian-scene-dom-id');

    const world = awsXR.getSceneController('LuckeyMonkeyAR').sumerianRunner.world;

    window.sumerian.SystemBus.addListener('xrerror', (params) => {
      // Add error handling here
    });

    window.sumerian.SystemBus.addListener('xrready', () => {
      // Both the Sumerian scene and XR8 camera have loaded. Dismiss loading status
      const loadingStatus = window.document.getElementById('loading-status');
      if (loadingStatus && loadingStatus.parentNode) {
        loadingStatus.parentNode.removeChild(loadingStatus);
      }
    });

    window.XR8.Sumerian.addXRWebSystem(world);

    awsXR.start('LuckeyMonkeyAR');
  }
};

export default withAuthenticator(App, { includeGreetings: true });