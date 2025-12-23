// src/components/DomainList.tsx

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { FlashList } from '@shopify/flash-list';
import { GET_DOMAINS_BY_OWNER } from '../queries/DomainQueries'; // From Module 3
import { useAccount } from '@reown/appkit-react-native';
import DomainCard from './DomainCard';
import { RefreshControl } from 'react-native';


const DomainList = () => {
  const { address, isConnected } = useAccount();

  // The Magic Hook: This automatically fetches data when 'address' changes.
  const { loading, error, data, refetch} : any = useQuery(GET_DOMAINS_BY_OWNER, {
    variables: { ownerId: address?.toLowerCase() }, // The Graph stores addresses in lowercase!
    skip: !isConnected || !address, // Don't ask if we aren't logged in
    notifyOnNetworkStatusChange: true
  });

  if (!isConnected) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.message}>Please connect your wallet to view domains.</Text>
      </View>
    );
  }
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Tell Apollo to ignore the cache and ask the server again
    refetch().then(() => setRefreshing(false));
  }, []);

  
  if (loading) return <ActivityIndicator size="large" color="#F7931A" />;

  if (error) {
    return <Text style={styles.errorText}>Error fetching domains: {error.message}</Text>;
  }

  // Handle "Empty Drawer" scenario
  if (!data || data.domains.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.message}>No RNS domains found on this address.</Text>
        <Text style={styles.subMessage}>Buy one at name.rootstock.io!</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlashList
        data={data.domains}
        renderItem={({ item }: any) => (
          <DomainCard name={item.name} expiryDate={item.ttl} />
        )}
        keyExtractor={(item: any) => item.id}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor="#F7931A" // Make the spinner Orange (iOS)
            colors={['#F7931A']} // Make the spinner Orange (Android)
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: { flex: 1, width: '100%', marginTop: 20 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  message: { color: '#fff', fontSize: 16 },
  subMessage: { color: '#888', marginTop: 8 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default DomainList;
