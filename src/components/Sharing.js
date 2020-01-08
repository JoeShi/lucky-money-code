import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { withAuthenticator } from 'aws-amplify-react';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginTop: 10
  },
  media: {
    height: 140,
  },
  dialog: {
    backgroundImage:`url(${'/images/redpacket.png'})`,
    height: 320,
    width: 247,
    borderRadius: '21px'
  },
  modalText:{
    textAlign: "center"
  }
});


function RedPacketCard(props) {

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const openLuckyMoney = async (luckyMoney) => {
    // Invoke API to openLuckyMoney and get random balance
    console.log(luckyMoney);
    setOpen(true);
  }


  const luckyMoney = props
  const classes = useStyles()

  return (
    <div>
    <Card className={classes.card}>
      <CardActionArea onClick={() => openLuckyMoney(luckyMoney)}>
        <CardMedia
          className={classes.media}
          image="/images/red_envolope.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lucky Money (Hongbao)
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Shared from {luckyMoney.owner}

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      classes={{paper: classes.dialog}}
    >
      <DialogContent>

        <DialogContentText style={{color:'#efbc3c'}} className={classes.modalText}>
          Lucky Money from 
          
        </DialogContentText>
        <DialogContentText style={{color:'#efbc3c'}} className={classes.modalText}>
        {luckyMoney.owner}
        </DialogContentText>
        <DialogContentText style={{color:'#efbc3c',fontSize: '3rem'}} className={classes.modalText}>
          {/* Random Balance write in here */}
          $ 1.0
        </DialogContentText>
      </DialogContent>
      <DialogActions onClick={handleClose} style={{height: '120px'}}>
      </DialogActions>
    </Dialog>
    </div>
    
  )
}

function Sharing() {
  return (
    <Grid container justify={"center"}>
      <RedPacketCard owner="qiaoshi@amazon.com" adsId="111"/>
      <RedPacketCard owner="tiangeli@amazon.com" adsId="222"/>
    </Grid>
  )
}

export default withAuthenticator(Sharing)