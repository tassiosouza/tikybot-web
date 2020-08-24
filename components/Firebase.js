import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Promisse from 'promise';

const config = {
    apiKey: "AIzaSyCgcG7VIlW_kgkqFpEZi19q7hNLkBFrvlo",
    authDomain: "tikybot-wordpress.firebaseapp.com",
    databaseURL: "https://tikybot-wordpress.firebaseio.com",
    projectId: "tikybot-wordpress",
    storageBucket: '',
    messagingSenderId: "220453585364",
  };

class Firebase {

    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }
    
    doSignInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    isSignedIn() {
        return (this.auth.currentUser != null);
    }

    doSignOut = () => {
        return this.auth.signOut();
    } 

    doPasswordReset = email => {
        return this.auth.sendPasswordResetEmail(email);
    }
 
    doPasswordUpdate = password => {
        return this.auth.currentUser.updatePassword(password);
    }

    // *** User API ***
 
    getUser = uid => {
        return this.db.ref(`users/${uid}`);
    }

    getCurrentUser = () => {
        return this.db.ref(`users/${this.auth.currentUser.uid}`);
    }
    
    getUsers = () => {
        return this.db.ref('users');
    }

    isInitialized() {
        return new Promisse(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }
}
   
export default new Firebase();