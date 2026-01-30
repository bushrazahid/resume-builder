'use client';

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Check, AlertCircle, Info, ChevronDown, Award, Zap, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/ResumeReviewPage.css';

const sampleResumeData = {
  name: 'David Donaldson',
  email: 'davidd@email.com',
  phone: '+1-234-567-8901',
  location: 'San Francisco, CA',
  summary: 'Experienced Frontend Developer with 5+ years in React, TypeScript, and modern web technologies. Passionate about building user-centric applications with excellent performance.',
  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Frontend Developer',
      duration: '2021 - Present',
      details: ['Led development of customer dashboard', 'Improved performance by 40%']
    },
    {
      company: 'StartUp Inc',
      position: 'Frontend Developer',
      duration: '2019 - 2021',
      details: ['Developed responsive UI components', 'Mentored junior developers']
    }
  ],
  education: [
    {
      school: 'State University',
      degree: 'B.S. in Computer Science',
      year: '2019'
    }
  ],
  skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js', 'Git', 'Figma']
};

const scores = {
  overall: 81,
  format: 92,
  content: 78,
  keywords: 74
};

export default function ResumeReviewPage() {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState('preview');
  const params = useParams();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="review-page-wrapper">
      <Header />

      <main className="review-main-container">
        {/* Header Tabs Section */}
        <div className="review-nav">
          <div className="nav-tabs">
            <button 
              className={`nav-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              Resume Preview
            </button>
            <button 
              className={`nav-btn ${activeTab === 'report' ? 'active' : ''}`}
              onClick={() => setActiveTab('report')}
            >
              AI Analysis Report
            </button>
          </div>
        </div>

        <div className="review-grid">
          {/* Left Panel: Resume Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="resume-sheet-container"
          >
            <div className="resume-sheet">
              <header className="sheet-header">
                <h1>{sampleResumeData.name}</h1>
                <p>{sampleResumeData.email} • {sampleResumeData.phone} • {sampleResumeData.location}</p>
              </header>

              <section className="sheet-section">
                <h3 className="section-label">Professional Summary</h3>
                <p className="section-content">{sampleResumeData.summary}</p>
              </section>

              <section className="sheet-section">
                <h3 className="section-label">Work Experience</h3>
                {sampleResumeData.experience.map((exp, idx) => (
                  <div key={idx} className="experience-item">
                    <div className="item-title-row">
                      <strong>{exp.position}</strong>
                      <span className="duration">{exp.duration}</span>
                    </div>
                    <p className="company-name">{exp.company}</p>
                    <ul className="bullet-points">
                      {exp.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section className="sheet-section">
                <h3 className="section-label">Skills & Core Competencies</h3>
                <div className="skills-grid">
                  {sampleResumeData.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>

          {/* Right Panel: AI Dashboard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="analysis-sidebar"
          >
            {/* Score Card */}
            <div className="score-card-v2">
              <div className="circular-score">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle" strokeDasharray={`${scores.overall}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="score-text">
                  <span className="number">{scores.overall}</span>
                  <span className="percent">%</span>
                </div>
              </div>
              <div className="score-info">
                <h3>Overall Score</h3>
                <p>Great! Your resume is in the top 15% of candidates.</p>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="metrics-box">
              <h4 className="box-title">Score Breakdown</h4>
              <div className="metric-rows">
                {[
                  { label: 'Format', val: scores.format, icon: <Zap size={14}/> },
                  { label: 'Content', val: scores.content, icon: <Target size={14}/> },
                  { label: 'Keywords', val: scores.keywords, icon: <Award size={14}/> }
                ].map((m) => (
                  <div key={m.label} className="metric-row">
                    <div className="metric-header">
                      <span>{m.icon} {m.label}</span>
                      <strong>{m.val}%</strong>
                    </div>
                    <div className="progress-track">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${m.val}%` }} 
                        className="progress-fill" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="ai-suggestions">
              <h4 className="box-title">AI Suggestions</h4>
              <div className="suggestion-item warning">
                <div className="suggestion-header">
                  <AlertCircle size={18} />
                  <span>Missing Quantifiable Results</span>
                </div>
                <p>Add specific percentages or numbers to your Tech Corp experience.</p>
                <button onClick={() => toggleSection('ai')} className="text-btn">
                  {expandedSections.ai ? 'Show Less' : 'How to fix?'}
                </button>
                <AnimatePresence>
                  {expandedSections.ai && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="suggestion-details"
                    >
                      Example: "Increased team efficiency by 20% using React."
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}