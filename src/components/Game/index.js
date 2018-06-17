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
      width: 1000,
      height: 480
    }

    this.authService = new AuthService();
    this.user = this.authService.getProfile();
    this.socket = io(process.env.REACT_APP_API_GAME_HOST);
  }

  componentDidMount() {
    const roomId = localStorage.getItem('room_id') || '';

    this.socket.emit('joinRoom', { roomID: roomId, userID: this.user.sub });

    window.addEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown = event => {
    if (event.keyCode === 32) {
      this.socket.emit('play', this.user.sub);
    }
  }

  render = () => (
    <Court
      width={this.state.width}
      height={this.state.height}>
      <MyPaddle
        user={this.user}
        socket={this.socket}
        windowWidth={this.state.width}
        windowHeight={this.state.height} />
      <Ball
        user={this.user}
        socket={this.socket}
        windowWidth={this.state.width}
        windowHeight={this.state.height} />
      <EnemyPaddle
        socket={this.socket}
        windowWidth={this.state.width}
        windowHeight={this.state.height} />
    </Court>
  );
}

export default Game;
