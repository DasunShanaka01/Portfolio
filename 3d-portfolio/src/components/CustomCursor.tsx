import React, { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  const updateCursor = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    
    // Add trail effect with throttling
    setTrails(prev => {
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() };
      const updated = [...prev, newTrail].slice(-3); // Keep last 3 trails
      return updated;
    });
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.project-card') ||
        target.closest('.skill-category') ||
        target.closest('.download-btn')) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let rafId: number;
    
    const throttledUpdateCursor = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateCursor(e);
        rafId = 0;
      });
    };

    document.addEventListener('mousemove', throttledUpdateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', throttledUpdateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [updateCursor, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  // Don't render cursor on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            opacity: (index + 1) / trails.length * 0.4,
            transform: `scale(${0.3 + (index + 1) / trails.length * 0.4})`
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''}`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
        }}
      />
    </>
  );
};

export default CustomCursor; 