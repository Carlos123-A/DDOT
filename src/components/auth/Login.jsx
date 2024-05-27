import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../Api/apiClient';
import '../../assets/css/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      apiClient.post('/user/login', {
        username,
        password
      })
      .then(response => {
        console.log('Response:', response); 
        
        if (response && response.data && response.data.success) {
          console.log('User logged in successfully');
          
          const { access_token } = response.data.sesion_data;
          localStorage.setItem("accessToken", access_token);
          
          navigate('/');
        } else {
          throw new Error(response.data.error || 'Failed to log in');
        }
      })
      .catch(error => {
        console.error(JSON.stringify(error.response.data, null, 2));
        setError("Las credenciales de inicio de sesión son incorrectas");
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Log in to your account</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="submit-button">Log In</button>
        <div className="register-link">
          <span>Don't have an account? </span>
          <Link to="/register" className="signup-link">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
