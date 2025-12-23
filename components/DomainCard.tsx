// src/components/DomainCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useProvider } from '@reown/appkit-react-native';
import { BrowserProvider } from 'ethers';
import { rnsService } from '../services/RnsService';
import { Alert, TouchableOpacity } from 'react-native';

interface DomainCardProps {
  name: string;
  expiryDate: string; // The Graph returns this as a string
}

const DomainCard = ({ name, expiryDate }: DomainCardProps) => {
  const { provider } = useProvider(); 

  const handleTransfer = async () => {
    if (!provider) return;

    // In a real app, use a Modal to get this address. 
    // For this tutorial, we hardcode a friend's address or asking user via prompt logic.
    const newOwner = "0x...FriendAddress..."; 

    try {
        // 1. Wrap the wallet provider in Ethers so we can talk to it
        const ethersProvider = new BrowserProvider(provider);

        Alert.alert("Check your Wallet", "Please switch to your wallet app to sign the transaction.");

        // 2. Call our service
        const txHash = await rnsService.transferDomain(name, newOwner, ethersProvider);

        Alert.alert("Success!", `Domain transferred.\nTx Hash: ${txHash}`);

    } catch (error: any) {
        if (error.code === 'ACTION_REJECTED') {
            Alert.alert("Cancelled", "You rejected the transaction.");
        } else {
            Alert.alert("Error", "Something went wrong. Do you have enough tRBTC for gas?");
        }
    }
};
  // Helper: Convert "1735..." to "12/31/2024"
  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000); // Multiply by 1000 for milliseconds
    return date.toLocaleDateString();
  };

  // Check if expired
  const isExpired = parseInt(expiryDate) * 1000 < Date.now();

  return (
    <View style={styles.card}>
      <View style={styles.iconPlaceholder}>
        <Text style={styles.iconText}>RNS</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.domainName}>{name}</Text>
        <Text style={[styles.expiryText, isExpired && styles.expiredText]}>
          {isExpired ? 'EXPIRED' : `Expires: ${formatDate(expiryDate)}`}
        </Text>
      </View>

      <View style={styles.statusDot} />
      <TouchableOpacity style={styles.transferBtn} onPress={handleTransfer}>
            <Text style={styles.btnText}>Transfer</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  transferBtn: { backgroundColor: '#333', padding: 8, borderRadius: 6, marginTop: 10 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7931A', // Rootstock Orange
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: { fontWeight: 'bold', color: '#fff', fontSize: 10 },
  infoContainer: { flex: 1 },
  domainName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  expiryText: { color: '#888', fontSize: 12 },
  expiredText: { color: '#FF4444' }, // Red for danger
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00E676', // Green for active
  },
});

export default DomainCard;
