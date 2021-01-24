import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import { signInWithGoogle } from '../services/firebase';
import WorcesterLogo from '../Images/WorcesterLogo.png';
import GoogleLogo from '../Images/GoogleLogo.png';
import { Link as RouterLink } from 'react-router-dom';
import ResourceIcon from '../Images/ResourceIcon.png';
import StartupsIcon from '../Images/StartupsIcon.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    width: '100%',
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    flexGrow: 0,
    '@media (max-width:770px)': {
      flexGrow: 0,
    },
  },
  growLogout: {
    flexGrow: 1,
    '@media (max-width:770px)': {
      flexGrow: 0,
    },
  },
  logo: {
    height: '60px',
    margin: theme.spacing(1),
    marginRight: '15px',
    '@media (max-width:770px)': {
      display:'none'
    },
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(3),
    padding: theme.spacing(1),
    paddingBottom: 0,
    paddingTop: 0,
    minWidth: '175px',
    textTransform: 'unset',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '2px',
    height: '48px',
    '@media (max-width:905px)': {
      marginRight: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: '125px',
      flex: '25%',
    },
    '@media (max-width:540px)': {
      marginRight: theme.spacing(0.5),
      padding: theme.spacing(0.5),
      height: '50px',
      minWidth: '85px',
      flex: '25%',
    },
  },
  navBar: {
    '@media (max-width:540px)': {
      paddingLeft: '2px',
      paddingRight: '2px',
    }, 
  },
  buttonText: {
    color: 'white',
    fontSize: '20px',
    '@media (max-width:948px)': {
      fontSize: '13px',
    },
    '@media (max-width:677px)': {
      fontSize: '17px',
    },
    '@media (max-width:540px)': {
      fontSize: '15px',
    },
    '@media (max-width:460px)': {
      fontSize: '13px',
    },
    '@media (max-width:390px)': {
      fontSize: '11px',
    },
  },
  icons: {
    height: '38px',
    margin: theme.spacing(1),
    marginLeft: '-5px',
    '@media (max-width:677px)': {
      display:'none'
    },
  },
  googleIcon: {
    height: '40px',
    margin: theme.spacing(1),
    marginLeft: '-5px',
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: '50%',
    borderWidth: '0px',
    '@media (max-width:677px)': {
      display:'none'
    },
  },
}));

export default function NavBarNotLoggedIn() {
    const classes = useStyles();

    return (
      <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.navBar}>
         <img
            src={WorcesterLogo}
            alt="Logo"
            className={classes.logo}
          />
          <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              component={RouterLink}
              to={'/startups'}
          >
              <img
                src={StartupsIcon}
                alt="Startups Logo"
                className={classes.icons}
              />
              <Typography
                  className={classes.buttonText}
                  variant="h5"
                  noWrap
              >
                  View Startups
              </Typography>
          </Button>
          <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              component={RouterLink}
              to={'/resources'}
          >
              <img
                src={ResourceIcon}
                alt="Resource Logo"
                className={classes.icons}
              />
              <Typography
                  className={classes.buttonText}
                  variant="h5"
                  noWrap
              >
                  Resources
              </Typography>
          </Button>
          <div className={classes.growLogout} />
          <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              m={-2}
              onClick={signInWithGoogle}
          >
            <img src={GoogleLogo} alt="google icon" className={classes.googleIcon}/>
            <Typography
                className={classes.buttonText}
                variant="h6"
                noWrap
            >
                Sign in with Google
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
    );
}
