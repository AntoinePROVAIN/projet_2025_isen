import React, { useState } from 'react';
import '../assets/css/admin_connexion.css';

function ConnexionAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page refresh

    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login success:', data);
      setSuccessMsg('Logged in successfully!');
      setErrorMsg('');

      //Save token to localStorage
      localStorage.setItem('token', data.token);

      // Redirect to admin dashboard
      window.location.href = '/admin/dashboard';

    } catch (error: any) {
      console.error('Login error:', error);
      setErrorMsg(error.message);
      setSuccessMsg('');
    }
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="container">
        <label htmlFor="email"><b>Email</b></label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      </div>

      <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
        <button
          type="button"
          className="cancelbtn"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ConnexionAdmin;
