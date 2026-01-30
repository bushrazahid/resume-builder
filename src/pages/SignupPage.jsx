import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/SignupPage.css'; // Ensure this path is correct

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email: formData.email, name: formData.name }));
      toast.success('Account created successfully!');
      navigate('/dashboard');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-glass-card">
        {/* Header */}
        <div className="signup-header-section">
          <div className="signup-brand-icon">
            <User size={28} color="white" />
          </div>
          <h1 className="signup-main-title">Create Account</h1>
          <p className="signup-sub-text">Join Resume.AI to build your perfect resume</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="custom-signup-form">
          <div className="input-field-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
            </div>
          </div>

          <div className="input-field-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
            </div>
          </div>

          <div className="input-field-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
            </div>
          </div>

          <div className="input-field-group">
            <label>Confirm Password</label>
            <div className="input-with-icon">
              <CheckCircle size={18} className="field-icon" />
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="primary-signup-btn">
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-card-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}