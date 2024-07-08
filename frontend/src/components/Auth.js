import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [otp, setOtp] = useState('');
  const history = useNavigate();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Retrieve OTP from localStorage on component mount
    const storedOTP = localStorage.getItem('otp');
    if (storedOTP) {
      setOtp(storedOTP);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const temptoken = localStorage.getItem('temptoken');
      const enteredOTP = otp; // Use the current state value of otp

      const response = await fetch(`${BACKEND_URL}/verifyotp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${temptoken}`  // Include perm_token as Bearer token
        },
        body: JSON.stringify({ otp: enteredOTP }),
      });

      const data = await response.json();
      if (data.success) {
        alert('OTP verified successfully!');
        history('/home'); // Redirect to home page upon successful OTP verification
      } else {
        alert('Failed to verify OTP'); // Handle OTP verification failure
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.'); // Generic error handling
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
