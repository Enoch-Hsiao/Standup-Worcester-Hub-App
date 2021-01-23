import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../services/firebase";
import get from '../universalHTTPRequests/get';
import { db } from '../services/firebase';
import LoadingSpinner from '../components/LoadingSpinner';

export const UserContext = createContext({isLoggedIn: false})

export default function UserProvider(props) {
  
  const [user, setuser] = useState({isLoggedIn: false});

  const [getUser, setGetUser] = useState({
    data: null,
    loading: false,
    error: null,
  })

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {

      if(user) {
        const { displayName, email, photoURL }  = user;

        function onSuccess(response) {
          //No users
          if(!response || !response.val()) {
            db.ref('startups').push({
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
            }).then((snapshot) => {
              db.ref('users').push({
                name: displayName,
                email: email,
                photoURL: photoURL,
                startupID: snapshot.key,
              })
              setuser({
                isLoggedIn: true,
                displayName,
                email,
                photoURL,
                startupID: snapshot.key,
              })
            });
          } else if(Object.entries(response.val()).filter(userObj => email === userObj[1].email).length === 0)  {
            //no matches with email (Email is unique), add new user and startup page 
            db.ref('startups').push({
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
            }).then((snapshot) => {
              db.ref('users').push({
                name: displayName,
                email: email,
                photoURL: photoURL,
                startupID: snapshot.key,
              })
              setuser({
                isLoggedIn: true,
                displayName,
                email,
                photoURL,
                startupID: snapshot.key,
              })
            });  
          } else {
            //user exists
            setuser({
              isLoggedIn: true,
              displayName,
              email,
              photoURL,
              startupID: Object.entries(response.val()).filter(userObj => email === userObj[1].email)[0][1].startupID,
            })
          }
        }

        get(setGetUser, 'users', null, onSuccess, true);
      } else {
        setuser({isLoggedIn: false});
      }
    })
  },[])

  if(getUser.loading) {
    return <LoadingSpinner />;
  }

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}
