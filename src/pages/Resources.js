import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia, 
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import NavBar from '../components/NavBar';
import WPILogo from '../Images/WPILogo.png';
import VentureForumLogo from '../Images/VentureForumLogo.png';
import WorcesterChamberOfCommerceLogo from '../Images/WorcesterChamberOfCommerceLogo.png';
import StartUpWorcesterLogo from '../Images/StartUpWorcesterLogo.PNG';
import BBBLogo from '../Images/BBBLogo.png';
import PersonQuestionMark from '../Images/PersonQuestionMark.jpg';
import BookIcon from '../Images/BookIcon.png';
import Copyright from '../components/Copyright';
import NavBarNotLoggedIn from '../components/NavBarNotLoggedIn';

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

export default function MyStartup() {
  const classes = useStyles();
  const user = useContext(UserContext);

  return (
    <div className={classes.container}>
      {user.isLoggedIn ? <NavBar /> : <NavBarNotLoggedIn />}
      <Grid
        container
        alignItems="center"
        alignContent="center"
        direction="row"
        justify="center"
        spacing={3}
        className={classes.grid}
      >

        {/* WPI Innovation & Entrepreneurship */}
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <img
                  src={BookIcon}
                  alt="Factory Icon"
                  className={classes.icons}
                />
                {"WPI Innovation & Entrepreneurship"}
              </Typography>
              <CardMedia
                component="img"
                alt="WPI Logo"
                height="140"
                image={WPILogo}
                title="WPI Logo"
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {"WPI's Innovation & Entrepreneurship Center supports the culture of entrepreneurial and innovative thinking and action at WPI through skill-based workshops, solvathons, guidance, mentorship, competitions, networking opportunities, hands-on projects, and more. Whether it's a student MQP, faculty research in the lab, a hobby project, a venture, or nonprofit idea, we're here to help."}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.wpi.edu/about/innovation-entrepreneurship">
              Learn More
            </Button>
            <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.wpi.edu/contact?url=https%3A//www.wpi.edu/about/innovation-entrepreneurship">
              Contact
            </Button>
          </CardActions>
        </Card>

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
                {"The Venture Forum"}
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

        {/* BBB */}
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <img
                  src={BookIcon}
                  alt="Factory Icon"
                  className={classes.icons}
                />
                {"Better Business Bureau® of Worcester, MA"}
              </Typography>
              <CardMedia
                component="img"
                alt="BBB Logo"
                height="200"
                image={BBBLogo}
                title="BBB Logo"
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {"Better Business Bureau helps Worcester, MA consumers find businesses and charities they can trust. Find trusted BBB ratings, customer reviews, contact your local BBB, file a complaint, report a scam, read consumer news tips, BBB Auto Line, BBB Military Line."}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{marginTop: "10px"}}>
                {"BBB's Vision: An ethical marketplace where buyers and sellers trust each other."}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.bbb.org/us/ma/worcester">
              Learn More
            </Button>
            <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.bbb.org/central-western-massachusetts/get-to-know-us/contact/">
              Contact
            </Button>
          </CardActions>
        </Card>

        {/* Worcester Regional Chamber of Commerce */}
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <img
                  src={BookIcon}
                  alt="Factory Icon"
                  className={classes.icons}
                />
                {"Worcester Regional Chamber of Commerce"}
              </Typography>
              <CardMedia
                component="img"
                alt="Worcester Chamber of Commerce Logo"
                height="300"
                image={WorcesterChamberOfCommerceLogo}
                title="Worcester Chamber of Commerce Logo"
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {"As a member-driven organization, the Chamber works on behalf of businesses to create valuable programs and events that help to grow their networks, advocate for favorable, business-friendly public policy, work with our partners to assist with economic development efforts that create more opportunities and jobs, and support individual members on a variety of issues."}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.worcesterchamber.org/value-proposition/">
              Learn More
            </Button>
            <Button target="_blank" rel="noopener" size="small" color="primary" href="https://www.worcesterchamber.org/contact-us/">
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
                {"StartUp Worcester"}
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

        {/* Recommend Resource */}
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {"Found a resource we should recommend?"}
              </Typography>
              <CardMedia
                component="img"
                alt="Person Question Mark"
                height="400"
                image={PersonQuestionMark}
                title="Person Question Mark"
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {"Please email us any startup and entrepreneurship resources available in the city to help students and the rest of the community! Thank you in advance!"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button target="_blank" rel="noopener" size="small" color="primary" href="mailto:enochhsiao@umass.edu">
              Email Us
            </Button>
          </CardActions>
        </Card>

      </Grid>

      <div className={classes.copyright}>
        <Copyright/>
      </div>

    </div>
  );
}