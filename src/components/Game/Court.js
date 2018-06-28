import React from 'react';
import { Stage, Layer } from 'react-konva';
import styled from 'styled-components';

const Court = styled.div`
  width: 1440px;
  height: 720px;
  background: #46a07e;
  position: relative;
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

const Score = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  color: #ffffff;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  font-family: 'Shrikhand', cursive;
`;

const LeftScore = styled.div`
  flex: 1;
  margin-right: 2em;
  text-align: right;
`;

const RightScore = styled.div`
  flex: 1;
  margin-left: 2em;
`;

export default props => (
  <Court>
    <Score>
      <LeftScore>
        {props.leftScore}
      </LeftScore>
      <RightScore>
        {props.rightScore}
      </RightScore>
    </Score>
    <Stage width={props.width} height={props.height}>
      <Layer>
        {props.children}
      </Layer>
    </Stage>
  </Court>
);
