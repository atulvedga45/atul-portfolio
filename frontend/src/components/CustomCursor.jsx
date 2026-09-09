import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState(null); // null, 'interactive', 'text', 'card'
  const [hoverLabel, setHoverLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rippleContainerRef = useRef(null);

  // Check if touch device (disable on mobile/tablet for optimal UX)
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
  }, []);

  // Sync custom-cursor-active class on body
  useEffect(() => {
    if (isTouchDevice) {
      document.body.classList.remove('custom-cursor-active');
    } else {
      document.body.classList.add('custom-cursor-active');
    }
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouchDevice]);

  // Main GSAP tracking & hover interaction listeners
  useEffect(() => {
    if (isTouchDevice) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Fast and smooth quickTo setters
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power3.out' });
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.06, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.06, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = (e) => {
      setIsClicked(true);
      createSpiderRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => setIsClicked(false);

    // Dynamic Hover Detection using event delegation
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const linkOrBtn = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
      const textInput = target.closest('input:not([type="submit"]):not([type="button"]), textarea');
      const card = target.closest('.project-card, .skill-card, [data-cursor-hover]');

      if (linkOrBtn) {
        setHoverType('interactive');
        const ariaLabel = linkOrBtn.getAttribute('aria-label') || linkOrBtn.getAttribute('title');
        const href = linkOrBtn.getAttribute('href');
        if (ariaLabel && ariaLabel.length <= 12) {
          setHoverLabel(ariaLabel.toUpperCase());
        } else if (href && (href.startsWith('http') || href.includes('github') || href.includes('linkedin'))) {
          setHoverLabel('VISIT');
        } else {
          setHoverLabel('');
        }
      } else if (textInput) {
        setHoverType('text');
        setHoverLabel('');
      } else if (card) {
        setHoverType('card');
        setHoverLabel('');
      } else {
        setHoverType(null);
        setHoverLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice, isVisible]);

  // Click shockwave ripple creator
  const createSpiderRipple = (x, y) => {
    if (!rippleContainerRef.current) return;
    const ripple = document.createElement('div');
    ripple.className = 'spider-click-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    rippleContainerRef.current.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 700);
  };

  if (isTouchDevice) return null;

  return (
    <>
      {/* Shockwave ripple container */}
      <div ref={rippleContainerRef} className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden" />

      {/* Center Laser Dot */}
      <div
        ref={dotRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
        }}
        className={`fixed top-0 left-0 pointer-events-none z-[100000] rounded-full transition-all duration-150 ${
          hoverType === 'text'
            ? 'w-1 h-5 bg-red-500 rounded-none shadow-[0_0_10px_#ef4444]'
            : hoverType === 'interactive'
            ? 'w-2.5 h-2.5 bg-white shadow-[0_0_14px_#ffffff]'
            : 'w-2 h-2 bg-red-500 shadow-[0_0_12px_#ef4444]'
        }`}
      />

      {/* Spider HUD Targeting Reticle Ring */}
      <div
        ref={ringRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
        }}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center transition-all duration-200 ease-out ${
          hoverType === 'interactive'
            ? 'w-14 h-14'
            : hoverType === 'card'
            ? 'w-16 h-16'
            : isClicked
            ? 'w-8 h-8 scale-90'
            : 'w-10 h-10'
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center animate-[spin_12s_linear_infinite]">
          {/* Circular Target Border */}
          <div
            className={`absolute inset-0 rounded-full border border-dashed transition-all duration-300 ${
              hoverType === 'interactive'
                ? 'border-red-500 bg-red-600/15 shadow-[0_0_22px_rgba(239,68,68,0.75)] scale-110'
                : hoverType === 'card'
                ? 'border-red-400/90 bg-red-950/25 shadow-[0_0_15px_rgba(239,68,68,0.45)]'
                : 'border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.35)]'
            }`}
          />

          {/* 4 Cardinal Crosshairs / HUD Notches */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-red-400 shadow-[0_0_8px_#ef4444]" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-red-400 shadow-[0_0_8px_#ef4444]" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1.5 bg-red-400 shadow-[0_0_8px_#ef4444]" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-1.5 bg-red-400 shadow-[0_0_8px_#ef4444]" />

          {/* Subtle Spider Pulse Radar on Hover */}
          {hoverType === 'interactive' && (
            <div className="absolute inset-[-4px] rounded-full border-2 border-red-500/50 animate-ping" />
          )}
        </div>

        {/* Dynamic Action Tag on Hover */}
        {hoverLabel && hoverType === 'interactive' && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-red-600 text-white rounded shadow-[0_0_12px_rgba(239,68,68,0.8)] whitespace-nowrap pointer-events-none">
            {hoverLabel}
          </span>
        )}
      </div>
    </>
  );
}
