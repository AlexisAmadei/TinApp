import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNvv1Jb38AIcX5sJzjTg32Cq6Z7hTWfnw",
  authDomain: "kiwi-tinapp.firebaseapp.com",
  projectId: "kiwi-tinapp",
  storageBucket: "kiwi-tinapp.appspot.com",
  messagingSenderId: "613168844721",
  appId: "1:613168844721:web:e1f2b0b84fb28d852f7790",
  measurementId: "G-YSX5WJ3HRM"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);