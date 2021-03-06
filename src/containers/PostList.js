import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import PostCard from '../components/PostCard'
import { getThemeProps } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  pList: {
    height: '100%',
    width:'100%',
    display: 'block',
    flexFlow: 'row wrap',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    // marginLeft: theme.spacing(10)
}
}));



const PostList = (props) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  // let posts = useSelector(state => state.posts.allPosts)
  // posts.filter(p => p.title === props.searchContent || p.content === props.searchContent)
  // posts.sort((a, b) => (a.likes.length > b.likes.length) ? -1 : 1)
  // products.sort((a, b) => (a.price > b.price) ? 1 : -1)

  return (
    <>
      <Grid container className={classes.pList} spacing={2}>
        {(props.posts) ?
          props.posts.map(post => <PostCard key={post.id} post={post}/>)
        : null
        }
      </Grid>
    </>
  )
}

export default PostList;