// firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyA-fksOhjoL0qvsUM4ysLFEWqlGh0xrvkA",

  authDomain: "the-quoter.firebaseapp.com",

  projectId: "the-quoter",

  storageBucket: "the-quoter.appspot.com",

  messagingSenderId: "559417637708",

  appId: "1:559417637708:web:078c75c6f13f34aca6ade9",

  measurementId: "G-Z5B55W9VZK",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
