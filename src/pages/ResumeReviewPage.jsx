import { useEffect, useState } from "react";
// Vite mein 'react-router-dom' use hota hai, Next.js wala 'next/navigation' nahi
import { useParams } from "react-router-dom";
import Header from "../components/Header";
// Agar file nahi hai toh error dega, isliye check karlein ya comment rakhen
// import '../styles/ResumeReviewPage.css'; 
import { Check, AlertCircle, Info, ChevronDown } from "lucide-react"; // lucide-react standard hai
import { motion } from "framer-motion";

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
  const params = useParams(); // URL se ID wagera lene ke liye

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fdf2f8 100%)', backgroundAttachment: 'fixed', paddingBottom: '4rem' }}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button className="pb-2 border-b-2 border-purple-600 font-semibold text-purple-600">David Donaldson</button>
          <button className="pb-2 text-gray-500 hover:text-purple-600">Detailed Report</button>
          <button className="pb-2 text-gray-500 hover:text-purple-600">Resume Preview</button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Resume Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{sampleResumeData.name}</h2>
              <p className="text-sm text-gray-500">
                {sampleResumeData.email} | {sampleResumeData.phone} | {sampleResumeData.location}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">Professional Summary</h3>
              <p className="text-gray-700 leading-relaxed">{sampleResumeData.summary}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-4">Experience</h3>
              {sampleResumeData.experience.map((exp, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-xs text-gray-400">{exp.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{exp.company}</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {exp.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {sampleResumeData.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Scores & Feedback */}
          <div className="space-y-6">
            {/* Overall Score Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-700">Your Resume Score</span>
                <span className="text-2xl font-black text-purple-600">{scores.overall}%</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${scores.overall}%` }}
                  className="h-full bg-purple-600"
                />
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-gray-800 mb-4">Score Breakdown</h3>
               <div className="space-y-4">
                  {['Format', 'Content', 'Keywords'].map((item) => (
                    <div key={item}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 font-semibold">{item}</span>
                        <span className="text-purple-600 font-bold">{scores[item.toLowerCase()]}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div 
                          className="h-full bg-purple-400 rounded-full" 
                          style={{ width: `${scores[item.toLowerCase()]}%` }}
                        />
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Feedback & Suggestions</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-amber-600" />
                    <span className="font-bold text-amber-800 text-sm">Action Needed: Content</span>
                  </div>
                  <p className="text-xs text-amber-700 mb-3">Consider adding more metrics to your achievements. Use numbers to quantify impact.</p>
                  <button 
                    onClick={() => toggleSection('content')}
                    className="text-xs font-bold text-amber-900 underline"
                  >
                    {expandedSections.content ? 'Hide details' : 'View suggestions'}
                  </button>
                  {expandedSections.content && (
                    <div className="mt-2 text-xs text-amber-800 space-y-1 border-t border-amber-200 pt-2">
                      <p>• Add % improvement figures</p>
                      <p>• Specify team size managed</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}