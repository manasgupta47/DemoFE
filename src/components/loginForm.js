import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../componentCSS/loginForm.css'
import registrationService from '../services/userService'
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
      setError('');
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
          const response = await registrationService.loginUser(formData); 
          if (response) {
            console.log(response);
            
              alert("We have sent you 6 digit OTP, Please check your console.");
              console.log("Your OTP is -> ",response.data.otp," it will expire in 10 minutes.");
              setEmail(formData.email);
              setIsLoggedIn(true);  
          }
      } catch (error) {
          if (error.data.message) {
            navigate('/login-error')
              
          }
      }
  };
    const handleOtpChange = (e) => {
      setError('');
      setOtp(e.target.value);

  };

  const handleOtpSubmit =async (e) => {
      e.preventDefault();
      setError('');
      if (otp.length === 6) {
        try {
        
          
          const response = await registrationService.verifyOtp({ email, otp }); 
          if (response.status) {

              alert("You LoggedIn successfully.");
              
                navigate('/user-profile',{ state: { email:email } })
          }
      } catch (error) {
          if (error.data.message) {
            navigate('/login-error')
                
          }
      }
    
      } else {
          setError('Please enter a valid 6-digit OTP');
      }
  };

    return (
      <div >
          {!isLoggedIn ? (
              <div className="container">
                  <h2>User Login</h2>
                  <form onSubmit={handleSubmit}>
                      <div className="form-group">
                          <label>Email:</label>
                          <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                          />
                      </div>

                      <div className="form-group">
                          <label>Password:</label>
                          <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              required
                          />
                      </div>

                      <button type="submit" className="submit-btn">
                          Login
                      </button>

                      {error && <p className="error-message">{error}</p>}
                  </form>

                 
                  <div className="register-link">
                      <p>
                          Don't have an account?{' '}
                          <Link to="/register">Register here</Link>
                      </p>
                  </div>
              </div>
          ) : (
              <div className="container">
                  <h2>Enter 6-Digit OTP</h2>
                  <form onSubmit={handleOtpSubmit}>
                      <div className="otp-form-group">
                          <label>OTP:</label>
                          <input
                              type="text"
                              name="otp"
                              value={otp}
                              onChange={handleOtpChange}
                              maxLength={6}
                              required
                          />
                      </div>
                      {error && <p className="error-message">{error}</p>}
                      <button type="submit" className="submit-btn">
                          Submit OTP
                      </button>

                     
                  </form>
              </div>
          )}
      </div>
  );}

export default LoginForm
