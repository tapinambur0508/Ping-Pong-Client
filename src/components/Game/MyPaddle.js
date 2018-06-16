import React from 'react';
import { Rect } from 'react-konva';
import withPaddle from './hoc/withPaddle';
import io from 'socket.io-client';

import AuthService from '../../services/auth';

class MyPaddle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      up: false,
      down: false
    }

    this.authService = new AuthService();
    this.user = this.authService.getProfile();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, false);
    window.addEventListener('keyup', this.handleKeyUp, false);
    this.loop();
  }

  loop = () => {
    if (this.state.up && this.props.y > 0) {
      this.props.update(this.props.y - this.props.speed);
      const socket = io(process.env.REACT_APP_API_GAME_HOST);
      socket.emit('rackedMooved', { y_coordinate: this.props.y, userID: this.user.sub });
    } else if (this.state.down && this.props.y <= (this.props.windowHeight - this.props.height)) {
      this.props.update(this.props.y + this.props.speed);
      const socket = io(process.env.REACT_APP_API_GAME_HOST);
      socket.emit('rackedMooved', { y_coordinate: this.props.y, userID: this.user.sub });
    }

    requestAnimationFrame(this.loop);
  }

  handleKeyDown = event => {
    if (event.keyCode === 38) {
      this.setState({
        up: true
      });
    } else if (event.keyCode === 40) {
      this.setState({
        down: true
      });
    }
  }

  handleKeyUp = event => {
    if (event.keyCode === 38) {
      this.setState({
        up: false
      });
    } else if (event.keyCode === 40) {
      this.setState({
        down: false
      });
    }
  }

  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill="#ffffff" />
    );
  }
}

export default withPaddle(MyPaddle);
