import React from 'react';
import { Circle } from 'react-konva';

class Ball extends React.Component {
  render() {
    return (
      <Circle 
        x={this.props.windowWidth / 2}
        y={this.props.windowHeight / 2}
        radius={12}
        fill="#fdaf07"/>
    );
  }
}

export default Ball;
