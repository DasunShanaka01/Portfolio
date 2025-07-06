import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, Linkedin, Github, Camera } from 'lucide-react';

interface ProfessionalSummary {
  _id?: string;
  title: string;
  summary: string;
  experience: string;
  location: string;
  email: string;
  phone: string;
  isActive: boolean;
  order: number;
}

const About = () => {
  const [summary, setSummary] = useState<ProfessionalSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/professional-summary')
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setSummary(data.data[0]);
        } else {
          setSummary(null);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load summary');
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      id="about"
      className="content-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        About Me
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '60px', 
          alignItems: 'start',
          marginTop: '40px'
        }}
      >
        {/* Left Column - Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '500px'
          }}
        >
          <div style={{
            position: 'relative',
            width: '300px',
            height: '400px',
            borderRadius: '20px',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
            {/* Your Photo */}
            <img 
              src="/PXL_20230724_101428109.MP~3.jpg" 
              alt="Your Name" 
              style={{
                width: '280px',
                height: '380px',
                borderRadius: '15px',
                objectFit: 'cover',
                objectPosition: 'center top'
              }}
            />
          </div>
        </motion.div>
        {/* Right Column - Content */}
        <div>
          <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '20px' }}>
            Professional Summary
          </h2>
          {loading ? (
            <p style={{ color: '#ccc' }}>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : summary ? (
            <>
              <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '20px' }}>{summary.summary}</p>
            </>
          ) : (
            <p style={{ color: '#ccc' }}>No summary available.</p>
          )}

          <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '20px' }}>
            Personal Information
          </h2>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <User size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>{summary?.title || 'Software Engineer'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <MapPin size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>{summary?.location || 'Your Location'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Mail size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>{summary?.email || 'your.email@example.com'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Phone size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>{summary?.phone || '+1 (555) 123-4567'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Linkedin size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>linkedin.com/in/yourprofile</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Github size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>github.com/yourusername</span>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ marginTop: '60px' }}
      >
        <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '20px' }}>
          What I Do
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '20px', 
            borderRadius: '15px', 
            border: '1px solid rgba(255, 255, 255, 0.1)' 
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Frontend Development</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
              Creating responsive and interactive user interfaces using modern frameworks like React, 
              Vue.js, and Angular with a focus on performance and accessibility.
            </p>
          </div>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '20px', 
            borderRadius: '15px', 
            border: '1px solid rgba(255, 255, 255, 0.1)' 
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Backend Development</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
              Building robust server-side applications and APIs using Node.js, Python, and Java, 
              with expertise in database design and optimization.
            </p>
          </div>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '20px', 
            borderRadius: '15px', 
            border: '1px solid rgba(255, 255, 255, 0.1)' 
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>DevOps & Cloud</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
              Implementing CI/CD pipelines, containerization with Docker, and cloud deployment 
              strategies to ensure scalable and reliable applications.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About; 