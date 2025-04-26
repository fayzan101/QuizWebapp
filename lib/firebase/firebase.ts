import { initializeApp, getApps, FirebaseApp, FirebaseOptions } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc, doc, setDoc, getDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";

import { QuizResult } from "../types";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: FirebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

function listenForQuizResultChanges() {
  const unsub = onSnapshot(collection(db, 'quizResults'), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change.doc.data());
    });
  });

  // Return the unsubscribe function to allow the listener to be removed later
  return unsub;
}

async function saveQuizResult(result: QuizResult) {
  try {
    const userDocRef = doc(db, 'quizResults', result.userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        results: [result],
      });
      listenForQuizResultChanges();
    } else {
      await updateDoc(userDocRef, {
        results: arrayUnion(result),
      });
      listenForQuizResultChanges();
    }
  } catch (error) {
    console.error("Error saving quiz result:", error);
  }
}
export { app, db, firebaseConfig, saveQuizResult };