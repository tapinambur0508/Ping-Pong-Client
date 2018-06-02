import React from 'react';
import NavLink from 'react-router-dom/NavLink';

import './Home.css';

export default () => (
  <section id="home">
    <div className="container">
      <div className="wrapper">
        <h1 className="heading">Ping-Pong</h1>
        <nav>
          <NavLink to="/start-game" className="btn btn-success btn-block">
            <i className="fas fa-play mr-2"></i>Start Game
            </NavLink>
          <NavLink to="/profile" className="btn btn-info btn-block">
            <i class="far fa-user-circle mr-2"></i>Profile
          </NavLink>
        </nav>
      </div>
    </div>
  </section>
);
