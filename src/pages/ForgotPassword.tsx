import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setMessage("Reset link sent to your email!");
    } catch (err) {
      setMessage("Error sending email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 1. Added the full-screen wrapper */
    <div className="auth-page-wrapper">
      <div className="auth-overlay"></div>

      <div className="auth-container">
        <div className="auth-card">
          <h1>Reset Password</h1>
          {/* Changed this <p> to match our CSS class */}
          <p className="auth-subtitle">Enter your email to receive a reset link.</p>

          {/* 2. Added this block so the user can actually see success/error messages */}
          {message && (
            <p style={{ 
              color: message.includes('Error') ? '#ff6b6b' : '#4cd137', 
              fontWeight: '600',
              marginBottom: '15px' 
            }}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            {/* Added uppercase text to match the login button style */}
            <button type="submit" disabled={loading}>
              {loading ? 'SENDING...' : 'SEND RESET LINK'}
            </button>
          </form>

          {/* 3. Wrapped the Link in auth-links to get the Gold hover effect */}
          <div className="auth-links">
            <Link to="/login">Back to Login</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}