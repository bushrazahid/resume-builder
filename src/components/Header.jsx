'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import '../styles/Header.css';

export default function Header({ onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  const handleLogout = () => {
    localStorage.removeItem('user');
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="header-logo">Resume.AI</div>

      <nav className="header-nav">
        <a className="header-link active" onClick={() => navigate('/dashboard')}>Dashboard</a>
        <a className="header-link" onClick={() => navigate('/job-details')}>Create Resume</a>

        <div className="profile-dropdown">
          <div
            className="profile-avatar"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {initials}
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div style={{ padding: '10px 16px', borderBottom: '1px solid #e5e7eb', marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '12px', color: '#999' }}>Signed in as</p>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1d29' }}>{user.email}</p>
              </div>
              <div className="dropdown-item">Profile Settings</div>
              <div className="dropdown-item">Help & Support</div>
              <div
                className="dropdown-item danger"
                onClick={handleLogout}
              >
                <LogOut size={14} style={{ display: 'inline-block', marginRight: '6px' }} />
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
