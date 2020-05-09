import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage.js'
import HomePage from './components/HomePage.js'
import SignedIn from './components/SignedIn.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import authContext from './authentication-context.js';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={ user: null};
  }
componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user})
      }
    })
  }
  render(){
    return (
      <Router>
    <div>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signedIn">
          <authContext.Provider value={this.state}>
            <SignedIn />
          </authContext.Provider>
        </Route>
        {/*<Route path="/signedIn" render={ (props)=> <authContext.Provider value ={this.state}> <SignedIn {...props} /> </authContext.Provider> } />*/}
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  </Router>
    );
  }
}

export default App;
