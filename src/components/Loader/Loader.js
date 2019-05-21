import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner'

const LoaderWrapper = styled.div`
  display: ${props => props.style.display};
  flex-direction: column;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  position: fixed;
  z-index: 500;
`;

const InnerWrapper = styled.div`
  display: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  margin-top: 1rem;
  color: #fff;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  font-weight: bold;
`;

const loader = ({ style }) => {
    console.log(style);
    return (
        <LoaderWrapper style={style}>
            <InnerWrapper>
                <Loader type="Rings"
                        color="#FFF"
                        height="150"
                        width="150" />
                <Text> Solving... This might take some time. </Text>
            </InnerWrapper>
        </LoaderWrapper>
    )
};

export default loader;