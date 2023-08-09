import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Timer from './pages/Timer';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// import { initializeApp } from "firebase/app";
// import { DocumentSnapshot, getFirestore } from "firebase/firestore";
// import { collection, addDoc, query, where, doc, getDoc, setDoc, Timestamp } from "firebase/firestore"; 
// import { firebaseConfig } from './firebase';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // const students = firebase.firestore().collection("students");

// try {
//   const docRef = await addDoc(collection(db, "students"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            {<Route path="/signup" element={<SignupPage/>} />}
            {<Route path="/timer" element={<Timer/>} />}
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App; 