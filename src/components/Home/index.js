import React, { useState } from 'react';
import { Tikybot } from '../Tikybot'
import firebase from '../Firebase/firebase'
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function HomePage() {
  const [tiktok, setTiktok] = useState("");
  const [password, setPassword] = useState("");
  const tikybot = new Tikybot(firebase);
  const history = useHistory();
  
  if(!firebase.isSignedIn()) {
    history.push(ROUTES.SIGN_IN);
  }

  const handleSubmit = event => {
    tikybot.addCredentials(tiktok, password)
    .then(() => {
      alert("funfed");
    })
    .catch(error => {
      alert("error");
    });

    event.preventDefault();
  }

  const isInvalid =
  tiktok === '' ||
  password === '';

  return (
    <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <form onSubmit={handleSubmit}>
      <input
        name="tiktokName"
        value={tiktok}
        onChange={e => setTiktok(e.target.value)}
        type="text"
        placeholder="Your tiktok username"
      />
      <input
        name="tiktokPassword"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="text"
        placeholder="Your tiktok password"
      />
      <button disabled={isInvalid} type="submit">
        Inform Tiktok Account
      </button>

      {/* {error && <p>{error.message}</p>} */}
    </form>
    </div>
  );
}
 
export default HomePage;