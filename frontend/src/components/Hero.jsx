import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const maskLayerRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const spiderWebsRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);

  // Spotlight mouse state
  const mouseState = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
    alpha: 1,
    size: 60,
  }).current;

  const quickX = useRef(null);
  const quickY = useRef(null);
  const marqueeAnim1 = useRef(null);
  const marqueeAnim2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.timeline({ defaults: { ease: 'back.out(1.7)' } })
        .fromTo(
          spiderWebsRef.current.children,
          { opacity: 0, scale: 0.5 },
          { opacity: 0.5, scale: 1, duration: 2, stagger: 0.4, ease: 'power3.out' }
        )
        .fromTo(subtitleRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 }, '-=1.5')
        .fromTo(titleRef.current, { x: -150, opacity: 0, skewX: -15 }, { x: 0, opacity: 1, skewX: 0, duration: 1.2 }, '-=1.0')
        .fromTo(
          ctaGroupRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(2)' },
          '-=0.8'
        );

      // Continuous subtle ambient animations
      gsap.to(spiderWebsRef.current.children, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: 'linear',
      });
      gsap.to(spiderWebsRef.current.children, {
        scale: 1.1,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Dual Marquee Ribbon horizontal loops
      marqueeAnim1.current = gsap.to(marquee1Ref.current, {
        x: '-50%',
        repeat: -1,
        duration: 16,
        ease: 'none',
      });

      gsap.set(marquee2Ref.current, { x: '-50%' });
      marqueeAnim2.current = gsap.to(marquee2Ref.current, {
        x: '0%',
        repeat: -1,
        duration: 22,
        ease: 'none',
      });

      gsap.to('.marquee-text', {
        y: -4,
        yoyo: true,
        repeat: -1,
        duration: 0.8,
        ease: 'sine.inOut',
        stagger: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Spotlight mouse mask tracking
  useEffect(() => {
    quickX.current = gsap.quickTo(mouseState, 'x', { duration: 0.3, ease: 'power4.out' });
    quickY.current = gsap.quickTo(mouseState, 'y', { duration: 0.3, ease: 'power4.out' });

    const updateMask = () => {
      if (maskLayerRef.current) {
        const { x, y, alpha, size } = mouseState;
        const gradient = `radial-gradient(circle ${size}px at ${x}px ${y}px, rgba(0,0,0,${alpha}) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 100%)`;
        maskLayerRef.current.style.webkitMaskImage = gradient;
        maskLayerRef.current.style.maskImage = gradient;
      }
    };

    gsap.ticker.add(updateMask);
    return () => gsap.ticker.remove(updateMask);
  }, [mouseState]);

  const handleMouseMove = (e) => {
    if (quickX.current && quickY.current) {
      quickX.current(e.clientX);
      quickY.current(e.clientY);
    }
  };

  const handleMouseEnter = () => {
    gsap.to(mouseState, { alpha: 0, size: 700, duration: 0.8, ease: 'elastic.out(1, 0.7)', overwrite: 'auto' });
  };

  const handleMouseLeave = () => {
    gsap.to(mouseState, { alpha: 1, size: 60, duration: 1.2, ease: 'power4.inOut', overwrite: 'auto' });
  };

  const handleRibbonMouseEnter = () => {
    if (marqueeAnim1.current && marqueeAnim2.current) {
      gsap.to([marqueeAnim1.current, marqueeAnim2.current], { timeScale: 0.1, duration: 0.8, ease: 'power2.out' });
    }
  };

  const handleRibbonMouseLeave = () => {
    if (marqueeAnim1.current && marqueeAnim2.current) {
      gsap.to([marqueeAnim1.current, marqueeAnim2.current], { timeScale: 1, duration: 0.8, ease: 'power2.out' });
    }
  };

  const marqueeSkills = [
    'AI & MACHINE LEARNING',
    'FASTAPI & PYTHON',
    'REACT & VITE',
    'RAG & LANGCHAIN',
    'FULL STACK DEVELOPER',
    'POSTGRESQL & SQL',
    'DATA SCIENCE & NLP'
  ];

  const renderMarqueeList = (items) => (
    <>
      {[...items, ...items, ...items, ...items].map((item, idx) => (
        <span key={idx} className="marquee-text font-black text-sm md:text-xl lg:text-2xl uppercase tracking-tighter whitespace-nowrap px-6 flex items-center gap-4">
          <span>{item}</span>
          <span className="inline-block w-2.5 h-2.5 rotate-45 bg-current opacity-80" />
        </span>
      ))}
    </>
  );

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      {/* Interactive Hero Visual */}
      <section
        className="relative w-full h-[90vh] md:h-screen overflow-hidden cursor-crosshair select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Bottom Layer: Atul Face Reveal (revealed via mask spotlight) */}
        <img
          src="/assets/atul_face_reveal_aligned.png"
          alt="Atul Vedga Face Identity"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-10"
        />

        {/* Top Mask Layer: Spider-Man with Mask (cut out by spotlight cursor) */}
        <img
          ref={maskLayerRef}
          src="/assets/spiderman_masked.png"
          alt="Spider-Man Mask Layer"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-20"
          style={{ WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat' }}
        />

        {/* Spider Web Overlays */}
        <div ref={spiderWebsRef} className="absolute inset-0 pointer-events-none z-[25] overflow-hidden">
          <img
            src="/assets/web1-770H2sSx.png"
            alt="Spider Web Top"
            className="absolute top-0 left-0 w-44 h-44 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] object-contain opacity-40 sm:opacity-50 -translate-x-1/4 -translate-y-1/4 mix-blend-multiply"
          />
          <img
            src="/assets/web1-770H2sSx.png"
            alt="Spider Web Bottom"
            className="absolute bottom-0 right-0 w-52 h-52 sm:w-72 sm:h-72 md:w-[500px] md:h-[500px] object-contain opacity-40 sm:opacity-50 translate-x-1/4 translate-y-1/4 mix-blend-multiply"
          />
        </div>

        {/* Hero Headlines & CTA */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 lg:left-24 z-30 flex flex-col gap-3 pointer-events-none drop-shadow-md max-w-xl w-full">
          <span ref={subtitleRef} className="text-[#a31515] font-bold uppercase text-xs md:text-sm tracking-[0.2em] opacity-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a31515] animate-ping" />
            Aspiring AI Engineer | Full Stack Developer
          </span>

          <h1
            ref={titleRef}
            className="text-gray-900 text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none opacity-0 italic uppercase"
            style={{ textShadow: '4px 4px 0px #ef4444, 7px 7px 0px #a31515' }}
          >
            ATUL
            <br />
            VEDGA.
          </h1>

          <p className="text-gray-800 text-xs sm:text-sm font-semibold max-w-md line-clamp-2 mt-1">
            Building intelligent AI systems, high-performance FastAPI backends, and modern interactive React web experiences.
          </p>

          <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 mt-6 pointer-events-auto">
            <a
              href="#projects"
              className="relative overflow-hidden bg-[#a31515] hover:bg-[#7a0f0f] text-white px-8 py-3 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(163,21,21,0.4)] cursor-pointer uppercase border border-[#a31515] inline-block"
            >
              Explore Projects
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 text-white bg-gray-900 hover:bg-black px-6 py-3 rounded-lg font-bold transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] uppercase text-sm group"
            >
              <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Criss-Crossing Dual Marquee Ribbons */}
      <section
        className="relative w-full h-[20vh] md:h-[30vh] bg-white overflow-hidden flex items-center justify-center z-40"
        onMouseEnter={handleRibbonMouseEnter}
        onMouseLeave={handleRibbonMouseLeave}
      >
        {/* Red Ribbon */}
        <div className="absolute w-[110vw] h-12 md:h-16 lg:h-20 bg-[#a31515] text-white border-y-[3px] border-black rotate-[4deg] -translate-y-4 md:-translate-y-6 shadow-[0_10px_20px_rgba(0,0,0,0.4)] z-20 flex items-center overflow-hidden scale-105">
          <div ref={marquee1Ref} className="flex items-center h-full w-max">
            {renderMarqueeList(marqueeSkills)}
          </div>
        </div>

        {/* Black Ribbon */}
        <div className="absolute w-[110vw] h-12 md:h-16 lg:h-20 bg-[#111111] text-[#a31515] border-y-[3px] border-[#a31515] rotate-[-4deg] translate-y-4 md:translate-y-6 shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-10 flex items-center overflow-hidden scale-105">
          <div ref={marquee2Ref} className="flex items-center h-full w-max">
            {renderMarqueeList(marqueeSkills)}
          </div>
        </div>
      </section>
    </div>
  );
}
