import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../services/firebase";
import get from '../universalHTTPRequests/get';
import { db } from '../services/firebase';

export const UserContext = createContext({isLoggedIn: false})

export default function UserProvider(props) {
  
  const [user, setuser] = useState({isLoggedIn: false});
  // eslint-disable-next-line
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
          if(!response || !response.val()) {
            db.ref('users').push({
              name: displayName,
              email: email,
              photoURL: photoURL,
            })
          } else {
            //no matches with email (Email is unique), add new user
            if(Object.entries(response.val()).filter(userObj => email === userObj[1].email).length === 0) {
              db.ref('users').push({
                name: displayName,
                email: email,
                photoURL: photoURL,
              })
            }
          }
        }

        setuser({
          isLoggedIn: true,
          displayName,
          email,
          photoURL
        })
        get(setGetUser, 'users', null, onSuccess, true);
      } else {
        setuser({isLoggedIn: false});
      }
    })
  },[])

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}
