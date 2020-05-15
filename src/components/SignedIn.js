import React from 'react'
import authContext from '../authentication-context.js'
import Trending from './Trending.js';

class SignedIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {apiResponse: null};
  }
  render(){
    return(
      <div>
        <h1> You are {!this.context.user && <div>not</div>} signed in</h1>
        {this.context.user && <p> Welcome {this.context.user.displayName}! </p> }
        <p> This is all the info we have about you right now:
        {/*<br/> <br/> {JSON.stringify(this.context.user)}*/}
         </p>
         <div style ={{padding: '0vw 13vw 0vw 13vw'}}>
         <Trending duration={4*86400000} />
         </div>
      </div>
    )
  }
}
SignedIn.contextType = authContext;

export default SignedIn;
