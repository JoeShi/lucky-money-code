import React, {Component} from 'react';
import './App.css';
import { withAuthenticator, SumerianScene  } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import Aws_exports from './aws-exports';

Amplify.configure(Aws_exports);

class App extends Component {
  render() {
    return (
      <div style={ { height: '100vh' } }>
        <SumerianScene sceneName='ardemo'/>
      </div>
    );
  }
};

export default withAuthenticator(App, { includeGreetings: true });