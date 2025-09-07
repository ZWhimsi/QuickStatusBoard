import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Animated,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FloatingLabelInput from "../components/FloatingLabelInput";
import GradientButton from "../components/GradientButton";
import { InterviUColors, InterviUTypography, InterviUSpacing } from "../assets/styles/brandStyles";
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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

  const renderStatus = ({ item, index }) => {
    const scaleAnim = new Animated.Value(0.95);
    const pressAnim = new Animated.Value(1);

    React.useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, []);

    const handlePressIn = () => {
      Animated.spring(pressAnim, {
        toValue: 0.95,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(pressAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.statusItem,
            {
              transform: [
                { scale: scaleAnim },
                { scale: pressAnim },
              ],
              opacity: scaleAnim.interpolate({
                inputRange: [0.95, 1],
                outputRange: [0.8, 1],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
            style={styles.statusItemGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.statusText}>{item.text}</Text>
            <View style={styles.statusMeta}>
              <View style={styles.statusUserContainer}>
                <View style={styles.userAvatar} />
                <Text style={styles.statusUser}>{item.user}</Text>
              </View>
              <Text style={styles.statusTime}>
                {item.timestamp?.toDate?.()?.toLocaleString() || "Just now"}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
        );
  };

        return (
        <LinearGradient
          colors={InterviUColors.darkGradient}
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Animated.View style={styles.header}>
            <Text style={styles.title}>Status Feed</Text>
            <GradientButton
              title="Sign Out"
              onPress={handleSignOut}
              variant="danger"
              size="small"
              style={styles.signOutButton}
            />
          </Animated.View>

          <View style={styles.inputSection}>
            <FloatingLabelInput
              label="What's on your mind?"
              value={newStatus}
              onChangeText={setNewStatus}
              multiline
              style={styles.inputContainer}
            />
            <GradientButton
              title={loading ? "Posting..." : "Post Status"}
              onPress={handlePostStatus}
              disabled={loading}
              variant="success"
              style={styles.postButton}
            />
          </View>

          <FlatList
            data={statuses}
            renderItem={renderStatus}
            keyExtractor={(item) => item.id}
            style={styles.statusList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.statusListContent}
          />
        </LinearGradient>
        );
}

        const styles = StyleSheet.create({
          container: {
          flex: 1,
  },
        header: {
          flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: InterviUSpacing.layout.screenPadding,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
        ...Platform.select({
          ios: {
          shadowColor: InterviUColors.black,
        shadowOffset: {width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
        android: {
          elevation: 4,
      },
    }),
  },
        title: {
          ...InterviUTypography.styles.h2,
          color: InterviUColors.text.light,
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: {width: 0, height: 2 },
        textShadowRadius: 4,
  },
        signOutButton: {
          minWidth: 100,
  },
        inputSection: {
          padding: InterviUSpacing.layout.screenPadding,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
        inputContainer: {
          marginBottom: InterviUSpacing.spacing[4],
  },
        postButton: {
          alignSelf: "flex-end",
        minWidth: 140,
  },
        statusList: {
          flex: 1,
  },
        statusListContent: {
          padding: InterviUSpacing.layout.screenPadding,
  },
        statusItem: {
          marginBottom: InterviUSpacing.spacing[4],
        borderRadius: InterviUSpacing.borderRadius.lg,
        overflow: "hidden",
        ...InterviUSpacing.shadow.lg,
  },
        statusItemGradient: {
          padding: InterviUSpacing.layout.cardPadding,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: InterviUSpacing.borderRadius.lg,
  },
        statusText: {
          ...InterviUTypography.styles.body,
          color: InterviUColors.text.light,
        marginBottom: InterviUSpacing.spacing[4],
        lineHeight: InterviUTypography.lineHeight.relaxed * InterviUTypography.fontSize.base,
  },
        statusMeta: {
          flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: InterviUSpacing.spacing[2],
  },
        statusUserContainer: {
          flexDirection: "row",
        alignItems: "center",
  },
        userAvatar: {
          width: InterviUSpacing.avatarSize.sm,
        height: InterviUSpacing.avatarSize.sm,
        borderRadius: InterviUSpacing.avatarSize.sm / 2,
        backgroundColor: InterviUColors.purpleBlue,
        marginRight: InterviUSpacing.spacing[2],
  },
        statusUser: {
          ...InterviUTypography.styles.bodySmall,
          color: InterviUColors.lightBlue,
        fontWeight: InterviUTypography.fontWeight.semibold,
  },
        statusTime: {
          ...InterviUTypography.styles.caption,
          color: "rgba(255, 255, 255, 0.6)",
  },
});
