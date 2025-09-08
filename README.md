
# StudyCalm - Your Mindful Learning Guide

StudyCalm is a Next.js application designed to help students manage their mental well-being while achieving academic success. It blends AI-powered personalized study plans with tools for stress management and mindfulness.

## ✨ Features

- **AI-Powered Study Plans:** Get a personalized study schedule based on your goals, workload, and stress levels.
- **Mood Journaling:** Track your mood and reflect on your day. Receive intelligent, AI-generated tips based on your entries.
- **Weekly Burnout Check-in:** A quick self-assessment to monitor your well-being.
- **Stress & Focus Toolkit:** A suite of tools including a Pomodoro timer and a guided breathing exercise.
- **Knowledge Base:** Ask the AI questions about mental health, study techniques, and well-being.
- **Curated Resources:** A list of helpful articles and support organizations.
- **Secure Authentication:** Firebase-powered user login and registration.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/studycalm.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the development server
   ```sh
   npm run dev
   ```
Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

##  Vercel Deployment

To deploy this application to Vercel, follow these steps:

1. **Push to GitHub:** Ensure your latest code is pushed to a GitHub repository.

2. **Import Project in Vercel:**
   - Log in to your Vercel account.
   - Click on "Add New..." -> "Project".
   - Import the GitHub repository you just created.

3. **Configure Environment Variables:**
   - In the project settings on Vercel, navigate to the "Environment Variables" section.
   - You will need to add the Firebase configuration details. Your `src/lib/firebase.ts` file contains these values, but they should be stored securely as environment variables for production.
   - Add the following variables:

   | Name | Value |
   | :--- | :--- |
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase `apiKey` |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Your Firebase `authDomain` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Your Firebase `projectId` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`| Your Firebase `storageBucket` |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| Your Firebase `messagingSenderId` |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | Your Firebase `appId` |
   | `GEMINI_API_KEY` | Your Google AI (Gemini) API Key |

   **Important:** You will also need to update `src/lib/firebase.ts` to *use* these environment variables instead of hardcoding the values. This is critical for security.

4. **Deploy:** Once the variables are set, trigger a deployment. Vercel will build and deploy your application.

## Firebase Setup

This application requires a Firebase project with **Firestore Database** and **Authentication** enabled.

### Security Rules

You must configure Firestore security rules to protect user data. Go to the "Rules" tab in your Firestore database and paste the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /journalEntries/{entryId} {
      allow create, read, update, delete: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

### Firestore Indexes

The application's queries require a composite index. In your Firestore "Indexes" tab, create a new index with the following configuration:

- **Collection ID:** `journalEntries`
- **Fields to index:**
  1. `userId` (Ascending)
  2. `date` (Descending)
- **Query scope:** `Collection`
