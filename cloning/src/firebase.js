// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore를 위한 import 추가
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Firebase Auth 및 GoogleAuthProvider 추가
import { getStorage } from "firebase/storage"; // Firebase Storage 추가

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGwRwys-N9v0sh2ycxlzviYWLawRGYKSQ",
  authDomain: "carrot-c112d.firebaseapp.com",
  projectId: "carrot-c112d",
  storageBucket: "carrot-c112d.appspot.com", // storageBucket URL 수정
  messagingSenderId: "180814873242",
  appId: "1:180814873242:web:0103e499382f233aa61523",
  measurementId: "G-RTEGQJ9M3T",
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