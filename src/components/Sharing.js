import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withAuthenticator } from 'aws-amplify-react';

import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import {API, graphqlOperation, Auth} from 'aws-amplify';

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
  const classes = useStyles()
  const [open, setOpen] = React.useState(false);
  const [luckyMoneyValue, setLuckyMoneyValue] = React.useState(false);
  const luckyMoney = props
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const openLuckyMoney = async () => {
    // try catch here
    const currentUser = await Auth.currentUserInfo()
    try {
      const shardRedPacketRes = await API.graphql(graphqlOperation(mutations.openSharedRedPacket, {
        ProductType: props.adsId, 
        UserEmail: props.owner, 
        FriendUserEmail: currentUser.attributes.email
      }))
      console.log(shardRedPacketRes.data.openSharedRedPacket)
      const details = JSON.parse(shardRedPacketRes.data.openSharedRedPacket.RPShareDetails)
      console.log(details)
      const detail = details.redPackets.find(detail => detail.friend === currentUser.attributes.email)
      // set the display value
      setLuckyMoneyValue(detail.money)
      // set popup modal open
      setOpen(true)
    } catch (err) {
      console.error(err)
    }    
  }

  return (
    <div>
    <Card className={classes.card}>
      <CardActionArea onClick={() => openLuckyMoney()}>
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
          $ {luckyMoneyValue/100}
        </DialogContentText>
      </DialogContent>
      <DialogActions onClick={handleClose} style={{height: '120px'}}>
      </DialogActions>
    </Dialog>
    </div>
    
  )
}

class Sharing extends React.Component {

  constructor() {
    super()
    this.state = {
      luckyMoneys: []
    }
  }

  componentDidMount() {
    this.init().then()
  }

  async init() {
    const luckyMoneysRes =  await API.graphql(graphqlOperation(queries.redPacketsByProductType, 
      { 
        ProductType: "1", 
        filter: { 
          SharedDoneFlag: { eq: false }
        }
      }))

    const luckyMoneys = luckyMoneysRes.data.redPacketsByProductType.items
    if (luckyMoneys) {
      this.setState({luckyMoneys: luckyMoneys})
    }
  }

  render() {
    return (
      <Grid container justify={"center"}>
        {this.state.luckyMoneys.map(luckyMoney => {
          const keyId = `shared-lucky-money-id-${luckyMoney.UserEmail}`;
          return (
            <RedPacketCard key={keyId} owner={luckyMoney.UserEmail} adsId={luckyMoney.ProductType} />
          )
        })}
      </Grid>
    )
  }
}

export default withAuthenticator(Sharing)