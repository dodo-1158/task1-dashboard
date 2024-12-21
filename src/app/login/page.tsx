'use client'
import Image from 'next/image';
import '../login/page.css';

import React, { useState } from 'react';

interface Errors {
  username?: string;
  password?: string;
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleLogin = () => {
    const validationErrors: Errors = {};
    if (!username) {
      validationErrors.username = 'Username is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      
      console.log('Logging in with', { username, password });
    }
  };

  return (
    <div className="container">
      <div className="login-image">
        <Image src="/login.png" alt="Illustration" width={500} height={500} className="image" />
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span className="error" style={{ color: 'red' }}>{errors.username}</span>}
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error" style={{ color: 'red' }}>{errors.password}</span>}
        <a href="#" className="forgot">Forgot Password</a>
        <button className="login-button" onClick={handleLogin}>Login</button>
        <p>
          {"Don't have an account?"} <a href="/register/user">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
