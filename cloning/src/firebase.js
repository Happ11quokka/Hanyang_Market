// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore를 위한 import 추가
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Firebase Auth 및 GoogleAuthProvider 추가
import { getStorage } from "firebase/storage"; // Firebase Storage 추가

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
let analytics;
if (firebaseConfig.measurementId) {
  analytics = getAnalytics(app);
}

// Firestore 인스턴스 생성 및 export
export const db = getFirestore(app);

// Firebase Storage 인스턴스 생성 및 export
export const storage = getStorage(app); // Firebase Storage 초기화

// Firebase Auth 및 Google Auth Provider 설정
export const auth = getAuth(app); // Firebase 인증 인스턴스
export const provider = new GoogleAuthProvider(); // Google Auth Provider 인스턴스
