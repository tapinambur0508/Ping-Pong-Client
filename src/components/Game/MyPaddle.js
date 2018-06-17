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
    window.addEventListener('keydown', this.handleKeyDown, false);
    window.addEventListener('keyup', this.handleKeyUp, false);
    this.loop();
  }

  loop = () => {
    const { speed, windowHeight, height } = this.props;

    if (this.state.up && this.props.y > 0) {
      this.props.update(this.props.y - speed);
    } else if (this.state.down && this.props.y < (windowHeight - height)) {
      this.props.update(this.props.y + speed);
    }

    requestAnimationFrame(this.loop);
  }

  componentDidUpdate(prevProps) {
    if (this.props.y !== prevProps.y) {
      this.props.socket.emit('rackedMooved', {
        y_coordinate: this.props.y,
        userID: this.props.user.sub
      });
    }
  }

  handleKeyDown = event => {
    if (event.keyCode === 38) {
      this.setState({ up: true });
    } else if (event.keyCode === 40) {
      this.setState({ down: true });
    }
  }

  handleKeyUp = event => {
    if (event.keyCode === 38) {
      this.setState({ up: false });
    } else if (event.keyCode === 40) {
      this.setState({ down: false });
    }
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
