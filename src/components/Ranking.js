import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core';

class Ranking extends React.Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      users: []
    }
  }

  componentDidMount() {
    const topUsers = [
      {
        UserEmail: 'a@amazon.com',
        Balance: 1090
      },
      {
        UserEmail: 'b@amazon.com',
        Balance: 890
      },
      {
        UserEmail: 'c@amazon.com',
        Balance: 450
      }
    ]
    this.setState({users: topUsers, balance: 4.50})
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

export default Ranking