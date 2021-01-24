import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../providers/UserProvider';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  FormControl,
  NativeSelect,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Container,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  TextField,
} from '@material-ui/core';
import { db } from '../services/firebase';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import NavBar from '../components/NavBar';
import NavBarNotLoggedIn from '../components/NavBarNotLoggedIn';
import get from '../universalHTTPRequests/get';
import getYoutubeID from '../functions/getYoutubeID';
import LoadingSpinner from '../components/LoadingSpinnerNoBackground';
import LinkedInLogo from '../Images/LinkedInLogo.png';
import WebsiteLogo from '../Images/WebsiteLogo.png';
import LocationIcon from '../Images/LocationIcon.png';
import FactoryIcon from '../Images/FactoryIcon.png';
import GearsIcon from '../Images/GearsIcon.png';
import ResumeIcon from '../Images/ResumeIcon.png';
import ProductIcon from '../Images/ProductIcon.png';
import UpRightArrow from '../Images/UpRightArrow.png'
import BusinessModel from '../Images/BusinessModel.png';
import FinanceIcon from '../Images/FinanceIcon.png';
import SalesAndMarketingIcon from '../Images/SalesAndMarketingIcon.png';
import TeamIcon from '../Images/TeamIcon.png';
import CustomerIcon from '../Images/CustomerIcon.png';
import PrototypeIcon from '../Images/PrototypeIcon.png';
import StartUpIcon from '../Images/StartUpIcon.png';
import AdditionalInformationIcon from '../Images/AdditionalInformationIcon.png';
import SearchBar from "material-ui-search-bar";
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { htmlToText } from 'html-to-text';
import SuccessBanner from '../components/SuccessBanner';
import ErrorBanner from '../components/ErrorBanner';
import CommentsIcon from '../Images/Comments.png';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    marginRight: "20px",
    marginBottom: "50px",
  },
  dialogTitleRoot: {
    margin: 0,
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0),
    color: theme.palette.grey[500],
  },
  grid: {
    width: "95%",
    marginTop: "25px",
  },
  container: {
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  searchBarContainer: {
    marginTop: '10px',
    flexDirection: "row", 
    alignItems: "center",
    '@media (max-width:600px)': {
      flexDirection:"column"
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: '200px',
    height: '50px',
  },
  dropdownHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  googleText: {
    paddingLeft: '5px',
    textTransform: 'unset',
  },
  youtubeVideo: {
    width: 450,
    height: 280,
    marginBottom: "10px",
    '@media (max-width:500px)': {
      width: '100%',
      height: '75%',
    },
  },
  youtubeVideoDialog: {
    width: 750,
    height: 400,
    '@media (max-width:850px)': {
      width: '100%',
      height: '350px',
    },
    '@media (max-width:500px)': {
      width: '100%',
      height: '200px',
    },
  },
  icons: {
    height: '64px',
    position: 'relative',
    right: '5px',
    bottom: '-15px',
  },
  dialogIcons: {
    height: '64px',
  },
  smallIcons: {
    height: '48px',
    '@media (max-width:400px)': {
      display: 'none',
    },
  },
  sideIcons: {
    height: '42px',
    position: 'relative',
    right: '2px',
    bottom: '-8px',
  },
  copyright: {
    marginBottom: theme.spacing(2),
  },
}));

export default function MyStartup() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const window = (new JSDOM('')).window;
  const DOMPurify = createDOMPurify(window);

  const[startUpData, setStartUpData] = useState({
    data: null,
    loading: true,
    error: null,
    }
  )

  const youtubeIframe = (url, dialog) => {
    const videoId = getYoutubeID(url);
    return <Container component="main" maxWidth='lg' className={dialog ? classes.youtubeVideoDialog : classes.youtubeVideo}>
            <iframe 
              title="company youtube video" 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${videoId}`} 
              frameBorder="0" allowFullScreen>
            </iframe>
          </Container>;
  }
  const [originalStartupCards, setOriginalStartupCards] = useState([]);
  const [startupCards, setStartupCards] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCardData, setCurrentCardData] = useState({});

  const openMoreInfoDialog = (data) => {
    setOpenDialog(true);
    setCurrentCardData(data);
  }
  const closeMoreInfoDialog = () => {
    setOpenDialog(false);
  }

  //Search bar
  const [filterString, setFilterString] = useState("");
  const [filterType, setFilterType] = useState("Name");

  const handleDropdownChange = (event) => {
    setFilterType(event.target.value);
  };

  const filterStartUps = (string) => {
    setFilterString(string);
    if(filterType === "Name") {
      setStartupCards(setCards(originalStartupCards.filter(obj => (obj[1].companyName.toLowerCase()).includes(string.toLowerCase()))));
    } else if (filterType === "Industry") {
      setStartupCards(setCards(originalStartupCards.filter(obj => (obj[1].companyIndustry.toLowerCase()).includes(string.toLowerCase()))));
    }
  }

  const setCards = (array) => {
    return array.map(startupObj => {
      const startupData = startupObj[1];
      if(startupData.public) {
        return <Card key={startupObj[0]} className={classes.root} onClick={() => openMoreInfoDialog({...startupData, id: startupObj[0]})}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2" noWrap>
              <img
                src={FactoryIcon}
                alt="Factory Icon"
                className={classes.icons}
              />
              {startupData.companyName}
            </Typography>
            <Divider/>
            <Typography gutterBottom variant="h6" component="h2" display="block" noWrap>
              <img
                src={GearsIcon}
                alt="Gears Icon"
                className={classes.icons}
              />
              Industry: {startupData.companyIndustry}
            </Typography>
            <Divider style={{marginBottom: "15px"}}/>
            <Typography variant="body2" color="textSecondary" component="p">
              {startupData.companyDescription}
            </Typography>
          </CardContent>
          {startupData.companyYoutube && startupData.companyYoutube.trim() ? youtubeIframe(startupData.companyYoutube) : null}
        </CardActionArea>
        <CardActions>
          <Button target="_blank" rel="noopener" size="small" color="primary" onClick={() => openMoreInfoDialog(startupData)}>
            <img
              src={UpRightArrow}
              alt="Up Right Arrow"
              className={classes.smallIcons}
            />
            Expand
          </Button>
          {startupData.companyLinkedIn && startupData.companyLinkedIn.trim() ? 
          <Button target="_blank" rel="noopener" size="small" color="primary" href={startupData.companyLinkedIn}>
              <img
                src={LinkedInLogo}
                alt="LinkedIn Logo"
                className={classes.smallIcons}
              />
              LinkedIn
            </Button>
            :
          null }
          {startupData.companyWebsite && startupData.companyWebsite.trim() ? 
          <Button target="_blank" rel="noopener" size="small" color="primary" href={startupData.companyWebsite}>
              <img
                src={WebsiteLogo}
                alt="Website Logo"
                className={classes.smallIcons}
              />
              Website
            </Button>
            :
          null}
        </CardActions>
      </Card>
    } else {
      return null;
    }});
  }

  //Get StartUp Data
  let getData = () => {
    function onSuccess(response) {
      if(response.val()) {
        const cardArray = Object.entries(response.val());
        setOriginalStartupCards(cardArray);
        setStartupCards(setCards(cardArray));
      }
    }
    get(setStartUpData, 'startups/' , null, onSuccess, true);
  }

  useEffect(getData, []);

  
  const [successBannerFade, setSuccessBannerFade] = useState(false);
  // eslint-disable-next-line
  const [successBannerMessage, setSuccessBannerMessage] = useState("");
  const [errorBannerFade, setErrorBannerFade] = useState(false);
  // eslint-disable-next-line
  const [errorBannerMessage, setErrorBannerMessage] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
        setSuccessBannerFade(false);
    }, 1000);
  
    return () => clearTimeout(timeout);
  }, [successBannerFade]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
        setErrorBannerFade(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [errorBannerFade]);

  if(startUpData.loading) {
    return (
      <div>
        {user.isLoggedIn ? <NavBar /> : <NavBarNotLoggedIn />}
        <LoadingSpinner />
      </div>
    );
  }

  function DialogTitle(props) {
    const classes = useStyles();
    const { onClose, title } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.dialogTitleRoot}>
            <img
              src={FactoryIcon}
              alt="Factory Icon"
              className={classes.icons}
            />
          <Typography variant="h4" noWrap>{title}</Typography>
          {onClose ? (
              <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={onClose}
              >
                  <CloseIcon />
              </IconButton>
          ) : null}
        </MuiDialogTitle>
    );
  }

  function DialogCard() {
    const { 
      id,
      companyName, 
      companyIndustry, 
      companyDescription, 
      companyYoutube, 
      companyLinkedIn,
      companyWebsite,
      companyLocation,
      companyService,
      companyBusinessModel,
      companySalesAndMarketing,
      companyTeamMembers,
      companyTargetCustomer,
      companyFinances,
      companyPrototype,
      companyStartUpWorcester,
      companyAdditionalInformation,
      comments,
    } = currentCardData;

    const[comment, setComment] = useState("");
    
    let commentsList; 
    if(comments) {
      commentsList = Object.entries(comments).sort((a,b) => b[1].date - a[1].date);
    }

    commentsList = commentsList ? commentsList.map(obj => {
      let commentObj = obj[1];
      return <div>
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
    </div>
    }) : null;

    const sendComment = () => {
      db.ref('startups/' + id + '/comments').push({
        name: user.displayName,
        userProfile: user.photoURL,
        date: Date.now(),
        comment,
      }).then(()=> {
        let newComments
        if(!comments) {
          newComments = {[Math.random(99999999)]: {
            name: user.displayName,
            userProfile: user.photoURL,
            date: Date.now(),
            comment,
          }};
        } else {
          newComments = {...comments, [Math.floor(Math.random() * Math.floor(999999999))]: {
          name: user.displayName,
          userProfile: user.photoURL,
          date: Date.now(),
          comment,
          }};
        }
        let newOriginalStartupCards = originalStartupCards.map(obj => {
          if(obj[0] === id) {
            console.log(newComments);
            return [
              obj[0],
              {
                ...obj[1],
                comments: newComments,
              }
            ]
          } else {
            return obj;
          }
        })
        setOriginalStartupCards(newOriginalStartupCards);
        setCurrentCardData({
          ...currentCardData,
          comments: newComments,
        })
      }).catch(() => {

      });
    }

    return (
      <Dialog
        onClose={closeMoreInfoDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        fullWidth={true}
        maxWidth={'md'}
        scroll="body"
      >
        {/*Items are required, we know they exist*/}
        <DialogTitle title={companyName} onClose={closeMoreInfoDialog}/>
        <DialogContent dividers>
            <Typography variant="h5">
            <img
              src={GearsIcon}
              alt="Gears Icon"
              className={classes.sideIcons}
            />
              Industry:
            </Typography>
            <Typography variant="body1">{companyIndustry}</Typography>
        </DialogContent>
        <DialogContent dividers>
          <Typography variant="h5">
            <img
              src={ResumeIcon}
              alt="Resume Icon"
              className={classes.sideIcons}
            />
            Description:
          </Typography>
          <Typography variant="body1">{companyDescription}</Typography>
        </DialogContent>

        {companyYoutube && companyYoutube.trim() ? 
          <DialogContent dividers>
            {youtubeIframe(companyYoutube, true)}
          </DialogContent>
        : null}

        {(companyLinkedIn && companyLinkedIn.trim()) || (companyWebsite && companyWebsite.trim()) ? 
          <DialogContent dividers>
            {companyLinkedIn && companyLinkedIn.trim() ?
              <Button style={{margin: "15px"}} target="_blank" rel="noopener" size="small" color="primary" variant="outlined" href={companyLinkedIn}>
                <img
                  src={LinkedInLogo}
                  alt="LinkedIn Logo"
                  className={classes.dialogIcons}
                />
              </Button>
            : null }
            {companyWebsite && companyWebsite.trim() ?
              <Button style={{margin: "15px"}} target="_blank" rel="noopener" size="small" color="primary" variant="outlined" href={companyWebsite}>
                <img
                  src={WebsiteLogo}
                  alt="Website Logo"
                  className={classes.dialogIcons}
                />
              </Button>
            : null }
          </DialogContent>
        : null }

        {companyLocation && companyLocation.trim() ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={LocationIcon}
                alt="Location Icon"
                className={classes.sideIcons}
              />
              Company Location:
            </Typography>
            <Typography variant="body1">{companyLocation}</Typography>
          </DialogContent>
        : null}

        {companyService && companyService.trim() ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={ProductIcon}
                alt="Product Icon"
                className={classes.sideIcons}
              />
              Produce/Service:
            </Typography>
            <Typography variant="body1">{companyService}</Typography>
          </DialogContent>
        : null}

        {companyBusinessModel && companyBusinessModel.trim() ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={BusinessModel}
                alt="Business Model Icon"
                className={classes.sideIcons}
              />
              Business Model:
            </Typography>
            <Typography variant="body1">{companyBusinessModel}</Typography>
          </DialogContent>
        : null}

        {companySalesAndMarketing && companySalesAndMarketing.trim() ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={SalesAndMarketingIcon}
                alt="Sales and Marketing Icon"
                className={classes.sideIcons}
              />
              Sales and Marketing:
              </Typography>
            <Typography variant="body1">{companySalesAndMarketing}</Typography>
          </DialogContent>
        : null}

        {companyTeamMembers && companyTeamMembers.trim() ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={TeamIcon}
                alt="Team Icon"
                className={classes.sideIcons}
              />
              Team Members:
              </Typography>
            <Typography variant="body1">{companyTeamMembers}</Typography>
          </DialogContent>
        : null}

        {companyTargetCustomer && companyTargetCustomer.trim() ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={CustomerIcon}
                alt="Customer Icon"
                className={classes.sideIcons}
              />
              Target Costumers:
            </Typography>
            <Typography variant="body1">{companyTargetCustomer}</Typography>
          </DialogContent>
        : null}

        {companyFinances && companyFinances.trim() ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={FinanceIcon}
                alt="Finance Icon"
                className={classes.sideIcons}
              />
              Finances:
            </Typography>
            <Typography variant="body1">{companyFinances}</Typography>
          </DialogContent>
        : null}

        {companyPrototype && companyPrototype.trim() ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={PrototypeIcon}
                alt="Prototype Icon"
                className={classes.sideIcons}
              />
              Prototype:</Typography>
            <Typography variant="body1">{companyPrototype}</Typography>
          </DialogContent>
        : null}

        {htmlToText(companyStartUpWorcester) && htmlToText(companyStartUpWorcester).trim().length !== 0 ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={StartUpIcon}
                alt="Startup Worcester Icon"
                className={classes.sideIcons}
              />
              StartUp Worcester Information:
            </Typography>
            {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(companyStartUpWorcester) }}/>}
          </DialogContent>
        : null}

        {htmlToText(companyAdditionalInformation) && htmlToText(companyAdditionalInformation).trim().length !== 0  ? 
          <DialogContent dividers>
            <Typography variant="h5">
              <img
                src={AdditionalInformationIcon}
                alt="Additional Information Icon"
                className={classes.sideIcons}
              />
              Additional Information:
            </Typography>
            {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(companyAdditionalInformation) }}/>}
          </DialogContent>
        : null}

        <DialogContent dividers>
          <Typography variant="h5">
            <img
              src={CommentsIcon}
              alt="Comments Icon"
              className={classes.sideIcons}
            />
            Comments:
          </Typography>
            <TextField
              label="Comment Box."
              inputProps={{
                maxLength: 500
              }}
              value={comment}
              helperText={`${comment.length}/${500}`}
              onChange={(event) => setComment(event.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth={true}
              multiline
              disabled={!user.isLoggedIn}
            />
            <div style={{marginBottom:'20px'}}>
              <Button
                onClick={sendComment}
                color="primary"
                variant="outlined"
                style={{
                  textTransform: 'unset',
                  width: '200px',
                }}
                disabled={!user.isLoggedIn}
              >
                <img
                  src={UpRightArrow}
                  alt="Up Right Arrow Icon"
                  className={classes.smallIcons}
                />
                <Typography variant="h6">
                  Send
                </Typography>
              </Button>
            </div>
          {commentsList}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={closeMoreInfoDialog}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <div className={classes.container}>

      {user.isLoggedIn ? <NavBar /> : <NavBarNotLoggedIn />}

      <SuccessBanner fade={successBannerFade} successMessage={successBannerMessage} />
      <ErrorBanner fade={errorBannerFade} errorMessage={errorBannerMessage} />

      <DialogCard />

      {/* Dropdown and SearchBar */}
      <Box 
        display="flex"
        className={classes.searchBarContainer}
      >
        <FormControl className={classes.formControl}>
          <NativeSelect
            labelId="dropdownEquationsLabel"
            id="dropdownEquations"
            value={filterType}
            onChange={handleDropdownChange}
            style={{ height: '100%' }}
          >
            <option value={"Name"}>Name</option>
            <option value={"Industry"}>Industry</option>
          </NativeSelect>
        </FormControl>
        <SearchBar
          value={filterString}
          onChange={(newValue) => filterStartUps(newValue)}
          onRequestSearch={() => filterStartUps(filterString)}
          style={{ height: '50px', minWidth: '300px' }}
        />
      </Box>

      <Grid
        container
        alignItems="center"
        alignContent="center"
        direction="row"
        justify="center"
        spacing={3}
        className={classes.grid}
      >
        {startupCards}
      </Grid>

    </div>
  );
}