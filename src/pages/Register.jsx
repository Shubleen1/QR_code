import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
// Purana: import heroImage from "@/assets/hero-solar.jpg";
// Naya (Correct):
import heroImage from "../assets/hero-solar.jpg";
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [searchParams] = useSearchParams();
  const referrer = searchParams.get('referrer');
  
  const [formData, setFormData] = useState({
    email: '', phone: '', firstName: '', lastName: '', password: '', confirmPassword: '', referrerCode: referrer || ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', formData);
      auth.login(response.data.user, response.data.token);
      localStorage.setItem('role', 'user');
      navigate('/user-portal');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="auth-overlay"></div>
      <div className="auth-container">
        <div className="auth-card register-card">
          <h1>Join Solar Referral</h1>
          
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone (10 digits)" onChange={handleChange} required />
            
            <div className="name-row">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            </div>
            
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p> Already have an account? <Link to="/login">Login here</Link> </p>
        </div>
      </div>
    </div>
  );
}