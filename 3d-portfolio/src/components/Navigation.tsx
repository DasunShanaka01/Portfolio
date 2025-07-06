import React, { useState, useEffect } from 'react';
import { Home, User, Code, GraduationCap, Award, FolderOpen, Mail } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'education', 'certificates', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navigation">
      <button 
        className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
        onClick={() => scrollToSection('home')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>
      <button 
        className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
        onClick={() => scrollToSection('about')}
      >
        <User size={20} />
        <span>About</span>
      </button>
      <button 
        className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
        onClick={() => scrollToSection('skills')}
      >
        <Code size={20} />
        <span>Skills</span>
      </button>
      <button 
        className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}
        onClick={() => scrollToSection('education')}
      >
        <GraduationCap size={20} />
        <span>Education</span>
      </button>
      <button 
        className={`nav-link ${activeSection === 'certificates' ? 'active' : ''}`}
        onClick={() => scrollToSection('certificates')}
      >
        <Award size={20} />
        <span>Certificates</span>
      </button>
      <button 
        className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
        onClick={() => scrollToSection('projects')}
      >
        <FolderOpen size={20} />
        <span>Projects</span>
      </button>
      <button 
        className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
        onClick={() => scrollToSection('contact')}
      >
        <Mail size={20} />
        <span>Contact</span>
      </button>
    </nav>
  );
};

export default Navigation; 