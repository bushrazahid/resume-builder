'use client';

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Star, CheckCircle, Sparkles, 
  Layout, MousePointer2, Zap, Search, SlidersHorizontal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import '../styles/JobDetailsPage.css';

const templates = [
  { id: 1, name: 'ConfettiCV', category: 'Creative', score: 98, popularity: 'High', color: '#7c3aed', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800' },
  { id: 2, name: 'LookBack', category: 'Professional', score: 94, popularity: 'Medium', color: '#3b82f6', img: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800' },
  { id: 3, name: 'Minimal', category: 'Simple', score: 89, popularity: 'High', color: '#10b981', img: 'https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?w=800' },
  { id: 4, name: 'LaunchPage', category: 'Startup', score: 96, popularity: 'Trending', color: '#f59e0b', img: 'https://images.unsplash.com/photo-1626197031507-c17099753214?w=800' },
  { id: 5, name: 'Synchizer', category: 'Technical', score: 91, popularity: 'High', color: '#ec4899', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800' },
  { id: 6, name: 'ClearCharge', category: 'Executive', score: 93, popularity: 'New', color: '#6366f1', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' },
];

export default function JobDetailsPage() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => 
      (filter === 'All' || t.category === filter) &&
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filter, searchQuery]);

  return (
    <div className="studio-wrapper">
      <Header />
      
      {/* Background Decor */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <div className="studio-container">
        {/* Floating Controls Area */}
        <section className="studio-header">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="header-badge"
          >
            <Sparkles size={14} /> AI Template Engine 2.0
          </motion.div>
          <h1 className="studio-title">Design Your <span className="highlight">Future</span></h1>
          
          <div className="filter-bar">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search templates..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="category-scroll">
              {['All', 'Creative', 'Professional', 'Simple', 'Startup', 'Technical'].map(cat => (
                <button 
                  key={cat}
                  className={`cat-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Studio Grid */}
        <motion.div layout className="studio-grid">
          <AnimatePresence mode='popLayout'>
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -15 }}
                className="studio-card"
                onClick={() => navigate('/upload', { state: { template } })}
              >
                <div className="card-visual">
                  <img src={template.img} alt={template.name} loading="lazy" />
                  <div className="card-glass-overlay">
                    <div className="score-ring" style={{ '--clr': template.color }}>
                      <span className="score-num">{template.score}</span>
                      <span className="score-sub">% Match</span>
                    </div>
                  </div>
                  <div className="floating-tag" style={{ backgroundColor: template.color }}>
                    {template.popularity}
                  </div>
                </div>

                <div className="card-content">
                  <div className="content-top">
                    <div>
                      <h3>{template.name}</h3>
                      <span className="cat-label">{template.category}</span>
                    </div>
                    <div className="verified-badge">
                      <CheckCircle size={16} fill="#3b82f6" color="white" />
                    </div>
                  </div>

                  <div className="studio-features">
                    <div className="feat"><Zap size={14} /> ATS Optimized</div>
                    <div className="feat"><Layout size={14} /> A4 Ready</div>
                  </div>

                  <button className="action-button" style={{ '--btn-clr': template.color }}>
                    Customize Template <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}