import React from 'react'
import { withAuthenticator } from 'aws-amplify-react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Ranking() {
  const classes = useStyles();

  const myBalance = 19.2

  const users = [
    {
      username: 'qiaoshi@amazon.com',
      balance: 20
    },
    {
      username: 'sss@amazon.com',
      balance: 12.3
    },
    {
      username: 'nice@amazon.com',
      balance: 4
    }
  ]

  return (
    <div>
      <h2>Your Balance: { myBalance }</h2>
      <List dense className={classes.root}>
        {users.map(user => {
          const labelId = `checkbox-list-secondary-label-${user.username}`;
          return (
            <ListItem key={user.username} button>
              <ListItemText id={labelId} primary={`${user.username}`} />
              <ListItemText edge="end" primary={`$ ${user.balance}`} />
            </ListItem>
          );
        })}
      </List>
    </div>
  )
}

export default withAuthenticator(Ranking);