import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Navigate, Routes, } from 'react-router-dom';

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
          console.log("Finish fetching...")
        })
      })
    })
  }, [])

  const users = useSelector(state => state.user.allUsers)
  const posts = useSelector(state => state.user.allPosts)

  return (
    <div className="App" >
      <Routes>
        {/* <Header /> */}

          <Route exact path="/dashboard" element={() => {
            if (localStorage.getItem('auth_key') !== 'undefined'){
              return <Dashboard />
            } else {
              return <Navigate to='/login' />
            }
          }}/>

          <Route path="/login" component={() => {
            return <Login />
          }}/>

          <Route path="/sign_up" component={() => {
            return <Signup />
          }}/>

          <Route path="/new_post" component={() => {
            return <NewPostPage />
          }}/>

          <Route path="/new_channel" component={() => {
            return <NewChannelPage />
          }}/>

          <Route exact path="/channels" component={() => {
            return <ChannelList />
          }}/>

          <Route path="/channels/readit/:channel_title" component={() => {
            return <ChannelPage />
          }}/>

          <Route path="/u/:username" component={() => {
            return <UserPage />
          }}/>

          <Route path="/posts/:post_id" component={() => {
            return <PostPage />
          }}/>

          <Route path="/logout" component={() => {
            localStorage.setItem('auth_key','undefined')
            localStorage.setItem('currentUserUsername', 'undefined')
            return <Navigate to='/login' />
          }}/>

          <Route path="/redirect" element= {<Navigate to="/login" />} />
          {/* <Route component={() => {
            return <Redirect to='/login' />
          }}/> */}

      </Routes>
    </div>
  );
}

export default App;
