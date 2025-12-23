// config/ApolloConfig.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// 1. Mainnet Fallback (Public & Decentralized)
// We use this if we just want to test if our UI works with REAL data.
const RNS_SUBGRAPH_URL_MAINNET = 'https://api.thegraph.com/subgraphs/id/DhBgWdhFsujyqFmYqaTwUyyYm5QWBEhqVnBHek9JYPkn';

// 2. Your Custom Testnet URL
// Once you finish the "Workshop" below, paste your Studio URL here.
const RNS_SUBGRAPH_URL_TESTNET = ''; // e.g. https://api.studio.thegraph.com/query/1234/rns-testnet/v0.0.1

// Logic: Use Testnet URL if it exists, otherwise fallback to Mainnet
const RNS_SUBGRAPH_URL = RNS_SUBGRAPH_URL_TESTNET || RNS_SUBGRAPH_URL_MAINNET;

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: RNS_SUBGRAPH_URL }),
  cache: new InMemoryCache(),
});
