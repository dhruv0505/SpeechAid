import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD6qUZkPMtuk8VWeWqr8uh16964cTIK49U",
    authDomain: "speech-aid-fa09e.firebaseapp.com",
    projectId: "speech-aid-fa09e",
    storageBucket: "speech-aid-fa09e.appspot.com",
    messagingSenderId: "180472319214",
    appId: "1:180472319214:web:dab077a901feeeffcaf7ff",
    measurementId: "G-ZDWYLQ44N5"   
}

export const firebase_app = initializeApp(firebaseConfig);
