import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import Header from './Header'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';

// https://www.billboard.com/charts/greatest-hot-100-singles/
const topSongs = [
  { title: 'Blinding Lights', artist: 'The Weeknd' },
  { title: 'The Twist', artist: 'Chubby Checker' },
  { title: 'Smooth', artist: 'Santana Ft Rob Thomas' },
  { title: 'Mack The Knife', artist: 'Bobby Darin' },
  { title: 'Uptown Funk!', artist: 'Mark Ronson Ft Bruno Mars' },
  { title: 'How Do I Live', artist: 'LeAnn Rimes' },
  { title: 'Party Rock Anthem', artist: 'LMFAO' },
  { title: 'I Gotta Feeling', artist: 'The Black Eyed Peas' },
  { title: 'Macarena', artist: 'Los Del Rio' },
  { title: 'Shape Of You', artist: 'Ed Sheeran' }
]

const useStyles = makeStyles((theme) => ({
  topRibbon: {
    display: 'flex',
    margin: theme.spacing(5,0,0,33),
  },
  topRibbonDivider: {
    width: 717,
    padding: 0,
    display: 'block',
    alignContent: 'center',
    marginLeft: theme.spacing(33),
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5),
    border: '0.2px solid',
    borderColor: '#FFFFFF'
  },
  textInputs: {
      display: 'block',
      fontFamily: 'Arial',
      margin: theme.spacing(1.7,0,.5,1.7),
      borderColor: '#E5E5E5',
      border: '1px solid'
  },
  autocompleteSearch: {
      backgroundColor: 'white',
      marginLeft: theme.spacing(33),
      borderRadius: '5px'
  },
  card: {
    width: 717,
    padding: 0,
    display: 'block',
    alignContent: 'center',
    marginLeft: theme.spacing(33),
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(1.5),
    border: '1px solid',
    borderColor: '#C3C3C3'
  },
  submitButton: {
      marginLeft: theme.spacing(78.8),
      marginBottom: theme.spacing(1.7),
      marginTop: theme.spacing(1),
      height: theme.spacing(3.8),
      width: theme.spacing(9),
      borderRadius: '25px',
      border: '0px solid',
      backgroundColor: '#0079d3',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer'
  }
}))



const NewPostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentUser = useSelector(state => state.user.currentUser)

  const allChannels = useSelector(state => state.channels.allChannels)
  let channels = allChannels.filter(chan => chan.channel_members.find(chanMemb => chanMemb.user_id === currentUser.id))
  const posts = useSelector(state => state.posts.allPosts)

  const clearForm = (e) => {
    e.target.parentElement.parentElement.querySelector('#combo-box-demo').value = null
    e.target.querySelector('#title').value= ''
    e.target.querySelector('#content').value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let channel = channels.find(c => c.title === e.target.parentElement.parentElement.querySelector('#combo-box-demo').value)

    fetch('http://localhost:3000/POSTS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      },
      body: JSON.stringify({
        postable_type: "Channel",
        postable_id: channel.id,
        title: e.target.querySelector("#title").value,
        content: e.target.querySelector("#content").value,
        user_id: localStorage.getItem('auth_key')
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      data.postable = {title: e.target.parentElement.parentElement.querySelector('#combo-box-demo').value}
      dispatch({type: 'ADD_POST', post: data})
      clearForm(e)
      navigate('/dashboard')
    })
  }


  return (
    <div>
            <Header />
            <div className={classes.topRibbon}>
                Create a post
            </div>
            <Card className={classes.topRibbonDivider} variant="outlined"></Card>
            <Autocomplete
                        id="combo-box-demo"
                        options={channels}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        className={classes.autocompleteSearch}
                        renderInput={(params) => <TextField {...params} label="Choose a community" variant="outlined"/>}
            />
            <Card className={classes.card} variant="outlined">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input placeholder='Title(max 300)' id="title" style={{width: 683}} className={classes.textInputs}/>
                    <textarea id="content" placeholder="Text(optional)" cols='100' rows='8' className={classes.textInputs}></textarea>
                    <button type="submit" className={classes.submitButton}>Post</button>
                </form>
            </Card>

        </div>
  )
}

export default NewPostPage