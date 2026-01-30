'use client';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle2, Sparkles, Building2, User2, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Header from '../components/Header';
import '../styles/UploadPage.css';

export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    description: ''
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (selectedFile) => {
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      toast.success('Resume attached successfully!');
    } else {
      toast.error('Only PDF files are supported');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !file) return toast.error('Missing required information');
    
    setIsLoading(true);
    setTimeout(() => {
      navigate('/review/demo');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="upload-wrapper">
      <Header />
      
      <main className="upload-main">
        {/* Left Side: Dynamic Form */}
        <section className="form-column">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="content-header"
          >
            <span className="badge-ai"><Sparkles size={14} /> AI Engine v2.0</span>
            <h1>Analyze your <span className="gradient-text">Resume</span></h1>
            <p>Our AI scans 50+ parameters to match you with top-tier companies.</p>
          </motion.div>

          <form className="glass-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label><User2 size={16} /> Full Name</label>
                <input 
                  name="name" 
                  placeholder="e.g. Alex Johnson" 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="input-group">
                <label><Building2 size={16} /> Target Company</label>
                <input 
                  name="company" 
                  placeholder="e.g. Google" 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="input-group">
              <label><Briefcase size={16} /> Target Job Title</label>
              <input 
                name="title" 
                placeholder="e.g. Senior Product Designer" 
                onChange={handleInputChange} 
              />
            </div>

            <div className="input-group">
              <label><FileText size={16} /> Job Description</label>
              <textarea 
                name="description" 
                placeholder="Paste the key responsibilities..." 
                onChange={handleInputChange}
              />
            </div>

            <div 
              className={`dropzone ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => fileInputRef.current.click()}
            >
              <input type="file" ref={fileInputRef} hidden onChange={(e) => handleFile(e.target.files[0])} />
              {file ? (
                <div className="file-ready">
                  <CheckCircle2 size={32} color="#10b981" />
                  <div>
                    <p className="file-name">{file.name}</p>
                    <span className="file-size">{(file.size / 1024).toFixed(1)} KB • Ready for scan</span>
                  </div>
                </div>
              ) : (
                <div className="upload-prompt">
                  <Upload size={28} />
                  <p>Drop your PDF resume here or <span>Browse</span></p>
                </div>
              )}
            </div>

            <button className="submit-btn" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'Start AI Analysis'}
            </button>
          </form>
        </section>

        {/* Right Side: Real-time Live Preview */}
        <section className="preview-column">
          <div className="preview-sticky">
            <div className="preview-label">Live Analysis Preview</div>
            <motion.div 
              layout
              className="preview-card"
            >
              <div className="preview-header">
                <div className="mock-avatar">{formData.name ? formData.name[0] : '?'}</div>
                <div className="mock-info">
                  <h4>{formData.name || 'Candidate Name'}</h4>
                  <p>{formData.title || 'Desired Position'}</p>
                </div>
              </div>

              <div className="mock-meta">
                <div className="meta-item">
                  <span>Applying to</span>
                  <strong>{formData.company || 'Company'}</strong>
                </div>
                <div className="meta-item">
                  <span>ATS Status</span>
                  <span className="status-badge">Pending</span>
                </div>
              </div>

              <div className="analysis-skeleton">
                <div className="skeleton-bar" style={{ width: '100%' }}></div>
                <div className="skeleton-bar" style={{ width: '80%' }}></div>
                <div className="skeleton-bar" style={{ width: '60%' }}></div>
              </div>

              <div className="preview-footer">
                <Sparkles size={16} color="#7c3aed" />
                <span>AI will generate report instantly</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}