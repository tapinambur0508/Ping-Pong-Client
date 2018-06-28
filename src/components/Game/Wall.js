import React from 'react';
import { Rect } from 'react-konva';

const Wall = props => (
  <Rect
    x={props.x}
    y={props.y}
    width={props.width}
    height={props.height}
    fill="#ff4242" />
);

export default Wall;
