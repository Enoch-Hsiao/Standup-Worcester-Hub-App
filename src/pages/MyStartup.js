import React, { useContext, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import NavBar from '../components/NavBar';
import { useHistory } from "react-router-dom";
import Copyright from '../components/Copyright';
import ResumeIcon from '../Images/ResumeIcon.png';
import LightBulbIcon from '../Images/LightBulbIcon.png';
import CommentsIcon from '../Images/Comments.png';
import PencilIcon from '../Images/PencilIcon.png';
import WorcesterBackground2 from '../Images/WorcesterBackground2.jpg';
import ViewStartUpInfo from '../components/ViewStartupInfo';
import StartUpForm from '../components/EditStartupForm';
import Comments from '../components/Comments';
import Opportunities from '../components/Opportunities';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundImage: `url(${WorcesterBackground2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  buttonContainer: {
    marginTop: '40px',
    flexDirection: "row", 
    alignItems: "center",
    '@media (max-width:1015px)': {
      flexDirection:"column",
      marginTop: '10px',
    },
  },
  innerButtonContainer: {
    '@media (max-width:1015px)': {
      flexDirection:"row",
    },
    '@media (max-width:430px)': {
      flexDirection:"column",
    },
  },
  icons: {
    height: '48px',
    margin: theme.spacing(1),
    marginLeft: '-5px',
    '@media (max-width:1015px)': {
      height: '42px',
    },
  },
  button: {
    marginRight: theme.spacing(3),
    padding: theme.spacing(2),
    minWidth: '175px',
    borderWidth: '3px',
    textTransform: 'unset',
    height: '64px',
    '@media (max-width:1015px)': {
      margin: '2px',
      height: '48px',
    },
  },
  buttonText: {
    color: 'black',
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

export default function MyStartup() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();

  if (!user.isLoggedIn) {
    history.push('/');
  }

  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [commentsDialog, setCommentsDialog] = useState(false);
  const [opportunitiesDialog, setOpportunitiesDialog] = useState(false);

  return (
      <div className={classes.container}>
        <NavBar />

        <StartUpForm open={editDialog} setOpen={setEditDialog} />
        <ViewStartUpInfo open={viewDialog} setOpen={setViewDialog} />
        <Comments open={commentsDialog} setOpen={setCommentsDialog} />
        <Opportunities open={opportunitiesDialog} setOpen={setOpportunitiesDialog} />

        <Box 
          display="flex"
          className={classes.buttonContainer}
        >
          <Box 
            display="flex"
            className={classes.innerButtonContainer}
          >
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={() => setViewDialog(true)}
            >
              <img
                src={ResumeIcon}
                alt="Resume Logo"
                className={classes.icons}
              />
              <Typography
                  className={classes.buttonText}
                  variant="h5"
                  noWrap
              >
                {"View Info"}
              </Typography>
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              onClick={() => setEditDialog(true)}
            >
              <img
                src={PencilIcon}
                alt="Pencil Icon"
                className={classes.icons}
              />
              <Typography
                  className={classes.buttonText}
                  variant="h5"
                  noWrap
              >
                {"Edit Info"}
              </Typography>
            </Button>
          </Box>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => setCommentsDialog(true)}
          >
            <img
              src={CommentsIcon}
              alt="Comments Icon"
              className={classes.icons}
            />
            <Typography
                className={classes.buttonText}
                variant="h5"
                noWrap
            >
                Comments
            </Typography>
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={() => setOpportunitiesDialog(true)}
          >
            <img
              src={LightBulbIcon}
              alt="Light Bulb Icon"
              className={classes.icons}
            />
            <Typography
                className={classes.buttonText}
                variant="h5"
                noWrap
            >
                Opportunities
            </Typography>
          </Button>
        </Box>
        <div className={classes.copyright}>
          <Copyright/>
        </div>
      </div>
  );
}