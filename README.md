Here's an updated version of your README to reflect the addition of Firebase as the backend:

```markdown
# Quiz Web App

A full-featured quiz web application built using TypeScript. This app allows users to take quizzes across various courses, securely stores quiz results, and provides an admin dashboard for managing and reviewing quiz records. Anti-cheating measures are in place to ensure quiz integrity.

## Features

### Multi-course Quiz System:
- Supports quizzes for multiple courses/topics.

### Result Tracking:
- Automatically saves quiz scores and relevant data.

### Admin Dashboard:
- Admins can log in securely.
- View all student quiz records.
- Monitor performance across courses.

### Anti-Cheating:
- Tab switching during a quiz leads to automatic disqualification.
- The system gives a score of 0 if a user switches tabs during an active quiz.

## Firebase Integration

This project uses Firebase as its backend solution. Firebase is used for:
- Storing quiz data in Firestore.
- Syncing quiz results in real-time across devices.
- Seamless continuation of quizzes between devices.

Firebase also provides real-time updates to quiz results, ensuring that both users and admins have up-to-date information.

## Technologies Used

### Frontend:
- TypeScript
- HTML
- CSS

### Backend:
- Firebase Firestore for data storage and real-time syncing
- Firebase Authentication for secure login and user management

### Other Tools:
- Firebase SDK for client-side communication with Firebase services

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiz-web-app.git
   cd quiz-web-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project in the Firebase console.
   - Add Firebase configuration in your project’s `.env` file:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. Start the app:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed explanation of your changes.

