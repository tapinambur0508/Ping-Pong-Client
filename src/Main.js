import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loading from './components/Loading';

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading: Loading
});

const Rooms = Loadable({
  loader: () => import('./components/Rooms'),
  loading: Loading
});

const Profile = Loadable({
  loader: () => import('./components/Profile'),
  loading: Loading
});

const Game = Loadable({
  loader: () => import('./components/Game'),
  loading: Loading
});

export default () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/start-game" component={Rooms} />
    <Route path="/profile" component={Profile} />
    <Route path="/game" component={Game} />
    <Redirect from="*" to="/" />
  </Switch>
);
