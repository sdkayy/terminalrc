import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const getUsersTransactionsQuery = gql`
  query getUsersTransactions($where: Transaction_filter) {
    transactions(where: $where) {
      id
      tx
      event
      block
      timestamp
      exchangeAddress
      tokenAddress
      tokenSymbol
      user
      ethAmount
      tokenAmount
      fee
    }
  }
`;


  const getUsersTransactionsOptions = {
    options: ({ user }: any) => ({
      variables: {
        first: 20,
        skip: 0,
        where: {
            user
        }
      },
      fetchPolicy: 'cache-first',
    }),
    props: ({
      // @ts-ignore
      ownProps,
       // @ts-ignore
      data: { fetchMore, error, loading, transactions, networkStatus, refetch },
    }) => ({
      data: {
        error,
        loading,
        transactions,
        networkStatus,
        refetch,
        fetchMore: () =>
          fetchMore({
            query: getUsersTransactionsQuery,
            variables: {
              first: 20,
              skip: transactions.length - 1,
            },
            // @ts-ignore
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.transactions) {
                return prev;
              }
              return {
                ...prev,
                transactions: [
                  ...prev.transactions,
                  ...fetchMoreResult.transactions
                ],
              };
            },
          }),
      },
    }),
  };

// @ts-ignore
export default graphql(getUsersTransactionsQuery, getUsersTransactionsOptions);
