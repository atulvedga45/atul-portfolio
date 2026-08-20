import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const webBgRef = useRef(null);
  const standingSpiderRef = useRef(null);

  const projectsList = [
    {
      title: 'Palghar GPMS (Gram Panchayat Management)',
      description:
        'Enterprise-level government management and admin system featuring strict role & permission management, automated record tracking, secure JWT authentication, and high-performance backend pipelines.',
      tags: ['Python', 'FastAPI', 'React.js', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'JWT Auth'],
      github: 'https://github.com/atulvedga45',
    },
    {
      title: 'RAG AI Chatbot',
      description:
        'Retrieval-Augmented Generation AI chatbot capable of real-time document-based question answering, vector semantic search, custom LLM integration, and LangChain orchestration workflows.',
      tags: ['Python', 'LangChain', 'RAG', 'Vector Search', 'LLMs', 'Conversational AI'],
      github: 'https://github.com/atulvedga45',
    },
    {
      title: 'AuthFlow – Secure Authentication System',
      description:
        'Production-ready authentication and authorization microservice with OAuth2 integration, secure JWT token rotation, bcrypt password hashing, and role-based access control with PostgreSQL.',
      tags: ['FastAPI', 'JWT', 'OAuth2', 'Password Hashing', 'PostgreSQL', 'Security'],
      github: 'https://github.com/atulvedga45',
    },
    {
      title: 'HealtyBityAI – Health & Wellness Intelligence',
      description:
        'Intelligent AI-powered health and wellness application utilizing data-driven algorithms, personalized recommendation engines, and modern machine learning concepts to assist daily lifestyle health.',
      tags: ['Python', 'AI / ML', 'FastAPI', 'Data Analytics', 'React.js'],
      github: 'https://github.com/atulvedga45',
    },
    {
      title: 'Python NLP Conversational Chatbot',
      description:
        'Natural Language Processing chatbot implementing tokenization, intent classification, context memory, and entity recognition to deliver intelligent conversational responses.',
      tags: ['Python', 'NLP', 'Conversational AI', 'NLTK / SpaCy', 'Machine Learning'],
      github: 'https://github.com/atulvedga45',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(headerRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(
          '.project-item',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' },
          '-=0.3'
        )
        .fromTo(
          standingSpiderRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.4'
        );

      // Web animations
      gsap.set(webBgRef.current, { transformOrigin: 'top right' });
      gsap.to(webBgRef.current, {
        rotation: 8,
        repeat: -1,
        yoyo: true,
        duration: 6,
        ease: 'sine.inOut',
      });
      gsap.to(webBgRef.current, {
        scale: 1.1,
        opacity: 0.07,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'sine.inOut',
      });

      // Standing Spider-Man gentle hovering
      gsap.to(standingSpiderRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-white text-gray-900 py-20 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden border-t border-gray-100"
    >
      {/* Background Web Watermark Top Right */}
      <div className="absolute top-0 right-0 pointer-events-none overflow-hidden z-0">
        <img
          ref={webBgRef}
          src="/assets/web1-770H2sSx.png"
          alt="Background Web"
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain opacity-[0.04] mix-blend-multiply transform translate-x-1/3 -translate-y-1/3"
        />
      </div>

      {/* Standing Spider-Man Bottom Left */}
      <div
        ref={standingSpiderRef}
        className="absolute bottom-0 left-4 md:left-12 z-30 pointer-events-none"
      >
        <img
          src="/assets/spydy_stand-BwBM-zCr.png"
          alt="Standing Spider-Man"
          className="w-32 md:w-48 h-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-12 z-10">
        <span className="text-[#a31515] font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] mb-2 flex items-center gap-2">
          <img src="/assets/spydy-DLbFrGCQ.png" alt="Spider Icon" className="w-4 h-4 object-contain" />
          Featured Works & AI Systems
        </span>
        <h2
          className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-gray-900"
          style={{ textShadow: '2px 2px 0px #fca5a5' }}
        >
          PROJECTS.
        </h2>
        <div className="w-12 h-1 bg-[#a31515] mt-2 rounded-full" />
      </div>

      {/* Projects Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 z-10">
        {projectsList.map((project, idx) => (
          <div
            key={idx}
            className="project-item group relative bg-gray-50/90 backdrop-blur-sm border border-gray-200 hover:border-[#a31515] p-6 md:p-7 rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-2xs hover:shadow-xl hover:-translate-y-1"
          >
            {/* Top Red Bar Indicator on Hover */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#a31515] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

            <div>
              {/* Project Title & GitHub Link Icon */}
              <div className="flex items-center justify-between mb-3 gap-2">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-gray-900 group-hover:text-[#a31515] transition-colors duration-300">
                  {project.title}
                </h3>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 group-hover:text-[#a31515] transition-colors duration-300 p-1"
                  title="View on GitHub"
                >
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium mb-6">
                {project.description}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-200/60">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-white border border-gray-200 text-gray-600 group-hover:border-[#a31515]/30 group-hover:text-[#a31515] rounded-md transition-colors duration-300 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
