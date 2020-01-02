import React from 'react'
import { withAuthenticator } from 'aws-amplify-react';

class Ranking extends React.Component {
  render() {
    return (
      <h1>Ranking Page</h1>
    )
  }
}

export default withAuthenticator(Ranking);