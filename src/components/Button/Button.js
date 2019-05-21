import React from 'react';
import styled from 'styled-components';

const ButtonEl = styled.button`
  width: 8rem;
  height: 2.4rem;
  margin-left: 0.5rem;
  box-sizing: border-box;
  border: none;
  padding: 0.25rem;
  background-color: #475C7A;
  color: #fff;
  
  :hover {
    color: rgba(255,255,255,0.75);
    cursor: pointer;
  }
`;

const button = ({ clicked, style, name }) => {
    return <ButtonEl style={style} onClick={clicked}> { name } </ButtonEl>;
};

export default button;