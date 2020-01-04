import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginTop: 10
  },
  media: {
    height: 140,
  },
});

const openLuckyMoney = async (luckyMoney) => {
  // Invoke API to openLuckyMoney and get random balance
  console.log(luckyMoney);
}

function RedPacketCard(props) {
  const luckyMoney = props
  const classes = useStyles()

  return (
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

export default Sharing