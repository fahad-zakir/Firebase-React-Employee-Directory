import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCggz-IueBgpcGTsmPmJvF-CXjlh7JVnU8",
  authDomain: "oj-employee-directory.firebaseapp.com",
  projectId: "oj-employee-directory",
  storageBucket: "oj-employee-directory.appspot.com",
  messagingSenderId: "1052728689574",
  appId: "1:1052728689574:web:b7023dd25baf7821340567",
  measurementId: "G-180E7FRY35",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

