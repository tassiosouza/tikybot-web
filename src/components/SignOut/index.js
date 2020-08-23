import React from 'react'; 
import firebase from '../Firebase/firebase';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function SignOutButton () {
  
  const history = useHistory();
  
  return (
    <button type="button" onClick={() => {
      firebase.doSignOut().then(function() {
          history.push(ROUTES.SIGN_IN)
        }).catch(function(error) {
          // An error happened.
          console.log(error);
        });
    }}>
      Sign Out
    </button>
  );
} 
 
export default SignOutButton;