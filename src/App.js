import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useState, useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import firebase from 'src/components/Firebase'
import LinearProgress from '@material-ui/core/LinearProgress';

const App = () => {
  const routing = useRoutes(routes);
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  })

  return firebaseInitialized !== false ? (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  ) : ( <LinearProgress /> )
};

export default App;
