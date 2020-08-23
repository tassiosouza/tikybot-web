import React, { useState } from 'react';
import * as ROUTES from '../../constants/routes';
import { useHistory} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../Firebase/firebase'
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignUpPage () {

  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
    loading:false,
    error:null,
    usernameFieldMessage:"",
    emailFieldMessage:"",
    passwordFieldMessage:"",
    passwordConfirmFieldMessage:""
  });

  const validateFields = () => {
    if(state.username === ''){
      setState({...state, usernameFieldMessage: "Este campo é obrigatório"});
      return false;
    }
    else if(state.email === ''){
      setState({...state, emailFieldMessage: "Este campo é obrigatório"});
      return false;
    } else if(state.password === ''){
      setState({...state, passwordFieldMessage: "Este campo é obrigatório"});
      return false;
    }
    else if(state.password != state.confirmPassword){
      setState({...state, passwordConfirmFieldMessage: "As senhas devem ser iguais"});
      return false;
    }
    return true;
  };

  const handleSubmit = (evt) => {
    
    if(validateFields()){
      console.log("entrando nessa porra");
      setState({...state, loading:true});
      firebase
      .doCreateUserWithEmailAndPassword(state.email, state.password)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        setState({...state, loading:false});
        history.push(ROUTES.HOME);
        firebase
          .getUser(authUser.user.uid)
          .set({
            username: state.username,
            email: state.email,
          });
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
          Registrar ao Tikybot
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              name="username"
              value={state.username}
              onChange={e => setState({...state, username:e.target.value, usernameFieldMessage: ""})}
              type="text"
              error={state.usernameFieldMessage !== ""}
              helperText={state.usernameFieldMessage}
              variant="outlined"
              fullWidth
              label="Nome completo"
              autoComplete="username"
              autoFocus
            />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="username"
                value={state.email}
                onChange={e => setState({...state, email:e.target.value, emailFieldMessage: ""})}
                type="text"
                error={state.emailFieldMessage !== ""}
                helperText={state.emailFieldMessage}
                variant="outlined"
                fullWidth
                label="Email"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                value={state.password}
                onChange={e => setState({...state, password:e.target.value, passwordFieldMessage: ""})}
                type="password"
                error={state.passwordFieldMessage !== ""}
                helperText={state.passwordFieldMessage}
                variant="outlined"
                fullWidth
                label="Senha"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                value={state.confirmPassword}
                onChange={e => setState({...state, confirmPassword:e.target.value, passwordConfirmFieldMessage: ""})}
                type="password"
                error={state.passwordConfirmFieldMessage !== ""}
                helperText={state.passwordConfirmFieldMessage}
                variant="outlined"
                fullWidth
                label="Confirmar Senha"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={state.loading}
            className={classes.submit}
          >
            Criar conta gratuita
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link style={{ cursor: "pointer" }} onClick={() => history.push(ROUTES.SIGN_IN)} variant="body2">
                Já possui uma conta ? Entrar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
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
 
export default SignUpPage;