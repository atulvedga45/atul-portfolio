import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-gray-400 py-12 px-6 border-t border-gray-900 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-2 mb-4">
        <img src="/assets/spydy-DLbFrGCQ.png" alt="Spider Logo" className="w-6 h-6 object-contain" />
        <span className="text-white text-lg font-black tracking-tight uppercase">
          <span className="text-[#a31515]">A</span>TUL VEDGA.
        </span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 max-w-lg mb-6">
        "With great power comes great responsibility." — Aspiring AI Engineer & Full Stack Developer.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-400 mb-8">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#skills" className="hover:text-white transition-colors">Skills</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        <a href="https://github.com/atulvedga45" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">GitHub</a>
        <a href="https://www.linkedin.com/in/atul-vedga-4b0413378/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">LinkedIn</a>
      </div>

      <p className="text-[11px] text-gray-600 font-medium">
        © {new Date().getFullYear()} Atul Vedga. All Rights Reserved. Built with React, GSAP, Tailwind & FastAPI.
      </p>
    </footer>
  );
}
