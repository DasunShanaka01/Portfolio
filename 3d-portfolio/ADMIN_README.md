# Portfolio Admin Panel

A comprehensive admin panel for managing your 3D portfolio content with full CRUD operations.

## Features

- **Professional Summary Management**: Update your title, summary, experience, location, and contact information
- **Technical Skills**: Add, edit, and manage technical skills with categories, proficiency levels, and colors
- **Soft Skills**: Manage soft skills with categories and proficiency levels
- **Education**: Add educational background with institutions, degrees, dates, and achievements
- **Certificates**: Manage professional certificates with issue dates, expiry dates, and credential URLs
- **Projects**: Add portfolio projects with descriptions, technologies, links, and images
- **Social Links**: Manage social media profiles and links
- **Contact Messages**: View and manage incoming contact form messages

## Getting Started

### Prerequisites

1. Make sure your backend server is running:

   ```bash
   cd backend
   npm start
   ```

2. Start your frontend development server:
   ```bash
   npm start
   ```

### Accessing the Admin Panel

1. Navigate to your portfolio website
2. Click the "Admin" button in the navigation bar (orange button)
3. Or directly visit: `http://localhost:3000/admin`

## Usage Guide

### Professional Summary

- **Create**: Add your professional title, summary, experience, and contact details
- **Edit**: Update your information anytime
- **Toggle**: Activate/deactivate your summary

### Technical Skills

- **Categories**: Frontend, Backend, Database, DevOps, Mobile, Other
- **Proficiency**: Set skill level from 1-100%
- **Colors**: Choose custom colors for visual appeal
- **Icons**: Add icon names for better presentation

### Soft Skills

- **Categories**: Communication, Leadership, Problem Solving, Teamwork, Adaptability, Other
- **Proficiency**: Set skill level from 1-100%
- **Customization**: Add colors and icons

### Education

- **Institution Details**: Add university/college name, degree, field of study
- **Dates**: Set start and end dates (or mark as current)
- **Achievements**: Add GPA, achievements, and descriptions
- **Location**: Include institution location

### Certificates

- **Details**: Add certificate title, issuer, and category
- **Dates**: Set issue and expiry dates
- **Credentials**: Include credential ID and verification URL
- **Images**: Add certificate images

### Projects

- **Project Info**: Add title, description, and category
- **Technologies**: List all technologies used (comma-separated)
- **Links**: Add live URL, GitHub URL, and demo URL
- **Images**: Add project screenshots
- **Features**: Describe key features and challenges

### Social Links

- **Platforms**: LinkedIn, GitHub, Twitter, Facebook, Instagram, YouTube, Portfolio, Blog
- **URLs**: Add your profile URLs
- **Customization**: Choose colors and icons

### Contact Messages

- **View**: Read incoming contact form messages
- **Status**: Mark messages as read/replied
- **Details**: View sender information and message content

## Form Features

- **Validation**: All forms include proper validation
- **Auto-save**: Form data is preserved during editing
- **Responsive**: Works on desktop and mobile devices
- **Real-time Updates**: Changes appear immediately
- **Error Handling**: Clear error messages and success notifications

## Security Features

- **Input Validation**: All inputs are validated on both frontend and backend
- **Error Handling**: Comprehensive error handling and user feedback
- **Data Integrity**: Proper data types and constraints
- **Safe Operations**: Confirmation dialogs for destructive actions

## Tips for Best Results

1. **Images**: Use high-quality images for projects and certificates
2. **Descriptions**: Write detailed, engaging descriptions
3. **Colors**: Use consistent color schemes for skills
4. **Links**: Ensure all URLs are working and accessible
5. **Updates**: Regularly update your content to keep it fresh

## Troubleshooting

### Common Issues

1. **Backend Connection Error**

   - Ensure backend server is running on port 5000
   - Check if MongoDB is connected
   - Verify environment variables are set

2. **Form Not Saving**

   - Check browser console for errors
   - Verify all required fields are filled
   - Ensure proper data format (dates, numbers, etc.)

3. **Images Not Loading**
   - Use valid image URLs
   - Ensure images are publicly accessible
   - Check image format (JPG, PNG, etc.)

### Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your backend server is running
3. Ensure all dependencies are installed
4. Check the backend logs for server errors

## API Endpoints

The admin panel uses these backend endpoints:

- `GET/POST/PUT/DELETE /api/professional-summary`
- `GET/POST/PUT/DELETE /api/technical-skills`
- `GET/POST/PUT/DELETE /api/soft-skills`
- `GET/POST/PUT/DELETE /api/education`
- `GET/POST/PUT/DELETE /api/certificates`
- `GET/POST/PUT/DELETE /api/projects`
- `GET/POST/PUT/DELETE /api/social-links`
- `GET/PUT/DELETE /api/contact`

All endpoints support filtering, sorting, and pagination for better performance.
