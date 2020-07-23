import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Routes from './Routing';
import { LoginCallback, SecureRoute } from '@okta/okta-react';
import { useOktaAuth } from '@okta/okta-react';
import './App.css';

const CALLBACK_PATH = '/implicit/callback';

function App() {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   if (!authState.isAuthenticated) {
  //     authService.login('/');
  //   }
  // }, []);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
        console.log(authState)
      });
    }
  }, [authState, authService]);

  const login = () => {
    authService.login('/');
  };

  return (
    <div className='App'>
      <Route path={CALLBACK_PATH} component={LoginCallback} />

      {authState.isAuthenticated && !userInfo && (
        <div>Loading user information...</div>
      )}
      {authState.isAuthenticated && userInfo && (
        <>
          <div>
            <p>
              Welcome back,
              {userInfo.name}!
            </p>{' '}
          </div>
          <Switch>
            {Routes.map((route) => (
              <SecureRoute
                exact
                path={route.path}
                component={route.component}
              ></SecureRoute>
            ))}
            <Redirect from='/' to='home' />
          </Switch>
        </>
      )}
      {!authState.isAuthenticated && (
        <button id='login-button' primary onClick={login}>
          Login
        </button>
      )}
    </div>
  );
}

export default App;
