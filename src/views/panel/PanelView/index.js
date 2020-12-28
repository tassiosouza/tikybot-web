import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import NoAccountView from './NoAccountView'
import UserPanel from './UserPanel'
import firebase from '../../../components/Firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PanelView = () => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(false);
  
  useEffect(() => {
    firebase.getCurrentUser().on("value", (snapshot) => {
      let currentUser = snapshot.val();
      setCurrentUser(currentUser);
    });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Painel do Usuário"
    >
      <Container >
        <Grid
          container
          spacing={0}
          justify="center"
        >
          <Grid
            item
            lg={12} //larges screen
            sm={12} //tablets
            xl={12} //tv screen
            xs={12} //mobile
          >
            {currentUser.credentials != null ?
             (<UserPanel user={currentUser}/>)
             : (<NoAccountView/>) }
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PanelView;
