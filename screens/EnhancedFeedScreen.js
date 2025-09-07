import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
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
import { getCurrentLocation } from "../config/location";
import { getWeatherData } from "../config/weather";
import { scheduleLocalNotification } from "../config/notifications";

export default function EnhancedFeedScreen({ onSignOut }) {
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

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

  const getLocationAndWeather = async () => {
    setLocationLoading(true);
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      const weatherData = await getWeatherData(
        currentLocation.latitude,
        currentLocation.longitude
      );
      setWeather(weatherData);
    } catch (error) {
      Alert.alert("Location Error", error.message);
    } finally {
      setLocationLoading(false);
    }
  };

  const handlePostStatus = async () => {
    if (!newStatus.trim()) {
      Alert.alert("Error", "Please enter a status");
      return;
    }

    setLoading(true);
    try {
      const statusData = {
        text: newStatus.trim(),
        user: auth.currentUser?.email || "Anonymous",
        timestamp: serverTimestamp(),
      };

      // Add location if available
      if (location) {
        statusData.location = location.address;
        statusData.coordinates = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
      }

      // Add weather if available
      if (weather) {
        statusData.weather = weather;
      }

      await addDoc(collection(db, "statuses"), statusData);
      setNewStatus("");

      // Send local notification
      await scheduleLocalNotification(
        "Status Posted!",
        "Your status has been shared successfully"
      );
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

      {item.location && (
        <Text style={styles.statusLocation}>📍 {item.location}</Text>
      )}

      {item.weather && (
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherText}>
            {item.weather.icon} {item.weather.temperature} -{" "}
            {item.weather.description}
          </Text>
        </View>
      )}

      <Text style={styles.statusTime}>
        {item.timestamp?.toDate?.()?.toLocaleString() || "Just now"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick Status Board</Text>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Location and Weather Section */}
      <View style={styles.infoSection}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getLocationAndWeather}
          disabled={locationLoading}
        >
          <Text style={styles.locationButtonText}>
            {locationLoading
              ? "Getting Location..."
              : "📍 Get Location & Weather"}
          </Text>
        </TouchableOpacity>

        {location && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>📍 {location.address}</Text>
          </View>
        )}

        {weather && (
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherText}>
              {weather.icon} {weather.temperature} - {weather.description}
            </Text>
            <Text style={styles.weatherDetails}>
              Humidity: {weather.humidity} | Wind: {weather.windSpeed}
            </Text>
          </View>
        )}
      </View>

      {/* Status Input Section */}
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

      {/* Status Feed */}
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
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f8f9fa",
  },
  locationButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  locationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationInfo: {
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
  weatherInfo: {
    backgroundColor: "#e3f2fd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  weatherText: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "bold",
  },
  weatherDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
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
  statusLocation: {
    fontSize: 12,
    color: "#007AFF",
    marginTop: 4,
    fontStyle: "italic",
  },
  statusTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});
