'use strict';

const e = React.createElement;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

if(loggingIn){
  const domContainer = document.querySelector('#main');
  ReactDOM.render(e(LoginPage), domContainer);
}
else{
  const domContainer = document.querySelector('#login-page');
  ReactDOM.render(e(MainPage), domContainer);
}
