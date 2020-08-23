import React, { useState, useRef } from 'react';
import { SignUpLink } from '../SignUp';
import * as ROUTES from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';
import firebase from '../Firebase/firebase'
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

function SignInPage () {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
    email:"",
    password:"",
    loading:false,
    error:null,
    emailFieldMessage:"",
    passwordFieldMessage:""
  });

  const validateFields = () => {
    if(state.email === ''){
      setState({...state, emailFieldMessage: "This field is required"});
      return false;
    } else if(state.password === ''){
      setState({...state, passwordFieldMessage: "This field is required"});
      return false;
    }
    return true;
  };

  const handleSubmit = (evt) => {
    if(validateFields()){
      setState({...state, loading:true});
      firebase
      .doSignInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        //firebase.doSignOut();
        setState({...state, loading:false});
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setState({...state, loading:false, error});
      });
    }
    evt.preventDefault();
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({...state, error:null});
  };
 
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Entrar
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          name="email"
          value={state.email}
          onChange={e => setState({...state, email:e.target.value, emailFieldMessage: ""})}
          type="text"
          error={state.emailFieldMessage !== ""}
          helperText={state.emailFieldMessage}
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          name="password"
          value={state.password}
          onChange={e => setState({...state, password:e.target.value, passwordFieldMessage: ""})}
          variant="outlined"
          error={state.passwordFieldMessage !== ""}
          helperText={state.passwordFieldMessage}
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={state.loading}
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="" onClick={() => history.push(ROUTES.PASSWORD_FORGET)} variant="body2">
              Esqueceu a senha ? 
            </Link>
          </Grid>
          <Grid item>
            <Link style={{ cursor: "pointer" }} onClick={() => history.push(ROUTES.SIGN_UP)} variant="body2">
              {"Não possui um conta ? Registrar"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={8}>
      <Copyright />
    </Box>
    <Snackbar open={state.error ? true : false} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {state.error ? state.error.message : ''}
        </Alert>
      </Snackbar>
  </Container>
  );
}
 
export default SignInPage;