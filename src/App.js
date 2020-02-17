import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import config from './config/config';
import Repos from './components/Repos';
import './App.css';
import { useRef } from 'react';

const App = () => {
  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${config.GITHUB_TOEKN}`
    }
  });

  const ref = useRef(null);

  console.log(ref);

  return (
    <ApolloProvider client={client}>
      <div className="App" ref={ref}>
        <h1>Github Search using GraphQL</h1>
        <Repos />
      </div>
    </ApolloProvider>
  );
}

export default App;