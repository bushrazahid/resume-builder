import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

// Sahi Imports: Extension aur index.js likhne ki zaroorat nahi hoti
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import JobDetailsPage from './pages/JobDetailsPage';
import UploadPage from './pages/UploadPage';
import ResumeReviewPage from './pages/ResumeReviewPage';
import ResumeDashboard from './pages/ResumeDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<ResumeDashboard />} />
          <Route path="/job-details" element={<JobDetailsPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/review/:id" element={<ResumeReviewPage />} />
        </Route>

        {/* Redirect to dashboard as default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;