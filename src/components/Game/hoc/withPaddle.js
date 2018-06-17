import React from 'react';

const withPaddle = Component => {
  const paddle = {
    width: 15,
    height: 100,
    speed: 10,
    x: 10
  }

  class WithPaddle extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        y: 0
      }
    }

    componentDidMount() {
      this.setState({
        y: (this.props.windowHeight / 2) - (paddle.height / 2)
      });
    }

    updatePosition = newY => {
      this.setState({ y: newY });
    }

    render() {
      const { width, height, speed, x } = paddle;

      return (
        <Component
          x={x}
          y={this.state.y}
          width={width}
          height={height}
          speed={speed}
          update={this.updatePosition}
          {...this.props} />
      );
    }
  }

  WithPaddle.displayName = `WithPaddle(${Component.displayName || Component.name || 'Component'})`;

  return WithPaddle;
}

export default withPaddle;
