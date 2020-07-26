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

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
        console.log(authState);
      });
    }
  }, [authState, authService]);

  return (
    <div className='App'>
      <Switch>
        {Routes.map((route) => (
          <SecureRoute
            exact
            path={route.path}
            component={() => (
              <route.component authState={authState} userInfo={userInfo} />
            )}
          ></SecureRoute>
        ))}
        <Redirect exact from='/' to='home' />
        <Route path={CALLBACK_PATH} component={LoginCallback} />
      </Switch>
    </div>
  );
}

export default App;
