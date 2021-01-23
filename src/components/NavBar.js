import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../providers/UserProvider';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import { Link as RouterLink } from 'react-router-dom';
import { logOut } from "../services/firebase";
import WorcesterLogo from '../Images/WorcesterLogo.png';
import ResourceIcon from '../Images/ResourceIcon.png';
import ComputerIcon from '../Images/ComputerIcon.png';
import { useHistory } from "react-router-dom";
import StartupsIcon from '../Images/StartupsIcon.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    width: '100%',
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    flexGrow: 0,
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
    padding: theme.spacing(2),
    paddingBottom: 0,
    paddingTop: 0,
    minWidth: '175px',
    textTransform: 'unset',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '2px',
    height: '48px',
    '@media (max-width:975px)': {
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
  buttonText: {
    color: 'white',
    fontSize: '20px',
    '@media (max-width:975px)': {
      fontSize: '13px',
    },
    '@media (max-width:540px)': {
      fontSize: '12px',
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
  profilePic: {
    height: '40px',
    margin: theme.spacing(1),
    marginLeft: '-15px',
    borderStyle: 'solid',
    borderColor: 'white',
    borderRadius: '50%',
    borderWidth: '0px',
    '@media (max-width:677px)': {
      display:'none'
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);

  function logoutSuccess() {
    history.push('/');
  }
    return (
      <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
         <img
            src={WorcesterLogo}
            alt="Worcester Logo"
            className={classes.logo}
          />
          <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              component={RouterLink}
              to={'/My-Startup'}
          >
              <img
                src={ComputerIcon}
                alt="Computer Logo"
                className={classes.icons}
              />
              <Typography
                  className={classes.buttonText}
                  variant="h5"
                  noWrap
              >
                  My Startup
              </Typography>
          </Button>
          <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              component={RouterLink}
              to={'/Startups'}
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
              to={'/Resources'}
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
              onClick={() => logOut(logoutSuccess)}
          >
              <img
                src={user.photoURL}
                alt="User Logo"
                className={classes.profilePic}
              />
              <Typography
                  className={classes.buttonText}
                  variant="h5"
                  noWrap
              >
                  Logout
              </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
    );
}
