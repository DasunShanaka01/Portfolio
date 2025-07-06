import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, Linkedin, Github, Camera } from 'lucide-react';

const About = () => {
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
          <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '20px' }}>
            I am a passionate and innovative software engineer with a strong foundation in full-stack development 
            and a keen eye for creating elegant, efficient solutions to complex problems. With expertise in 
            modern web technologies, I specialize in building scalable applications that deliver exceptional 
            user experiences.
          </p>
          <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '20px' }}>
            My journey in software development began with a curiosity about how things work, which evolved 
            into a passion for creating digital solutions that make a difference. I believe in writing clean, 
            maintainable code and staying up-to-date with the latest industry trends and best practices.
          </p>
          <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '30px' }}>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source 
            projects, or sharing knowledge with the developer community. I'm always excited to take on 
            new challenges and collaborate with talented teams to build amazing products.
          </p>

          <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '20px' }}>
            Personal Information
          </h2>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <User size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>Software Engineer</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <MapPin size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>Your Location</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Mail size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>your.email@example.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Phone size={20} style={{ marginRight: '10px', color: '#667eea' }} />
              <span style={{ color: '#ccc' }}>+1 (555) 123-4567</span>
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