import React from 'react'
import authContext from '../authentication-context.js'
import Trending from './Trending.js';

class SignedIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {apiResponse: null};
  }
  callAPI() {
    fetch("https://us-central1-simp-nation.cloudfunctions.net/simpAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentDidMount() {
    this.callAPI();
}
  render(){
    return(
      <div>
        <h1> You are {!this.context.user && <div>not</div>} signed in</h1>
        {this.context.user && <p> Welcome {this.context.user.displayName}! </p> }
        {this.state.apiResponse && <h2> This is the api response: {this.state.apiResponse} </h2>}
        <p> This is all the info we have about you right now:
        <br/> <br/> {JSON.stringify(this.context.user)}
         </p>
         <Trending duration={86400000} />
      </div>
    )
  }
}
SignedIn.contextType = authContext;

export default SignedIn;
