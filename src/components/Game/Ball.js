import React from 'react';
import { Circle } from 'react-konva';

class Ball extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: this.props.windowWidth / 2,
      y: this.props.windowHeight / 2
    }
  }

  componentDidMount() {
    this.props.socket.on('state', newState => {
      requestAnimationFrame(() => this.setState({
        x: newState.ball.pos._x,
        y: newState.ball.pos._y
      }));
    });
  }

  render = () => (
    <Circle
      x={this.state.x}
      y={this.state.y}
      radius={12}
      fill="#fdaf07" />
  );
}

export default Ball;
