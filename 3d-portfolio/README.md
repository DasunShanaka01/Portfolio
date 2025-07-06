# 🚀 3D Space Portfolio

A stunning, interactive 3D portfolio website with a space theme featuring astronauts, rockets, planets, and the Milky Way. Built with React, Three.js, and modern web technologies.

## ✨ Features

- **3D Space Environment**: Interactive 3D scene with floating planets, rockets, and astronauts
- **Smooth Animations**: Beautiful page transitions and hover effects using Framer Motion
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Space-themed design with glassmorphism effects
- **Complete Sections**: About, Skills, Education, Certificates, Projects, and Contact
- **Download Resume**: Built-in resume download functionality
- **Contact Form**: Interactive contact form with validation

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Three.js** for 3D graphics
- **React Three Fiber** for React integration
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons
- **CSS3** with modern features

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd 3d-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📝 Customization Guide

### Personal Information

Update your personal information in the following files:

1. **Home Component** (`src/components/Home.tsx`):

   - Update the hero title and subtitle
   - Modify the resume content in `handleDownloadResume` function

2. **About Component** (`src/components/About.tsx`):

   - Update personal information (email, phone, location, social links)
   - Modify the professional summary

3. **Skills Component** (`src/components/Skills.tsx`):

   - Update technical skills in `technicalSkills` object
   - Modify soft skills in `softSkills` array

4. **Education Component** (`src/components/Education.tsx`):

   - Update education data in `educationData` array
   - Add your degrees, institutions, and achievements

5. **Certificates Component** (`src/components/Certificates.tsx`):

   - Update certificates in `certificatesData` array
   - Add your actual certifications and credentials

6. **Projects Component** (`src/components/Projects.tsx`):

   - Update projects in `projectsData` array
   - Add your actual projects with descriptions and links

7. **Contact Component** (`src/components/Contact.tsx`):
   - Update contact information in `contactInfo` array
   - Modify social media links in `socialLinks` array

### 3D Scene Customization

The 3D space scene is defined in `src/components/SpaceScene.tsx`. You can:

- Add more planets by creating new `<Planet>` components
- Modify rocket positions and animations
- Add more astronauts or space objects
- Adjust lighting and colors
- Change the background gradient in `App.tsx`

### Styling

The main styles are in `src/App.css`. You can:

- Change the color scheme by updating CSS variables
- Modify the glassmorphism effects
- Adjust animations and transitions
- Update responsive breakpoints

## 🎨 Color Scheme

The current color scheme uses:

- Primary: `#667eea` (Blue)
- Secondary: `#764ba2` (Purple)
- Background: Dark space theme
- Text: White and light gray variations

## 📱 Responsive Design

The portfolio is fully responsive and includes:

- Mobile-first design approach
- Adaptive navigation for small screens
- Responsive grid layouts
- Touch-friendly interactions

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

### Deploy to Netlify

1. Build the project:

```bash
npm run build
```

2. Upload the `build` folder to Netlify

### Deploy to GitHub Pages

1. Add homepage to `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/3d-portfolio"
}
```

2. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

3. Add deploy script to `package.json`:

```json
{
  "scripts": {
    "deploy": "gh-pages -d build"
  }
}
```

4. Deploy:

```bash
npm run build
npm run deploy
```

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/
│   ├── SpaceScene.tsx      # 3D space environment
│   ├── Navigation.tsx      # Navigation bar
│   ├── Home.tsx           # Home page with hero content
│   ├── About.tsx          # About me section
│   ├── Skills.tsx         # Technical and soft skills
│   ├── Education.tsx      # Educational background
│   ├── Certificates.tsx   # Professional certifications
│   ├── Projects.tsx       # Project showcase
│   └── Contact.tsx        # Contact form and info
├── App.tsx                # Main app component
├── App.css               # Main styles
└── index.tsx             # App entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js community for amazing 3D graphics library
- Framer Motion for smooth animations
- Lucide for beautiful icons
- Create React App team for the excellent development environment

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to reach out!

---

**Happy coding! 🚀✨**
