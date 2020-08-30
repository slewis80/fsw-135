import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Auth from './components/Auth.js';
import Profile from './components/Profile.js';
import IssuesPage from './components/IssuesPage.js';
import Navbar from './components/Navbar.js';
import {UserContext} from './context/UserProvider.js';
import {IssueContext} from './context/IssueProvider.js';
import MyStuff from './components/MyStuff.js';


function App() {
const { token, logout, userAxios } = useContext(UserContext)
const { addComment, comments } = useContext(IssueContext)

  return (
    <div className="App">
      <Navbar logout={logout} />
      <Switch>
        <Route
          exact path="/" render={() => token ? <Redirect to="/profile" /> : <Auth />} />
        <Route
          path="/profile" render={() => <Profile />} />
        <Route
          path="/issues" render={() => <IssuesPage 
              addComment={addComment}/>} />
        <Route
          path="/mystuff" render={() => <MyStuff userAxios={userAxios} />} />
      </Switch>
    </div>
  );
}

export default App;
