import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './Header'
import PostCard from './PostCard';
import ReplyCard from './ReplyCard'

import { makeStyles } from '@material-ui/core/styles';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    color: 'black'
  },
  backdrop: {
    backgroundColor: '#363636'
  },
  topRibbon: {
    width: theme.spacing(110),
    backgroundColor: 'black',
    height: theme.spacing(5),
    margin: 'auto'
  },
  bottomRibbon: {
    width: theme.spacing(110),
    backgroundColor: 'black',
    height: '100%',
    margin: 'auto',
    justifyContent: 'center'
  },
  PageIntroText: {
    color: '#D0D0D0',
    fontSize: '14px',
    textAlign: 'left',
    paddingTop: theme.spacing(1),
    display: 'inline-flex'
  },
  textBoxIcon: {
    marginTop: '8px',
    color: '#B7B7B7',
    display: 'inline0flex',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(1),
    float: 'left'
  },
  topSpacer: {
    height: theme.spacing(5),
    width: '100%'
  },
  replySection: {
    width: 721.7,
    backgroundColor: 'white',
    height: '100%'
  },
  textInputs: {
    display: 'block',
    fontFamily: 'Arial',
    margin: 'auto',
    borderColor: '#E5E5E5'
  },
  submitButton: {
    marginleft: theme.spacing(72.9),
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
  },
  commentsAsText: {
    marginLeft: theme.spacing(6),
    fontSize: '13px',
    color: '#979797'
  },
  commentAsLink: {
    color: '#979797'
  }
}));

const PostPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser)

  const allPosts = useSelector(state => state.posts.allPosts)
  const URL = useParams()
  const currentPost = allPosts.find(post => post.id === parseInt(URL.post_id))
  const [replyPost, setReplyPost] = useState(currentPost)


  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-key': localStorage.getItem('auth_key')
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        content: e.target.firstElementChild.value,
        postable_type: 'Post',
        postable_id: replyPost.id
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      dispatch({type: 'ADD_REPLY', reply: data})
    })
  }


  return (
    <div>
      <Header />
      <div className={classes.backdrop}>
        {(currentPost) ? <div>
          <div className={classes.topRibbon}>
            <SpeakerNotesIcon className={classes.textBoxIcon} fontSize='small'/>
            <div className={classes.pageIntroText}>
              {currentPost.title}
            </div>
          </div>
          <div className={classes.bottomRibbon}>
            <div>
              <PostCard key={currentPost.id} post={currentPost} postPage={true} />
              <div className={classes.commentsAsText}>
                Comment as <Link to={`/user/${currentUser.username}`}>{currentUser.username}</Link>
              </div>
              <form onSubmit={(e) => handleSubmit(e)} onClick={() => setReplyPost(currentPost)}>
                <textarea className={classes.textInputes} placeholder="Want to share your thoughts?" cols='90' rows='9' id='content'></textarea>
                <button type="submit" className={classes.submitButton}>Comment</button>
              </form>
              <Grid container className={classes.pList} spacing={2}>
                {(currentPost.posts) ? currentPost.posts.map(post => <ReplyCard key={post.id} post={post} handleSubmit={handleSubmit} setReplyPost={setReplyPost} parentWidth={770}/>) : null}
              </Grid>
            </div>

          </div>


        </div> : null}
      </div>
    </div>
  )
}

export default PostPage;