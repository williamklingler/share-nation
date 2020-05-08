import React from 'react'

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../firebaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

//firebase.initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.
/*var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});*/

/*var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      alert('successfully signed in');
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
};*/

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: 'signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  /*callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }*/
};

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state={username:'', password:'',signedIn: false};
  }
  /*componentDidMount(){
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  submitUserPass = (event) =>{
    event.preventDefault();
    alert('You submitted');
  }
  updateUserPass = (event) =>{
    if(event.target.title == 'password'){
      this.setState({password: event.target.value});
    }
    else{
      this.setState({username: event.target.value});
    }
  }*/

  render() {
    return (
<div>
  {/*<h1>
    Login page
  </h1>
  <div>
    <h2>Login to your account</h2>
    <form onSubmit={this.submitUserPass}>
      <input type="text" title="username" onChange={this.updateUserPass} placeholder="username" />
      <input type="password" title="password" onChange={this.updateUserPass} placeholder="password" />
      <button type="submit">Login</button>
    </form>
    <p> {this.state.username} </p>
    <p> {this.state.password} </p>
  </div>
  <div id="firebaseui-auth-container"></div>
  <div id="loader">Loading...</div>*/}
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
</div> )
  }
}

export default LoginPage;
