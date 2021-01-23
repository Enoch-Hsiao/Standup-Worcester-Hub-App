import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import { makeStyles } from '@material-ui/core/styles';
import {

} from '@material-ui/core';
import NavBar from '../components/NavBar';
import { useHistory } from "react-router-dom";
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
  container: {
      height: '100%',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
  },
  googleText: {
    paddingLeft: '5px',
    textTransform: 'unset',
  },
  copyright: {
      paddingBottom: theme.spacing(2),
  },
}));

export default function MyStartup() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();

  if (!user.isLoggedIn) {
    history.push('/');
  }

  return (
      <div className={classes.container}>
        <NavBar />

        <div className={classes.copyright}>
          <Copyright/>
        </div>

      </div>
  );
}