# Quick Status Board

A real-time mobile application for sharing short status updates with your partner(s). Built with React Native (Expo) and Firebase.

## Features

- **User Authentication**: Sign up and login with email/password
- **Real-time Status Feed**: Post and view status updates in real-time
- **Clean UI**: Modern, intuitive interface for easy status sharing
- **Character Limit**: 280-character limit to keep statuses concise
- **Responsive Design**: Works on both Android and iOS devices

## Prerequisites

Before running this application, you need to set up:

1. **Node.js** (v16 or higher)
2. **Expo CLI**: `npm install -g @expo/cli`
3. **Firebase Project**: Create a project at [Firebase Console](https://console.firebase.google.com/)

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password authentication
3. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in test mode (for development)
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click "Add app" and select Web app
   - Copy the configuration object

## Installation

1. Clone this repository:

   ```bash
   git clone <your-repo-url>
   cd QuickStatusBoard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:
   - Open `config/firebase.js`
   - Replace the placeholder values with your actual Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-actual-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-actual-sender-id",
     appId: "your-actual-app-id",
   };
   ```

## Running the App

### Development

1. Start the Expo development server:

   ```bash
   npm start
   ```

2. Install Expo Go app on your Android/iOS device

3. Scan the QR code with:
   - **Android**: Expo Go app
   - **iOS**: Camera app (will redirect to Expo Go)

### Testing on Emulator

1. **Android**:

   - Install Android Studio
   - Set up an Android Virtual Device (AVD)
   - Run: `npm run android`

2. **iOS** (macOS only):
   - Install Xcode
   - Run: `npm run ios`

## Project Structure

```
QuickStatusBoard/
├── App.js                 # Main application component
├── config/
│   ├── firebase.js       # Firebase configuration
│   ├── auth.js           # Authentication functions
│   └── firestore.js      # Firestore database functions
├── screens/
│   ├── AuthScreen.js     # Login/Signup screen
│   └── FeedScreen.js     # Main feed screen
├── components/           # Reusable UI components (future)
└── assets/              # Images and other assets
```

## Data Model

### Firestore Collections

#### `users` Collection

- **Document ID**: Firebase Auth User ID (`uid`)
- **Fields**:
  - `email`: User's email address
  - `createdAt`: Account creation timestamp

#### `statuses` Collection

- **Document ID**: Auto-generated
- **Fields**:
  - `content`: Status message text
  - `authorId`: User ID who posted the status
  - `authorEmail`: User's email (denormalized for easy display)
  - `createdAt`: Server timestamp

## Security Rules

For development, use these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Authenticated users can read all statuses and create new ones
    match /statuses/{statusId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null &&
        request.auth.uid == resource.data.authorId;
    }
  }
}
```

## Assignment Compliance

This project fulfills all required assignment criteria:

✅ **Development Environment**: React Native with Expo  
✅ **Sample App on Device**: Deployable via Expo Go  
✅ **Git Repository**: This repository with documentation  
✅ **Partner Collaboration**: Shared codebase for collaborative development  
✅ **Web Service Backend**: Firebase Firestore for data storage  
✅ **Exceptional Features**: Ready for weather API, location, and push notifications

## Future Enhancements (Exceptional Features)

- **Weather Integration**: Tag statuses with current weather
- **Location Services**: Add location information to posts
- **Push Notifications**: Notify partners of new status updates
- **User Profiles**: Enhanced user information and avatars
- **Status Reactions**: Like/react to status updates

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**: Verify your Firebase configuration in `config/firebase.js`
2. **Authentication Issues**: Ensure Email/Password is enabled in Firebase Console
3. **Build Errors**: Clear cache with `expo start -c`
4. **Device Connection**: Ensure your device and computer are on the same network

### Getting Help

- Check the [Expo Documentation](https://docs.expo.dev/)
- Review [Firebase Documentation](https://firebase.google.com/docs)
- Check the Issues tab in this repository

## License

This project is created for educational purposes as part of a mobile application development course.
