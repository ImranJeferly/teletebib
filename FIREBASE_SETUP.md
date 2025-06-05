# Firebase Setup Instructions for TeleTebib

This guide will help you connect your TeleTebib website to Firebase Firestore database.

## Prerequisites

- A Google account
- Your TeleTebib project running locally

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `teletebib` (or your preferred name)
4. Disable Google Analytics (we don't need it)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location closest to your users (e.g., europe-west1 for Europe)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click the gear icon → "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon `</>` to add a web app
4. Enter app nickname: `teletebib-web`
5. Don't check "Firebase Hosting" (we're using Vercel/other hosting)
6. Click "Register app"
7. Copy the `firebaseConfig` object values

## Step 4: Update Environment Variables

1. Open your `.env.local` file in the project root
2. Replace the placeholder values with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
```

## Step 5: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your website in the browser
3. Try submitting an email in the hero section or waitlist section
4. Check your Firestore database - you should see new collections created:
   - `waitlist` - for email signups

## Firestore Collections Structure

Your Firebase Firestore will automatically create these collections:

### `waitlist` Collection
```json
{
  "email": "user@example.com",
  "userType": "patient",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "source": "landing_page"
}
```

### `doctor_applications` Collection
```json
{
  "email": "doctor@example.com",
  "fullName": "Dr. John Smith",
  "specialty": "Cardiologist",
  "licenseNumber": "12345",
  "experience": "5+ years",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "status": "pending"
}
```

### `contact_forms` Collection
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "message": "Hello...",
  "subject": "Question",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "status": "unread"
}
```

## Security Rules (Optional - for Production)

When you're ready for production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to waitlist for everyone
    match /waitlist/{document} {
      allow create: if true;
      allow read: if false; // Users can't read the waitlist
    }
    
    // Allow read/write access to contact forms for everyone
    match /contact_forms/{document} {
      allow create: if true;
      allow read: if false; // Users can't read contact forms
    }
    
    // Allow read/write access to doctor applications for everyone
    match /doctor_applications/{document} {
      allow create: if true;
      allow read: if false; // Users can't read applications
    }
  }
}
```

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**: Check your environment variables are correctly set
2. **Permission denied**: Make sure Firestore is in test mode or check your security rules
3. **Module not found**: Make sure you've installed Firebase: `npm install firebase`

### Debugging Steps:

1. Check browser console for errors
2. Verify `.env.local` file is in the project root
3. Restart your development server after changing environment variables
4. Check that your Firebase project ID matches the one in your config

## Features Integrated

✅ Email collection for early access (hero section)
✅ Waitlist signup
✅ Contact form submission
✅ Doctor application submission
✅ Real-time waitlist count display
✅ Duplicate email prevention
✅ Error handling and user feedback

Your TeleTebib website is now connected to Firebase Firestore and ready to collect user data!
