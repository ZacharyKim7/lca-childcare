import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { useEffect } from 'react'

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Timer from './pages/Timer';
import Dashboard from './pages/List';
import Admin from './pages/Admin';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function App() {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/Admin"); // Redirect to "/Admin" if user is not signed in
      }
    });

    // return () => {
    //   // Unsubscribe from the listener when the component unmounts
    //   unsubscribe();
    // };
  }, [auth, navigate]);

  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/timer" element={<Timer />} />
      <Route path="/List" element={<Dashboard />} />
    </Routes>
    // </BrowserRouter>
  );
}

export default App; 