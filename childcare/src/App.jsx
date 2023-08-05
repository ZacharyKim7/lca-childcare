import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Timer from './pages/Timer';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtg8_dw3xnaGRMo_YsMX52uuSy1weSbwI",
  authDomain: "lca-childcare.firebaseapp.com",
  projectId: "lca-childcare",
  storageBucket: "lca-childcare.appspot.com",
  messagingSenderId: "712920165922",
  appId: "1:712920165922:web:476c9b5a11c006513d247b"
};

const app = initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const firestore = firebase.firestore();


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