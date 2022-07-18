import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PostCard from '../components/PostCard'
import Header from '../components/Header'

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  cList: {
    height: '100%',
    width: '100%',
    display: 'block',
    flexFlow: 'row wrap',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  card: {
    width: 717,
    padding: 0,
    display: 'block',
    alignContent: 'center',
    margin: 'auto',
    marginBottom: theme.spacing(0),
    border: '1px solid',
    borderColor: '#C3C3C3',
    borderRadius: '0px',
    borderTop: '0px'
  },
  topCard: {
    width: 717,
    padding: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'block',
    alignContent: 'center',
    margin: 'auto',
    marginTop: theme.spacing(1.5),
    border: '1px solid',
    borderColor: '#C3C3C3',
    borderRadius: '0px',
    backgroundColor: '#EBECED'
  },
  divider: {
    borderTop: '1px solid',
    borderBottom: '0px',
    borderLeft: '0px, solid',
    borderColor: '#E1E1E1',
      width: '120%',
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(2)
  },
  communityContainer: {
    // height: theme.spacing(10),
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    // display: 'flex',
    color: 'black',
  },
  communityLink: {
    marginLeft: theme.spacing(4),
    // display: 'block',
    color: 'black',
    textDecoration: 'none'
  },
  channelNumber: {
    display: 'inline-flex',
    width: '15px',
    // marginRight: '5px',
    // marginBlockStart: '0px',
    // marginBlockEnd: '0px',
    // marginInlineStart: '1px',
    // marginInlineEnd: '1px'
  },
  cardHeader: {
    marginLeft: theme.spacing(2),
  },
  communityArrow: {
    marginRight: theme.spacing(0.6),
    color: '#46D160'
    // marginLeft: theme.spacing(0.5),
    // paddingTop: theme.spacing(.5)
  },
  arrowContainer: {
    display: 'inline-flex',
    // paddingTop: theme.spacing(.5)
  }
}));


const ChannelList = () => {
  const classes = useStyles();

  let channels = useSelector(state => state.channels.allChannels)
  console.log(channels)
  channels.sort((a, b) => (a.channel_members.length > b.channel_members.length) ? -1 : 1)

  return (
    <>
      <Header />
      <Grid container className={classes.cList} spacing={2}>
        <Card className={classes.topCard} variant="outlined">
          <div className={classes.cardHeader}>
            Most Popular Communities
          </div>
        </Card>
        <Card className={classes.card} variant="outlined">
          {
            channels.map((channel, i) =>
              <div className={classes.communityContainer} key={i}>
                <Link to={`readit/${channel.title}`} className={classes.communityLink}>
                  <div className={classes.channelNumber}>
                    {channels.indexOf(channel + 1)}
                  </div>
                  <div className={classes.arrowContainer}>
                    <ArrowDropUpIcon className={classes.communityArrow}/>
                  </div>
                  /{channel.title}
                </Link>
                <br />
                <hr className={classes.divider} />

              </div>)
          }
        </Card>
      </Grid>
    </>
  )
}

export default ChannelList;