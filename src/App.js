import React from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import {Auth} from 'aws-amplify'
import AR from './components/AR';
import Ranking from './components/Ranking';
import Sharing from './components/Sharing';

import { Route, BrowserRouter as Router, Switch, withRouter, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, List, ListItem, 
  ListItemIcon, SwipeableDrawer, Divider} from '@material-ui/core'
import  { Menu as MenuIcon, 
  PermContactCalendar as PermContactCalendarIcon,
  LocalDrink as LocalDrinkIcon,
  ExitToApp as ExitToAppIcon
 } from '@material-ui/icons'

import Amplify from 'aws-amplify';
import Aws_exports from './aws-exports';

Amplify.configure(Aws_exports);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const exclusionArray = [
  '/ar',
  '/ar/',
]

const signout = () => {
  Auth.signOut()
}

const App=({location}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer(side, false)} 
    onKeyDown={toggleDrawer(side, false)}>
      <List>
        <ListItem button>
          <ListItemIcon><PermContactCalendarIcon/></ListItemIcon>
          <Link to="/">Ranking</Link>
        </ListItem>
        <ListItem button>
          <ListItemIcon><LocalDrinkIcon /></ListItemIcon>
          <Link to="/sharing">Red Packets</Link>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <Link to="/" onClick={signout}>Sign out</Link>
        </ListItem>
      </List>
    </div>
  );

  const runAR = () => event => {
    window.location.href = "/ar/";
  };

  const Header = () => {
    return (
      <div>
      <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Lunar New Year
            </Typography>
            <Button color="inherit" onClick={runAR()}>AR</Button>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer open={state.left} onClose={toggleDrawer('left', false)} onOpen={toggleDrawer('left', true)}>
          {sideList('left')}
        </SwipeableDrawer>
      </div>
    )
  }

  return (
      <div>
        {exclusionArray.indexOf(location.pathname) < 0 && <Header/>}
        <Switch>
          
          <Route exact path="/">
            <Ranking />
          </Route>
          <Route path="/ranking">
            <Ranking />
          </Route>
          <Route path="/sharing">
            <Sharing />
          </Route>
          <Route path="/ar">
            <AR />
          </Route>
          
        </Switch>
      </div>

  )
};

export default withAuthenticator(withRouter(App), { includeGreetings: false });