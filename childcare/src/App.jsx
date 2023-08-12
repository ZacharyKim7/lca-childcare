import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import Timer from './pages/Timer';
import Dashboard from './pages/List';

function App() {

  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {<Route path="/signup" element={<SignupPage />} />}
            {<Route path="/timer" element={<Timer />} />}
            {<Route path="/List" element={<Dashboard />} />}
          </Routes>
        </BrowserRouter>
  );
}

export default App; 