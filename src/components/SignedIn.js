import React from 'react'
import * as firebase from "firebase/app";

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
      <h1> You are {this.state.signedIn} signed in</h1>
    )
  }
}

export default SignedIn;
