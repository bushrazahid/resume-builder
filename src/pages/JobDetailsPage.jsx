'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import '../styles/JobDetailsPage.css';

const templates = [
  { 
    id: 1, name: 'ConfettiCV', score: '92', desc: 'Modern, colorful design perfect for creative roles',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, name: 'LookBack', score: '88', desc: 'Professional layout focusing on experience',
    img: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, name: 'Minimal', score: '85', desc: 'Clean and simple design for corporate positions',
    img: 'https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 4, name: 'LaunchPage', score: '90', desc: 'Dynamic template for startup roles',
    img: 'https://images.unsplash.com/photo-1626197031507-c17099753214?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 5, name: 'Synchizer', score: '87', desc: 'Technical focus with skill highlights',
    img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 6, name: 'ClearCharge', score: '89', desc: 'High-impact design with bold typography',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
];

export default function JobDetailsPage() {
  const navigate = useNavigate();

  const handleSelectTemplate = (template) => {
    navigate('/upload', { state: { template } });
  };

  return (
    <div className="job-details-container">
      <Header />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="job-details-content"
      >
        {/* Header Section */}
        <div className="job-header">
          <h1 className="job-header-title">
            Track Your Applications<br />
            <span className="gradient-text">& Resume Ratings</span>
          </h1>
          <p className="job-header-subtitle">
            Choose a high-performing template to increase your chances by 3x.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="templates-grid">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="template-card"
              onClick={() => handleSelectTemplate(template)}
            >
              <div className="template-preview">
                <img src={template.img} alt={template.name} className="template-img" />
                <div className="template-overlay">
                  <div className="badge-premium">PREMIUM</div>
                </div>
                <span className="template-score-badge">{template.score}% Match</span>
              </div>

              <div className="template-info">
                <div className="template-header-row">
                  <h3 className="template-name">{template.name}</h3>
                  <CheckCircle size={16} className="verified-icon" />
                </div>
                <p className="template-description">{template.desc}</p>

                <div className="template-footer">
                  <div className="template-stats">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span className="ats-label">ATS Optimized</span>
                  </div>
                  <button className="template-button">
                    Use <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}