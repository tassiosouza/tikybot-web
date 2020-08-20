import React from 'react'; 
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={() => {
    firebase.doSignOut().then(function() {
        // Sign-out successful.
        console.log("successful");
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
  }}>
    Sign Out
  </button>
);
 
export default withFirebase(SignOutButton);