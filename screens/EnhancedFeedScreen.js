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
  Image,
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
import InterviUBrandStyles, {
  InterviUColors,
  InterviUTypography,
  InterviUSpacing,
} from "../assets/styles/brandStyles";

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
        <View style={styles.headerLeft}>
          <Image
            source={require("../assets/logos/HD (1).png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.title}>InterviU</Text>
        </View>
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
    ...InterviUBrandStyles.container,
  },
  header: {
    ...InterviUBrandStyles.header,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: InterviUSpacing.spacing[2],
  },
  title: {
    ...InterviUTypography.styles.h3,
    color: InterviUColors.purpleBlue,
  },
  signOutButton: {
    backgroundColor: InterviUColors.error,
    paddingHorizontal: InterviUSpacing.spacing[4],
    paddingVertical: InterviUSpacing.spacing[2],
    borderRadius: InterviUSpacing.borderRadius.base,
  },
  signOutText: {
    ...InterviUTypography.styles.caption,
    color: InterviUColors.white,
    fontWeight: InterviUTypography.fontWeight.semibold,
  },
  infoSection: {
    ...InterviUBrandStyles.card,
    margin: InterviUSpacing.layout.screenPadding,
    backgroundColor: InterviUColors.background.secondary,
  },
  locationButton: {
    ...InterviUBrandStyles.primaryButton,
    marginBottom: InterviUSpacing.spacing[3],
  },
  locationButtonText: {
    ...InterviUBrandStyles.primaryButtonText,
  },
  locationInfo: {
    marginBottom: InterviUSpacing.spacing[3],
  },
  locationText: {
    ...InterviUTypography.styles.bodySmall,
    color: InterviUColors.text.secondary,
    fontWeight: InterviUTypography.fontWeight.semibold,
  },
  weatherInfo: {
    backgroundColor: InterviUColors.lightBlue + "20",
    padding: InterviUSpacing.spacing[3],
    borderRadius: InterviUSpacing.borderRadius.base,
    marginBottom: InterviUSpacing.spacing[2],
  },
  weatherText: {
    ...InterviUTypography.styles.body,
    color: InterviUColors.mediumBlue,
    fontWeight: InterviUTypography.fontWeight.semibold,
  },
  weatherDetails: {
    ...InterviUTypography.styles.caption,
    color: InterviUColors.text.muted,
    marginTop: InterviUSpacing.spacing[1],
  },
  inputSection: {
    ...InterviUBrandStyles.card,
    margin: InterviUSpacing.layout.screenPadding,
  },
  textInput: {
    ...InterviUBrandStyles.input,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: InterviUSpacing.spacing[4],
  },
  postButton: {
    ...InterviUBrandStyles.primaryButton,
    alignSelf: "flex-end",
    paddingHorizontal: InterviUSpacing.spacing[6],
  },
  buttonDisabled: {
    backgroundColor: InterviUColors.gray[400],
  },
  postButtonText: {
    ...InterviUBrandStyles.primaryButtonText,
  },
  statusList: {
    flex: 1,
    paddingHorizontal: InterviUSpacing.layout.screenPadding,
  },
  statusItem: {
    ...InterviUBrandStyles.card,
    marginBottom: InterviUSpacing.spacing[4],
  },
  statusText: {
    ...InterviUTypography.styles.body,
    color: InterviUColors.text.primary,
    marginBottom: InterviUSpacing.spacing[2],
  },
  statusUser: {
    ...InterviUTypography.styles.bodySmall,
    color: InterviUColors.text.secondary,
    fontWeight: InterviUTypography.fontWeight.semibold,
  },
  statusLocation: {
    ...InterviUTypography.styles.caption,
    color: InterviUColors.purpleBlue,
    marginTop: InterviUSpacing.spacing[1],
    fontStyle: "italic",
  },
  statusTime: {
    ...InterviUTypography.styles.caption,
    color: InterviUColors.text.muted,
    marginTop: InterviUSpacing.spacing[1],
  },
});
