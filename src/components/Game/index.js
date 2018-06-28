import React from 'react';
import io from 'socket.io-client';

import Ball from './Ball';
import Court from './Court';
import MyPaddle from './MyPaddle';
import EnemyPaddle from './EnemyPaddle';
import Wall from './Wall';

import AuthService from '../../services/auth';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1440,
      height: 720,
      position: 0,
      leftScore: 0,
      rightScore: 0,
      walls: []
    }

    this.authService = new AuthService();
    this.user = this.authService.getProfile();
    this.socket = io(process.env.REACT_APP_API_GAME_HOST);
  }

  componentDidMount() {
    const roomId = localStorage.getItem('room_id') || '';
    const battleType = localStorage.getItem('battle_type') || '';

    this.socket.emit('joinRoom', {
      roomID: roomId,
      userID: this.user.sub,
      battleTypeData: {
        name: battleType,
        walls: battleType === 'classic' ? 0 : 5
      }
    });

    this.socket.on('joined', position => {
      this.setState({ position });
    });

    this.socket.on('gameFinished', () => {
      alert('gameFinished');
    });

    window.addEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown = event => {
    if (event.keyCode === 32) {
      this.socket.emit('play', this.user.sub);
    }
  }

  handleChangeScore = score => {
    this.setState({
      leftScore: score[0].score,
      rightScore: score[1].score
    })
  }

  handleChangeWalls = (walls = []) => {
    this.setState({ walls });
  }

  render() {
    const walls = this.state.walls.map((element, index) => (
      <Wall 
        key={index}
        x={element.pos._x}
        y={element.pos._y} 
        width={element.size._x}
        height={element.size._y} />
    ));

    return (
      <Court
        width={this.state.width}
        height={this.state.height}
        leftScore={this.state.leftScore}
        rightScore={this.state.rightScore}>
        <MyPaddle
          user={this.user}
          socket={this.socket}
          position={this.state.position}
          windowWidth={this.state.width}
          windowHeight={this.state.height} />
        <Ball
          user={this.user}
          socket={this.socket}
          onScore={this.handleChangeScore}
          onWalls={this.handleChangeWalls}
          windowWidth={this.state.width}
          windowHeight={this.state.height} />
        {walls}
        <EnemyPaddle
          socket={this.socket}
          position={this.state.position}
          windowWidth={this.state.width}
          windowHeight={this.state.height} />
      </Court>
    );
  }
}

export default Game;
