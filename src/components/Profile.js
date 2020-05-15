import React from 'react'
import anonIcon from './anonIcon.png'

class Profile extends React.Component{

  render(){
    return(
      <img src = {anonIcon} alt = {'profile pic'} style = {{width: this.props.width, height: this.props.height, margin: 0, padding: 0}} />
    )
  }
}
export default Profile;
