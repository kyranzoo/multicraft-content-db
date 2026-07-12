import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuration matching firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyBK2npy68OcpHfR7HhsVYANRir4uNa81gs",
  authDomain: "gen-lang-client-0350658195.firebaseapp.com",
  projectId: "gen-lang-client-0350658195",
  storageBucket: "gen-lang-client-0350658195.firebasestorage.app",
  messagingSenderId: "106566382418",
  appId: "1:106566382418:web:f7f1c5b5f0a2ec5752808b"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the custom databaseId provided in config
const db = getFirestore(app, "ai-studio-multicraftmods-5af19ec5-6c91-4e7d-af5c-650ea35feef5");

// Initialize Authentication and Storage
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
export default app;
