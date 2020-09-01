import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import firebase from '../../components/Firebase'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (email, password) => {
    setLoading(true);
    firebase
    .doSignInWithEmailAndPassword(email, password)
    .then(() => {
      setLoading(false);
      navigate('/app/panel', { replace: true });
    })
    .catch(error => {
      setLoading(false);
      setRequestError(error);
    });
  }

  const handleFacebook = () => {
    firebase.doSignInWithFacebook().then((result) => {
      var user = result.user;
      let username = user.displayName;
      firebase
        .getUser(user.uid).once('value', snapshot => {
          const userRegistered = snapshot.val();
          if(userRegistered == null){
            firebase
              .getUser(user.uid).set({
              username,
              email: user.email,
              photoURL: user.photoURL,
              auth_state: 'pending'
            });
          }
        });
      setLoading(false);
      navigate('/app/panel', { replace: true });
    }).catch(error => {
      setLoading(false);
      setRequestError(error);
    });
  }

  const handleGoogle = () => {
    firebase.doSignInWithGoogle().then((result) => {
      var user = result.user;
      let username = user.displayName;
      firebase
        .getUser(user.uid).once('value', snapshot => {
          const userRegistered = snapshot.val();
          if(userRegistered == null){
            firebase
              .getUser(user.uid).set({
              username,
              email: user.email,
              photoURL: user.photoURL,
              auth_state: 'pending'
            });
          }
        });
      setLoading(false);
      navigate('/app/panel', { replace: true });
    }).catch(error => {
      setLoading(false);
      setRequestError(error);
    });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRequestError(null);
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Endereço de email inválido').max(255).required('Este campo é obrigatório'),
              password: Yup.string().max(255).required('Este campo é obrigatório')
            })}
            onSubmit={(values) => handleSubmit(values.email, values.password)}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Entrar
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Acessar o painel tikybot
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleFacebook}
                      size="large"
                      variant="contained"
                    >
                      Entrar com Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleGoogle}
                      size="large"
                      variant="contained"
                    >
                      Entrar com Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Ou entre com a sua conta Tikybot
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Não possui uma conta ? 
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Registrar
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
      <Snackbar open={requestError ? true : false} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {requestError ? requestError.message : ''}
        </Alert>
      </Snackbar>
    </Page>
  );
};

export default LoginView;
