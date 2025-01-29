import './App.css';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import UserProfile from './components/userProfile';
import LoginErrorPage from './components/loginErrorPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<LoginForm />} /> 
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/user-profile" element={<UserProfile />} />

          <Route path="/login-error" element={<LoginErrorPage />} />

          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
