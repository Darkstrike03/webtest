  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC2Sg66mNm_deXYgAC5ZIDeaHTH4GNx6l0",
    authDomain: "ethereal-archives.firebaseapp.com",
    databaseURL: "https://ethereal-archives-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ethereal-archives",
    storageBucket: "ethereal-archives.firebasestorage.app",
    messagingSenderId: "107167505498",
    appId: "1:107167505498:web:6fea7348252e10741dcc63",
    measurementId: "G-ER844ZCXPZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
