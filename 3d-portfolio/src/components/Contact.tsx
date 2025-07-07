import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS integration
    emailjs.send(
      'service_vx2pytq',
      'template_vcfsfgx',
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      'lyPEVNR9TmrQtHQ1U'
    ).then(
      (result) => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
      },
      (error) => {
        alert('Failed to send message. Please try again later.');
        setIsSubmitting(false);
      }
    );
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'dasunshanaka01@outlook.com',
      link: 'mailto:dasunshanaka01@outlook.com'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+94 781123032',
      link: 'tel:+94781123032'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'Colombo, Sri Lanka',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      url: 'https://github.com/DasunShanaka01',
      color: '#333'
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/dasun-shanaka-756559250',
      color: '#0077b5'
    }
  ];

  return (
    <motion.div
      id="contact"
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
        Get In Touch
      </motion.h1>
      
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Let's discuss your next project or just say hello!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '30px' }}
      >
        {/* Contact Information */}
        <div>
          <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '30px' }}>
            Contact Information
          </h2>
          
          <div style={{ marginBottom: '30px' }}>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                  padding: '15px',
                  borderRadius: '10px',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ color: '#667eea', marginRight: '15px' }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ color: '#667eea', fontSize: '0.9rem', marginBottom: '5px' }}>
                    {info.label}
                  </div>
                  {info.link ? (
                    <a
                      href={info.link}
                      style={{ color: '#ccc', textDecoration: 'none' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#ccc';
                      }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span style={{ color: '#ccc' }}>{info.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div>
            <h3 style={{ color: '#667eea', fontSize: '1.2rem', marginBottom: '20px' }}>
              Follow Me
            </h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    color: '#ccc',
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: social.color
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '30px' }}>
            Send Message
          </h2>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
              />
            </motion.div>
            
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </motion.div>
            
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder="What's this about?"
              />
            </motion.div>
            
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell me about your project or just say hello!"
                rows={5}
              />
            </motion.div>
            
            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send size={20} style={{ marginRight: '8px' }} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        style={{ marginTop: '40px', textAlign: 'center' }}
      >
        <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '20px' }}>
          Let's Work Together
        </h2>
        <p style={{ color: '#ccc', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          I'm always interested in new opportunities and exciting projects. 
          Whether you have a question, want to discuss a potential collaboration, 
          or just want to say hello, I'd love to hear from you!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Contact; 