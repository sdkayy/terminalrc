
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import Home from './views/Home/Home';
import { Provider } from 'react-redux';
import store from './redux';

const cache = new InMemoryCache();

const API_URL = 'https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap';

const httpLink = new HttpLink({
  uri: API_URL,
});

const client = new ApolloClient({
  cache,
  link: httpLink,
});

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <div id="list" style={{ width: "100%", maxHeight: "100%", overflowY: "scroll" }}>
        <Home />
      </div>
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));