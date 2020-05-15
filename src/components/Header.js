import React from 'react'
import Profile from './Profile.js'

class Header extends React.Component{
  render(){
    return(
      <div style = {{height: '65px', backgroundColor: 'pink', fontFamily: 'Orbitron',
       fontSize: '40px', padding: '20px 0px 0px 20px', display: 'flex', justifyContent: 'space-between'}}>
        <div>Share Nation</div>
        <div style = {{paddingRight: '10px'}}>< Profile width = {'40px'} height = {'40px'} /></div>
      </div>
    );
  }
}

export default Header;
