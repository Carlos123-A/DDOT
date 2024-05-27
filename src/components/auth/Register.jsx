import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../Api/apiClient'; 
import '../../assets/css/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value; 

    try {
      const response = await apiClient.post('/user/register', { 
        username,
        password,
        confirm_password
      });

      if (response.status === 200) {
        console.log('Usuario registrado exitosamente');
        navigate('/login'); 
      } else {
        throw new Error('No se pudo registrar el usuario');
      }
    } catch (error) {
      console.error(JSON.stringify(error.response.data, null, 2));
      setError('No se pudo registrar el usuario');
    }
  };

  return (
    <div className="register-container">
      <h2>Sign up for an account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {errors && (
          <div className="error-message">{errors}</div>
        )}
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" required className="input-field" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" required className="input-field" />
        </div>
        <div className="form-group">
          <label>Confirm Password</label> 
          <input type="password" name="confirm_password" required className="input-field" /> 
        </div>
        <button type="submit" className="submit-button">Register</button>
        <div className="login-link">
          <span>Already have an account? </span>
          <Link to="/login" className="signin-link">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
