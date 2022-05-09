// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGJUcfxWd_DACDoKSxVDYBtc6qSaUow0M",
  authDomain: "locall-b1314.firebaseapp.com",
  projectId: "locall-b1314",
  storageBucket: "locall-b1314.appspot.com",
  messagingSenderId: "754558034630",
  appId: "1:754558034630:web:48272a013b535e3d256dc7",
  measurementId: "G-61S3T25GMP"
};

// Initialize Firebase
if(typeof window !== 'undefined' && !firebase.apps.length) {
    const app = firebase.initializeApp(firebaseConfig);
    //const analytics = getAnalytics(app);
    // Initialize Analytics and get a reference to the service
    if('measurementId' in firebaseConfig) getAnalytics();
}

export default firebase;
