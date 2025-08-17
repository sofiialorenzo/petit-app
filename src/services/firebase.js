import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-FGMb_gowzArFZtctOm9CEBzz36aRKvk",
    authDomain: "petit-801ee.firebaseapp.com",
    projectId: "petit-801ee",
    storageBucket: "petit-801ee.appspot.com",
    messagingSenderId: "985638923755",
    appId: "1:985638923755:web:095f85d21bee872d0f3dae"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);