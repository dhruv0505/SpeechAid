import firebase_app from './firebase_config.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

auth = getAuth(firebase_app)
function sign_up (email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

function log_in (email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.warn(user)
      return true
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return false
    });
}

const provider = new GoogleAuthProvider();

function google_sign_in () {
  signInWithPopup(auth, provider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // IdP data available using getAdditionalUserInfo(result)
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
}

export {log_in, sign_up, google_sign_in};