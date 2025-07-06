import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Save, X, 
  User, Code, GraduationCap, Award, 
  FolderOpen, MessageCircle, Share2, 
  CheckCircle, AlertCircle, Loader
} from 'lucide-react';

interface ProfessionalSummary {
  _id?: string;
  title: string;
  summary: string;
  experience: string;
  location: string;
  email: string;
  phone: string;
  isActive: boolean;
  order: number;
}

interface TechnicalSkill {
  _id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Mobile' | 'Other';
  proficiency: number;
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
  order: number;
}

interface SoftSkill {
  _id?: string;
  name: string;
  category: 'Communication' | 'Leadership' | 'Problem Solving' | 'Teamwork' | 'Adaptability' | 'Other';
  proficiency: number;
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
  order: number;
}

interface Education {
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
  logo: string;
  isActive: boolean;
  order: number;
}

interface Certificate {
  _id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  credentialUrl: string;
  category: 'Programming' | 'Cloud' | 'Database' | 'Security' | 'Project Management' | 'Other';
  description: string;
  image: string;
  isActive: boolean;
  order: number;
}

interface Project {
  _id?: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  category: 'Web Development' | 'Mobile App' | 'Desktop App' | 'API' | 'Game' | 'Other';
  image: string;
  liveUrl: string;
  githubUrl: string;
  demoUrl: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  features: string[];
  challenges: string[];
  solutions: string[];
  isActive: boolean;
  order: number;
}

interface SocialLink {
  _id?: string;
  platform: 'LinkedIn' | 'GitHub' | 'Twitter' | 'Facebook' | 'Instagram' | 'YouTube' | 'Portfolio' | 'Blog' | 'Other';
  url: string;
  username: string;
  displayName: string;
  icon: string;
  color: string;
  description: string;
  isActive: boolean;
  order: number;
}

interface Contact {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  company: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data states
  const [professionalSummaries, setProfessionalSummaries] = useState<ProfessionalSummary[]>([]);
  const [technicalSkills, setTechnicalSkills] = useState<TechnicalSkill[]>([]);
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Move loadData above useEffect
  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'summary':
          const summaryRes = await fetch(`${API_BASE_URL}/professional-summary`);
          const summaryData = await summaryRes.json();
          setProfessionalSummaries(summaryData.data || []);
          break;
        case 'technical':
          const techRes = await fetch(`${API_BASE_URL}/technical-skills`);
          const techData = await techRes.json();
          setTechnicalSkills(techData.data || []);
          break;
        case 'soft':
          const softRes = await fetch(`${API_BASE_URL}/soft-skills`);
          const softData = await softRes.json();
          setSoftSkills(softData.data || []);
          break;
        case 'education':
          const eduRes = await fetch(`${API_BASE_URL}/education`);
          const eduData = await eduRes.json();
          setEducation(eduData.data || []);
          break;
        case 'certificates':
          const certRes = await fetch(`${API_BASE_URL}/certificates`);
          const certData = await certRes.json();
          setCertificates(certData.data || []);
          break;
        case 'projects':
          const projRes = await fetch(`${API_BASE_URL}/projects`);
          const projData = await projRes.json();
          setProjects(projData.data || []);
          break;
        case 'social':
          const socialRes = await fetch(`${API_BASE_URL}/social-links`);
          const socialData = await socialRes.json();
          setSocialLinks(socialData.data || []);
          break;
        case 'contact':
          const contactRes = await fetch(`${API_BASE_URL}/contact`);
          const contactData = await contactRes.json();
          setContacts(contactData.data || []);
          break;
      }
    } catch (error) {
      showMessage('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, [activeTab, loadData]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({});
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${getEndpoint()}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showMessage('success', 'Item deleted successfully');
        loadData();
      } else {
        showMessage('error', 'Failed to delete item');
      }
    } catch (error) {
      showMessage('error', 'Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingItem 
        ? `${API_BASE_URL}/${getEndpoint()}/${editingItem._id}`
        : `${API_BASE_URL}/${getEndpoint()}`;

      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showMessage('success', editingItem ? 'Item updated successfully' : 'Item created successfully');
        setShowForm(false);
        loadData();
      } else {
        const errorData = await response.json();
        showMessage('error', errorData.message || 'Failed to save item');
      }
    } catch (error) {
      showMessage('error', 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  const getEndpoint = () => {
    switch (activeTab) {
      case 'summary': return 'professional-summary';
      case 'technical': return 'technical-skills';
      case 'soft': return 'soft-skills';
      case 'education': return 'education';
      case 'certificates': return 'certificates';
      case 'projects': return 'projects';
      case 'social': return 'social-links';
      case 'contact': return 'contact';
      default: return 'professional-summary';
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'summary': return 'Professional Summary';
      case 'technical': return 'Technical Skills';
      case 'soft': return 'Soft Skills';
      case 'education': return 'Education';
      case 'certificates': return 'Certificates';
      case 'projects': return 'Projects';
      case 'social': return 'Social Links';
      case 'contact': return 'Contact Messages';
      default: return 'Professional Summary';
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'summary':
        return <ProfessionalSummaryForm formData={formData} setFormData={setFormData} />;
      case 'technical':
        return <TechnicalSkillForm formData={formData} setFormData={setFormData} />;
      case 'soft':
        return <SoftSkillForm formData={formData} setFormData={setFormData} />;
      case 'education':
        return <EducationForm formData={formData} setFormData={setFormData} />;
      case 'certificates':
        return <CertificateForm formData={formData} setFormData={setFormData} />;
      case 'projects':
        return <ProjectForm formData={formData} setFormData={setFormData} />;
      case 'social':
        return <SocialLinkForm formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const renderDataList = () => {
    const data = {
      summary: professionalSummaries,
      technical: technicalSkills,
      soft: softSkills,
      education: education,
      certificates: certificates,
      projects: projects,
      social: socialLinks,
      contact: contacts,
    }[activeTab] || [];

    return (
      <div className="data-list">
        {data.map((item: any) => (
          <motion.div
            key={item._id}
            className="data-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="item-content">
              <h4>{item.title || item.name || item.institution || item.platform}</h4>
              <p>{item.summary || item.description || item.email || item.url}</p>
              {item.isActive !== undefined && (
                <span className={`status ${item.isActive ? 'active' : 'inactive'}`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              )}
            </div>
            <div className="item-actions">
              <button onClick={() => handleEdit(item)} className="btn-edit">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(item._id)} className="btn-delete">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="admin-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="admin-header">
        <h1>Portfolio Admin Panel</h1>
        <p>Manage your portfolio content and data</p>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          className={`message ${message.type}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {message.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={activeTab === 'summary' ? 'active' : ''}
          onClick={() => setActiveTab('summary')}
        >
          <User size={16} />
          Summary
        </button>
        <button
          className={activeTab === 'technical' ? 'active' : ''}
          onClick={() => setActiveTab('technical')}
        >
          <Code size={16} />
          Technical Skills
        </button>
        <button
          className={activeTab === 'soft' ? 'active' : ''}
          onClick={() => setActiveTab('soft')}
        >
          <User size={16} />
          Soft Skills
        </button>
        <button
          className={activeTab === 'education' ? 'active' : ''}
          onClick={() => setActiveTab('education')}
        >
          <GraduationCap size={16} />
          Education
        </button>
        <button
          className={activeTab === 'certificates' ? 'active' : ''}
          onClick={() => setActiveTab('certificates')}
        >
          <Award size={16} />
          Certificates
        </button>
        <button
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          <FolderOpen size={16} />
          Projects
        </button>
        <button
          className={activeTab === 'social' ? 'active' : ''}
          onClick={() => setActiveTab('social')}
        >
          <Share2 size={16} />
          Social Links
        </button>
        <button
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          <MessageCircle size={16} />
          Contact Messages
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        <div className="content-header">
          <h2>{getTabTitle()}</h2>
          {activeTab !== 'contact' && (
            <button onClick={handleCreate} className="btn-create">
              <Plus size={16} />
              Add New
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading">
            <Loader size={24} className="spinner" />
            Loading...
          </div>
        ) : (
          renderDataList()
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <motion.div
          className="form-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingItem ? 'Edit' : 'Create'} {getTabTitle()}</h3>
              <button onClick={() => setShowForm(false)} className="btn-close">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {renderForm()}
              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? <Loader size={16} className="spinner" /> : <Save size={16} />}
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Form Components
const ProfessionalSummaryForm: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => (
  <div className="form-fields">
    <div className="form-group">
      <label>Title</label>
      <input
        type="text"
        value={formData.title || ''}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="e.g., Software Engineer"
        required
      />
    </div>
    <div className="form-group">
      <label>Summary</label>
      <textarea
        value={formData.summary || ''}
        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        placeholder="Professional summary..."
        rows={4}
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Experience</label>
        <input
          type="text"
          value={formData.experience || ''}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          placeholder="e.g., 3+ years"
          required
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={formData.location || ''}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., New York, NY"
          required
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your.email@example.com"
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
        Active
      </label>
    </div>
  </div>
);

const TechnicalSkillForm: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => (
  <div className="form-fields">
    <div className="form-group">
      <label>Skill Name</label>
      <input
        type="text"
        value={formData.name || ''}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., React"
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Category</label>
        <select
          value={formData.category || 'Frontend'}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="DevOps">DevOps</option>
          <option value="Mobile">Mobile</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Proficiency (%)</label>
        <input
          type="number"
          min="1"
          max="100"
          value={formData.proficiency || 50}
          onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
          required
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Icon</label>
        <input
          type="text"
          value={formData.icon || ''}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="e.g., react-icon"
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <input
          type="color"
          value={formData.color || '#667eea'}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
        />
      </div>
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Skill description..."
        rows={3}
      />
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
        Active
      </label>
    </div>
  </div>
);

const SoftSkillForm: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => (
  <div className="form-fields">
    <div className="form-group">
      <label>Skill Name</label>
      <input
        type="text"
        value={formData.name || ''}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Communication"
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Category</label>
        <select
          value={formData.category || 'Communication'}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="Communication">Communication</option>
          <option value="Leadership">Leadership</option>
          <option value="Problem Solving">Problem Solving</option>
          <option value="Teamwork">Teamwork</option>
          <option value="Adaptability">Adaptability</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Proficiency (%)</label>
        <input
          type="number"
          min="1"
          max="100"
          value={formData.proficiency || 50}
          onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
          required
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Icon</label>
        <input
          type="text"
          value={formData.icon || ''}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="e.g., communication-icon"
        />
      </div>
      <div className="form-group">
        <label>Color</label>
        <input
          type="color"
          value={formData.color || '#667eea'}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
        />
      </div>
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Skill description..."
        rows={3}
      />
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
        Active
      </label>
    </div>
  </div>
);

const EducationForm: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => (
  <div className="form-fields">
    <div className="form-group">
      <label>Institution</label>
      <input
        type="text"
        value={formData.institution || ''}
        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
        placeholder="e.g., University of Technology"
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Degree</label>
        <input
          type="text"
          value={formData.degree || ''}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          placeholder="e.g., Bachelor of Science"
          required
        />
      </div>
      <div className="form-group">
        <label>Field of Study</label>
        <input
          type="text"
          value={formData.field || ''}
          onChange={(e) => setFormData({ ...formData, field: e.target.value })}
          placeholder="e.g., Computer Science"
          required
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          value={formData.startDate || ''}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          value={formData.endDate || ''}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          disabled={formData.isCurrent}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>GPA</label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="4"
          value={formData.gpa || ''}
          onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) })}
          placeholder="3.5"
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={formData.location || ''}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., New York, NY"
        />
      </div>
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Education description..."
        rows={3}
      />
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isCurrent || false}
          onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
        />
        Currently Studying
      </label>
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
        Active
      </label>
    </div>
  </div>
);

const CertificateForm: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => (
  <div className="form-fields">
    <div className="form-group">
      <label>Certificate Title</label>
      <input
        type="text"
        value={formData.title || ''}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="e.g., AWS Certified Solutions Architect"
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Issuer</label>
        <input
          type="text"
          value={formData.issuer || ''}
          onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
          placeholder="e.g., Amazon Web Services"
          required
        />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          value={formData.category || 'Programming'}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="Programming">Programming</option>
          <option value="Cloud">Cloud</option>
          <option value="Database">Database</option>
          <option value="Security">Security</option>
          <option value="Project Management">Project Management</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Issue Date</label>
        <input
          type="date"
          value={formData.issueDate || ''}
          onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>Expiry Date</label>
        <input
          type="date"
          value={formData.expiryDate || ''}
          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Credential ID</label>
        <input
          type="text"
          value={formData.credentialId || ''}
          onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
          placeholder="e.g., AWS-123456"
        />
      </div>
      <div className="form-group">
        <label>Credential URL</label>
        <input
          type="url"
          value={formData.credentialUrl || ''}
          onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
          placeholder="https://verify.aws.com/..."
        />
      </div>
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Certificate description..."
        rows={3}
      />
    </div>
    <div className="form-group">
      <label>Image URL</label>
      <input
        type="url"
        value={formData.image || ''}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        placeholder="https://example.com/certificate.jpg"
      />
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
        Active
      </label>
    </div>
  </div>
);

const ProjectForm: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => (
  <div className="form-fields">
    <div className="form-group">
      <label>Project Title</label>
      <input
        type="text"
        value={formData.title || ''}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="e.g., E-commerce Platform"
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Category</label>
        <select
          value={formData.category || 'Web Development'}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="Web Development">Web Development</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Desktop App">Desktop App</option>
          <option value="API">API</option>
          <option value="Game">Game</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Short Description</label>
        <input
          type="text"
          value={formData.shortDescription || ''}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          placeholder="Brief project description"
        />
      </div>
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Detailed project description..."
        rows={4}
        required
      />
    </div>
    <div className="form-group">
      <label>Technologies (comma-separated)</label>
      <input
        type="text"
        value={formData.technologies?.join(', ') || ''}
        onChange={(e) => setFormData({ 
          ...formData, 
          technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech)
        })}
        placeholder="React, Node.js, MongoDB, AWS"
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          value={formData.startDate || ''}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label>End Date</label>
        <input
          type="date"
          value={formData.endDate || ''}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          disabled={formData.isCurrent}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Live URL</label>
        <input
          type="url"
          value={formData.liveUrl || ''}
          onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
          placeholder="https://project-demo.com"
        />
      </div>
      <div className="form-group">
        <label>GitHub URL</label>
        <input
          type="url"
          value={formData.githubUrl || ''}
          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
          placeholder="https://github.com/username/project"
        />
      </div>
    </div>
    <div className="form-group">
      <label>Demo URL</label>
      <input
        type="url"
        value={formData.demoUrl || ''}
        onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
        placeholder="https://demo.project.com"
      />
    </div>
    <div className="form-group">
      <label>Image URL</label>
      <input
        type="url"
        value={formData.image || ''}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        placeholder="https://example.com/project-screenshot.jpg"
      />
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isCurrent || false}
          onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
        />
        Currently Working
      </label>
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
        Active
      </label>
    </div>
  </div>
);

const SocialLinkForm: React.FC<{ formData: any; setFormData: any }> = ({ formData, setFormData }) => (
  <div className="form-fields">
    <div className="form-row">
      <div className="form-group">
        <label>Platform</label>
        <select
          value={formData.platform || 'LinkedIn'}
          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
          required
        >
          <option value="LinkedIn">LinkedIn</option>
          <option value="GitHub">GitHub</option>
          <option value="Twitter">Twitter</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="YouTube">YouTube</option>
          <option value="Portfolio">Portfolio</option>
          <option value="Blog">Blog</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Display Name</label>
        <input
          type="text"
          value={formData.displayName || ''}
          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          placeholder="e.g., John Doe"
        />
      </div>
    </div>
    <div className="form-group">
      <label>URL</label>
      <input
        type="url"
        value={formData.url || ''}
        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        placeholder="https://linkedin.com/in/username"
        required
      />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={formData.username || ''}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="username"
        />
      </div>
      <div className="form-group">
        <label>Icon</label>
        <input
          type="text"
          value={formData.icon || ''}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="linkedin-icon"
        />
      </div>
    </div>
    <div className="form-group">
      <label>Color</label>
      <input
        type="color"
        value={formData.color || '#667eea'}
        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>Description</label>
      <textarea
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Social link description..."
        rows={3}
      />
    </div>
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={formData.isActive || false}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
        Active
      </label>
    </div>
  </div>
);

export default AdminPanel; 