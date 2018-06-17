import React from 'react';
import { Rect } from 'react-konva';
import withPaddle from './hoc/withPaddle';

class EnemyPaddle extends React.Component {
  componentDidMount() {
    this.props.socket.on('enemyMovedRacket', y => {
      requestAnimationFrame(() => this.props.update(y - (this.props.height / 2)));
    });
  }

  render() {
    const myX = this.props.position ?
      this.props.x : this.props.windowWidth - this.props.width - this.props.x;

    return (
      <Rect
        x={myX}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill="#000000" />
    );
  }
}

export default withPaddle(EnemyPaddle);