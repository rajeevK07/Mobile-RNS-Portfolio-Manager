// config/AppKitConfig.tsx

import { createAppKit } from '@reown/appkit-react-native';
import { EthersAdapter } from '@reown/appkit-ethers-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 1. Get the Project ID from our safe storage
// (In a real app, use react-native-dotenv. For now, paste it to test if unsure)
const projectId = 'YOUR_PROJECT_ID_HERE';

const storage: any = {
  setItem: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage setItem error:', e);
    }
  },
  getItem: async <T = any>(key: string): Promise<T | undefined> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : undefined;
    } catch (e) {
      console.warn('Storage getItem error:', e);
      return undefined;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn('Storage removeItem error:', e);
    }
  },
};
// 2. Define the Metadata
// This is what shows up on the user's wallet when they connect.
// "RnsManager wants to connect to your wallet"
const metadata = {
  name: 'RNS Portfolio Manager',
  description: 'Manage your Rootstock domains on the go',
  url: 'https://web3spell.com', // Your website
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'rnsmanager://', // Deep link for the app to open back up
  },
};

// 3. Define the Chains
// We map our Module 1 constants to the format AppKit expects
const rootstockTestnetChain : any= {
  chainId: 31,
  name: 'Rootstock Testnet',
  currency: 'tRBTC',
  explorerUrl: 'https://explorer.testnet.rsk.co',
  rpcUrl: 'https://rootstock-testnet.drpc.org',
};

// 4. Initialize the Configuration
export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [rootstockTestnetChain],
  projectId,
  metadata,
  enableAnalytics: true,
  storage: storage
});
