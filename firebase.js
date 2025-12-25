import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Log initial app open
logEvent(analytics, 'app_open');

export const incrementGlobalInstalls = async () => {
  const docRef = doc(db, "stats", "global");
  
  try {
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // Setup initial document if it doesn't exist
      console.log("Document does not exist. Creating new...");
      await setDoc(docRef, { installs: 1 });
      logEvent(analytics, 'first_install_created');
      return 1;
    } else {
      // Increment existing
      await updateDoc(docRef, {
        installs: increment(1)
      });
      logEvent(analytics, 'install_incremented');
      // Return optimistic new value
      return docSnap.data().installs + 1;
    }
  } catch (error) {
    console.error("Firebase Details:", {
        projectId: firebaseConfig.projectId,
        apiKey: firebaseConfig.apiKey ? "Present" : "Missing" 
    });
    console.error("Firestore Error:", error.code, error.message);
    
    // Check for common permission error
    if (error.code === 'permission-denied') {
        console.warn("⚠️ PERMISSION DENIED: Please check your Firestore Security Rules in the Firebase Console.");
        console.warn("Try setting rules to: allow read, write: if true; (for development)");
    }
    
    // Fallback if offline or error
    return 1337;
  }
};

export const getGlobalInstalls = async () => {
    const docRef = doc(db, "stats", "global");
    try {
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data().installs : 0;
    } catch (e) {
        console.error("Error fetching installs:", e);
        return 0;
    }
};
