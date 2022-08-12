// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEhWJztHt0mcBoa4ac_w13XnzPQktSVmY",
  authDomain: "rn-gram.firebaseapp.com",
  projectId: "rn-gram",
  storageBucket: "rn-gram.appspot.com",
  messagingSenderId: "796465626860",
  appId: "1:796465626860:web:58fcfe36ca21cf9b1e2fc9",
  measurementId: "G-ZVZ9MYWWRZ"
};
// Initialize Firebase

export const app = initializeApp(firebaseConfig)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false
})

// Adding doc to firebase
// addDoc(userCollectionRef, {
//   owner_uid: authUser.user.uid,
//   username: username,
//   email: authUser.user.email,
//   profile_picture: await getRandomProfilePicture()
// })
