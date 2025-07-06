import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Users, Database, Cloud } from 'lucide-react';

const Projects = () => {
  const projectsData = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Features include user authentication, product catalog, shopping cart, order management, and analytics.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io', 'AWS'],
      category: 'Full-Stack',
      github: 'https://github.com/yourusername/ecommerce-platform',
      live: 'https://ecommerce-platform.vercel.app',
      image: '🛒',
      features: [
        'User authentication and authorization',
        'Real-time inventory updates',
        'Payment processing with Stripe',
        'Admin dashboard with analytics',
        'Responsive design for all devices'
      ]
    },
    {
      title: 'AI-Powered Chat Application',
      description: 'A modern chat application with AI-powered features including smart replies, sentiment analysis, and automated responses. Built with real-time messaging capabilities and advanced NLP integration.',
      technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI API', 'WebSocket'],
      category: 'AI/ML',
      github: 'https://github.com/yourusername/ai-chat-app',
      live: 'https://ai-chat-app.vercel.app',
      image: '🤖',
      features: [
        'Real-time messaging with WebSocket',
        'AI-powered smart replies',
        'Sentiment analysis',
        'Automated response system',
        'Message encryption'
      ]
    },
    {
      title: 'Task Management System',
      description: 'A comprehensive project management tool with task tracking, team collaboration, and progress monitoring. Includes features like Kanban boards, time tracking, and reporting.',
      technologies: ['Vue.js', 'Express.js', 'MySQL', 'Redis', 'Docker', 'JWT'],
      category: 'Web Application',
      github: 'https://github.com/yourusername/task-manager',
      live: 'https://task-manager.vercel.app',
      image: '📋',
      features: [
        'Kanban board interface',
        'Team collaboration tools',
        'Time tracking and reporting',
        'File sharing and comments',
        'Mobile responsive design'
      ]
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather application with real-time data, 7-day forecasts, and interactive maps. Features location-based weather updates and customizable widgets.',
      technologies: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'PWA'],
      category: 'Frontend',
      github: 'https://github.com/yourusername/weather-dashboard',
      live: 'https://weather-dashboard.vercel.app',
      image: '🌤️',
      features: [
        'Real-time weather data',
        '7-day forecast',
        'Interactive weather maps',
        'Location-based updates',
        'Progressive Web App'
      ]
    },
    {
      title: 'Microservices Architecture',
      description: 'A scalable microservices architecture with API gateway, service discovery, and load balancing. Demonstrates best practices for building distributed systems.',
      technologies: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'MongoDB', 'Nginx'],
      category: 'Backend',
      github: 'https://github.com/yourusername/microservices-demo',
      live: 'https://microservices-demo.vercel.app',
      image: '🏗️',
      features: [
        'Service discovery and load balancing',
        'API gateway with rate limiting',
        'Distributed logging and monitoring',
        'Container orchestration',
        'Auto-scaling capabilities'
      ]
    },
    {
      title: 'Portfolio Website (This One!)',
      description: 'A 3D interactive portfolio website built with React, Three.js, and modern web technologies. Features space-themed animations and responsive design.',
      technologies: ['React', 'Three.js', 'TypeScript', 'Framer Motion', 'Three.js Fiber'],
      category: 'Frontend',
      github: 'https://github.com/yourusername/3d-portfolio',
      live: 'https://your-portfolio.vercel.app',
      image: '🚀',
      features: [
        '3D space-themed animations',
        'Interactive 3D elements',
        'Responsive design',
        'Smooth page transitions',
        'Modern UI/UX design'
      ]
    }
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
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem', marginRight: '10px' }}>{project.image}</span>
                <h2 className="project-title">{project.title}</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: '#667eea' }}>
                {getCategoryIcon(project.category)}
                <span style={{ marginLeft: '5px', fontSize: '0.8rem' }}>{project.category}</span>
              </div>
            </div>
            
            <p className="project-description">
              {project.description}
            </p>
            
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#667eea', fontSize: '1rem', marginBottom: '8px' }}>
                Key Features
              </h3>
              <ul style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.5', paddingLeft: '20px' }}>
                {project.features.map((feature, featureIndex) => (
                  <li key={featureIndex} style={{ marginBottom: '3px' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="project-tech">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 15px',
                  background: 'rgba(102, 126, 234, 0.2)',
                  color: '#667eea',
                  textDecoration: 'none',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
                }}
              >
                <Github size={16} style={{ marginRight: '5px' }} />
                Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 15px',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ExternalLink size={16} style={{ marginRight: '5px' }} />
                Live Demo
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