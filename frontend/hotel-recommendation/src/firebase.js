// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDn3ymMDQlYSG5x2Yh13SdidJyqeaFvDHU",
    authDomain: "hotelrecommend-8cec3.firebaseapp.com",
    databaseURL: "https://hotelrecommend-8cec3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hotelrecommend-8cec3",
    storageBucket: "hotelrecommend-8cec3.appspot.com",
    messagingSenderId: "153967533134",
    appId: "1:153967533134:web:864fc1b0a030264dff371f",
    measurementId: "G-DEB8WF845W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database, ref, get, child };
