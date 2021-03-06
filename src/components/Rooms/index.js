import React from 'react';
import axios from 'axios';
import { withRouter, NavLink } from 'react-router-dom';
import io from 'socket.io-client';

import AuthService from '../../services/auth';

import CreateRoom from './CreateRoom';
import RoomCard from './RoomCard';

import './main.css';

class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameRooms: [],
      isDialogOpen: false
    }

    this.authService = new AuthService();
    this.user = this.authService.getProfile();
  }

  componentDidMount() {
    const token = this.authService.token;
    const socket = io(process.env.REACT_APP_API_HOST);

    axios.get('https://ping-pong-main-server.herokuapp.com/api/game-rooms', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        this.setState({ gameRooms: data['gameRooms'] });
      })
      .catch(err => console.log(err));

    socket.on('newGameRoomCreated', newRoom => {
      const newGameRooms = [newRoom, ...this.state.gameRooms];

      this.setState({ gameRooms: newGameRooms });
    })

    socket.on('gameRoomDeleted', room => {
      const index = this.state.gameRooms.findIndex(e => e._id === room._id);

      const newGameRooms = [
        ...this.state.gameRooms.slice(0, index),
        ...this.state.gameRooms.slice(index + 1)
      ];

      this.setState({ gameRooms: newGameRooms });

      if (room.firstPlayer === this.user.sub) {
        localStorage.setItem('room_id', room._id);
        localStorage.setItem('battle_type', room.battleType.name);
        this.props.history.push('/game');
      }
    });
  }

  openDialog = () => {
    this.setState({
      isDialogOpen: true
    });
  }

  closeDialog = () => {
    this.setState({
      isDialogOpen: false
    });
  }

  render() {
    const roomsList = this.state.gameRooms.map(element => (
      <div key={element._id} className="col-4">
        <RoomCard user={this.user} {...element} />
      </div>
    ));

    return (
      <section id="rooms">
        <CreateRoom open={this.state.isDialogOpen} onClose={this.closeDialog} />
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
                  <button className="btn btn-primary" onClick={this.openDialog} name="">
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

export default withRouter(Rooms);
