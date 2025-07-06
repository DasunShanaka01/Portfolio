import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import './App.css';
import SpaceScene from './components/SpaceScene';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2
        });
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <Navigation />
        <div className="canvas-container">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            style={{ 
              background: `radial-gradient(ellipse at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, #1a1a2e 0%, #16213e 50%, #0a0a0a 100%)`,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transition: 'background 0.1s ease'
            }}
          >
            <SpaceScene />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
          </Canvas>
        </div>
        <div className="content-overlay">
          <div className="scrollable-content">
            <Home />
            <About />
            <Skills />
            <Education />
            <Certificates />
            <Projects />
            <Contact />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
