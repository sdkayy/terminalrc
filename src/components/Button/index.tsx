import * as React from 'react';
import {  StyledButton } from './style';

interface Props {
  onClick: any;
  children: any;
}

export const Button = (props: Props) => (
  <StyledButton onClick={props.onClick}>
    {props.children}
  </StyledButton>
)