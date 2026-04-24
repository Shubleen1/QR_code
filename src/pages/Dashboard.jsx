import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    commissionBalance: 0,
    completedProjects: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          navigate('/login');
          return;
        }

        // Get QR Code
        const qrRes = await api.get(`/qr/generate/${user.referralCode}`);
        setQrCode(qrRes.data.qrCode);

        // Get Projects
        const projectsRes = await api.get('/projects/all');
        const userProjects = projectsRes.data.projects.filter(
          p => p.referrerId?._id === user._id
        );
        setProjects(userProjects);

        // Calculate stats
        setStats({
          totalReferrals: userProjects.length,
          commissionBalance: user.commissionBalance || 0,
          completedProjects: userProjects.filter(p => p.status === 'completed').length
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Solar Referral Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Profile Card */}
        <div className="profile-card">
          <h2>Welcome, {user?.firstName}! 👋</h2>
          
          <div className="profile-info">
            <div className="referral-code-box">
              <label>Your Referral Code:</label>
              <div className="code-display">
                <code>{user?.referralCode}</code>
                <button 
                  onClick={() => navigator.clipboard.writeText(user?.referralCode)}
                  className="copy-btn"
                >
                  📋 Copy
                </button>
              </div>
            </div>

            {qrCode && (
              <div className="qr-box">
                <label>Share QR Code:</label>
                <img src={qrCode} alt="QR Code" className="qr-image" />
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatCard 
            label="Total Referrals" 
            value={stats.totalReferrals}
            icon="👥"
          />
          <StatCard 
            label="Commission Balance" 
            value={`₹${stats.commissionBalance}`}
            icon="💰"
          />
          <StatCard 
            label="Completed Projects" 
            value={stats.completedProjects}
            icon="✅"
          />
        </div>

        {/* Projects Table */}
        <div className="projects-section">
          <h3>Your Projects</h3>
          {projects.length > 0 ? (
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Project Cost</th>
                  <th>Status</th>
                  <th>Commission</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project._id}>
                    <td>{project.customerName}</td>
                    <td>₹{project.projectCost.toLocaleString()}</td>
                    <td className={`status ${project.status}`}>{project.status}</td>
                    <td>₹{project.commissionEarned || 0}</td>
                    <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-projects">No projects yet. Share your referral code to get started!</p>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}