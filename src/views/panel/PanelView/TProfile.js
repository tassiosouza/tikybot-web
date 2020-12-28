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
  CircularProgress,
  CardHeader
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 110,
    width: 110
  },
  status: {
    color:"#32CD32"
  }
}));

const TProfile = ({ className, user, ...rest }) => {
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
            src={user.tiktokPhotoURL}
          />
          <Typography
              align='center'
              color="textPrimary"
              gutterBottom
              variant="h4"
          >
            {'@'+ user.credentials.username}
          </Typography>
          <Box display="flex" p={1} >
            <Box p={1} alignItems='center'>
              <Typography
              align='center'
              color="textPrimary"
              gutterBottom
              variant="h6"
              >
                {user.followersCount ? user.followersCount : '0'}
              </Typography>
              <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              >
                Seguindo
              </Typography>
            </Box>
            <Box p={1}>
            <Typography
              align='center'
              color="textPrimary"
              gutterBottom
              variant="h6"
              >
                {user.followingCount ? user.followingCount : '0'}
              </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              >
                Seguidores
              </Typography>
            </Box>
            <Box p={1}>
            <Typography
              align='center'
              color="textPrimary"
              gutterBottom
              variant="h6"
              >
                {user.likesCount ? user.likesCount : '0'}
              </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
              >
                Curtidas
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.status}
          fullWidth
          variant="text"
        >
          RODANDO TIKYBOT
        </Button>
        
      </CardActions>
    </Card>
  );
};

TProfile.propTypes = {
  className: PropTypes.string
};

export default TProfile;
