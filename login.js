import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { firebaseConfig } from './firebase.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function showStatusMessage(message, isError = false) {
  const statusElement = document.getElementById('status-message');
  statusElement.textContent = message;
  statusElement.className = 'status-message ' + (isError ? 'error' : 'success');
  statusElement.style.display = 'block';
  setTimeout(() => statusElement.style.display = 'none', 3000);
}

// Sign In with email & password
document.getElementById('signin-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    return showStatusMessage("Please enter both email and password", true);
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    window.location.href = "home.html";
  } catch (err) {
    showStatusMessage(err.message, true);
  }
});

// Sign In with Google
document.getElementById('google-signin-btn').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    window.location.href = "home.html";
  } catch (error) {
    showStatusMessage(error.message, true);
  }
});

// Go to Sign Up page
document.getElementById('signup-btn').addEventListener('click', () => {
  window.location.href = "signup.html";
});

// Password reset
document.getElementById('forgot-password').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  if (!email) return showStatusMessage("Please enter your email first", true);

  sendPasswordResetEmail(auth, email)
    .then(() => showStatusMessage("Password reset email sent!"))
    .catch(error => showStatusMessage(error.message, true));
});

// Toggle password visibility and show registration success
document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.getElementById('toggle-password');
  const passwordField = document.getElementById('password');

  if (togglePassword && passwordField) {
    togglePassword.addEventListener('click', () => {
      const isPassword = passwordField.type === 'password';
      passwordField.type = isPassword ? 'text' : 'password';
      togglePassword.classList.toggle('fa-eye', !isPassword);
      togglePassword.classList.toggle('fa-eye-slash', isPassword);
    });
  }

  if (window.location.search.includes('registered=true')) {
    showStatusMessage('Account created successfully. Please log in.');
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User already logged in:", user.email);
    }
  });
});
