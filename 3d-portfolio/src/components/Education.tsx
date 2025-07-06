import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const educationData = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'City, Country',
      date: '2020 - 2024',
      gpa: '3.8/4.0',
      description: 'Specialized in software engineering with focus on web development and artificial intelligence.',
      achievements: [
        'Dean\'s List for Academic Excellence (2020-2024)',
        'Computer Science Department Award for Outstanding Performance',
        'Completed capstone project on AI-powered recommendation systems',
        'Member of the University Programming Team'
      ],
      relevantCourses: [
        'Data Structures and Algorithms',
        'Software Engineering',
        'Database Systems',
        'Web Development',
        'Machine Learning',
        'Computer Networks',
        'Operating Systems',
        'Software Architecture'
      ]
    },
    {
      degree: 'Associate Degree in Information Technology',
      institution: 'Community College',
      location: 'City, Country',
      date: '2018 - 2020',
      gpa: '3.9/4.0',
      description: 'Foundation in IT fundamentals and programming basics.',
      achievements: [
        'Valedictorian of the Class of 2020',
        'IT Department Excellence Award',
        'Completed internship at local software company'
      ],
      relevantCourses: [
        'Introduction to Programming',
        'Computer Hardware and Software',
        'Networking Fundamentals',
        'Web Design Basics',
        'Database Management',
        'IT Project Management'
      ]
    }
  ];

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
        {educationData.map((education, index) => (
          <motion.div
            key={index}
            className="education-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
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
              <span className="education-date">{education.date}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Award size={16} style={{ marginRight: '8px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>GPA: {education.gpa}</span>
            </div>
            
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
              {education.description}
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#667eea', fontSize: '1.1rem', marginBottom: '10px' }}>
                Key Achievements
              </h3>
              <ul style={{ color: '#ccc', lineHeight: '1.6', paddingLeft: '20px' }}>
                {education.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} style={{ marginBottom: '5px' }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 style={{ color: '#667eea', fontSize: '1.1rem', marginBottom: '10px' }}>
                Relevant Coursework
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {education.relevantCourses.map((course, courseIndex) => (
                  <span
                    key={courseIndex}
                    style={{
                      background: 'rgba(102, 126, 234, 0.2)',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      color: '#667eea'
                    }}
                  >
                    {course}
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