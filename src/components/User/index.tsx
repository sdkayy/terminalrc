import * as React from 'react';
import { TopRow, Balance, UserID, TransactionsContainer } from './style';
import Transactions from '../Transactions';
import { UniswapUsersType } from '../../graphql/types';

interface Props {
  user: UniswapUsersType;
  isShowing: boolean;
}

class User extends React.Component<Props, any> {
  public render() {
    const { user, isShowing } = this.props;
    return (
      <div>
        <TopRow>
          <UserID>{user.id}</UserID>
          <Balance>
            {user.exchangeBalances
              .reduce((total: number, balance: any) => {
                if (total < 0) {
                  return 0;
                }
                return (
                  parseFloat(balance.ethDeposited) -
                  parseFloat(balance.ethWithdrawn) +
                  // @ts-ignore
                  parseFloat(total)
                );
              }, 0)
              .toFixed(8)}
          </Balance>
        </TopRow>
        {isShowing && (
          <TransactionsContainer isShown={isShowing} id={'scroller-for-transactions'}>
            <Transactions user={user.id} />
          </TransactionsContainer>
        )}
      </div>
    );
  }
}

export default User;
