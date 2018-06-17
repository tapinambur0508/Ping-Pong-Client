import React from 'react';
import { Rect } from 'react-konva';
import withPaddle from './hoc/withPaddle';

class MyPaddle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      up: false,
      down: false
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', event => {
      if (event.keyCode === 38) {
        this.setState({ up: true });
      } else if (event.keyCode === 40) {
        this.setState({ down: true });
      }
    }, false);

    window.addEventListener('keyup', event => {
      if (event.keyCode === 38) {
        this.setState({ up: false });
      } else if (event.keyCode === 40) {
        this.setState({ down: false });
      }
    }, false);

    this.loop();
  }

  loop = () => {
    if (this.state.up && this.props.y > 0) {
      this.props.update(this.props.y - this.props.speed);
    } else if (this.state.down && this.props.y <= (this.props.windowHeight - this.props.height)) {
      this.props.update(this.props.y + this.props.speed);
    }

    this.props.socket.emit('rackedMooved', {
      y_coordinate: this.props.y,
      userID: this.props.user.sub
    });

    requestAnimationFrame(this.loop);
  }

  render = () => (
    <Rect
      x={this.props.x}
      y={this.props.y}
      width={this.props.width}
      height={this.props.height}
      fill="#ffffff" />
  );
}

export default withPaddle(MyPaddle);
