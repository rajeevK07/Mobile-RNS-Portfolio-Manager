// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AppKitButton, useAccount } from '@reown/appkit-react-native';
import './config/AppKitConfig'; // Import the config to wake it up!
import { useEffect, useState } from 'react';
import { rnsService } from './services/RnsService';
import { ApolloProvider } from '@apollo/client/react'; // Import the Provider
import { apolloClient } from './config/ApolloConfig'; // Import our specific client 
import DomainList from './components/DomainList';

function App(): any {
  const { address, isConnected } = useAccount();
const [rnsName, setRnsName] = useState<string | null>(null);

useEffect(() => {
  const fetchName = async () => {
    if (address && isConnected) {
      // 1. Ask the Phonebook
      const name = await rnsService.lookupAddress(address);
      setRnsName(name);
    }
  };
  fetchName();
}, [address, isConnected]);
  return (
    <ApolloProvider client={apolloClient}>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>RNS Manager</Text>
        <Text style={styles.subtitle}>
           Your mobile gateway to Rootstock
        </Text>

        {/* This is the Magic Button */}
        <View style={styles.buttonContainer}>
          <AppKitButton 
            label="Connect Wallet"
            balance="show" 
          />
        </View>
      </View>
      <DomainList />
    </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // Dark mode style
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default App;
