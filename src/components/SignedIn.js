import React from 'react'
import * as firebase from "firebase/app";
import authContext from '../authentication-context.js'

class SignedIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {signedIn: this.props.signedIn};
  }
  componentWillReceiveProps(nextProps){
    this.setState({signedIn: nextProps.signedIn});
  }
  render(){
    return(
      <div>
        <h1> You are {this.context.signedIn} signed in</h1>
        <p> {JSON.stringify(this.context.user)} </p>
      </div>
    )
  }
}
SignedIn.contextType = authContext;

export default SignedIn;
