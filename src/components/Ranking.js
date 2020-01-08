import React from 'react'
import { withAuthenticator } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import Amplify, {API, graphqlOperation, Auth} from 'aws-amplify';
import { InsertInvitation } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class Ranking extends React.Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      users: []
    }
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    const currentUser = await Auth.currentUserInfo()
    const userRes = await API.graphql(graphqlOperation(queries.getUser, {UserEmail: currentUser.attributes.email}))
    if (userRes.data.getUser) {
      myBalance = userRes.data.getUser.Balance
      this.setState({balance: myBalance})
    }

    const listUsersRes = await API.graphql(graphqlOperation(queries.listUsers, {limit: 10}))
    const topUsers = listUsersRes.data.listUsers.items
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
              <ListItemText edge="end" primary={`$ ${user.Balance}`} />
            </ListItem>
          );
        })}
      </List>
    </div>
    )
  }
}

export default withAuthenticator(Ranking);