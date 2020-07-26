import React from 'react';

const Home = (props) => {
    const { authState, userInfo } = props;
    return <div>
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
        </>
      )}
    </div>
}

export default Home;