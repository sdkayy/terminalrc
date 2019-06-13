import * as React from 'react';
import { Transaction } from '../../graphql/types';
import { compose } from 'recompose';
import getUsersTransactions from '../../graphql/getUsersTransactions';
import { SmallerList, SmallListItem, Centered, EventType, EthAmount, TokenAmount } from './style';
import InfiniteScroll from '../InfiniteScroll';
import { SwapIcon } from '../Icons';
import { connect } from 'react-redux';

interface Props {
  user: string;
  otherTransactions: any;
  data: {
    fetchMore: any;
    loading: boolean;
    networkStatus: number;
    transactions: Transaction[];
  };
}

class Transactions extends React.Component<Props, any> {
  public render() {
    const { otherTransactions } = this.props;
    const { transactions, loading, fetchMore, networkStatus } = this.props.data;
    console.log(otherTransactions)
    if (loading) {
      return <Centered>Loading transactions for {this.props.user}</Centered>;
    }
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMore}
        isLoadingMore={networkStatus === 3}
        hasMore={true}
        useWindow={true}
        initialLoad={false}
        scrollElement={document.getElementById('scroller-for-transactions')}
        threshold={750}
        className={'infinite-scroll-div-transactions'}
      >
        <SmallerList>
          {otherTransactions &&
            otherTransactions.length > 0 &&
            otherTransactions.map((tx: any) => (
              <SmallListItem>
                <EventType>User Transfer</EventType>
                <EthAmount>
                  {tx.to}
                </EthAmount>
                <SwapIcon />
                <EthAmount>
                  {tx.from}
                </EthAmount>
                <EthAmount>{tx.amount} ETH</EthAmount>
              </SmallListItem>
            ))}
          {transactions && transactions.length > 0 ? (
            transactions.map(tx => (
              <SmallListItem>
                <EventType type={tx.event}>{tx.event}</EventType>
                <EthAmount>{tx.ethAmount} ETH</EthAmount>
                <SwapIcon />
                <TokenAmount>
                  {tx.tokenAmount} {tx.tokenSymbol}
                </TokenAmount>
              </SmallListItem>
            ))
          ) : (
            <Centered>😟 No transactions found 😟</Centered>
          )}
        </SmallerList>
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const { transactions } = state;
  console.log(state)
  return {
    otherTransactions: transactions.transactions && transactions.transactions.length > 0 ? transactions.transactions.reverse().filter(
      (t: any) => t.to === ownProps.user || t.from === ownProps.user
    ) : [],
  };
};

export default compose<any, any>(
  connect(mapStateToProps),
  getUsersTransactions
)(Transactions);
