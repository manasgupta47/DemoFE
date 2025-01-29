import axios from 'axios';

const registerUser = async (formData) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("companyName", formData.companyName);
  data.append("age", formData.age);
  data.append("dob", formData.dob);
  data.append("image", formData.image);

  try {
    const response = await axios.post('http://localhost:8080/api/users/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response;
  } catch (error) {
    throw error.response;
  }
};
const loginUser = async (formData) => {
  const data = new FormData();
  
  data.append("email", formData.email);
  data.append("password", formData.password);
  

  try {
    const response = await axios.post('http://localhost:8080/api/users/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response;
  } catch (error) {
    throw error.response;
  }
};
const verifyOtp = async (formData) => {

  const data = {email:formData.email,otp:Number(formData.otp)}

  try {
    console.log(formData.email);
    
    const response = await axios.post('http://localhost:8080/api/users/verify-otp', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response;
  } catch (error) {
    throw error.response;
  }
};
const getUserByEmail = async (email) => {

  const data = {email:email}

  try {
   
    
    const response = await axios.post('http://localhost:8080/api/users/user', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response;
  } catch (error) {
    throw error.response;
  }
};
const deleteAccount = async (_id) => {


  try {
   
    
    const response = await axios.post('http://localhost:8080/api/users/delete', {_id}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response;
  } catch (error) {
    throw error.response;
  }
};
export default { registerUser,loginUser,verifyOtp,getUserByEmail,deleteAccount };
