import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl
} from 'react-native';
import { signOutUser } from '../config/auth';
import { addStatus, subscribeToStatuses, formatTimestamp } from '../config/firestore';

export default function FeedScreen({ user }) {
  const [statusText, setStatusText] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToStatuses((newStatuses, error) => {
      if (error) {
        Alert.alert('Error', 'Failed to load statuses');
        return;
      }
      setStatuses(newStatuses);
    });

    return () => unsubscribe();
  }, []);

  const handlePostStatus = async () => {
    if (!statusText.trim()) {
      Alert.alert('Error', 'Please enter a status message');
      return;
    }

    if (statusText.length > 280) {
      Alert.alert('Error', 'Status message must be 280 characters or less');
      return;
    }

    setLoading(true);

    try {
      const result = await addStatus(
        statusText.trim(),
        user.uid,
        user.email
      );

      if (result.success) {
        setStatusText('');
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to post status');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // The real-time listener will automatically update the data
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderStatusItem = ({ item }) => (
    <View style={styles.statusCard}>
      <View style={styles.statusHeader}>
        <Text style={styles.authorEmail}>{item.authorEmail}</Text>
        <Text style={styles.timestamp}>
          {formatTimestamp(item.createdAt)}
        </Text>
      </View>
      <Text style={styles.statusContent}>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quick Status Board</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.statusInput}
          placeholder="What's on your mind?"
          value={statusText}
          onChangeText={setStatusText}
          multiline
          maxLength={280}
        />
        <View style={styles.inputFooter}>
          <Text style={styles.characterCount}>
            {statusText.length}/280
          </Text>
          <TouchableOpacity
            style={[
              styles.postButton,
              (!statusText.trim() || loading) && styles.postButtonDisabled
            ]}
            onPress={handlePostStatus}
            disabled={!statusText.trim() || loading}
          >
            <Text style={styles.postButtonText}>
              {loading ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={statuses}
        renderItem={renderStatusItem}
        keyExtractor={(item) => item.id}
        style={styles.feedList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No statuses yet. Be the first to post!</Text>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statusInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  characterCount: {
    color: '#666',
    fontSize: 12,
  },
  postButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  postButtonDisabled: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  feedList: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  statusContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
