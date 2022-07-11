import { CallMissedSharp } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from './Header';

import TextField from '@material-ui/core';
import Autocomplete from '@material-ui/lab';
import Card from '@material-ui/core';



const NewPostPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser)

  const allChannels = useSelector(state => state.channels.allChannels)
  let channels = allChannels.filter(chan => chan.channel_members.find(chanMemb => chanMemb.user_id === currentUser.id))
  const posts = useSelector(state => state.posts.allPosts)

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
      history.push('/dashboard')
    })
  }


  return (
    <div>
      <Header />
      <div>
        Create A Post
      </div>
      <Card></Card>
      <Autocomplete
        id="combo-box-demo"
        options={channels}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        className={classes.autocompleteSearch}
        renderInput={(params) => <TextField {...params} label="Choose a community" variant="outlined"/>}
      />
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input placeholder='Title(max 50) id="title label="Choose a community" variant="outlined"/>
          <textarea id="content placeholder="Text(optional) cols='100' rows='8' className={classes.textInputs}></textarea>
          <button type='submit' className={classes.submitButton}>Post</button>
        </form>
      </Card>
    </div>
  )
}

export default NewPostPage