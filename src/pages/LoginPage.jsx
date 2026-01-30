'use client';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion'; // Animation ke liye best hai
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
        toast.success('Welcome back, User!');
        navigate('/dashboard');
      } else {
        toast.error('Opps! Sabhi fields bharna zaroori hai.');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="adv-page-wrapper">
      {/* Background Animated Blobs */}
      <div className="blob-1"></div>
      <div className="blob-2"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="adv-login-card"
      >
        <div className="adv-login-header">
          <div className="adv-brand-badge">
            <ShieldCheck size={20} /> AI Powered
          </div>
          <h1 className="adv-title">Welcome Back</h1>
          <p className="adv-subtitle">Continue your career journey with Resume.AI</p>
        </div>

        <form onSubmit={handleLogin} className="adv-login-form">
          <div className="adv-input-group">
            <div className="adv-input-wrapper">
              <Mail className="adv-icon" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" " 
                className="adv-input"
              />
              <label className="adv-label">Email Address</label>
            </div>
          </div>

          <div className="adv-input-group">
            <div className="adv-input-wrapper">
              <Lock className="adv-icon" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="adv-input"
              />
              <label className="adv-label">Password</label>
            </div>
          </div>

          <div className="adv-action-row">
            <label className="adv-remember">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="adv-forgot">Forgot?</a>
          </div>

          <button disabled={isLoading} className="adv-login-btn">
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              <>
                Login to Dashboard <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="adv-footer">
          <p>
            Naya account chahiye? <Link to="/signup">Sign up free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}