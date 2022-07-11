import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, resolvePath } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core';
import Card from '@material-ui/core';
import CardActions from '@material-ui/core';
import CardContent from '@material-ui/core';
import CardMedia from '@material-ui/core';
import Grid from '@material-ui/core';
import Typography from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Rating } from '@material-ui/lab';
import { Box } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { ArrowDownward } from '@material-ui/icons';
import { AccountCircle } from '@material-ui/icons';
import { ChatBubble } from '@material-ui/icons';
import { findAllByAltText } from '@testing-library/react';




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
  const history = useHistory();

  const currentUser = useSelector(state => state.user.currentUser)
  const[reply, setReply] = useState(false)

  const currentPost = useSelector(state => state.posts.allPosts).find(post => post.id === props.post.id)
  const [post, setPost] = useState(currentPost)

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
      fetch(`http://localhost:3000/dislikes/${dislikeId}`, {
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
        fetch ('http://localhost:300/likes', {
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
      fetch('http://localhost:3000/likes', {
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
      fetch(`http://localhost:3000/likes/${likeId}`, {
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
        fetch('http://localhost:3000/dislikes', {
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
    fetch('http://localhost:3000/dislikes', {
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
    }
  }


  return (
    <>

      {(post) ?
        <Grid>
          <Card>
            <div>
              <AccountCircleIcon />
              <div>
                <Typography>
                  <div></div>
                </Typography>
                <Typography>
                  {post.content}
                </Typography>
              </div>
            </div>

            <div>

              {(post.user.id !== currentUser.id)
              ?
              <div>
                <ArrowUpward onClick={(e) => handleUpvote(e)} className={classes.likeArrow} fontSize='large' />
                <Box></Box>
                <ArrowDownward />
                <Typography>
                  <ChatBubble />
                </Typography>
              </div>

              : null }
            </div>
            <div className={classes.commentReplyBox}>
                {(reply) ?
                <form onSubmit={(e) => props.handleSubmit(e)}>
                    <textarea id="content" placeholder="What are you thoughts?" cols='90' rows='9' className={classes.textInputs}></textarea>
                    <button type="submit" className={classes.submitButton}>Reply</button>
                </form> : null}
              </div>
              {post.posts.map(p => <ReplyCard key={p.id} post={p} handleSubmit={handleSubmit} setReplyPost={props.setReplyPost} parentWidth={cardWith}/>)}

          </Card>
        </Grid>
      : null }

    </>
  )
}

export default ReplyCard;