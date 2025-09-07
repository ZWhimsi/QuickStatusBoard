import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";

export default function FeedScreen({ onSignOut }) {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen to real-time updates from Firestore
    const q = query(collection(db, "statuses"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const statusList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatuses(statusList);
    });

    return () => unsubscribe();
  }, []);

  const handlePostStatus = async () => {
    if (!newStatus.trim()) {
      Alert.alert("Error", "Please enter a status");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "statuses"), {
        text: newStatus.trim(),
        user: auth.currentUser?.email || "Anonymous",
        timestamp: serverTimestamp(),
      });
      setNewStatus("");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onSignOut();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const renderStatus = ({ item }) => (
    <View style={styles.statusItem}>
      <Text style={styles.statusText}>{item.text}</Text>
      <Text style={styles.statusUser}>by {item.user}</Text>
      <Text style={styles.statusTime}>
        {item.timestamp?.toDate?.()?.toLocaleString() || "Just now"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Status Feed</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="What's on your mind?"
          value={newStatus}
          onChangeText={setNewStatus}
          multiline
        />
        <TouchableOpacity
          style={[styles.postButton, loading && styles.buttonDisabled]}
          onPress={handlePostStatus}
          disabled={loading}
        >
          <Text style={styles.postButtonText}>
            {loading ? "Posting..." : "Post Status"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={statuses}
        renderItem={renderStatus}
        keyExtractor={(item) => item.id}
        style={styles.statusList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  signOutButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  signOutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 80,
    textAlignVertical: "top",
  },
  postButton: {
    backgroundColor: "#34C759",
    paddingVertical: 15,
    borderRadius: 8,
    alignSelf: "flex-end",
    paddingHorizontal: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusList: {
    flex: 1,
    padding: 20,
  },
  statusItem: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  statusText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  statusUser: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
  statusTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});
