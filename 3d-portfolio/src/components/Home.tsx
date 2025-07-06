import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const Home = () => {
  const handleDownloadResume = () => {
    // Create a sample resume content (you can replace this with your actual resume)
    const resumeContent = `
SOFTWARE ENGINEER PORTFOLIO

PERSONAL INFORMATION
Name: [Your Name]
Email: [your.email@example.com]
Phone: [Your Phone]
Location: [Your Location]
LinkedIn: [Your LinkedIn]

PROFESSIONAL SUMMARY
Passionate software engineer with expertise in full-stack development, 
specializing in modern web technologies and innovative solutions. 
Experienced in building scalable applications and collaborating with 
cross-functional teams to deliver high-quality software products.

TECHNICAL SKILLS
• Programming Languages: JavaScript, TypeScript, Python, Java, C++
• Frontend: React, Vue.js, Angular, HTML5, CSS3, SASS
• Backend: Node.js, Express, Django, Spring Boot
• Databases: MongoDB, PostgreSQL, MySQL, Redis
• Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD
• Tools: Git, VS Code, Postman, Jira

EXPERIENCE
[Company Name] - Software Engineer
[Date Range]
• Developed and maintained web applications using React and Node.js
• Collaborated with design and product teams to implement new features
• Optimized application performance and improved user experience
• Participated in code reviews and mentored junior developers

EDUCATION
[Degree Name] - [University Name]
[Graduation Year]
• GPA: [Your GPA]
• Relevant Coursework: [List relevant courses]

PROJECTS
[Project Name] - [Brief description of the project and technologies used]

CERTIFICATIONS
[Certification Name] - [Issuing Organization] - [Date]

LANGUAGES
[Languages you speak]

INTERESTS
[Your interests and hobbies]
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Software_Engineer_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
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
          Welcome to My Universe
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Software Engineer | Full-Stack Developer | Problem Solver
        </motion.p>
        <motion.p
          style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#ccc', lineHeight: '1.6' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Exploring the digital cosmos, one line of code at a time. 
          Passionate about creating innovative solutions and pushing the boundaries of technology.
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