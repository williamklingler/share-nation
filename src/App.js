import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage.js';
import HomePage from './components/HomePage.js';
import SignedIn from './components/SignedIn.js';
import Header from './components/Header.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import authContext from './authentication-context.js';
import firebase from './firebaseConfig';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={ user: null};
  }
componentDidMount() {
  this.firebaseListener = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        user: user
      });
      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        this.setState({userIDToken: idToken});
      }).catch(function(error) {
        console.log(error);
      });
    }
  })
}
  componentWillUnmount(){
    this.fireBaseListener && this.fireBaseListener();
  }
  render(){
    return (
      <div>
      <Header />
      <Router>
    <div>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signedIn">
          <authContext.Provider value={this.state}>
            {this.state.user && <SignedIn />}
          </authContext.Provider>
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  </Router>
  </div>
    );
  }
}

export default App;
