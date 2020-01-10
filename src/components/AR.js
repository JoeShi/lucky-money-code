import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import './Toast.css'

class AR extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {},
      toastText: "aaaaaa"
    }
  }
  
  moveToMain() {
    window.location.href = "/";
  };

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
            <p id="loading-status">AR...</p>
          </div>
        <div id="snackbar">{this.state.toastText}</div>
      </div>
    );
  }

};

export default AR;
