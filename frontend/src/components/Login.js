import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const backgroundImage = 'https://your-image-url.com/background.jpg';

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: emailOrUsername, 
          password: password 
        }),
      });
      
      let data = await response.json();

      if (!data.success) {
        response = await fetch(`${BACKEND_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email: emailOrUsername, 
            password: password 
          }),
        });

        data = await response.json();
      }

      if (data.success) {
        const temptoken = data.ResponseData.temptoken;
        localStorage.setItem('temptoken', temptoken);
        
        response = await fetch(`${BACKEND_URL}/newotp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${temptoken}`
          },
        });

        const otpData = await response.json();
        localStorage.setItem('otp',otpData.newOTP);
        if (otpData.success) {
          history('/auth');
        } else {
          alert('Failed to generate OTP');
        }
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div
        className="login-box"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="emailOrUsername">Email/Username</label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              required
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
