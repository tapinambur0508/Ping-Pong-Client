import React from 'react';
import { Rect } from 'react-konva';
import withPaddle from './hoc/withPaddle';
import io from 'socket.io-client';

class EnemyPaddle extends React.Component {
  componentDidMount() {
    const socket = io(process.env.REACT_APP_API_GAME_HOST);

    socket.on('enemyMovedRacket', y => {
      console.log(y);
      this.props.update(y);
    });
  }

  render() {
    return (
      <Rect
        x={this.props.windowWidth - this.props.width - this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill="#ffffff" />
    );
  }
}

export default withPaddle(EnemyPaddle);