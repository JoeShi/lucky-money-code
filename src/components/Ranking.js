import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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
  const [luckyMoneyValue, setLuckyMoneyValue] = React.useState('$ 1.2');
  const [luckyMoneyText, setLuckyMoneyText] = React.useState('Lucky Money Shared from q@amazon.com')
  const luckyMoney = props
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const openLuckyMoney = async () => {
    setOpen(true)
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
          {luckyMoneyText}
        </DialogContentText>
        <DialogContentText style={{color:'#efbc3c',fontSize: '3rem'}} className={classes.modalText}>
          {luckyMoneyValue}
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
    const luckyMoneys = [
        {
            UserEmail: "a@amazon.com",
            ProductType: "1"
        },
        {
            UserEmail: "b@amazon.com",
            ProductType: "1"
        }
    ]
    this.setState({
        luckyMoneys: luckyMoneys
    })
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

export default Sharing