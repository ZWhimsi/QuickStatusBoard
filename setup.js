#!/usr/bin/env node

/**
 * Quick Status Board Setup Script
 * 
 * This script helps you set up the Firebase configuration and other settings
 * for the Quick Status Board app.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupFirebase() {
  console.log('\n🔥 Firebase Setup');
  console.log('================');
  console.log('Please provide your Firebase configuration details.');
  console.log('You can find these in your Firebase Console > Project Settings > General > Your apps\n');

  const apiKey = await question('API Key: ');
  const authDomain = await question('Auth Domain (e.g., your-project.firebaseapp.com): ');
  const projectId = await question('Project ID: ');
  const storageBucket = await question('Storage Bucket (e.g., your-project.appspot.com): ');
  const messagingSenderId = await question('Messaging Sender ID: ');
  const appId = await question('App ID: ');

  const firebaseConfig = `import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "${apiKey}",
  authDomain: "${authDomain}",
  projectId: "${projectId}",
  storageBucket: "${storageBucket}",
  messagingSenderId: "${messagingSenderId}",
  appId: "${appId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;`;

  fs.writeFileSync(path.join(__dirname, 'config', 'firebase.js'), firebaseConfig);
  console.log('✅ Firebase configuration saved!');
}

async function setupWeatherAPI() {
  console.log('\n🌤️ Weather API Setup');
  console.log('====================');
  console.log('To enable weather features, you need an OpenWeatherMap API key.');
  console.log('Sign up at: https://openweathermap.org/api\n');

  const enableWeather = await question('Do you want to set up weather API now? (y/n): ');
  
  if (enableWeather.toLowerCase() === 'y') {
    const apiKey = await question('OpenWeatherMap API Key: ');
    
    const weatherConfig = fs.readFileSync(path.join(__dirname, 'config', 'weather.js'), 'utf8');
    const updatedConfig = weatherConfig.replace('your-openweathermap-api-key-here', apiKey);
    
    fs.writeFileSync(path.join(__dirname, 'config', 'weather.js'), updatedConfig);
    console.log('✅ Weather API configuration saved!');
  } else {
    console.log('⏭️ Skipping weather API setup. You can configure it later in config/weather.js');
  }
}

async function setupNotifications() {
  console.log('\n🔔 Push Notifications Setup');
  console.log('===========================');
  console.log('To enable push notifications, you need an Expo project ID.');
  console.log('Create a project at: https://expo.dev/\n');

  const enableNotifications = await question('Do you want to set up push notifications now? (y/n): ');
  
  if (enableNotifications.toLowerCase() === 'y') {
    const projectId = await question('Expo Project ID: ');
    
    const notificationConfig = fs.readFileSync(path.join(__dirname, 'config', 'notifications.js'), 'utf8');
    const updatedConfig = notificationConfig.replace('your-expo-project-id', projectId);
    
    fs.writeFileSync(path.join(__dirname, 'config', 'notifications.js'), updatedConfig);
    console.log('✅ Push notifications configuration saved!');
  } else {
    console.log('⏭️ Skipping push notifications setup. You can configure it later in config/notifications.js');
  }
}

async function main() {
  console.log('🚀 Quick Status Board Setup');
  console.log('============================');
  console.log('This script will help you configure the app for first use.\n');

  try {
    await setupFirebase();
    await setupWeatherAPI();
    await setupNotifications();

    console.log('\n🎉 Setup Complete!');
    console.log('==================');
    console.log('Your Quick Status Board app is now configured!');
    console.log('\nNext steps:');
    console.log('1. Run: npm start');
    console.log('2. Install Expo Go on your device');
    console.log('3. Scan the QR code to test the app');
    console.log('\nFor more information, see README.md and EXCEPTIONAL_FEATURES_SETUP.md');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}
