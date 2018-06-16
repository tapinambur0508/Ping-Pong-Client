import React from 'react';

import Ball from './Ball';
import Court from './Court';
import MyPaddle from './MyPaddle';
import EnemyPaddle from './EnemyPaddle';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
  }

  render() {
    return (
        <Court
          width={this.state.width}
          height={this.state.height}>
          <MyPaddle
            windowWidth={this.state.width}
            windowHeight={this.state.height} />
          <Ball
            windowWidth={this.state.width}
            windowHeight={this.state.height} />
          <EnemyPaddle
            windowWidth={this.state.width}
            windowHeight={this.state.height} />
        </Court>
    );
  }
}

export default Game;
