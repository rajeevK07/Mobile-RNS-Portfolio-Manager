import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {  useAccount, useAppKit } from '@reown/appkit-react-native';
import { ROOTSTOCK_TESTNET } from '../constants/chains';

export const NetworkGuard = ({ children }: { children: React.ReactNode }) => {

  const { isConnected, chainId} = useAccount();
  const { switchNetwork } = useAppKit();

  // Rootstock Testnet ID is 31. (Mainnet is 30).
  const TARGET_CHAIN_ID = 31; 
  const TARGET_CHAIN = ROOTSTOCK_TESTNET;
  if (isConnected && chainId !== TARGET_CHAIN_ID) {
    return (
      <View style={styles.guardContainer}>
        <Text style={styles.warningText}>Wrong Network Detected</Text>
        <Text style={styles.subText}>
          You are currently on Chain ID {chainId}. 
          Please switch to Rootstock Testnet to manage your domains.
        </Text>

        <TouchableOpacity 
          style={styles.switchBtn} 
          onPress={() => switchNetwork({
id: TARGET_CHAIN.id,
name: TARGET_CHAIN.name,
nativeCurrency: TARGET_CHAIN.currency,
rpcUrls: {
    default: { http: ['https://public-node.testnet.rsk.co']
    }
    },
    chainNamespace: 'eip155',
    caipNetworkId: `${TARGET_CHAIN.id}:${TARGET_CHAIN.id}`
})}
        >
          <Text style={styles.btnText}>Switch to Rootstock</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If everything is fine, render the app normally
  return <>{children}</>;
};

const styles = StyleSheet.create({
  guardContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  warningText: { color: '#FF4444', fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subText: { color: '#fff', textAlign: 'center', marginBottom: 20 },
  switchBtn: { backgroundColor: '#F7931A', padding: 15, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});
