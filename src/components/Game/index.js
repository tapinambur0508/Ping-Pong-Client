import React from 'react';

import Ball from './Ball';
import Court from './Court';
import MyPaddle from './MyPaddle';
import EnemyPaddle from './EnemyPaddle';
import io from 'socket.io-client';

import AuthService from '../../services/auth';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.authService = new AuthService();
    this.user = this.authService.getProfile();
  }

  componentDidMount() {
    const socket = io(process.env.REACT_APP_API_GAME_HOST);
    const roomId = localStorage.getItem('room_id') || '';

    socket.emit('joinRoom', { roomID: roomId, userID: this.user.sub });

    window.addEventListener('resize', () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }

  render() {
    return (
        <Court
          width={this.state.width}
          height={this.state.height}>
          <MyPaddle
            windowWidth={this.state.width}
            windowHeight={this.state.height} />
          <Ball
            windowWidth={this.state.width}
            windowHeight={this.state.height} />
          <EnemyPaddle
            windowWidth={this.state.width}
            windowHeight={this.state.height} />
        </Court>
    );
  }
}

export default Game;
