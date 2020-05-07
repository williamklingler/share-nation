import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage.js'
import HomePage from './components/HomePage.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
  render(){
    return (
      <Router>
      <div>
      <Switch>
        <Route path="/login">
          <LoginPage />
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
