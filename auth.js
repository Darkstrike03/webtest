import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2Sg66mNm_deXYgAC5ZIDeaHTH4GNx6l0",
    authDomain: "ethereal-archives.firebaseapp.com",
    projectId: "ethereal-archives",
    storageBucket: "ethereal-archives.appspot.com",
    messagingSenderId: "107167505498",
    appId: "1:107167505498:web:6fea7348252e10741dcc63",
    measurementId: "G-ER844ZCXPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const app = getDatabase(app);
export { auth, database, ref, set, get, child, signOut, onAuthStateChanged };
// Signup function
async function signUp() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        alert("Verification email sent! Please check your inbox.");
        document.getElementById('signupContainer').style.display = 'none';
        document.getElementById('loginContainer').style.display = 'block';

    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Login function
// Login function (without email verification check)
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        // Redirect or load user data here if needed
        window.location.href = "index.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
}


// Export functions to be accessible globally
window.signUp = signUp;
window.login = login;
