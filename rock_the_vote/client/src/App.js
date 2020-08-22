import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth.js';
import Profile from './components/Profile.js';
import Issues from './components/Issues.js';
import Comments from './components/Comments.js';
import Navbar from './components/Navbar.js';
import {UserContext} from './context/UserProvider.js';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route
          exact path="/" render={() => <Auth />} />
        <Route
          path="/profile" render={() => <Profile />} />
        <Route
          path="/issues" render={() => <Issues />} />
        <Route
          path="/comments" render={() => <Comments />} />
      </Switch>
    </div>
  );
}

export default App;
