import React from 'react'
import { withAuthenticator } from 'aws-amplify-react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import * as queries from '../graphql/queries';
import {API, graphqlOperation, Auth} from 'aws-amplify';

class Ranking extends React.Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      users: []
    }
  }

  componentDidMount() {
    this.init().then()
  }

  async init() {
    const currentUser = await Auth.currentUserInfo()
    const userRes = await API.graphql(graphqlOperation(queries.getUser, {UserEmail: currentUser.attributes.email}))
    if (userRes.data.getUser) {
      const myBalance = userRes.data.getUser.Balance
      this.setState({balance: myBalance/100})
    }

    const listUsersRes = await API.graphql(graphqlOperation(queries.usersByBalance, {Group: "AKO2020", sortDirection: "DESC", limit: 10}))
    const topUsers = listUsersRes.data.usersByBalance.items
    if (topUsers) {
      this.setState({users: topUsers})
    }
  }

  render() {
    return (
      <div>
      <h2>Your Balance: { this.state.balance }</h2>
      <List dense>
        {this.state.users.map(user => {
          const labelId = `checkbox-list-secondary-label-${user.UserEmail}`;
          return (
            <ListItem key={user.UserEmail} button>
              <ListItemText id={labelId} primary={`${user.UserEmail}`} />
              <ListItemText edge="end" primary={`$ ${user.Balance/100}`} />
            </ListItem>
          );
        })}
      </List>
    </div>
    )
  }
}

export default withAuthenticator(Ranking);