import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  colors,
  makeStyles, 
  Container,
} from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TProfile from './TProfile'
import ErrorTProfile from './ErrorTProfile'
import PendingTProfile from './PendingTProfile'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


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

const UserPanel = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const [entering, setEntering] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onCredentialSaved = () => {
    setEntering(false);
  }

  return (
    <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={8} sm={8} xl={9} xs={12} >
            <AppBar position="static" color="default" style={{ position: 'flex'}}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Referencias" icon={<PhoneIcon />}/>
                <Tab label="Hashtag" icon={<FavoriteIcon />}  />
                <Tab label="Localização" icon={<PersonPinIcon />} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Em breve (Referencias)
          </TabPanel>
          <TabPanel value={value} index={1}>
          Em breve (Hashtags)
          </TabPanel>
          <TabPanel value={value} index={2}>
          Em breve (Localização)
          </TabPanel>
          </Grid>
          <Grid item lg={4} sm={4} xl={3} xs={12} >
            {user.auth_state === 'success' && <TProfile />}
            {user.auth_state === 'pending' && <PendingTProfile />}
            {user.auth_state === 'failed' && <ErrorTProfile />}
          </Grid>
        </Grid>
          
      </Container>
  );
};

UserPanel.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };


export default UserPanel;
