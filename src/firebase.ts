// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function setupFirebase() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCQQJncQDIy_uUkgtFfCJ6l8oViNR_jLDU",
    authDomain: "dope-lyrics.firebaseapp.com",
    projectId: "dope-lyrics",
    storageBucket: "dope-lyrics.appspot.com",
    messagingSenderId: "7028435857",
    appId: "1:7028435857:web:6695a1ebda6a28d9754830",
    measurementId: "G-HPS1KBE81B",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  console.log({ analytics });
}

export { setupFirebase };
