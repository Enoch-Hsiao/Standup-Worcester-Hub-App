import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  Switch,
  Typography,
  Container,
  TextField,
  Button,
} from '@material-ui/core';
import NavBar from '../components/NavBar';
import { useHistory } from "react-router-dom";
import Copyright from '../components/Copyright';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import getYoutubeID from '../functions/getYoutubeID';
import get from '../universalHTTPRequests/get';
import { db } from '../services/firebase';
import SaveIcon from '../Images/SaveIcon.png';
import SuccessBanner from '../components/SuccessBanner';
import ErrorBanner from '../components/ErrorBanner';

const useStyles = makeStyles((theme) => ({
  container: {
      height: '100%',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      flexGrow: 0,
  },
  saveButtonContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  main: {
    marginTop: "10px",
  },
  icons: {
    height: '40px',
    margin: theme.spacing(1),
    marginLeft: '-5px',
    '@media (max-width:677px)': {
      display:'none'
    },
  },
  youtubeVideo: {
    width: 750,
    height: 425,
    marginBottom: "10px",
    '@media (max-width:750px)': {
      width: 510,
      height: 300,
    },
    '@media (max-width:510px)': {
      width: '100%',
      height: '75%',
    },
  },
  button: {
    padding: theme.spacing(1),
    paddingBottom: 0,
    paddingTop: 0,
    minWidth: '200px',
    textTransform: 'unset',
    height: '48px',
  },
  googleText: {
    paddingLeft: '5px',
    textTransform: 'unset',
  },
  buttonText: {
    color: 'black',
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

  // eslint-disable-next-line
  const[startUpData, setStartUpData] = useState({
    data: null,
    loading: true,
    error: null,
    }
  )

  const [values, setValues] = useState({
    public: false,
    companyName: "",
    companyIndustry: "",
    companyDescription: "",
    companyYoutube: "",
    companyLinkedIn: "",
    companyWebsite:"",
    companyService: "",
    companyBusinessModel: "",
    companySalesAndMarketing: "",
    companyTeamMembers: "",
    companyTargetCustomer: "",
    companyFinances: "",
    companyPrototype: "",
    companyStartUpWorcester: "",
    companyAdditionalInformation: "",
  });

  const [startUpWorcester, setStartUpWorcester] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");

  //Get StartUp Data
  let getData = () => {
    function onSuccess(response) {
      if(response.val()) {
        setValues(response.val());
        setStartUpWorcester(response.val().companyStartUpWorcester);
        setAdditionalInformation(response.val().companyAdditionalInformation);
      }
    }
    get(setStartUpData, 'startups/' + user.startupID , null, onSuccess, true);
  }

  useEffect(getData, []);

  const [errorPublic, setErrorPublic] = useState(false);

  const handleChange = key => event => {
    if(key === "companyAdditionalInformation") {
      setAdditionalInformation(event);
    } else if (key === "companyStartUpWorcester") {
      setStartUpWorcester(event)
    } else if (key === "public") {
      if(event.target.checked) {
        //At least 1 required field is not filled in
          if ((!values.companyName || !values.companyName.trim()) || 
              (!values.companyIndustry || !values.companyIndustry.trim()) ||
              (!values.companyDescription || !values.companyDescription.trim())) {
            setErrorPublic(true);
        } else {
            setErrorPublic(false);
            setValues({ ...values, [key]: event.target.checked });
        }
      } else {
        setValues({ ...values, [key]: event.target.checked });
      }
    } else {
      setValues({ ...values, [key]: event.target.value });
    }
  };

  const youtubeIframe = (url) => {
    const videoId = getYoutubeID(url);
    return <Container component="main" maxWidth='lg' className={classes.youtubeVideo}>
            <iframe 
              title="company youtube video" 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${videoId}`} 
              frameBorder="0" allowFullScreen>
            </iframe>
          </Container>;
  }

  const [successBannerFade, setSuccessBannerFade] = useState(false);
  const [successBannerMessage, setSuccessBannerMessage] = useState("");
  const [errorBannerFade, setErrorBannerFade] = useState(false);
  const [errorBannerMessage, setErrorBannerMessage] = useState("");

  const saveValues = () => {
    let newValues = values;
    newValues.companyStartUpWorcester = startUpWorcester;
    newValues.companyAdditionalInformation = additionalInformation;
    db.ref('startups/' + user.startupID).set(newValues)
    .then(() => {
      setValues({...values, companyStartUpWorcester: startUpWorcester, companyAdditionalInformation: additionalInformation})
      setSuccessBannerFade(true);
      setSuccessBannerMessage('Successfully Saved!');
    })
    .catch(() => {
      setErrorBannerFade(true);
      setErrorBannerMessage('Save Failed! Please try again!');
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
        setSuccessBannerFade(false);
    }, 1000);

    return () => clearTimeout(timeout);
}, [successBannerFade]);

  const SaveButton = () =>
    <span style={{marginRight: "10px"}}>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={saveValues}
      >
        <img
          src={SaveIcon}
          alt="Computer Logo"
          className={classes.icons}
        />
        <Typography
            className={classes.buttonText}
            variant="h5"
            noWrap
        >
            Save
        </Typography>
      </Button>
    </span>

  return (
      <div className={classes.container}>
        <SuccessBanner fade={successBannerFade} successMessage={successBannerMessage} />
        <ErrorBanner fade={errorBannerFade} errorMessage={errorBannerMessage} />
        <NavBar />
        <Container component="main" className={classes.main}>

          <Typography variant="h4">
              Display your Startup to the Worcester community! 
          </Typography >
          <Typography variant="body2">
              * textfields will on the front of the Startup card.
          </Typography >
          <div style={{display: "block"}}>
            <Typography variant="body2" color="error" display="inline">
              {'* '}
            </Typography >
            <Typography variant="body2" color="textPrimary" display="inline">
              textfields must be filled in in order for Startup to be public to the community.
            </Typography >
          </div>
          <Typography variant="body2">
              Fields left blank or without characters will not show up in final display.
          </Typography >
          <div className={classes.main}> 
            <SaveButton />

            <FormControlLabel
              control={
                <Switch
                  checked={values.public}
                  onChange={handleChange("public")}
                  name="public"
                  color="primary"
                />
              }
              label="Public"
            />
            {errorPublic ? 
              <Typography variant="body1" color="error" style={{marginTop: '2px'}}>
                At least one required field has not been filled in.
              </Typography > 
              : null 
            }
          </div>
          
          <div className={classes.main}> 
            <div style={{display: "block"}}>
              <Typography variant="h5" display="inline" noWrap>
                Company Name: 
              </Typography >
              <Typography variant="h5" display="inline" color="error" noWrap>
                *
              </Typography >
            </div>
            <TextField
              label="Enter your company name."
              inputProps={{
                maxLength: 100
              }}
              value={values.companyName}
              helperText={`${values.companyName.length}/${100}`}
              onChange={handleChange("companyName")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <div style={{display: "block"}}>
              <Typography variant="h5" display="inline" noWrap>
                Company Industry: 
              </Typography >
              <Typography variant="h5" display="inline" color="error" noWrap>
                *
              </Typography >
            </div>
            <TextField
              label="Enter your company industry."
              inputProps={{
                maxLength: 50
              }}
              value={values.companyIndustry}
              helperText={`${values.companyIndustry.length}/${50}`}
              onChange={handleChange("companyIndustry")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <div style={{display: "block"}}>
              <Typography variant="h5" display="inline" noWrap>
                Company Description: 
              </Typography >
              <Typography variant="h5" display="inline" color="error" noWrap>
                *
              </Typography >
            </div>
            <TextField
              label="Provide a short company description."
              inputProps={{
                maxLength: 500
              }}
              value={values.companyDescription}
              helperText={`${values.companyDescription.length}/${500}`}
              onChange={handleChange("companyDescription")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
              multiline={true}
            />

            <Typography variant="h5" noWrap>
              Youtube Video Link*
            </Typography >
            <Typography variant="body2">
              If youtube video does not work, that means the link is invalid.
            </Typography >
            <TextField
              label="Youtube Video Link."
              inputProps={{
                maxLength: 100
              }}
              value={values.companyYoutube}
              helperText={`${values.companyYoutube.length}/${100}`}
              onChange={handleChange("companyYoutube")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            {youtubeIframe(values.companyYoutube)}
            <Typography variant="h5" noWrap>
              LinkedIn Profile Link*
            </Typography >
            <Typography variant="body2">
              LinkedIn profile link (if applicable) of founder and/or company and/or partners:
            </Typography >
            <TextField
              label="Enter LinkedIn Profile Link."
              inputProps={{
                maxLength: 100
              }}
              value={values.companyLinkedIn}
              helperText={`${values.companyLinkedIn.length}/${100}`}
              onChange={handleChange("companyLinkedIn")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <Typography variant="h5" noWrap>
              Company Website Link*
            </Typography >
            <TextField
              label="Enter Company Website."
              inputProps={{
                maxLength: 100
              }}
              value={values.companyWebsite}
              helperText={`${values.companyWebsite.length}/${100}`}
              onChange={handleChange("companyWebsite")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <Typography variant="h5" noWrap>
              Product or Service Provided:
            </Typography >
            <TextField
              label="Provide a short description of the product or service provided."
              inputProps={{
                maxLength: 1000
              }}
              value={values.companyService}
              helperText={`${values.companyService.length}/${1000}`}
              onChange={handleChange("companyService")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <Typography variant="h5" noWrap>
              Business Model:
            </Typography >
            <TextField
              label="Provide a short description of the business model."
              inputProps={{
                maxLength: 1000
              }}
              value={values.companyBusinessModel}
              helperText={`${values.companyBusinessModel.length}/${1000}`}
              onChange={handleChange("companyBusinessModel")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <Typography variant="h5" noWrap>
              Sales and Marketing:
            </Typography >
            <TextField
              label="Provide a short description of your sales and marketing strategy."
              inputProps={{
                maxLength: 1000
              }}
              value={values.companySalesAndMarketing}
              helperText={`${values.companySalesAndMarketing.length}/${1000}`}
              onChange={handleChange("companySalesAndMarketing")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />

            <Typography variant="h5" noWrap>
              Team Members:
            </Typography >
            <Typography variant="body2">
              You should include advisors and their contact information.  If your team includes other students or graduates, include their institution, graduation year and major.
            </Typography >
            <TextField
              label="List your team members."
              inputProps={{
                maxLength: 1000
              }}
              value={values.companyTeamMembers}
              helperText={`${values.companyTeamMembers.length}/${1000}`}
              onChange={handleChange("companyTeamMembers")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />  

            <Typography variant="h5" noWrap>
              Target Customer:
            </Typography >
            <Typography variant="body2">
              Describe your target customer in terms of sector, value they see in your product, and what their buying behavior is.
            </Typography >
            <TextField
              label="Provide a short description of your target customer."
              inputProps={{
                maxLength: 1000
              }}
              value={values.companyTargetCustomer}
              helperText={`${values.companyTargetCustomer.length}/${1000}`}
              onChange={handleChange("companyTargetCustomer")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />  

            <Typography variant="h5" noWrap>
              Finances:
            </Typography >
            <Typography variant="body2">
              List the sales, funding or investments have you been awarded so far.
            </Typography >
            <TextField
              label="Provide a short description of your finances."
              inputProps={{
                maxLength: 1000
              }}
              value={values.companyFinances}
              helperText={`${values.companyFinances.length}/${1000}`}
              onChange={handleChange("companyFinances")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            /> 

            <Typography variant="h5" noWrap>
              Prototype:
            </Typography >
            <TextField
              label="Describe your working prototype."
              inputProps={{
                maxLength: 1000
              }}
              value={values.companyPrototype}
              helperText={`${values.companyPrototype.length}/${1000}`}
              onChange={handleChange("companyPrototype")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            /> 
          </div>

          <div className={classes.main}> 
          <Typography variant="h5">
            StartUp Worcester Program (if applicable).
          </Typography >
          <Typography variant="body2">
            Provide answers to the following requirements:
          </Typography >
          <Typography variant="body2">
            1. Brief Bio of applicant (Name, phone number, email, college or university, year of graduation, degree and major), Include where you are from, what brought you to Worcester if you aren't from here, and what interests you about starting your own company.
          </Typography >
          <Typography variant="body2">
            2. How did you hear about StartUp Worcester? Please be specific. If it was social media, please say whose account (if you remember!)
          </Typography >
          <Typography variant="body2">
            3. What would being a StartUp Worcester member mean to your company? 
          </Typography >
          <SunEditor
                setContents={values.companyStartUpWorcester}
                setOptions={{
                    width: '100%',
                    height: 600,
                    placeholder: 'Enter body of component...',
                    buttonList: [
                        ['font', 'fontSize', 'formatBlock'],
                        ['paragraphStyle', 'blockquote'],
                        [
                            'bold',
                            'underline',
                            'italic',
                            'strike',
                            'subscript',
                            'superscript',
                        ],
                        ['fontColor', 'hiliteColor', 'textStyle'],
                        '/', // Line break
                        ['undo', 'redo'],
                        ['removeFormat'],
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image', 'video', 'audio'],
                        ['fullScreen', 'showBlocks', 'codeView'],
                        ['preview'],
                        // (min-width: 1000px)
                        [
                            '%1000',
                            [
                                ['undo', 'redo'],
                                [
                                    ':p-More Paragraph-default.more_paragraph',
                                    'font',
                                    'fontSize',
                                    'formatBlock',
                                    'paragraphStyle',
                                    'blockquote',
                                ],
                                ['bold', 'underline', 'italic', 'strike'],
                                [
                                    ':t-More Text-default.more_text',
                                    'subscript',
                                    'superscript',
                                    'fontColor',
                                    'hiliteColor',
                                    'textStyle',
                                ],
                                ['removeFormat'],
                                ['outdent', 'indent'],
                                [
                                    ':e-More Line-default.more_horizontal',
                                    'align',
                                    'horizontalRule',
                                    'list',
                                    'lineHeight',
                                ],
                                [
                                    '-right',
                                    ':i-More Misc-default.more_vertical',
                                    'fullScreen',
                                    'showBlocks',
                                    'codeView',
                                    'preview',
                                ],
                                [
                                    '-right',
                                    ':r-More Rich-default.more_plus',
                                    'table',
                                    'link',
                                    'image',
                                    'video',
                                    'audio',
                                ],
                            ],
                        ],
                        // (min-width: 875px)
                        [
                            '%875',
                            [
                                ['undo', 'redo'],
                                [
                                    ':p-More Paragraph-default.more_paragraph',
                                    'font',
                                    'fontSize',
                                    'formatBlock',
                                    'paragraphStyle',
                                    'blockquote',
                                ],
                                [
                                    ':t-More Text-default.more_text',
                                    'bold',
                                    'underline',
                                    'italic',
                                    'strike',
                                    'subscript',
                                    'superscript',
                                    'fontColor',
                                    'hiliteColor',
                                    'textStyle',
                                    'removeFormat',
                                ],
                                [
                                    ':e-More Line-default.more_horizontal',
                                    'outdent',
                                    'indent',
                                    'align',
                                    'horizontalRule',
                                    'list',
                                    'lineHeight',
                                ],
                                [
                                    ':r-More Rich-default.more_plus',
                                    'table',
                                    'link',
                                    'image',
                                    'video',
                                    'audio',
                                ],
                                [
                                    '-right',
                                    ':i-More Misc-default.more_vertical',
                                    'fullScreen',
                                    'showBlocks',
                                    'codeView',
                                    'preview',
                                ],
                            ],
                        ],
                    ],
                }}
                onChange={handleChange("companyStartUpWorcester")}
            />
          </div>

          <div className={classes.main}> 
            <Typography variant="h5">
              Additional Information (Contact Info):
            </Typography >
            <SunEditor
                  setContents={values.companyAdditionalInformation}
                  setOptions={{
                      width: '100%',
                      height: 600,
                      placeholder: 'Enter body of component...',
                      buttonList: [
                          ['font', 'fontSize', 'formatBlock'],
                          ['paragraphStyle', 'blockquote'],
                          [
                              'bold',
                              'underline',
                              'italic',
                              'strike',
                              'subscript',
                              'superscript',
                          ],
                          ['fontColor', 'hiliteColor', 'textStyle'],
                          '/', // Line break
                          ['undo', 'redo'],
                          ['removeFormat'],
                          ['outdent', 'indent'],
                          ['align', 'horizontalRule', 'list', 'lineHeight'],
                          ['table', 'link', 'image', 'video', 'audio'],
                          ['fullScreen', 'showBlocks', 'codeView'],
                          ['preview'],
                          // (min-width: 1000px)
                          [
                              '%1000',
                              [
                                  ['undo', 'redo'],
                                  [
                                      ':p-More Paragraph-default.more_paragraph',
                                      'font',
                                      'fontSize',
                                      'formatBlock',
                                      'paragraphStyle',
                                      'blockquote',
                                  ],
                                  ['bold', 'underline', 'italic', 'strike'],
                                  [
                                      ':t-More Text-default.more_text',
                                      'subscript',
                                      'superscript',
                                      'fontColor',
                                      'hiliteColor',
                                      'textStyle',
                                  ],
                                  ['removeFormat'],
                                  ['outdent', 'indent'],
                                  [
                                      ':e-More Line-default.more_horizontal',
                                      'align',
                                      'horizontalRule',
                                      'list',
                                      'lineHeight',
                                  ],
                                  [
                                      '-right',
                                      ':i-More Misc-default.more_vertical',
                                      'fullScreen',
                                      'showBlocks',
                                      'codeView',
                                      'preview',
                                  ],
                                  [
                                      '-right',
                                      ':r-More Rich-default.more_plus',
                                      'table',
                                      'link',
                                      'image',
                                      'video',
                                      'audio',
                                  ],
                              ],
                          ],
                          // (min-width: 875px)
                          [
                              '%875',
                              [
                                  ['undo', 'redo'],
                                  [
                                      ':p-More Paragraph-default.more_paragraph',
                                      'font',
                                      'fontSize',
                                      'formatBlock',
                                      'paragraphStyle',
                                      'blockquote',
                                  ],
                                  [
                                      ':t-More Text-default.more_text',
                                      'bold',
                                      'underline',
                                      'italic',
                                      'strike',
                                      'subscript',
                                      'superscript',
                                      'fontColor',
                                      'hiliteColor',
                                      'textStyle',
                                      'removeFormat',
                                  ],
                                  [
                                      ':e-More Line-default.more_horizontal',
                                      'outdent',
                                      'indent',
                                      'align',
                                      'horizontalRule',
                                      'list',
                                      'lineHeight',
                                  ],
                                  [
                                      ':r-More Rich-default.more_plus',
                                      'table',
                                      'link',
                                      'image',
                                      'video',
                                      'audio',
                                  ],
                                  [
                                      '-right',
                                      ':i-More Misc-default.more_vertical',
                                      'fullScreen',
                                      'showBlocks',
                                      'codeView',
                                      'preview',
                                  ],
                              ],
                          ],
                      ],
                  }}
                  onChange={handleChange("companyAdditionalInformation")}
                />
              </div>

              <div className={classes.saveButtonContainer}>
                <SaveButton />
              </div>

              <div className={classes.copyright}>
                <Copyright/>
              </div>

            </Container >
          </div>
  );
}