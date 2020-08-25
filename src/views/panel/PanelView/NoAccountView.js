import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
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

const NoAccountView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [entering, setEntering] = useState(false);

  return (
    <Container >
        <Grid
          maxWidth={false}
          container
          spacing={0}
          justify="center"
        >
          <Grid
            item
            lg={8} //larges screen
            sm={10} //tablets
            xl={10} //tv screen
            xs={12} //mobile
          >
            <Typography
              className={classes.noAccountMessage}
              color="textSecondary"
              align='center'
              gutterBottom
              variant="h3">
              Conectar sua conta do TikTot
            </Typography>
          </Grid>
          <Grid
            item
            lg={10} //larges screen
            sm={10} //tablets
            xl={10} //tv screen
            xs={12} //mobile
          >
            <Card
            className={clsx(classes.root, className)}
            {...rest}
            >
            <CardContent>
                <Grid
                container
                justify="space-between"
                spacing={3}
                >
                <Grid item xl={10}>
                    <Typography
                    className={classes.lockMessage}
                    gutterBottom
                    variant="h5"
                    >
                    Sua conta estará 100% segura
                    </Typography>
                </Grid>
                <Grid item xl={2}>
                    <LockIcon className={classes.lockMessage}/>
                </Grid>
                <Grid item hidden={!entering} style={{"width" : "100%"}}>
                  <TextField 
                    style={{"margin-bottom" : "15px"}}
                    fullWidth
                    label="Nome de usuário"
                    variant="outlined"
                  />
                
                  <TextField 
                      fullWidth
                      label="Senha"
                      variant="outlined"
                    />
                </Grid>
                <Grid item align="center" hidden={!entering} style={{"width" : "100%"}}>
                    <Button color="secondary" variant="contained" onClick={()=>setEntering(true)}>
                        <LockIcon
                            className={classes.icon}
                            size="20"
                        />
                        <span className={classes.title}>
                        CONECTAR
                        </span>
                    </Button>
                </Grid>    
                <Grid item xl={12}>
                <Typography
                    gutterBottom
                    variant="h6"
                    color="textSecondary"
                    >
                    Ao conectar sua conta do TikTot aos nossos servidores, ela será armazenada usando 
                    o sistema de criptografia do Google. Garantindo que nenhum de nossos funcionários tenham
                    acesso as suas credenciais. Para saber mais, acesse.
                    </Typography>
                </Grid>
                <Grid item xl={12} align="center" style={{"width" : "100%"}} hidden={entering}>
                    <Button color="secondary" variant="contained" onClick={()=>setEntering(true)}>
                        <LockIcon
                            className={classes.icon}
                            size="20"
                        />
                        <span className={classes.title}>
                        CONECTAR COM SEGURANÇA
                        </span>
                    </Button>
                </Grid>    
                </Grid>
            </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
  );
};

NoAccountView.propTypes = {
    className: PropTypes.string
  };

export default NoAccountView;