import styled from 'styled-components';

const HoverTransition = {
  hover: {
    on: 'all 0.2s ease-in',
    off: 'all 0.2s ease-out',
  },
};

export const StyledButton = styled.button`
  border: 1px solid #3c3c3d;
  background: #3c3c3d;
  padding: 14px;
  font-size: 12px;
  margin: auto 0;
  color: white;
  text-transform: uppercase;
  border-radius: 6px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: ${HoverTransition.hover.off};
  &:hover {
    background: #f8f8f8;
    color: #3c3c3d;
    transition: ${HoverTransition.hover.on};
    transform: scale(1.02);
  }
  &:focus {
    outline: none;
  }
`;
