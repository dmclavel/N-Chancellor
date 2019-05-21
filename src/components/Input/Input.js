import React from 'react';
import styled from 'styled-components';

const InputEl = styled.input`
    display: ${props => props.style.display};
    font-family: 'Montserrat', sans-serif;
    width: ${props => props.style.width};
    height: ${props => props.style.height};
    outline: none;
    font-size: 1.15rem;
    padding-left: 1rem;

    :focus {

    }
`;

const Input = ({ inp, setInp, style, placeholder }) => {

    return <InputEl value={inp} onChange={(e) => setInp(e)} style={style} placeholder={placeholder} />;
};

export default Input;

