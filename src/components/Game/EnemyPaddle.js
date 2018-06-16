import React from 'react';
import { Rect } from 'react-konva';
import withPaddle from './hoc/withPaddle';

class EnemyPaddle extends React.Component {
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