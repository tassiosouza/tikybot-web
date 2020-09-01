import React, {useState} from 'react'
import { Formik } from "formik"
import * as Yup from 'yup';
import firebase from '../../../components/Firebase'
import {
    Grid,
    colors,
    makeStyles, 
    Container,
    Button,
    TextField
  } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100%'
    },
    lockMessage: {
      color:colors.green[600]
    },
    differenceIcon: {
      color: colors.red[900]
    },
    differenceValue: {
      color: colors.red[900],
      marginRight: theme.spacing(1)
    },
    noAccountMessage: {
      marginBottom: theme.spacing(3)
    }
  }));

const TiktokForm = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (username, password) => {
        setLoading(true);
        firebase.getCurrentUser().child('credentials')
        .set({
          username,
          password
        }).then(function(){
            setLoading(false);
         }).catch(error => {
            setLoading(false);
            alert("Error, tente novamente mais tarde");
          });
    }

    return (
    <Formik
    initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('Este campo é obrigatório'),
        password: Yup.string().max(255).required('Este campo é obrigatório')
      })}
      onSubmit={(values) => handleSubmit(values.username, values.password)}>
          {({
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid item style={{"width" : "100%"}}>
                    <TextField 
                    style={{"marginBottom" : "15px"}}
                    fullWidth
                    label="Nome de usuário"
                    variant="outlined"
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    />
                
                    <TextField 
                        style={{"marginBottom" : "20px"}}
                        fullWidth
                        label="Senha"
                        variant="outlined"
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        type={"password"}
                    />
                </Grid>
                <Grid item align="center" style={{"width" : "100%"}}>
                    <Button color="secondary" variant="contained" type="submit" disabled={loading}>
                        <LockIcon
                            className={classes.icon}
                            size="20"
                        />
                        <span className={classes.title}>
                        CONECTAR
                        </span>
                    </Button>
                </Grid>    
              </form>
            )}
    </Formik>
    )
}

export default TiktokForm;