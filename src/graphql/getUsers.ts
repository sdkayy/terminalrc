import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const getAllUsersQuery = gql`
  query getUsers($first: Int, $skip: Int) {
    users(first: $first, skip: $skip) {
      id
      exchangeBalances {
        id
        userAddress
        ethDeposited
        ethWithdrawn
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


  const getAllUsersOptions = {
    options: () => ({
      variables: {
        first: 20,
        skip: 0,
      },
      fetchPolicy: 'cache-first',
    }),
    props: ({
      // @ts-ignore
      ownProps,
       // @ts-ignore
      data: { fetchMore, error, loading, users, networkStatus, refetch },
    }) => ({
      data: {
        error,
        loading,
        users,
        networkStatus,
        refetch,
        fetchMore: () =>
          fetchMore({
            query: getAllUsersQuery,
            variables: {
              first: 20,
              skip: users.length - 1,
            },
            // @ts-ignore
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.users) {
                return prev;
              }
              return {
                ...prev,
                users: [
                  ...prev.users,
                  ...fetchMoreResult.users
                ],
              };
            },
          }),
      },
    }),
  };

// @ts-ignore
export default graphql(getAllUsersQuery, getAllUsersOptions);
