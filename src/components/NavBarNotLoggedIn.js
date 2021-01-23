import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import { signInWithGoogle } from '../services/firebase';
import WorcesterLogo from '../Images/WorcesterLogo.png';
import GoogleLogo from '../Images/GoogleLogo.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    width: '100%',
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    flexGrow: 1,
  },
  growLogout: {
    flexGrow: 1,
  },
  logo: {
    height: '60px',
    margin: theme.spacing(1),
    marginRight: '15px',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(3),
    padding: theme.spacing(1.5),
    paddingBottom: 0,
    paddingTop: 0,
    minWidth: '20px',
    textTransform: 'unset',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '2px',
    height: '54px',
  },
  buttonText: {
    color: 'white',
},
}));

export default function NavBar() {
    const classes = useStyles();

    return (
      <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
         <img
            src={WorcesterLogo}
            alt="Logo"
            className={classes.logo}
          />
          <Typography
              className={classes.buttonText}
              variant="h5"
              noWrap={true}
          >
              StartUp Worcester Hub
          </Typography>
          <div className={classes.growLogout} />
          <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              m={-2}
              onClick={signInWithGoogle}
          >
            <img src={GoogleLogo} alt="google icon"/>
            <Typography
                className={classes.buttonText}
                variant="h6"
                noWrap={true}
            >
                Sign in with Google
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
    );
}
