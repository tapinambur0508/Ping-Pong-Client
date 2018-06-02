import React from 'react';
import FacebookLogin from 'react-facebook-login';
import withRouter from 'react-router-dom/withRouter';
import axios from 'axios';

import AuthService from '../services/auth';

import config from '../config.json';

import './Login.css';

const Login = props => {
  const facebookResponse = response => {
    axios({
      method: 'POST',
      url: 'https://ping-pong-main-server.herokuapp.com/api/oauth/facebook',
      data: {
        access_token: response.accessToken
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(({ data }) => {
        const authService = new AuthService();

        authService.token = data['access_token'];
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <section id="login">
      <div className="container">
        <div className="wrapper">
          <h1 className="heading">Ping-Pong</h1>
          <FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            textButton="Continue with Facebook"
            callback={facebookResponse} />
        </div>
      </div>
    </section>
  );
}

export default withRouter(Login);
