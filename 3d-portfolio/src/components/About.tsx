import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, Linkedin, Github } from 'lucide-react';

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
  // Updated static data for Dasun Shanaka
  const [summary] = useState<ProfessionalSummary | null>({
    title: 'Software Engineering Undergraduate',
    summary: `I'm Dasun Shanaka, a passionate and self-driven Software Engineering undergraduate based in Colombo, Sri Lanka. I specialize in full-stack web and mobile application development, with hands-on experience using modern technologies like Java, React.js, Node.js, MongoDB, and Android Studio.\n\nI’m deeply interested in solving real-world problems through efficient, scalable, and user-focused software solutions. Whether it's a dynamic food delivery platform or a repair service marketplace, I enjoy building meaningful applications that create impact.\n\nWith a strong foundation in object-oriented programming, an eye for UI/UX, and a growing understanding of system design, I continuously strive to learn, innovate, and collaborate. I'm also committed to improving my communication and leadership skills through team projects and public presentations.`,
    experience: '',
    location: 'Colombo, Sri Lanka',
    email: 'dasunshanaka01@outlook.com',
    phone: '+94 781123032',
    isActive: true,
    order: 1,
  });
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

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
        className="about-grid"
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
              <span style={{ color: '#ccc' }}>Dasun Shanaka</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <MapPin size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>Colombo, Sri Lanka</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Mail size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>dasunshanaka01@outlook.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Phone size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>{summary?.phone || ''}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Linkedin size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <a href="https://www.linkedin.com/in/dasun-shanaka-756559250" style={{ color: '#ccc', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">linkedin.com/in/dasun-shanaka-756559250</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Github size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <a href="https://github.com/DasunShanaka01" style={{ color: '#ccc', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">github.com/DasunShanaka01</a>
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
            padding: '20px', 
            borderRadius: '15px', 
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Frontend Development</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
              Creating responsive and interactive user interfaces using modern frameworks like React, 
              Vue.js, and Angular with a focus on performance and accessibility.
            </p>
          </div>
          <div style={{ 
            padding: '20px', 
            borderRadius: '15px', 
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Backend Development</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
              Building robust server-side applications and APIs using Node.js, Python, and Java, 
              with expertise in database design and optimization.
            </p>
          </div>
          <div style={{ 
            padding: '20px', 
            borderRadius: '15px', 
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Mobile Application Development</h3>
            <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
              Designing and developing mobile applications for Android using Java and Android Studio, focusing on intuitive UI/UX and performance.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About; 