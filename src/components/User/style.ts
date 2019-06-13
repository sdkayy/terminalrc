import styled, { keyframes } from 'styled-components';

const scaleHeightIn = keyframes`
    0% {
      max-height: 0px;
      opacity: 1;
    }
    100% {
      max-height: 550px;
      opacity: 1;
    }
`;

const scaleHeightOut = keyframes`
    0% {
      max-height: 550px;
      opacity: 1;
    }
    100% {
      max-height: 0px;
      opacity: 0;
    }
`;



export const TransactionsContainer = styled.div<{ isShown?: boolean }>`
  width: 100%;
  padding: 12px;
  max-height: ${props => props.isShown ? '550px' : '0px'};
  overflow-y: scroll;
  overflow-x: hidden;
  box-sizing: border-box;
  margin-top: 12px;
  animation: ${props => props.isShown ? scaleHeightIn : scaleHeightOut} .5s ease-in-out;
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-columns: auto auto;

  @media(max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

export const UserID = styled.p`
  font-size: 18px;
  margin: auto 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Balance = styled.p`
  font-size: 18px;
  margin: auto 0;
  color: green;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
