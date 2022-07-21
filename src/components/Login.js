import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.error.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: theme.palette.info.dark,
    },
    noUser: {
      color: 'red'
    },
    links: {
      color: '#2196f3'
    }
  }));

const Login = () => {

    const classes = useStyles();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [msg, setMsg] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
          username: e.target.querySelector('#username').value,
          password: e.target.querySelector('#password').value
        }
        fetch('/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(token => {
          if(token['msg']){
            setMsg(token['msg'])
          }else{
            localStorage.setItem('auth_key',token['auth_key'])
            localStorage.setItem('currentUserUsername', newUser.username)
            console.log(token)
            newUser.email = token['user_id']
            dispatch({type: 'LOGIN', username:localStorage.getItem('currentUserUsername')})
            navigate('/dashboard')
          }
        })
      }

      // const toggleLogin = () => {

      // }

  return (
    <Container component="main" maxWidth="xs">

    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}> <ChildCareIcon /> </Avatar>
     <Typography component="h1" variant="h5"> Sign in </Typography>
     {(msg) ? <Typography className={classes.noUser}>That username and/or password is incorrect</Typography> : <div></div>}
      <form className={classes.form} onSubmit={(e)=>handleSubmit(e)} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="http://localhost:3001/sign_up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
  )
}

export default Login;