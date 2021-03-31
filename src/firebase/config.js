import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDdn3QeUB2ysx_C0lLGe9WQfmQHAPQq2NA",
    authDomain: "micard-testing.firebaseapp.com",
    projectId: "micard-testing",
    storageBucket: "micard-testing.appspot.com",
    messagingSenderId: "320882491783",
    appId: "1:320882491783:web:341a50ab585a41ed3f5322",
    measurementId: "G-CBP408EQB5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };