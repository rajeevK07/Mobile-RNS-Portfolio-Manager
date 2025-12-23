// src/constants/chains.ts

export const ROOTSTOCK_TESTNET = {
    id: '31', // This is the unique ID for the RSK Testnet
    name: 'Rootstock Testnet',
    rpcUrl: 'https://rootstock-testnet.drpc.org', // The phone line we call to get data
    currency: {
      name: 'Test RBTC',
      symbol: 'tRBTC',
      decimals: 18,
    },
    // This is the address of the RNS Registry on Testnet. 
    // Think of this as the "Phone Book" building address.
    rnsRegistryAddress: '0x7d284aaac6e925aad802a53c0c69efe3764597b8', 
  };
  