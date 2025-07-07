import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Users, Database, Cloud } from 'lucide-react';

const Projects = () => {
  // Updated projects with images and professional formatting
  const projects = [
    {
      title: 'Online Repair Service Platform (Web App)',
      category: 'Full stack web app',
      github: 'https://github.com/DasunShanaka01/FixItNow',
      tools: ['React', 'Express.js', 'Node.js', 'MongoDB'],
      description: 'Developed a marketplace connecting customers and repair service providers. Implemented the Service Provider Management system, ensuring verification and reliable service.',
      image: '/images/fixitnow.png', // Add your image in public/images/
    },
    {
      title: 'Job Portal Website (Web App)',
      category: 'Full stack web app',
      github: 'https://github.com/DasunShanaka01/Online-job-portal-website',
      tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      description: 'Designed and deployed a full-stack application to streamline job search and recruitment.',
      image: '/images/jobportal.png',
    },
    {
      title: 'Online Food Delivery Platform (Web App)',
      category: 'Full stack web app',
      github: 'https://github.com/DasunShanaka01/DishDash',
      tools: ['React', 'Spring Boot', 'MongoDB', 'Tailwind CSS'],
      description: 'Streamlines the process of connecting customers interfaces for browsing menus, placing orders, and real-time tracking, managing restaurants and delivery personnel.',
      image: '/images/fooddash.png',
    },
    {
      title: 'Event Management Web App (Web App)',
      category: 'Full stack web app',
      github: '',
      tools: ['Java', 'SQL', 'Eclipse', 'HTML', 'CSS'],
      description: 'Developed a comprehensive platform to streamline event planning and management processes. Implemented features like user authentication, event creation, and booking management.',
      image: '/images/eventapp.png',
    },
    {
      title: 'Android Calculator',
      category: 'Mobile App',
      github: 'https://github.com/DasunShanaka01/Kotlin-Calculator-App',
      tools: ['Kotlin', 'Android xml', 'Android Studio'],
      description: 'The app supports basic arithmetic operations with an intuitive user interface for quick and efficient calculations.',
      image: '/images/calculator.png',
    },
    {
      title: 'Personal Finance Tracker',
      category: 'Mobile App',
      github: 'https://github.com/DasunShanaka01/Smart-Spender-',
      tools: ['Kotlin', 'Android xml', 'Android Studio'],
      description: 'A finance tracking app to manage income, expenses, and savings. I designed an intuitive and visually appealing interface to provide users with a seamless experience.',
      image: '/images/financetracker.png',
    },
    {
      title: 'Computer Shop App (UI – focused mobile app)',
      category: 'Mobile App',
      github: 'https://github.com/DasunShanaka01/CyberCell',
      tools: ['Kotlin', 'Android xml', 'Android Studio'],
      description: 'A modern, UI-focused mobile application designed to showcase and browse computer products. Built with an emphasis on clean design and user-friendly navigation, the app allows users to explore product categories, view detailed specs, and experience a smooth shopping interface optimized for mobile devices.',
      image: '/images/computershop.png',
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Full-Stack':
        return <Code size={20} />;
      case 'AI/ML':
        return <Users size={20} />;
      case 'Web Application':
        return <Database size={20} />;
      case 'Frontend':
        return <Code size={20} />;
      case 'Backend':
        return <Cloud size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  return (
    <motion.div
      id="projects"
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
        Projects
      </motion.h1>
      
      <motion.div
        className="projects-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={project.image} alt={project.title} className="project-image" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '10px' }} />
            <div className="project-content" style={{ padding: '16px' }}>
              <h3 style={{ marginBottom: '8px' }}>{project.title}</h3>
              <span style={{ color: '#667eea', fontWeight: 'bold', fontSize: '0.95rem' }}>{project.category}</span>
              <p style={{ margin: '12px 0', color: '#ccc' }}>{project.description}</p>
              <div style={{ marginBottom: '8px' }}>
                <strong>Tools & Technologies:</strong> {project.tools.join(', ')}
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#667eea', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                  className="github-link"
                >
                  <Github size={28} className="github-icon" />
                </a>
              )}
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
          More Projects Coming Soon
        </h2>
        <p style={{ color: '#ccc', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          I'm constantly working on new projects and exploring emerging technologies. 
          Each project is an opportunity to learn, grow, and create something meaningful. 
          Check back regularly for updates!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Projects; 