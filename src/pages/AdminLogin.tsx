import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded admin credentials (replace with real auth in production)
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Admin Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          className="w-full mb-4 p-2 border rounded text-blue-700 dark:text-blue-300"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border rounded text-blue-700 dark:text-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-primary text-white py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
} 