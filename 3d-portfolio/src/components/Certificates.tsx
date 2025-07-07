import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, Star } from 'lucide-react';

const Certificates = () => {
  // Updated certificates and achievements
  const certificates = [
    {
      title: 'Python Programming',
      issuer: 'University of Moratuwa',
      issueDate: '2025',
      credentialId: 'WFkqPxCf5y',
      url: 'https://open.uom.lk/lms/mod/customcert/verify_certificate.php',
    },
    {
      title: 'Python for Beginners',
      issuer: 'University of Moratuwa',
      issueDate: '2024',
      credentialId: 'CimF5y7YAk',
      url: 'https://open.uom.lk/lms/mod/customcert/verify_certificate.php',
    },
    {
      title: 'Web Design for Beginners',
      issuer: 'University of Moratuwa',
      issueDate: '2024',
      credentialId: 'ue5zAsBGsB',
      url: 'https://open.uom.lk/lms/mod/customcert/verify_certificate.php',
    },
    {
      title: 'Intermediate SQL',
      issuer: 'datacamp',
      issueDate: '2025',
      credentialId: '',
      url: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/25a09ba153dfa35585046de1cb7e6dd1e1b2fafc',
    },
    {
      title: 'Joining Data in SQL',
      issuer: 'datacamp',
      issueDate: '2025',
      credentialId: '',
      url: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/48e1a5b6397ef56bc11235b71dcd9c6345b11710',
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Professional':
        return '#ff6b6b';
      case 'Associate':
        return '#4ecdc4';
      case 'Foundation':
        return '#45b7d1';
      default:
        return '#667eea';
    }
  };

  return (
    <motion.div
      id="certificates"
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
        Certificates & Achievements
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {certificates.map((cert, idx) => (
          <motion.div
            key={idx}
            className="certificate-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Award size={24} style={{ marginRight: '10px', color: '#667eea' }} />
                <h2 className="certificate-title">{cert.title}</h2>
              </div>
              <span
                style={{
                  background: '#667eea', // Default color for new certificates
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              >
                {cert.issuer}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Calendar size={16} style={{ marginRight: '8px', color: '#667eea' }} />
              <span className="certificate-date">Issued: {cert.issueDate}</span>
            </div>
            
            {cert.credentialId && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Star size={16} style={{ marginRight: '8px', color: '#667eea' }} />
                <span style={{ color: '#ccc' }}>Credential ID: {cert.credentialId}</span>
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <ExternalLink size={16} style={{ marginRight: '8px', color: '#667eea' }} />
              <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', fontFamily: 'monospace' }}>
                View Certificate
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ marginTop: '40px', textAlign: 'center' }}
      >
        <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '20px' }}>
          Continuous Certification
        </h2>
        <p style={{ color: '#ccc', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          I actively pursue certifications to validate my skills and stay current with industry standards. 
          These certifications demonstrate my commitment to professional development and expertise in 
          various technologies and platforms.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Certificates; 