// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyDAntw03YWct9bg4ARX10AK10oi7nhXHn0",
    authDomain: "simplyed-b5a8d.firebaseapp.com",
    projectId: "simplyed-b5a8d",
    storageBucket: "simplyed-b5a8d.appspot.com",
    messagingSenderId: "253597455390",
    appId: "1:253597455390:web:7b0935fd686042b8df0a0f",
    measurementId: "G-SVBSTHXPCV"
  };

  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }