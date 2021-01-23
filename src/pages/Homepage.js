import React, { useEffect, useContext, useState } from 'react';
import { signInWithGoogle } from '../services/firebase';
import { UserContext } from '../providers/UserProvider';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
} from '@material-ui/core';
import FactoryLogo from '../Images/FactoryLogo.png';
import GoogleLogo from '../Images/GoogleLogo.png';
import WorcesterBackground from '../Images/WorcesterBackground.jpg';
import { Link } from 'react-router-dom';
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundImage: `url(${WorcesterBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  button: {
    paddingLeft: '10px',
    textTransform: 'unset',
    marginTop: '10px',
    '@media (max-width:370px)': {
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
  title: {
    '@media (max-width:630px)': {
      fontSize: "30px",
    },
  },
  copyright: {
      color: 'white',
      paddingBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      '@media (min-height:300px)': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        bottom: '0px',
        width: '100%',
        position: 'absolute',
      },
  },
}));

export default function Login() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    if (user.isLoggedIn) {
      console.log(user);
      setredirect('/My-Startup')
    }
  }, [user])

  if (redirect) {
    return <Redirect to={redirect}/>
  }
  
  return (
      <div className={classes.container}>
        <Typography className={classes.title} variant="h3" display="block" color="primary" noWrap>
          StartUp Worcester Hub
        </Typography>
        <Button 
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={signInWithGoogle}
        >
          <img src={GoogleLogo} alt="google icon"/>
          <Typography variant="h5" display="block" noWrap>
            Sign in with Google
          </Typography>
        </Button>
        <Button 
          className={classes.button}
          component={Link}
          to='/Startups'
          variant="outlined"
          color="primary"
        >
          <img src={FactoryLogo} alt="factory icon"/>
          <Typography variant="h6" display="block" noWrap>
            View Worcester Startups
          </Typography>
        </Button>

        <div className={classes.copyright}>
          <Copyright/>
        </div>

      </div>
  );
}