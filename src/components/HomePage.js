import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class HomePage extends React.Component {
  render() {
    return (
      <div>
      <h1> Welcome to Share Nation </h1>
      <p> we will fulfill all of your simping needs </p>
        <li>
            <Link to="/login">Login</Link>
        </li>
      </div>
    )
  }
}

export default HomePage;
