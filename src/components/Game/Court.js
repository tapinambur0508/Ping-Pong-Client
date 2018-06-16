import React from 'react';
import { Stage, Layer } from 'react-konva';
import styled from 'styled-components';

const Court = styled.div`
  width: 100%;
  height: 100%;
  background: #46a07e;
  position: relative;
  overflow: hidden;
  z-index: -2;

  &:after {
    content:"";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    border-left: 12px dashed #ffffff;
    transform: translate(-50%);
    z-index: -1;
  }
`;

export default props => (
  <Court>
    <Stage height={props.height} width={props.width}>
      <Layer>
        {props.children}
      </Layer>
    </Stage>
  </Court>
);
