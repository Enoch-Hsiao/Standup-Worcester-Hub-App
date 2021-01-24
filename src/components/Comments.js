import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Avatar, 
  Container,
} from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CloseIcon from '@material-ui/icons/Close';
import get from '../universalHTTPRequests/get';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    marginRight: "20px",
    marginBottom: "50px",
  },
  grid: {
    width: "95%",
    marginTop: "50px",
  },
  container: {
    marginTop: '100px',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  icons: {
    height: '54px',
    position: 'relative',
    right: '2px',
    bottom: '-15px',
  },
  googleText: {
    paddingLeft: '5px',
    textTransform: 'unset',
  },
  copyright: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Opportunities({open, setOpen}) {
  const classes = useStyles();
  const user = useContext(UserContext);

  // eslint-disable-next-line
  const[commentsData, setCommentsData] = useState({
    data: null,
    loading: true,
    error: null,
    }
  )

  const[comments, setComments] = useState([]);

  //Get StartUp Data
  let getData = () => {
    function onSuccess(response) {
      if(response.val()) {
        let commentsList = Object.entries(response.val()).sort((a,b) => b[1].date - a[1].date);
        setComments(commentsList.map(obj => {
          let commentObj = obj[1];
          return <Container maxWidth="lg">
              <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="User Profile pic" src={commentObj.userProfile} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{commentObj.name}</h4>
                <p style={{ textAlign: "left" }}>
                  {commentObj.comment}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                {new Date(commentObj.date).toLocaleString()}
                </p>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          </Container>
        }));
      }
    }
    get(setCommentsData, 'startups/' + user.startupID + '/comments', null, onSuccess, true);
  }

  useEffect(getData, []);


  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <LibraryBooksIcon style={{position:'relative', bottom: '-5px', right: '5px'}}/>
            {'Comments on your Startup'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container} maxWidth="lg">
          {comments}
      </Container>
    </Dialog>
  );
}