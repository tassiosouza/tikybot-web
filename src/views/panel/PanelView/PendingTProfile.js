import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  CircularProgress
} from '@material-ui/core';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  dateText:{
    marginTop:20
  }
}));

const PendingTProfile = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <CircularProgress color="secondary" />
          <Typography
            align='center'
            className={classes.dateText}
            color="textSecondary"
            variant="h6"
          >
            Estamos verificando sua conta do Tiktok, isso pode levar alguns minutos. Volte mais tarde para verificar o status.
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          VERIFICANDO CONTA
        </Button>
      </CardActions>
    </Card>
  );
};

PendingTProfile.propTypes = {
  className: PropTypes.string
};

export default PendingTProfile;
