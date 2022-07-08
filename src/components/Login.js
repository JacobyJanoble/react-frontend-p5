import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const [messages, setMessages] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            username: e.target.querySelector('#username').value,
            password: e.target.querySelector('#password').value
        }
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(resp => resp.json())
        .then(tokenData => {
            if (tokenData['message']) {
                setMessages(token['message'])
            } else {
                localStorage.setItem('auth_key', token['auth_key'])
                localStorage.setItem('currentUserUsername', newUser.username)
                console.log(token)
                newUser.email = token['user_id']
                dispatch({ type: 'LOGIN', username:localStorage.getItem('currentUserUsername')})
                history.push('/dashboard')
            }
        })
    }

  return (
   <div></div>
  )
}

export default Login