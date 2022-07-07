import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Routes } from 'react-router-dom';

import Signup from './components/SignUp';
import Login from './components/Login';
import Dashboard from './containers/Dashboard';
import NewPostPage from './components/NewPostPage';
import UserPage from './components/UserPage';
import PostPage from './components/PostPage';
import NewChannelPage from './components/NewChannelPage';
import ChannelList from './containers/ChannelList';
import ChannelPage from './components/ChannelPage';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    let users
    let channels

    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(userData => {
      users = userData

      fetch('http://localhost:3000/channels')
      .then(resp2 => resp2.json())
      .then(channelData => {
        channels = channelData

        fetch('http://localhost:3000/posts')
        .then(resp3 => resp3.json())
        .then(data => {
          dispatch({type: 'GET_POSTS', posts: data})
          dispatch({type: 'GET_CHANNELS', channels: channels})
          dispatch({type: 'GET_USERS', users: users})
          dispatch({type: 'LOGIN', username:localStorage.getItem('currentUserUsername')})
          console.log("Finish fetching")
        })
      })
    })
  }, [])

  const users = useSelector(state => state.user.allUsers)
  const posts = useSelector(state => state.user.allPosts)

  return (
    <div className="App">
      <Routes>



      </Routes>
    </div>
  );
}

export default App;
