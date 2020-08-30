import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './styles.css';
import App from './App';
import UserProvider from './context/UserProvider.js';
import IssueProvider from './context/IssueProvider';


ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <IssueProvider>
        <App />
      </IssueProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

