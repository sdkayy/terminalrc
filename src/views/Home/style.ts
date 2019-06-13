import styled from 'styled-components';

const HoverTransition = {
  hover: {
    on: 'all 0.2s ease-in',
    off: 'all 0.2s ease-out',
  },
};

export const List = styled.div`
  margin: 24px auto;
  width: 75%;
`;

export const ListItem = styled.div`
  box-sizing: border-box;
  padding: 24px;
  width: 100%;
  margin-top: 12px;
  border-radius: 6px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: ${HoverTransition.hover.off};
  &:hover {
    transition: ${HoverTransition.hover.on};
    transform: scale(1.02);
  }
`;

export const SearchInput = styled.input`
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

export const SmallerList = styled.div`
  padding: 12px;
  width: 100%;
`;

export const SmallListItem = styled.div`
  background: #fff;

  &:nth-of-type(2) {
    background: #f8f8f8;
  }
`;

export const Centered = styled.p`
  text-align: center;
  margin-bottom: 0;
`;

export const Floater = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f8f8f8;  
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
`;

export const InnerFloater = styled.div`
  width: 75%;
  margin: 12px auto;
  margin-top: 0;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-gap: 12px;
  @media(max-width: 768px) {
    grid-template-columns: auto auto;
  }
`;