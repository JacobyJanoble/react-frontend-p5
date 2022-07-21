import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import { BrowserRouter as Route, Routes, Navigate, Router} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate} from 'react-router-dom'

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
  const dispatch = useDispatch();

  const users = useSelector(state => state.user.allUsers)
  const posts = useSelector(state => state.user.allPosts)


  useEffect(()=> {
    let users
    let channels

    fetch('/users')
    .then(res => res.json())
    .then(data => {
      users = data

      fetch('/channels', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Auth-key': localStorage.getItem('auth_key')
      }
      })
      .then(res => res.json())
      .then(data => {
        channels = data

        fetch('/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => res.json())
        .then(data => {
          dispatch({type: 'GET_POSTS', payload: data})
          dispatch({type: 'GET_CHANNELS', channels: channels})
          dispatch({type: 'GET_USERS', users: users})
          dispatch({type: 'LOGIN', username:localStorage.getItem('currentUserUsername')})
          console.log("All fetches done")
        })
      })
    })
  }, [posts])


  let isAuthorized = localStorage.getItem('auth_key') !== 'undefined'

  // let unAuth = localStorage.setItem('auth_key','undefined')
  // let unUser = localStorage.setItem('currentUserUsername', 'undefined')


  return (
    <>
    <div className="App" >
      <Router>
      <Routes>


          <Route exact path="/" element={isAuthorized ? <Dashboard/> : <Navigate to='login'/> }/>
          <Route path ="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign_up" element={<Signup />} />
          <Route path="/new_post" element={<NewPostPage />} />
          <Route path="/new_channel" element={<NewChannelPage />} />
          <Route exact path="/channels" element={<ChannelList />} />
          <Route path="/channels/pursue/:channel_title" element={<ChannelPage />}/>
          <Route path="/u/:username" element={<UserPage />} />
          <Route path="/posts/:post_id" element={<PostPage />} />

          <Route path="/redirect" element= {<Navigate to="/login" />} />


      </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
