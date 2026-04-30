import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
// Purana: import heroImage from "@/assets/hero-solar.jpg";
// Naya (Correct):
import heroImage from "../assets/hero-solar.jpg";
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);
      const { user, token } = response.data;
      
      auth.login(user, token);
      localStorage.setItem('role', user.role);

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin-portal');
      } else {
        navigate('/user-portal');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-page-wrapper" style={{ backgroundImage: `url(${heroImage})` }}>
    <div className="auth-overlay"></div> {/* Full screen blur/darken */}
    <div className="auth-container">
      <div className="auth-card">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            
            <div className="forgot-link">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
    </div>
  </div>
);

}