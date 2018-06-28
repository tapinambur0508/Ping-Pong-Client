import React from 'react';
import { Rect } from 'react-konva';

const Wall = props => (
  <Rect
    x={props.x - (props.width / 2)}
    y={props.y - (props.height / 2)}
    width={props.width}
    height={props.height}
    fill="#ff4242" />
);

export default Wall;
