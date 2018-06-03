import React from 'react';
import axios from 'axios';
import NavLink from 'react-router-dom/NavLink';

import AuthService from '../../services/auth';

import RoomCard from './RoomCard';

import './main.css';

class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    }

    this.authService = new AuthService();
  }

  componentDidMount() {
    const token = this.authService.token;

    axios({
      method: 'GET',
      url: 'https://ping-pong-main-server.herokuapp.com/api/game-rooms ',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(({ data }) => {

      })
      .catch(err => console.log(err));
  }

  render() {
    const roomsList = this.state.rooms.map(element => (
      <div className="col-4">
        <RoomCard key={element._id} {...element} />
      </div>
    ));

    return (
      <section id="rooms">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <div className="dashhead">
                <div className="dashhead-titles">
                  <h2>
                    Game Rooms
                  </h2>
                </div>
                <div className="dashhead-toolbar">
                  <button className="btn btn-primary">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {roomsList}
              </div>
            </div>
            <div className="card-footer">
              <NavLink to="/" className="btn btn-dark">
                <i className="fas fa-arrow-left mr-2"></i>Back
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Rooms;
