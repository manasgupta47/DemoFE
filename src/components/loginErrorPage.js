import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentCSS/loginErrorPage.css'; // Include optional styling

function LoginErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); 
  };

  return (
    <div className="error-page">
      <h1>Sorry, we can't log you in.</h1>
      <p>Please check your credentials </p>
      <button className="go-back-btn" onClick={handleGoBack}>
        Go Back to Login
      </button>
    </div>
  );
}

export default LoginErrorPage;
