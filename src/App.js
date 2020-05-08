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

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={signedIn:false};
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      this.setState({signedIn:true});
      alert('user signed in');
    } else {
      this.setState({signedIn:false});
      alert('user not signed in');
    }
  });
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
          <SignedIn signedIn = {this.state.signedIn} />
        </Route>
         <Route path="/">
           <HomePage/>
         </Route>
       </Switch>
     </div>
   </Router>
    );
  }
}

export default App;
