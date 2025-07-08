import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
import { Volume2, VolumeX } from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: 'white', 
          background: '#000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>Something went wrong</h1>
          <p>Please refresh the page to try again.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Section wrapper for intersection observer
function Section({ children, id }: { children: React.ReactNode, id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div ref={ref} id={id} className={`content-section${visible ? ' visible' : ''}`}>
      {children}
    </div>
  );
}

function App() {
  const [muted, setMuted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showRocket, setShowRocket] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.muted = muted;
    }
  }, [muted]);

  useEffect(() => {
    const tryPlay = async () => {
      if (audioRef.current && !musicStarted) {
        try {
          await audioRef.current.play();
          setMusicStarted(true);
          setShowOverlay(false);
          // Start rocket animation
          setShowRocket(true);
          // Hide rocket after animation completes (3 seconds)
          setTimeout(() => setShowRocket(false), 3000);
        } catch (error) {
          console.error('Autoplay blocked:', error);
          setShowOverlay(true);
        }
      }
    };

    tryPlay();

    if (!musicStarted) {
      const startOnUserAction = () => {
        tryPlay();
        window.removeEventListener('click', startOnUserAction);
        window.removeEventListener('keydown', startOnUserAction);
        window.removeEventListener('touchstart', startOnUserAction);
      };

      window.addEventListener('click', startOnUserAction);
      window.addEventListener('keydown', startOnUserAction);
      window.addEventListener('touchstart', startOnUserAction);

      return () => {
        window.removeEventListener('click', startOnUserAction);
        window.removeEventListener('keydown', startOnUserAction);
        window.removeEventListener('touchstart', startOnUserAction);
      };
    }
  }, [musicStarted]);

  const handleToggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleOverlayStart = () => {
    if (audioRef.current && !musicStarted) {
      audioRef.current.play().then(() => {
        setMusicStarted(true);
        setShowOverlay(false);
        // Start rocket animation
        setShowRocket(true);
        // Hide rocket after animation completes (3 seconds)
        setTimeout(() => setShowRocket(false), 3000);
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/*" element={
            <div className="App">
              {/* Overlay for manual audio start */}
              {showOverlay && !musicStarted && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 0, 0, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 3000,
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <h2>Click Rocket to Launch Portfolio</h2>
                  <svg
                    onClick={handleOverlayStart}
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      cursor: 'pointer',
                      marginTop: '20px',
                      transition: 'transform 0.3s',
                    }}
                    className="rocket-button"
                  >
                    <path d="M50 10 L30 90 H40 L45 70 H55 L60 90 H70 L50 10 Z" fill="#667eea"/>
                    <path d="M50 80 C45 85, 55 85, 50 80" fill="#ff4500"/>
                  </svg>
                </div>
              )}
              {/* Rocket Animation */}
              {showRocket && (
                <div style={{
                  position: 'fixed',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2500,
                  animation: 'rocketLaunch 3s ease-out forwards',
                }}>
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10 L30 90 H40 L45 70 H55 L60 90 H70 L50 10 Z" fill="#667eea"/>
                    <path d="M50 80 C45 85, 55 85, 50 80" fill="#ff4500"/>
                  </svg>
                </div>
              )}
              {/* Background Music */}
              <audio ref={audioRef} src="/space-music.mp3" loop />
              {/* Mute/Unmute Button */}
              <button
                className="music-toggle-btn"
                onClick={handleToggleMute}
                style={{
                  position: 'fixed',
                  top: 24,
                  right: 32,
                  zIndex: 2000,
                  background: 'rgba(20,20,30,0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  color: '#fff',
                  transition: 'background 0.2s'
                }}
                aria-label={muted ? 'Unmute music' : 'Mute music'}
              >
                {muted ? <VolumeX size={28} /> : <Volume2 size={28} />}
              </button>
              <Navigation />
              <div className="canvas-container">
                <Canvas
                  camera={{ position: [0, 0, 8], fov: 60 }}
                  style={{ 
                    background: '#000000',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  onError={(error) => {
                    console.error('Canvas error:', error);
                  }}
                >
                  <SpaceScene />
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    enableRotate={false}
                    autoRotate={true}
                    autoRotateSpeed={1.0}
                    dampingFactor={0.1}
                  />
                </Canvas>
              </div>
              <div className="content-overlay">
                <div className="scrollable-content">
                  <Section id="home"><Home /></Section>
                  <Section id="about"><About /></Section>
                  <Section id="skills"><Skills /></Section>
                  <Section id="education"><Education /></Section>
                  <Section id="certificates"><Certificates /></Section>
                  <Section id="projects"><Projects /></Section>
                  <Section id="contact"><Contact /></Section>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;