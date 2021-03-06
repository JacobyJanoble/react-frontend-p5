import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, resolvePath } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import { Box } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';




const ReplyCard = (props) => {

  let cardWidth = props.parentWidth - 70

  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2)
    },
    card: {
      width: cardWidth,
      padding: 0,
      display: 'block',
      alignContent: 'center',
      alignContent: 'center',
      border: '0px solid',
      borderLeft: '1px solid',
      borderColor: '#DADADA',
      borderRadius: '0px',
      marginLeft: '10px',
      marginTop: theme.spacing(3)
    },
    cardMedia: {
      display: 'inline-flex',
      marginleft: theme.spacing(6.4),
    },
    likeArrow: {
      float: 'left',
      color: '#C4C4C4',
      cursor: 'pointer',
      fontSize: '23px'
    },
    dislikeArrow: {
      float: 'right',
      color: '#C4C4C4',
      cursor: 'pointer',
      fontSize: '23px',
      fontWeight: 'bold'
    },
    likeCounter: {
      marginBottom: theme.spacing(.7),
      cursor: 'initial'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textDecoration: 'none'
    },
    price: {
      color: '#B12704',
      fontSize: 17,
      fontWeight: 'bold',
    },
    notInStock: {textAlign: 'center'},
    brandLink: {
      color: '#212121',
      textDecoration: 'none'
    },
    buttons: {
      display: 'block',
      width: 83
    },
    channelUrl: {
      display: 'flex',
      fontSize: '11px'
    },
    postedBy: {
      color: '#4B4B4B',
      textDecoration: 'none',
      marginLeft: theme.spacing(0)
    },
    postedByLink: {
      color: '#4B4B4B',
      textDecoration: 'none'
    },
    avatar: {
      marginLeft: theme.spacing(1),
      color: '#8A8A8A',
      fontSize: '42px'
    },
    replyText: {
      color: '#C4C4C4',
      cursor: 'pointer',
      marginLeft: '5px'
    },
    chatBubbleIcon: {
      fontSize: '15px',
      marginRight: '3px',
      marginLeft: '2px'
    },
    textInputs: {
      display: 'block',
      fontFamily: 'Arial',
      margin: 'auto',
      borderColor: '#E5E5E5',
      border: '1px solid'
    },
    submitButton: {
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(1.7),
      marginTop: theme.spacing(1),
      height: theme.spacing(3.8),
      width: theme.spacing(11),
      borderRadius: '25px',
      border: '0px solid',
      backgroundColor: '#0079D3',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '13px',
      cursor: 'pointer'
    }
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.user.currentUser)
  const[reply, setReply] = useState(false)

  const currentPost = useSelector(state => state.posts.allPosts).find(post => post.id === props.post.id)
  const [post, setPost] = useState(currentPost)
  // const [replyPost, setReplyPost] = useState(currentPost)

  useEffect(() => {
    setPost(currentPost)
  }, [currentPost])

  const handleSetReply = () => {
    setReply(!reply)
    props.setReplyPost(post)
  }

  const handleUpvote = (e) => {
    console.log(e.target)

    if (currentUser.dislikes.find(dislike => dislike.post_id === post.id)) {
      let dislikeId = currentUser.dislikes.find(dislike => dislike.post_id === post.id).id
      fetch(`/dislikes/${dislikeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Key' : localStorage.getItem('auth_key')
        }
      })
      .then( resp => resp.json())
      .then(dislikeData => {
        console.log(dislikeData)
        dispatch({type:'UNDISLIKE', dislike: dislikeData})
        fetch ('/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Auth-Key' : localStorage.getItem('auth_key')
          },
          body: JSON.stringify({
            user_id: currentUser.id,
            post_id: post.id
          })
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          dispatch({type: 'LIKE', like:data})
        })
      })
    } else {
      fetch('/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Key': localStorage.getItem('auth_key')
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          post_id: post.id
        })
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        dispatch({type:'LIKE', like: data})
      })
    }
  }

  const handleDownvote = (e) => {
    console.log(e.target)
    if(currentUser.likes.find(like => like.post_id === post.id)){
      let likeId = currentUser.likes.find(like => like.post_id === post.id).id
      fetch(`/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Auth-Key': localStorage.getItem('auth_key')
        }
      })
      .then(res => res.json())
      .then(likeData => {
        console.log(likeData)
        dispatch({type:'UNLIKE', like:likeData})
        fetch('/dislikes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Auth-Key': localStorage.getItem('auth_key')
          },
          body: JSON.stringify({
            user_id: currentUser.id,
            post_id: post.id
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          dispatch({type:'DISLIKE', dislike:data})
        })
      })
  } else {
    fetch('/dislikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Auth-Key': localStorage.getItem('auth_key')
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          post_id: post.id
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch({type:'DISLIKE', dislike: data})
      })
    }
  }



  return (
    <>

      {(post) ?
            <Grid item key={post.id}>
                <Card className={classes.card} variant="outlined">
                    <div className={classes.cardContentShell}>
                      <AccountCircleIcon className={classes.avatar}/>
                      <div className={classes.cardContent} >
                          <Typography className={classes.channelUrl}>
                              <div className={classes.postedBy}><Link to={`/u/${post.user.username}`} className={classes.postedByLink}>{(post.user) ? post.user.username : currentUser.username}</Link></div>
                          </Typography>
                          <Typography>
                              {post.content}
                          </Typography>
                      </div>
                    </div>

            <div>
                {(post.user.id !== currentUser.id)
                      ?
                      <div className={classes.cardActions}>
                        <ArrowUpwardIcon onClick={(e) => handleUpvote(e)} fontSize='large' className={classes.likeArrow}/>
                        <Box className={classes.likeCounter}>{(post.likes) ? post.likes.length-post.dislikes.length : 0}</Box>
                        <ArrowDownwardIcon ml={0} onClick={(e) => handleDownvote(e)} fontSize='large' className={classes.dislikeArrow}/>
                        <Typography onClick={() => handleSetReply()} className={classes.replyText}>
                            <ChatBubbleIcon className={classes.chatBubbleIcon}/>Reply
                        </Typography>
                      </div>
                      :
                      null
                      }
                    </div>
                    <div className={classes.commentReplyBox}>
                        {(reply) ?
                            <form onSubmit={(e) => props.handleSubmit(e)}>
                                <textarea id="content" placeholder="What are you thoughts?" cols='90' rows='9' className={classes.textInputs}></textarea>
                                <button type="submit" className={classes.submitButton}>Reply</button>
                            </form> : null}
                    </div>
                    {post.posts.map(p => <ReplyCard key={p.id} post={p} handleSubmit={props.handleSubmit} setReplyPost={props.setReplyPost} parentWidth={cardWidth}/>)}
                </Card>
            </Grid>
          : null }
    </>
  )
}

export default ReplyCard;