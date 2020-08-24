import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from '../../reports/DashboardView/Budget';
import NoAccountView from './NoAccountView'

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

  return (
    <Page
      className={classes.root}
      title="Panel"
    >
      <Container >
        <Grid
          maxWidth={false}
          container
          spacing={0}
          justify="center"
        >
          <Grid
            item
            lg={10} //larges screen
            sm={10} //tablets
            xl={10} //tv screen
            xs={12} //mobile
          >
            <NoAccountView/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default PanelView;
