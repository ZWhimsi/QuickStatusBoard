import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import InterviUBrandStyles, {
  InterviUColors,
  InterviUTypography,
  InterviUSpacing,
} from "../assets/styles/brandStyles";

export default function AuthScreen({ onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logos/HD (1).png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>InterviU</Text>
      <Text style={styles.subtitle}>
        {isSignUp ? "Create Account" : "Sign In"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={InterviUColors.text.muted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={InterviUColors.text.muted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleAuth}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.switchText}>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...InterviUBrandStyles.container,
    justifyContent: "center",
    paddingHorizontal: InterviUSpacing.layout.screenPadding,
    paddingVertical: InterviUSpacing.spacing[8],
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: InterviUSpacing.spacing[6],
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    ...InterviUTypography.styles.h1,
    color: InterviUColors.purpleBlue,
    textAlign: "center",
    marginBottom: InterviUSpacing.spacing[2],
  },
  subtitle: {
    ...InterviUTypography.styles.h4,
    color: InterviUColors.text.secondary,
    textAlign: "center",
    marginBottom: InterviUSpacing.spacing[8],
  },
  input: {
    ...InterviUBrandStyles.input,
    marginBottom: InterviUSpacing.spacing[4],
  },
  button: {
    ...InterviUBrandStyles.primaryButton,
    marginBottom: InterviUSpacing.spacing[4],
  },
  buttonDisabled: {
    backgroundColor: InterviUColors.gray[400],
  },
  buttonText: {
    ...InterviUBrandStyles.primaryButtonText,
  },
  switchButton: {
    padding: InterviUSpacing.spacing[3],
  },
  switchText: {
    ...InterviUTypography.styles.link,
    color: InterviUColors.purpleBlue,
    textAlign: "center",
  },
});
