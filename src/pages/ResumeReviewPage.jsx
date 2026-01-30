'use client';

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import '../styles/ResumeReviewPage.css'; 
import { 
  AlertCircle, CheckCircle2, Sparkles, Wand2, 
  Download, Share2, Target, BarChart3, 
  Layout, Zap, Info, ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Sub-Components for Clean Code ---

const ScoreRing = ({ score }) => (
  <div className="score-ring-container">
    <svg viewBox="0 0 36 36" className="circular-chart">
      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      <motion.path 
        className="circle-stroke" 
        initial={{ strokeDasharray: "0, 100" }}
        animate={{ strokeDasharray: `${score}, 100` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
      />
    </svg>
    <div className="score-label-overlay">
      <span className="score-number">{score}</span>
      <span className="score-unit">%</span>
    </div>
  </div>
);

export default function ResumeReviewPage() {
  const [activeIssue, setActiveIssue] = useState('impact');
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pro-dashboard-wrapper">
      <Header />
      
      <div className="utility-header">
        <div className="container-wide flex-between">
          <div className="breadcrumb-nav">
            <span className="fade-text">Analysis</span> <ChevronRight size={14}/> <strong>David_Resume_V2.pdf</strong>
          </div>
          <div className="button-group">
            <button className="btn-ghost"><Share2 size={16}/> Share</button>
            <button className="btn-solid"><Download size={16}/> Export Report</button>
          </div>
        </div>
      </div>

      <div className="dashboard-main-grid container-wide">
        
        {/* Left Side: Diagnostics */}
        <aside className="panel-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="card-premium score-card"
          >
            <ScoreRing score={81} />
            <h3>Overall Match</h3>
            <p className="small-text">Optimized for Senior Frontend roles</p>
          </motion.div>

          <div className="metrics-stack">
            <div className="metric-item">
              <div className="metric-info"><span>Keywords</span> <strong>74%</strong></div>
              <div className="progress-track"><motion.div initial={{width:0}} animate={{width:'74%'}} className="progress-fill purple" /></div>
            </div>
            <div className="metric-item">
              <div className="metric-info"><span>Readability</span> <strong>92%</strong></div>
              <div className="progress-track"><motion.div initial={{width:0}} animate={{width:'92%'}} className="progress-fill green" /></div>
            </div>
          </div>
        </aside>

        {/* Center: Live Resume Canvas */}
        <main className="document-canvas">
          <div className="resume-sheet-paper">
            {isScanning && <div className="scanning-beam" />}
            
            <header className="resume-head">
              <h1 className="name-title">David Donaldson</h1>
              <div className="contact-strip">San Francisco, CA • davidd@email.com • +1-234-567-8901</div>
            </header>

            <div className="resume-body-content">
              <section className="res-section">
                <h4 className="res-h4">Experience</h4>
                <div className="res-block">
                  <div className="res-row"><strong>Tech Corp</strong> <span>2021 - Present</span></div>
                  <p className="italic">Senior Frontend Developer</p>
                  <ul className="res-bullets">
                    <li>Led migration from Monolith to Micro-frontends.</li>
                    <li className={`ai-highlighter ${activeIssue === 'impact' ? 'active' : ''}`} onClick={() => setActiveIssue('impact')}>
                      Improved performance by 40%.
                      <span className="floating-tag"><Sparkles size={10}/> AI Hint</span>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Right Side: Action Center */}
        <aside className="panel-right">
          <div className="action-center-head">
            <Zap size={18} className="text-purple" /> <h3>Action Center</h3>
          </div>

          <AnimatePresence mode="wait">
            {activeIssue === 'impact' ? (
              <motion.div 
                key="impact" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="issue-alert-card active"
              >
                <div className="alert-header">
                  <AlertCircle size={18} className="text-amber" />
                  <strong>Impact Quantification</strong>
                </div>
                <p>Recruiters love numbers. Mention exactly <strong>how</strong> you achieved 40%.</p>
                <div className="ai-snippet">
                  "Improved performance by 40% <u>through lazy loading and image optimization.</u>"
                </div>
                <button className="btn-ai-fix"><Wand2 size={14}/> Auto-Fix</button>
              </motion.div>
            ) : (
              <div className="empty-state">Select a highlight to see AI fixes</div>
            )}
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}