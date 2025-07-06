import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Brain } from 'lucide-react';

interface TechnicalSkill {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  color?: string;
  description?: string;
  isActive?: boolean;
  order?: number;
}

interface SoftSkill {
  _id?: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  color?: string;
  description?: string;
  isActive?: boolean;
  order?: number;
}

const Skills = () => {
  const [technicalSkills, setTechnicalSkills] = useState<TechnicalSkill[]>([]);
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:5000/api/technical-skills').then(res => res.json()),
      fetch('http://localhost:5000/api/soft-skills').then(res => res.json())
    ])
      .then(([techData, softData]) => {
        setTechnicalSkills(techData.data || []);
        setSoftSkills(softData.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load skills');
        setLoading(false);
      });
  }, []);

  // Group technical skills by category
  const groupedTechSkills = technicalSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, TechnicalSkill[]>);

  const skillIcons = {
    'Programming Languages': <Code size={24} />,
    'Frontend': <Code size={24} />,
    'Frontend Development': <Code size={24} />,
    'Backend': <Code size={24} />,
    'Backend Development': <Code size={24} />,
    'Database': <Database size={24} />,
    'Databases': <Database size={24} />,
    'Cloud': <Cloud size={24} />,
    'Cloud & DevOps': <Cloud size={24} />,
    'DevOps': <Cloud size={24} />,
    'Tools': <Wrench size={24} />,
    'Tools & Technologies': <Wrench size={24} />,
    'Other': <Wrench size={24} />
  };

  return (
    <motion.div
      id="skills"
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
        Technical Skills
      </motion.h1>
      {loading ? (
        <p style={{ color: '#ccc' }}>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <motion.div
          className="skills-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {Object.entries(groupedTechSkills).map(([category, skills], index) => (
            <motion.div
              key={category}
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ marginRight: '10px', color: '#667eea' }}>
                  {skillIcons[category as keyof typeof skillIcons] || <Wrench size={24} />}
                </div>
                <h3>{category}</h3>
              </div>
              <div className="skill-list">
                {skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill._id || skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                    style={skill.color ? { background: skill.color, color: '#fff' } : {}}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{ marginTop: '50px' }}
      >
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Soft Skills
        </motion.h1>
        {loading ? (
          <p style={{ color: '#ccc' }}>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <motion.div
            className="skill-category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{ marginTop: '30px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <Brain size={24} style={{ marginRight: '10px', color: '#667eea' }} />
              <h3>Professional & Interpersonal Skills</h3>
            </div>
            <div className="skill-list">
              {softSkills.map((skill, index) => (
                <motion.span
                  key={skill._id || skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  style={skill.color ? { background: skill.color, color: '#fff' } : { background: 'linear-gradient(45deg, #764ba2, #667eea)' }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        style={{ marginTop: '50px', textAlign: 'center' }}
      >
        <h2 style={{ color: '#667eea', fontSize: '1.5rem', marginBottom: '20px' }}>
          Skill Proficiency Levels
        </h2>
        <p style={{ color: '#ccc', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
          I continuously work on improving my skills and staying updated with the latest technologies. 
          My expertise ranges from foundational knowledge to advanced implementation, with a focus on 
          practical application and real-world problem-solving.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Skills; 