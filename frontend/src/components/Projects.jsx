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
      title: 'Todo Fullstack Application',
      description:
        'A full-stack Todo application developed from scratch with secure user registration and login. The application includes OTP-based email verification and JWT authentication. Users can create, update, delete, and mark todos as completed. It follows a RESTful API architecture with PostgreSQL database integration.',
      tags: [
        'React.js',
        'FastAPI',
        'Python',
        'PostgreSQL',
        'JWT',
        'Brevo Email API',
        'RESTful API',
        'Git',
        'GitHub',
        'Environment Variables',
      ],
      github: 'https://github.com/atulvedga45',
    },
    {
      title: 'RAG AI Chatbot',
      description:
        'An AI-powered document chatbot that allows users to upload documents such as PDFs and interact with them through context-aware conversations. The system uses Retrieval-Augmented Generation (RAG) to retrieve relevant information from uploaded documents and generate accurate responses using the Google Gemini LLM. It combines document processing, text chunking, vector embeddings, semantic similarity search, and LLM-based response generation.',
      tags: [
        'Python',
        'FastAPI',
        'Google Gemini',
        'RAG',
        'Vector Embeddings',
        'React.js',
        'Vite',
        'Tailwind CSS',
        'ChromaDB',
      ],
      github: 'https://github.com/atulvedga45',
    },
    {
      title: 'AuthFlow – Secure Authentication System',
      description:
        'AuthFlow is a secure full-stack authentication system designed to manage user registration, login, authentication, authorization, and password recovery. The system uses JWT-based authentication with protected routes, Bcrypt password hashing, OTP-based password reset, and user profile management. It follows a clean architecture with RESTful APIs and repository-based data access.',
      tags: [
        'Python',
        'React.js',
        'FastAPI',
        'PostgreSQL',
        'SQLAlchemy',
        'JWT',
        'OAuth2',
        'Alembic',
        'Vite',
        'Axios',
        'React Router DOM',
        'Context API',
        'Gmail SMTP',
      ],
      github: 'https://github.com/atulvedga45',
    },
    {
      title: 'Interactive Developer Portfolio',
      description:
        'An interactive, high-performance personal portfolio website built with a custom Spider-Man aesthetic. Features dynamic GSAP animations, scroll-triggered web interactions, responsive modern UI, and a Python FastAPI backend integrated with PostgreSQL for real-time contact management.',
      tags: [
        'React.js',
        'Vite',
        'Tailwind CSS',
        'GSAP Animations',
        'Python',
        'FastAPI',
        'PostgreSQL',
        'REST API',
      ],
      github: 'https://github.com/atulvedga45',
    },
    {
      title: 'Python NLP Conversational Chatbot',
      description:
        'An AI-powered Python documentation chatbot built using a Retrieval-Augmented Generation (RAG) pipeline. The system uses semantic search and vector embeddings to retrieve relevant Python documentation and generates accurate, context-aware responses using the Groq API with LLaMA 3.3 70B. It also supports real-time streaming responses, JWT authentication, per-user data isolation, rate limiting, and file validation.',
      tags: [
        'React.js',
        'Vite',
        'Tailwind CSS',
        'Python',
        'FastAPI',
        'PostgreSQL',
        'SQLAlchemy',
        'ChromaDB',
        'Groq API',
        'JWT',
      ],
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
