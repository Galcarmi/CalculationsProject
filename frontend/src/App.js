import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import ValuesFormPage from './pages/ValuesFormPage';
import CalculationsPage from './pages/CalculationsPage';

import Navbar from './components/header/Navbar';

const httpLink = new HttpLink({
  uri: 'http://localhost:4500/graphql' // use https for secure endpoint
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4500/graphql', // use wss for a secure endpoint
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

// Instantiate client
export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <BrowserRouter>
          <Navbar></Navbar>
          <div className={'container'}>
            <Switch>
              <Route path="/" component={CalculationsPage} exact></Route>
              {/* <Route path="/" component={SubscribeTest} exact></Route> */}
              <Route path="/values" component={ValuesFormPage}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
