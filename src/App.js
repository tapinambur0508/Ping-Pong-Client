import React from 'react';
import Loadable from 'react-loadable';

import AuthService from './services/auth';

import Loading from './components/Loading';

const Login = Loadable({
  loader: () => import('./components/Login'),
  loading: Loading
});

const Main = Loadable({
  loader: () => import('./Main'),
  loading: Loading
});

const App = () => {
  const isLogin = () => {
    const authService = new AuthService();

    return authService.loggedIn();
  }

  return isLogin() ? <Main /> : <Login />  
}

export default App;
