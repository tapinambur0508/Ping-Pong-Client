import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';

const Login = Loadable({
  loader: () => import('./components/Login'),
  loading: Loading
});

const Home = Loadable({

});

const Profile = Loadable({

});

class App extends React.Component {
  isLogin() {
    return true;
  }

  render() {
    if (this.isLogin()) {
      return (
        <Switch>
          <Route path="/profile" />
          <Route path="/" component={} />
        </Switch>  
      );
    } else {

    }
  }
}

export default App;
