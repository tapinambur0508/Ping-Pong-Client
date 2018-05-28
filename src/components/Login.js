import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

import config from '../config.json';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    };
  }


  facebookResponse = response => {
    axios.post('https://ping-pong-main-server.herokuapp.com/api/oauth/facebook', {
      access_token: response.accessToken
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <FacebookLogin
        appId={config.FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={this.facebookResponse} />
    )
  }
}

export default Login;
