import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: "AIzaSyCkl7ycehtOqwcygO2w-b8CV0mT7hcC3-8",
	authDomain: "login-2e18b.firebaseapp.com",
	databaseURL: "https://login-2e18b-default-rtdb.firebaseio.com/",
	projectId: "login-2e18b",
	storageBucket: "login-2e18b.appspot.com",
	messagingSenderId: "152555572397",
	appId: "1:152555572397:web:c7b2c3e3d2387723634a24",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };
