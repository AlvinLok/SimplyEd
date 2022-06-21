// all JS goes in here
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';

import { getFirebaseConfig } from './firebase-config.js';

const googleSignInButton = document.querySelector('#googlelogin');
const facebookSignInButton = document.querySelector('#fblogin');
const userPicElement = document.querySelector('#user-img');
const userNameElement = document.querySelector('#user-name');
const signOutButtonElement = document.querySelector('#logout');

googleSignInButton.addEventListener('click', () => {
  console.log('google login clicked');
  googleSignIn();
});

facebookSignInButton.addEventListener('click', () => {
  console.log('fb login clicked');
  facebookSignIn();
});

signOutButtonElement.addEventListener('click', () => {
  console.log('sign-out btn clicked!');
  signOutUser();
});

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

// Signs-in to SimplyEd
async function googleSignIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var googleProvider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), googleProvider);
}

async function facebookSignIn() {
  var facebookProvider = new FacebookAuthProvider();
  await signInWithPopup(getAuth(), facebookProvider);
}

// Signs-out of SimplyEd
function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

// Initialize firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return (
    getAuth().currentUser.photoURL || '/dist/images/profile_placeholder.png'
  );
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    var img = document.createElement('img');
    img.src = profilePicUrl;
    userPicElement.appendChild(img);
    // userPicElement.style.backgroundImage =
    //   'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = `Welcome to SimplyEd, ${userName}!`;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    googleSignInButton.setAttribute('hidden', 'true');
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    googleSignInButton.removeAttribute('hidden');
  }
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

initFirebaseAuth();
console.log('hello from index.js');
