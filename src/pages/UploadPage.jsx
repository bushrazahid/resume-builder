'use client';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import '../styles/UploadPage.css';

export default function UploadPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [candidateName, setCandidateName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setDragActive(false);
      } else {
        toast.error('Please upload a PDF file');
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        toast.error('Please upload a PDF file');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!candidateName || !companyName || !jobTitle || !jobDescription || !file) {
      toast.error('Please fill in all fields and upload a resume');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const resumeData = {
        id: Date.now(),
        candidateName,
        companyName,
        jobTitle,
        jobDescription,
        fileName: file.name,
      };

      localStorage.setItem('lastResume', JSON.stringify(resumeData));
      toast.success('Resume analyzed successfully!');
      navigate('/review/demo');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fdf2f8 100%)', backgroundAttachment: 'fixed' }}>
      <Header />

      <div className="upload-container">
        <div className="upload-card">
          {/* Header */}
          <div className="upload-header">
            <h1 className="upload-title">
              Smart feedback<br />for your <span className="upload-title-highlight">dream job</span>
            </h1>
            <p className="upload-subtitle">Drop your resume for an ATS score and improvement tips</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="upload-form">
            {/* Candidate Info */}
            <div>
              <div className="form-section-title">Your Information</div>
              <div className="form-group">
                <label className="form-label">Candidate Name</label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Janine Ryan"
                  className="form-input"
                />
              </div>
            </div>

            {/* Job Info */}
            <div>
              <div className="form-section-title">Job Details</div>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Google"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Frontend Developer"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here with responsibilities & requirements..."
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Upload Area */}
            <div>
              <div className="form-section-title">Upload Resume</div>
              <div
                className={`upload-area ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">
                  <Upload size={24} />
                </div>
                <p className="upload-text">Click to upload or drag and drop</p>
                <p className="upload-hint">PDF (up to 5MB)</p>
                {file && <p className="file-name">✓ {file.name}</p>}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="upload-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
              style={{ opacity: isLoading ? 0.6 : 1 }}
            >
              {isLoading ? 'Analyzing Resume...' : 'See AI Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
