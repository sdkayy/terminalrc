import styled from 'styled-components';

const TransactionColors: any = {
  'EthPurchase': '#3c3c3d',
  'TokenPurchase': '#3498db',
  'RemoveLiquidity': '#f1c40f',
  'AddLiquidity': '#2ecc71',
}

export const SmallerList = styled.div`
  width: 100%;
`;

export const SmallListItem = styled.div`
  background: #fff;
  display: flex;
  flex-direction: row;
  padding: 14px;

  &:nth-of-type(odd) {
    background: #f8f8f8;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Centered = styled.p`
  text-align: center;
  margin-bottom: 0;
`;

const BaseItem = styled.p`
  padding: 8px;
  margin: auto 0;
  font-size: 14px;
`;

// UGLY on mobile..
export const EventType = styled(BaseItem)<{ type?: string }>`
  background: ${props => props.type ? TransactionColors[props.type] : '#3c3c3d'};
  border-radius: 12px;
  color: white;
`;

export const EthAmount = styled(BaseItem)`
  max-width: 330px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TokenAmount = styled(BaseItem)``;