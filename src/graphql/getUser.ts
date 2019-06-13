import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const searchUserQuery = gql`
  query getUser($id: ID) {
    user(id: $id) {
      id
      exchangeBalances {
        id
        userAddress
        uniTokenBalance
      }
      txs {
        id
        event
        block
        timestamp
        tokenSymbol
        ethAmount
        tokenAmount
        fee
      }
    }
  }
`;

export default graphql(searchUserQuery, {
    options: {
        fetchPolicy: 'cache-first',
    }
});