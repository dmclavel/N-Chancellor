import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  display: ${props => props.style.display};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200; //stacking context
  width: ${props => props.style.width};
  height: ${props => props.style.height};
  border-radius: ${props => props.style.borderRadius ? props.style.borderRadius : null};
  background-color: rgba(0,0,0,0.7);
`;

const backdrop = ({ style, backdropClicked }) =>
    <Backdrop onClick={backdropClicked} style={style} />;

export default backdrop;