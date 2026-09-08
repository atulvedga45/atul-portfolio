import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const hangingSpiderRef = useRef(null);
  const webLeftRef = useRef(null);
  const webRightRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const techGroupRef = useRef(null);

  const techStack = [
    'Python',
    'FastAPI',
    'React.js',
    'LangChain',
    'RAG',
    'PostgreSQL',
    'Machine Learning',
    'GitLab',
    'Tailwind CSS',
    'JavaScript',
    'MySQL',
    'Git & GitHub',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(
          [webLeftRef.current, webRightRef.current],
          { y: -600, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, ease: 'elastic.out(0.8, 0.4)', stagger: 0.3 }
        )
        .fromTo(
          tagRef.current,
          { x: -50, opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
          { x: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', duration: 0.8, ease: 'power3.out' },
          '-=1.4'
        )
        .fromTo(
          titleRef.current,
          { y: 50, opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.8, ease: 'power3.out' },
          '-=1.0'
        )
        .fromTo(
          hangingSpiderRef.current,
          { y: -800, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, ease: 'elastic.out(0.7, 0.4)' },
          '-=0.8'
        )
        .fromTo(
          bioRef.current.children,
          { y: 40, opacity: 0, rotationX: -45 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.2)' },
          '-=1.2'
        )
        .fromTo(
          techGroupRef.current.children,
          { scale: 0.5, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.8'
        );

      // Spider swaying physics
      gsap.to(hangingSpiderRef.current, {
        rotation: 2.5,
        transformOrigin: 'top center',
        yoyo: true,
        repeat: -1,
        duration: 3.2,
        ease: 'sine.inOut',
        delay: 2,
      });

      // Background web slow rotation
      gsap.to('.bg-web-left', {
        rotation: 360,
        transformOrigin: 'center center',
        repeat: -1,
        duration: 70,
        ease: 'linear',
      });
      gsap.to('.bg-web-right', {
        rotation: -360,
        transformOrigin: 'center center',
        repeat: -1,
        duration: 90,
        ease: 'linear',
      });

      // Profile glow pulsation
      gsap.to('.glow-frame', {
        boxShadow: '0px 15px 35px rgba(163,21,21,0.25)',
        yoyo: true,
        repeat: -1,
        duration: 2,
        ease: 'sine.inOut',
      });

      // Tech pill micro floating
      gsap.to('.tech-pill', {
        y: -4,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: 'sine.inOut',
        stagger: { each: 0.2, from: 'random' },
        delay: 1.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gray-50 text-gray-900 py-24 flex items-center justify-center overflow-hidden"
    >
      {/* Hanging Background Web Left */}
      <div
        ref={webLeftRef}
        className="absolute top-[-50px] left-[-5%] md:left-[2%] flex flex-col items-center pointer-events-none z-0"
      >
        <div className="w-[1px] h-[250px] md:h-[350px] bg-gradient-to-b from-transparent to-gray-300" />
        <img
          src="/assets/web1-770H2sSx.png"
          alt="Hanging Web"
          className="bg-web-left w-64 h-64 md:w-96 md:h-96 object-contain -mt-12 opacity-[0.12] mix-blend-multiply"
        />
      </div>

      {/* Hanging Background Web Right */}
      <div
        ref={webRightRef}
        className="absolute top-[-50px] right-[-5%] md:right-[2%] flex flex-col items-center pointer-events-none z-0"
      >
        <div className="w-[1px] h-[200px] md:h-[300px] bg-gradient-to-b from-transparent to-gray-300" />
        <img
          src="/assets/web1-770H2sSx.png"
          alt="Hanging Web"
          className="bg-web-right w-56 h-56 md:w-80 md:h-80 object-contain -mt-10 opacity-[0.12] mix-blend-multiply"
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-20 z-10 relative">
        {/* Left Column: Bio & Tech Stack */}
        <div className="flex-1 flex flex-col gap-6 mt-10 lg:mt-0 relative z-20">
          <div className="overflow-hidden">
            <span
              ref={tagRef}
              className="inline-flex items-center gap-2 text-[#a31515] font-bold uppercase text-xs md:text-sm tracking-[0.2em]"
            >
              <img src="/assets/spydy-DLbFrGCQ.png" alt="Spider" className="w-5 h-5 object-contain drop-shadow-sm" />
              Behind the Mask
            </span>
          </div>

          <div className="overflow-hidden py-2">
            <h2
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase italic text-gray-900"
              style={{ textShadow: '2px 2px 0px #fca5a5' }}
            >
              Atul Vedga.
            </h2>
          </div>

          <div
            ref={bioRef}
            className="flex flex-col gap-5 text-gray-700 text-base md:text-lg leading-relaxed max-w-xl font-medium mt-1"
            style={{ perspective: '1000px' }}
          >
            <p className="origin-bottom">
              I’m <strong>Atul Vedga</strong>, a BCA student and aspiring AI Engineer passionate about Artificial Intelligence, Machine Learning, Data Analytics, Data Science, and Full Stack Development.
            </p>
            <p className="origin-bottom">
              I enjoy building intelligent, scalable, and data-driven applications using <strong>Python, FastAPI, React, PostgreSQL</strong>, and modern AI technologies. I have hands-on experience developing REST APIs, authentication systems, admin panels, RAG-based AI applications, and full-stack projects.
            </p>
            <p className="origin-bottom text-sm text-gray-600">
              Continuously learning new technologies and looking for opportunities to solve real-world problems through software and AI.
            </p>
          </div>

          {/* Primary Tech Stack */}
          <div className="mt-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-5 font-bold border-b border-gray-300 pb-2 inline-block">
              Primary Tech Stack & Core Competencies
            </h3>
            <div ref={techGroupRef} className="flex flex-wrap gap-2.5">
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="tech-pill px-3.5 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-[#a31515] text-gray-800 text-xs font-bold rounded-lg shadow-2xs hover:shadow-md transition-all duration-300 cursor-default uppercase tracking-wider flex items-center gap-2 hover:-translate-y-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a31515]" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Picture & Hanging Spider Frame */}
        <div className="flex-1 relative flex justify-center items-start min-h-[500px] w-full pt-0">
          <div ref={hangingSpiderRef} className="flex flex-col items-center z-30 group">
            {/* Hanging Web Thread */}
            <div className="w-[2px] h-[180px] md:h-[300px] bg-gradient-to-b from-transparent via-[#a31515]/40 to-[#a31515] opacity-80" />

            {/* Profile Frame */}
            <div className="glow-frame relative w-64 h-64 md:w-[320px] md:h-[320px] rounded-full border-[6px] border-[#a31515] p-2 bg-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center bg-gray-900">
                <img
                  src="/assets/atul_profile.png"
                  alt="Atul Vedga"
                  className="w-full h-full object-cover object-top rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
