import styled, { keyframes } from 'styled-components';

const HoverTransition = {
  hover: {
    on: 'all 0.2s ease-in',
    off: 'all 0.2s ease-out',
  },
};

export const Header = styled.h1`
  color: white;
  background: #3c3c3d;
  width: 100%;
  padding: 12px;
  text-transform: uppercase;
  font-size: 16px;
  margin: 0;
  box-sizing: border-box;
`;

export const Form = styled.div`
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
`;

export const Input = styled.input`
  padding: 12px;
  margin: 12px 0;
  background: #f8f8f8;
  border: none;
  width: 100%;
  font-size: 16px;
  border-radius: 6px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  transition: ${HoverTransition.hover.off};

  &:focus {
    outline: none;
    transition: ${HoverTransition.hover.on};
    transform: scale(1.02);
  }
`;

export const ActionHolder = styled.div`
  display: flex;
  justify-content: flex-end;
`;


export const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;


const Banner = styled.div`
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 6px;
  text-align: center;
  padding: 12px;
  animation: ${fadeInOut} 5s ease-in-out;
`;

export const SuccessBanner = styled(Banner)`
  background: #3498db;
`;

export const ErrorBanner = styled(Banner)`
  background: #e74c3c;
`;