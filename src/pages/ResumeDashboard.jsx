'use client';

import { useNavigate } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';
import Header from '../components/Header';
import '../styles/ResumeDashboard.css';

export default function ResumeDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNewResume = () => {
    navigate('/job-details');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard-container">
      <Header onLogout={handleLogout} />

      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <div>
              <h1 className="section-title">Dashboard</h1>
              <p className="dashboard-greeting">Welcome back, {user.name}!</p>
            </div>
          </div>
        </div>

        {/* New Resume Card */}
        <div className="dashboard-section">
          <div
            className="new-resume-card"
            onClick={handleNewResume}
            style={{ cursor: 'pointer' }}
          >
            <div className="new-resume-icon">
              <Plus size={24} />
            </div>
            <p className="new-resume-text">Create New Resume</p>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Resumes</h2>
            <span className="view-all-link">View All</span>
          </div>

          <div className="resumes-grid">
            <div
              className="resume-card"
              onClick={() => navigate('/review/demo')}
            >
              <div className="resume-card-header">
                <div className="resume-icon">
                  <FileText size={24} />
                </div>
                <div className="resume-score">92</div>
              </div>
              <p className="resume-name">Sample Resume</p>
              <p className="resume-company">Google - Software Engineer</p>
              <p className="resume-date">Updated 2 days ago</p>
              <div className="resume-actions">
                <button className="resume-action-btn">View</button>
                <button className="resume-action-btn">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
