import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import '../componentCSS/userProfile.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function UserProfile() {
  const location = useLocation();
  const { email } = location.state || {};
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [user_id,setuser_id] = useState('')
const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        const response = await userService.getUserByEmail(email);

        // Set the user data
        setUser(response.data.user);
        setuser_id(response.data.user._id)
        
        
      } catch (err) {
        setError('Error fetching user data');
        
      }
    };

    fetchUserData();
  }, [email]); // Empty dependency array to run only once on component mount
  const handleDeleteAccount =async (e) => {
    const response = await userService.deleteAccount(user_id);
    if(response.status){
      alert("Account Deleted Successfully.")
      navigate('/');
    }
    
    e.preventDefault();

};

  return (
    <div className="user-profile">
<h2>Welcome to the account page.</h2>
      <h3>User Profile</h3>

      {user ? (
        <>
        <div className="user-details">
         
        
          {user.image && (
            <div className="user-image">
              <img
                src={`data:${user.image.contentType};base64,${user.image.data}`}
                alt="User"
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
          )}
           <div className='user-data'>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Company:</strong> {user.companyName}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
</div>

        </div>
        <button type="submit" className="submit-btn" onClick={handleDeleteAccount}>
                          Delete Account
                      </button>
        </>
      ) : (
        <p>No user data available</p>
      )
      
      }
     
    </div>
  );
}

export default UserProfile;
