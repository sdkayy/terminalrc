import * as React from 'react';
import { compose } from 'recompose';
import { UniswapUsersType } from '../../graphql/types';
import getUsers from '../../graphql/getUsers';
import { List, Floater, ListItem, SearchInput, InnerFloater, Centered } from './style';
import InfiniteScroll from '../../components/InfiniteScroll';
import { deduplicateChildren } from '../../components/InfiniteScroll/deduplicateChildren';
import { withApollo } from 'react-apollo';
import { searchUserQuery } from '../../graphql/getUser';
import User from '../../components/User';
import { Button } from '../../components/Button';
import TransferModal from '../../components/Modals';
import { createTransaction } from '../../redux/actions';
import { connect } from 'react-redux';

interface Props {
  client: any;
  dispatch: any;
  data: {
    fetchMore: any;
    networkStatus: number;
    loading: boolean;
    users: UniswapUsersType[]
  }
}

interface State {
  displayNumber: number;
  searching: boolean;
  query: string;
  searchResult: any;
  transferingEth: boolean;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayNumber: -1,
      searching: false,
      query: '',
      searchResult: null,
      transferingEth: false,
    }

    this.searchAddresses = this.debounce(this.searchAddresses, 500);
    this.transferEth = this.transferEth.bind(this);
  }

  // Can clean it up even more introducing a user component that does the search based on the prop we send it, but that would be a 1 use, instead I will use the version I currently
  // made that just simply displays data based on the user data we send.  
  public searchAddresses = (query: string) => {
    this.props.client.query({
      query: searchUserQuery,
      variables: {
        id: query
      }
    }).then(({ data: { user } }: any) => {
      this.setState({
        searching: query === '' ? false : true,
        query,
        searchResult: user
      });
    });
  }

  // Quick and dirty debounce for the searching so we dont flood the API.
  public debounce = (func: any, wait: number) => {
    let timeout: any;
    return function (...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        // @ts-ignore
        func.apply(this, args);
      }, wait);
    };
  };

  public transferEth(to: string, from: string, amount: number) {
    console.log(this.props);
    if(to && from && amount) {
      // More validation if this was a real call of course.
      // @ts-ignore
      this.props.dispatch(createTransaction({ to, from, amount }));
    }
  }

  public render() {
    const { displayNumber, transferingEth, searching, query, searchResult } = this.state;

    // PTODO: Prettier Loading
    if (this.props.data && this.props.data.loading) {
      return <p>Loading...</p>
    }

    const uniqueUsers = deduplicateChildren(this.props.data.users, 'id');
    const scroller = document.getElementById('list');

    return (
      <div>
        <Floater>
          <InnerFloater>
            <SearchInput defaultValue={query} onChange={(e: any) => this.searchAddresses(e.target.value)} placeholder={'Search for an address (0x0000000000000000000000000000000000000000)'} />
            <Button onClick={() => this.setState({ transferingEth: true })}>Transfer ETH</Button>
          </InnerFloater>
        </Floater>
        <List>
          {searching ?
            searchResult !== null ? (
              <ListItem key={searchResult.id}>
                <User user={searchResult} isShowing={true} />
              </ListItem>
            ) : (
                <Centered>No results for {query}</Centered>
              )
            : (
              <InfiniteScroll
                pageStart={0}
                loadMore={this.props.data.fetchMore}
                isLoadingMore={this.props.data.networkStatus === 3}
                hasMore={true}
                loader={<Centered>Loading...</Centered>}
                useWindow={true}
                initialLoad={false}
                scrollElement={scroller}
                threshold={150}
                className={'infinite-scroll-div'}
              >
                {uniqueUsers.map((user: UniswapUsersType, index: number) => (
                  <ListItem key={index} onClick={() => this.setState({ displayNumber: displayNumber === index ? -1 : index })}>
                    <User user={user} isShowing={displayNumber === index} />
                  </ListItem>
                ))}
              </InfiniteScroll>
            )}
        </List>
        <TransferModal isOpen={transferingEth} onSubmit={this.transferEth} closeModal={() => this.setState({ transferingEth: false })} />
      </div>
    )
  }
}

export default compose<any, any>(connect(), getUsers, withApollo)(Home);