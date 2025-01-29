import React, { useState } from "react";
import "../componentCSS/registerForm.css";
import { Link } from 'react-router-dom'
import registrationService from '../services/userService'
import { useNavigate } from "react-router-dom";
function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    age: "",
    dob: "",
    image: null,
  });
const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registrationService.registerUser(formData);
      console.log(response); 
      if(response.status){
      alert("User Registered Successfully")
      navigate('/')
      }
      
    } catch (error) {
      if(error.data.message === 'Email already exists'){
        alert("Email is already registered.")
      }
      else{
        alert("Something went wrong, Please try again!!")
      } 
       }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Company Name:</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Profile Image:</label>
          <input type="file" name="image" onChange={handleImageChange} required />
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
      <div className="login-link">
                <p>
                    Have an account?{' '}
                    <Link to="/">Login here</Link>
                </p>
            </div>
    </div>
  );
}

export default RegistrationForm;
