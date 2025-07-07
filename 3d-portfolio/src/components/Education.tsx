import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Image as ImageIcon } from 'lucide-react';

interface EducationItem {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa: number;
  description: string;
  achievements: string[];
  location: string;
  logo?: string;
  isActive?: boolean;
  order?: number;
}

const formatYear = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.getFullYear();
};

const Education = () => {
  // Updated education data
  const [educationData] = useState<EducationItem[]>([
    {
      institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
      degree: 'B.Sc. (Hons) in Information Technology Specializing in Software Engineering',
      field: 'Software Engineering',
      startDate: '2023-01-01',
      endDate: '',
      isCurrent: true,
      gpa: 0,
      description: `Currently pursuing a bachelor\'s degree specializing in Software Engineering. Gaining hands-on experience in software development, object-oriented programming, full-stack web and mobile application development, database management, and system design. Continuously learning to build efficient, scalable, and user-centered software solutions using modern tools and technologies.`,
      achievements: [],
      location: 'Colombo, Sri Lanka',
    },
    {
      institution: 'Carey College',
      degree: 'Advance Level : Commerce',
      field: 'Commerce',
      startDate: '2010-01-01',
      endDate: '2022-12-31',
      isCurrent: false,
      gpa: 0,
      description: `Completed secondary education with a focus on Commerce subjects, including Accounting, Business Studies, and Economics, providing a solid foundation in financial principles, business operations, and economic systems—skills that support analytical thinking and decision-making in the field of information technology.`,
      achievements: [],
      location: 'Colombo, Sri Lanka',
    },
  ]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return (
    <motion.div
      id="education"
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
        Education
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {loading ? (
          <p style={{ color: '#ccc' }}>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : educationData.length === 0 ? (
          <p style={{ color: '#ccc' }}>No education data available.</p>
        ) : (
          educationData.map((education, index) => (
            <motion.div
              key={education._id || index}
              className="education-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', marginBottom: '40px' }}
            >
              {/* Left: Logo */}
              <div style={{ minWidth: 80, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {education.logo ? (
                  <img
                    src={education.logo}
                    alt={education.institution + ' logo'}
                    style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 16, background: '#181a2b', border: '1px solid #222', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                  />
                ) : (
                  <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#22223b', borderRadius: 16 }}>
                    <ImageIcon size={40} color="#667eea" />
                  </div>
                )}
              </div>
              {/* Right: Card Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <GraduationCap size={24} style={{ marginRight: '10px', color: '#667eea' }} />
                  <h2 className="education-title">{education.degree}</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <MapPin size={16} style={{ marginRight: '8px', color: '#667eea' }} />
                  <span className="education-institution">{education.institution}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Calendar size={16} style={{ marginRight: '8px', color: '#667eea' }} />
                  <span className="education-date">
                    {formatYear(education.startDate)} - {education.isCurrent ? 'Present' : formatYear(education.endDate)}
                  </span>
                </div>
                {/* GPA removed */}
                <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>{education.description}</p>
                {education.achievements && education.achievements.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#667eea', fontSize: '1.1rem', marginBottom: '10px' }}>
                      Key Achievements
                    </h3>
                    <ul style={{ color: '#ccc', lineHeight: '1.6', paddingLeft: '20px' }}>
                      {education.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} style={{ marginBottom: '5px' }}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        style={{ marginTop: '40px', textAlign: 'center' }}
      >
        <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '20px' }}>
          Continuous Learning
        </h2>
        <p style={{ color: '#ccc', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          I believe in lifelong learning and continuously seek opportunities to expand my knowledge 
          through online courses, workshops, conferences, and self-study. This commitment to 
          continuous improvement helps me stay current with emerging technologies and industry best practices.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Education; 