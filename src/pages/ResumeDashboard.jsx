'use client';

import { useNavigate } from 'react-router-dom';
import { Plus, FileText, MoreVertical, Clock, TrendingUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import '../styles/ResumeDashboard.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function ResumeDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Guest"}');

  return (
    <div className="dashboard-wrapper">
      <Header />
      
      <main className="dashboard-main">
        <motion.header 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="dash-header"
        >
          <div className="welcome-text">
            <h1>Analytics <span className="text-gradient">Overview</span></h1>
            <p>Welcome back, <strong>{user.name}</strong>. You have 3 active resumes this week.</p>
          </div>
          <div className="header-actions">
            <div className="search-bar">
              <Search size={16} />
              <input type="text" placeholder="Search resumes..." />
            </div>
            <button className="primary-btn-premium" onClick={() => navigate('/job-details')}>
              <Plus size={18} /> New Analysis
            </button>
          </div>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="dash-grid"
        >
          {/* Advanced Create Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, translateY: -5 }}
            className="create-card-advanced" 
            onClick={() => navigate('/job-details')}
          >
            <div className="inner-border">
              <div className="icon-glow"><Plus size={32} /></div>
              <h3>Analyze New Resume</h3>
              <p>Upload PDF or Docx to get AI feedback</p>
            </div>
          </motion.div>

          {/* Dynamic Resume Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="resume-card-premium" 
            onClick={() => navigate('/review/demo')}
          >
            <div className="card-glass-effect"></div>
            <div className="card-top">
              <div className="status-indicator">Active</div>
              <div className="score-badge-mini">
                <TrendingUp size={12} /> 92%
              </div>
            </div>
            <div className="card-mid">
              <div className="file-avatar">
                <FileText size={24} />
              </div>
              <div className="file-details">
                <h3>Sr. Frontend Engineer</h3>
                <p>Google • Mountain View, CA</p>
              </div>
            </div>
            <div className="card-bottom">
              <div className="time-info"><Clock size={12} /> Modified 2h ago</div>
              <button className="icon-btn-ghost"><MoreVertical size={16} /></button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}