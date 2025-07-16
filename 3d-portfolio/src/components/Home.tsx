import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Home = () => {
  const handleDownloadResume = () => {
    // Download the actual PDF resume from the public folder
    const resumeUrl = process.env.PUBLIC_URL
      ? `${process.env.PUBLIC_URL}/Dasun Shanaka Resume.pdf`
      : '/Dasun Shanaka Resume.pdf';
    const a = document.createElement('a');
    a.href = resumeUrl;
    a.download = 'Dasun_Shanaka_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div
      id="home"
      className="content-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi there!, <br />I'm Dasun Shanaka
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Software Engineering Student | Full-Stack Developer | Software Developer
        </motion.p>
        <motion.p
          style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#ccc', lineHeight: '1.6' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I build modern web and mobile applications that are fast, reliable, and user-friendly.  
          Let's create something amazing together!
        </motion.p>
        <motion.button
          className="download-btn"
          onClick={handleDownloadResume}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={20} style={{ marginRight: '8px' }} />
          Download Resume
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Home; 