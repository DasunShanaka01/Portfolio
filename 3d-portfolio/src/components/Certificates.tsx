import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, Star } from 'lucide-react';

const Certificates = () => {
  const certificatesData = [
    {
      title: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      date: 'December 2023',
      credentialId: 'AWS-123456789',
      description: 'Demonstrates expertise in designing distributed systems on AWS platform.',
      skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Infrastructure'],
      level: 'Professional',
      validUntil: 'December 2026'
    },
    {
      title: 'Google Cloud Professional Cloud Developer',
      issuer: 'Google Cloud',
      date: 'November 2023',
      credentialId: 'GCP-987654321',
      description: 'Validates ability to build scalable applications on Google Cloud Platform.',
      skills: ['Google Cloud', 'App Engine', 'Cloud Functions', 'Kubernetes'],
      level: 'Professional',
      validUntil: 'November 2026'
    },
    {
      title: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      date: 'October 2023',
      credentialId: 'AZ-204-123456',
      description: 'Proves expertise in developing solutions for Microsoft Azure.',
      skills: ['Azure', 'C#', '.NET', 'Azure DevOps'],
      level: 'Associate',
      validUntil: 'October 2026'
    },
    {
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: 'September 2023',
      credentialId: 'CKA-2023-001234',
      description: 'Demonstrates ability to perform the responsibilities of a Kubernetes administrator.',
      skills: ['Kubernetes', 'Container Orchestration', 'DevOps', 'Linux'],
      level: 'Professional',
      validUntil: 'September 2026'
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: 'August 2023',
      credentialId: 'MDB-2023-567890',
      description: 'Validates expertise in MongoDB application development and data modeling.',
      skills: ['MongoDB', 'NoSQL', 'Database Design', 'JavaScript'],
      level: 'Associate',
      validUntil: 'August 2026'
    },
    {
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: 'July 2023',
      credentialId: 'META-REACT-2023',
      description: 'Demonstrates proficiency in React development and modern JavaScript.',
      skills: ['React', 'JavaScript', 'Frontend Development', 'Web Development'],
      level: 'Professional',
      validUntil: 'July 2026'
    }
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
        {certificatesData.map((certificate, index) => (
          <motion.div
            key={index}
            className="certificate-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Award size={24} style={{ marginRight: '10px', color: '#667eea' }} />
                <h2 className="certificate-title">{certificate.title}</h2>
              </div>
              <span
                style={{
                  background: getLevelColor(certificate.level),
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              >
                {certificate.level}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Calendar size={16} style={{ marginRight: '8px', color: '#667eea' }} />
              <span className="certificate-date">Issued: {certificate.date}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Star size={16} style={{ marginRight: '8px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>Valid until: {certificate.validUntil}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <ExternalLink size={16} style={{ marginRight: '8px', color: '#667eea' }} />
              <span style={{ color: '#ccc', fontFamily: 'monospace' }}>ID: {certificate.credentialId}</span>
            </div>
            
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}>
              {certificate.description}
            </p>
            
            <div>
              <h3 style={{ color: '#667eea', fontSize: '1rem', marginBottom: '10px' }}>
                Skills Validated
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {certificate.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    style={{
                      background: 'rgba(102, 126, 234, 0.2)',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      color: '#667eea'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
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