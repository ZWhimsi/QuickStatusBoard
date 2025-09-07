import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import AuthScreen from "./screens/AuthScreen";
import EnhancedFeedScreen from "./screens/EnhancedFeedScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <View style={styles.container} />;
  }

  if (user) {
    return <EnhancedFeedScreen onSignOut={() => setUser(null)} />;
  }

  return <AuthScreen onAuthSuccess={() => setUser(auth.currentUser)} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
