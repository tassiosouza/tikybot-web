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
  makeStyles
} from '@material-ui/core';

const user = {
  avatar: '/static/images/robo-crashed.jpg',
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
    width: 100,
    marginBottom:20
  },
  status: {
    color:"#FF4500"
  }
}));

const ErrorTProfile = ({ className, ...rest }) => {
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
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            align='center'
            className={classes.dateText}
            color="textSecondary"
            variant="h6"
          >
            Ops! Ocorreu um erro ao tentar logar na sua conta, tente novamente.
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.status}
          fullWidth
          variant="text"
        >
          TENTE NOVAMENTE
        </Button>
      </CardActions>
    </Card>
  );
};

ErrorTProfile.propTypes = {
  className: PropTypes.string
};

export default ErrorTProfile;
