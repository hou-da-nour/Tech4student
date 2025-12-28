// src/lib/firebase.js

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBX_lc9uT1ylouqLSm_gO6th52zW0M2HW4",
  authDomain: "tech4student-107a7.firebaseapp.com",
  projectId: "tech4student-107a7",
  storageBucket: "tech4student-107a7.firebasestorage.app",
  messagingSenderId: "487726871128",
  appId: "1:487726871128:web:2ed3a6db86af011599d02d",
}

// Initialisation Firebase
const app = initializeApp(firebaseConfig)

// Services Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// (Optionnel) Export app si besoin
export default app
