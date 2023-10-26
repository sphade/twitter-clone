// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { browser } from '$app/environment';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD9bHIRIKDLZ9ViNqzuMJD9HUZKw-eDKw4',
	authDomain: 'twitter-clone-2d604.firebaseapp.com',
	projectId: 'twitter-clone-2d604',
	storageBucket: 'twitter-clone-2d604.appspot.com',
	messagingSenderId: '655787914692',
	appId: '1:655787914692:web:9ef322abc78f876a0da091',
	measurementId: 'G-2L1K7G06KW'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (browser) {
	getAnalytics(app);
}
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
