# Portfolio Backend API

A comprehensive REST API backend for managing portfolio data with MongoDB integration.

## 🚀 Features

- **Full CRUD Operations** for all portfolio sections
- **MongoDB Integration** with Mongoose ODM
- **Input Validation** with express-validator
- **Security Middleware** (Helmet, CORS, Rate Limiting)
- **Error Handling** with comprehensive error responses
- **File Upload Support** for images and documents
- **Contact Form Management** with read/unread status
- **Social Links Management** for various platforms

## 📋 Portfolio Sections

1. **Professional Summary** - Personal information and professional overview
2. **Technical Skills** - Programming languages, frameworks, tools
3. **Soft Skills** - Communication, leadership, problem-solving skills
4. **Education** - Academic background and qualifications
5. **Certificates & Achievements** - Professional certifications and awards
6. **Projects** - Portfolio projects with details and links
7. **Contact** - Contact form submissions management
8. **Social Links** - Social media and professional profile links

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **express-validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API request throttling

## 📦 Installation

1. **Navigate to backend directory:**

   ```bash
   cd 3d-portfolio/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Copy `config.env` and update with your MongoDB credentials
   - Update JWT secret and other configurations

4. **Start the server:**

   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

## 🔧 Configuration

### Environment Variables (`config.env`)

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://dasun:2002@cluster0.x2kdr5t.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📚 API Endpoints

### Base URL: `http://localhost:5000/api`

### 1. Professional Summary

- `GET /professional-summary` - Get all summaries
- `GET /professional-summary/:id` - Get single summary
- `POST /professional-summary` - Create new summary
- `PUT /professional-summary/:id` - Update summary
- `DELETE /professional-summary/:id` - Delete summary
- `GET /professional-summary/active/summary` - Get active summary

### 2. Technical Skills

- `GET /technical-skills` - Get all skills
- `GET /technical-skills/:id` - Get single skill
- `POST /technical-skills` - Create new skill
- `PUT /technical-skills/:id` - Update skill
- `DELETE /technical-skills/:id` - Delete skill
- `GET /technical-skills/active/skills` - Get active skills
- `GET /technical-skills/category/:category` - Get skills by category

### 3. Soft Skills

- `GET /soft-skills` - Get all skills
- `GET /soft-skills/:id` - Get single skill
- `POST /soft-skills` - Create new skill
- `PUT /soft-skills/:id` - Update skill
- `DELETE /soft-skills/:id` - Delete skill
- `GET /soft-skills/active/skills` - Get active skills

### 4. Education

- `GET /education` - Get all education entries
- `GET /education/:id` - Get single education entry
- `POST /education` - Create new education entry
- `PUT /education/:id` - Update education entry
- `DELETE /education/:id` - Delete education entry
- `GET /education/active/education` - Get active education entries

### 5. Certificates

- `GET /certificates` - Get all certificates
- `GET /certificates/:id` - Get single certificate
- `POST /certificates` - Create new certificate
- `PUT /certificates/:id` - Update certificate
- `DELETE /certificates/:id` - Delete certificate
- `GET /certificates/active/certificates` - Get active certificates
- `GET /certificates/category/:category` - Get certificates by category

### 6. Projects

- `GET /projects` - Get all projects
- `GET /projects/:id` - Get single project
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects/active/projects` - Get active projects
- `GET /projects/category/:category` - Get projects by category

### 7. Contact

- `GET /contact` - Get all contact submissions
- `GET /contact/:id` - Get single contact
- `POST /contact` - Submit contact form
- `PATCH /contact/:id/read` - Mark as read
- `PATCH /contact/:id/replied` - Mark as replied
- `DELETE /contact/:id` - Delete contact
- `GET /contact/stats/unread` - Get contact statistics

### 8. Social Links

- `GET /social-links` - Get all social links
- `GET /social-links/:id` - Get single social link
- `POST /social-links` - Create new social link
- `PUT /social-links/:id` - Update social link
- `DELETE /social-links/:id` - Delete social link
- `GET /social-links/active/links` - Get active social links
- `GET /social-links/platform/:platform` - Get links by platform

### 9. Health Check

- `GET /health` - API health status
- `GET /` - API information and endpoints

## 🔍 Query Parameters

### Common Parameters

- `active=true/false` - Filter by active status
- `sort=field` - Sort by field (order, createdAt, name, etc.)
- `limit=10` - Limit results (where applicable)

### Section-Specific Parameters

- `category=Frontend` - Filter by category (skills, certificates, projects)
- `platform=LinkedIn` - Filter by platform (social links)
- `read=true/false` - Filter by read status (contacts)
- `replied=true/false` - Filter by replied status (contacts)

## 📝 Request Examples

### Create Professional Summary

```bash
curl -X POST http://localhost:5000/api/professional-summary \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Software Engineer",
    "summary": "Passionate software engineer with expertise in full-stack development...",
    "experience": "3+ years",
    "location": "New York, NY",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567"
  }'
```

### Create Technical Skill

```bash
curl -X POST http://localhost:5000/api/technical-skills \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React",
    "category": "Frontend",
    "proficiency": 90,
    "icon": "react-icon",
    "color": "#61DAFB",
    "description": "Modern React with hooks and context"
  }'
```

### Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Job Opportunity",
    "message": "I would like to discuss a potential collaboration...",
    "phone": "+1 (555) 123-4567",
    "company": "Tech Corp"
  }'
```

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - Data sanitization
- **Error Handling** - Secure error responses

## 📊 Database Schema

### Professional Summary

```javascript
{
  title: String,
  summary: String,
  experience: String,
  location: String,
  email: String,
  phone: String,
  isActive: Boolean,
  order: Number
}
```

### Technical/Soft Skills

```javascript
{
  name: String,
  category: String,
  proficiency: Number,
  icon: String,
  color: String,
  description: String,
  isActive: Boolean,
  order: Number
}
```

### Education

```javascript
{
  institution: String,
  degree: String,
  field: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  gpa: Number,
  description: String,
  achievements: [String],
  location: String,
  logo: String,
  isActive: Boolean,
  order: Number
}
```

### Projects

```javascript
{
  title: String,
  description: String,
  shortDescription: String,
  technologies: [String],
  category: String,
  image: String,
  liveUrl: String,
  githubUrl: String,
  demoUrl: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean,
  features: [String],
  challenges: [String],
  solutions: [String],
  isActive: Boolean,
  order: Number
}
```

## 🚀 Deployment

### Local Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Environment Setup

1. Set `NODE_ENV=production`
2. Update MongoDB connection string
3. Set secure JWT secret
4. Configure CORS origins
5. Set up proper rate limiting

## 📞 Support

For issues and questions:

1. Check the API documentation
2. Review error logs
3. Test endpoints with Postman/curl
4. Verify MongoDB connection

## 🔄 Updates

- Keep dependencies updated
- Monitor MongoDB performance
- Review security configurations
- Backup database regularly

---

**Happy Coding! 🎉**
