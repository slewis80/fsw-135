import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Auth from './components/Auth.js';
import Profile from './components/Profile.js';
import IssuesPage from './components/IssuesPage.js';
import Navbar from './components/Navbar.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import {UserContext} from './context/UserProvider.js';
import {IssueContext} from './context/IssueProvider.js';
import MyStuff from './components/MyStuff.js';


function App() {
const { token, logout, userAxios } = useContext(UserContext)

  return (
    <div className="App">
      <Navbar logout={logout} token={token} />
      <Switch>
        <Route
          exact path="/" render={() => token ? <Redirect to="/profile" /> : <Auth />} />
        <ProtectedRoute
          path="/profile" 
          component={Profile}
          redirectTo="/"
          token={token}
        />
        <Route
          path="/issues" render={() => <IssuesPage userAxios={userAxios} />} />
        <ProtectedRoute
          path="/mystuff" 
          component={MyStuff} 
          userAxios={userAxios} 
          redirectTo="/"
          token={token}
        />
      </Switch>
    </div>
  );
}

export default App;
