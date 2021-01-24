import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia, 
  Button,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import VentureForumLogo from '../Images/VentureForumLogo.png';
import StartUpWorcesterLogo from '../Images/StartUpWorcesterLogo.PNG';
import BookIcon from '../Images/BookIcon.png';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CloseIcon from '@material-ui/icons/Close';

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
    marginTop: '50px',
    height: '100%',
    width: '100%',
    minHeight: '100vh',
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

  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <LibraryBooksIcon style={{position:'relative', bottom: '-5px', right: '5px'}}/>
            {'Opportunities'}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Grid
          container
          alignItems="center"
          alignContent="center"
          direction="row"
          justify="center"
          spacing={3}
          className={classes.grid}
        >

          {/* The Venture Forum */}
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <img
                    src={BookIcon}
                    alt="Factory Icon"
                    className={classes.icons}
                  />
                  {"The Venture Forum Five-Minute Pitch Event"}
                </Typography>
                <CardMedia
                  component="img"
                  alt="Venture Forum Logo"
                  height="75"
                  image={VentureForumLogo}
                  title="Venture Forum Logo"
                />
                <Typography variant="body2" color="textSecondary" component="p">
                  {"The Venture Forum is the not-for-profit community for entrepreneurs at any stage. Formerly known as the WPI Venture Forum, we’re continuing to offer a foundation for learning and connecting with resources essential to launching and growing successful growth businesses. We are also continuing our strong relationship with our Founding Partner, WPI, as we look to expand our community."}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{marginTop: "10px"}}>
                  {"Whether you are an experienced business owner, an angel investor, venture capitalist, or someone with ideas for starting a new venture, think of The Venture Forum as a place to test out ideas, gain useful feedback, and find needed resources."}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.theventureforum.org/about-the-venture-forum">
                Learn More
              </Button>
              <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.theventureforum.org/contact">
                Contact
              </Button>
            </CardActions>
          </Card>


          {/* StartUp Worcester */}
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <img
                    src={BookIcon}
                    alt="Factory Icon"
                    className={classes.icons}
                  />
                  {"StartUp Worcester Membership Program"}
                </Typography>
                <CardMedia
                  component="img"
                  alt="StartUp Worcester Logo"
                  height="250"
                  image={StartUpWorcesterLogo}
                  title="StartUp Worcester Logo"
                />
                <Typography variant="body2" color="textSecondary" component="p">
                  {"StartUp Worcester is an initiative of the Worcester Regional Chamber of Commerce’s Higher Education – Business Partnership, The Venture Forum, and WorcLab to launch and to provide support as well as space for the region’s young entrepreneurs."}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{marginTop: "10px"}}>
                  {"The initiative helps to incubate new businesses and to retain the bright young graduates of the area’s college and universities. StartUp Worcester encourages them to grow their business here – where they have access to everything they need to succeed."}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.worcesterchamber.org/startup-worcester-2020/">
                Learn More
              </Button>
              <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.worcesterchamber.org/contact-us/">
                Contact
              </Button>
            </CardActions>
          </Card>

        </Grid>

      </div>
    </Dialog>
  );
}