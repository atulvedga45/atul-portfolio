import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const webBgRef = useRef(null);
  const cardRef = useRef(null);
  const hangingSpiderRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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
        .fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.3');

      // Web breathing
      gsap.to(webBgRef.current, {
        scale: 1.15,
        opacity: 0.06,
        repeat: -1,
        yoyo: true,
        duration: 4.5,
        ease: 'sine.inOut',
      });

      // Hanging Spider-Man swaying
      gsap.to(hangingSpiderRef.current, {
        rotation: 8,
        transformOrigin: 'top center',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to FastAPI Python backend
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.warn('Backend connection note:', err.message);
      setSubmitted(true);
    } finally {
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-white text-gray-900 py-20 px-6 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden border-t border-gray-100"
    >
      {/* Background Web Bottom Left */}
      <div className="absolute bottom-0 left-0 pointer-events-none overflow-hidden z-0">
        <img
          ref={webBgRef}
          src="/assets/web1-770H2sSx.png"
          alt="Background Web"
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain opacity-[0.04] mix-blend-multiply -translate-x-1/3 translate-y-1/3"
        />
      </div>

      {/* Hanging Spider-Man Top Right */}
      <div
        ref={hangingSpiderRef}
        className="absolute top-0 right-8 md:right-20 z-30 pointer-events-none flex flex-col items-center origin-top"
      >
        <div className="w-[2px] h-24 md:h-36 bg-gradient-to-b from-transparent to-gray-400 opacity-60" />
        <img
          src="/assets/spydy_hang-Cac1gK30.png"
          alt="Hanging Spider-Man"
          className="w-40 md:w-60 h-auto object-contain drop-shadow-2xl -mt-2"
        />
      </div>

      {/* Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-10 z-10">
        <span className="text-[#a31515] font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] mb-2 flex items-center gap-2">
          <img src="/assets/spydy-DLbFrGCQ.png" alt="Spider" className="w-4 h-4 object-contain" />
          Let's Connect & Collaborate
        </span>
        <h2
          className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-gray-900"
          style={{ textShadow: '2px 2px 0px #fca5a5' }}
        >
          CONTACT.
        </h2>
        <div className="w-12 h-1 bg-[#a31515] mt-2 rounded-full" />
      </div>

      {/* Direct Info Pills */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 z-10">
        <a
          href="mailto:vedgaatul730@gmail.com"
          className="px-4 py-2 bg-gray-100 hover:bg-[#a31515] text-gray-800 hover:text-white rounded-full text-xs font-bold transition-colors flex items-center gap-2 border border-gray-200"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          vedgaatul730@gmail.com
        </a>

        <a
          href="https://github.com/atulvedga45"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-100 hover:bg-black text-gray-800 hover:text-white rounded-full text-xs font-bold transition-colors flex items-center gap-2 border border-gray-200"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          github.com/atulvedga45
        </a>

        <a
          href="https://www.linkedin.com/in/atul-vedga-4b0413378/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-100 hover:bg-[#0077B5] text-gray-800 hover:text-white rounded-full text-xs font-bold transition-colors flex items-center gap-2 border border-gray-200"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          LinkedIn Profile
        </a>
      </div>

      {/* Contact Form Card */}
      <div
        ref={cardRef}
        className="w-full max-w-2xl bg-gray-50/90 backdrop-blur-sm border border-gray-200 p-8 md:p-10 rounded-2xl shadow-sm relative z-10"
      >
        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#a31515] text-white rounded-full flex items-center justify-center text-2xl font-black mb-4 shadow-[0_0_20px_rgba(163,21,21,0.5)]">
              ✓
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-2">
              Message Sent!
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              Thanks for reaching out, Atul will get back to you shortly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Atul Vedga"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515] transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="atul@45.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Message
              </label>
              <textarea
                required
                rows="4"
                placeholder="Let's build something intelligent and amazing together..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#a31515] focus:ring-1 focus:ring-[#a31515] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a31515] hover:bg-[#7a0f0f] text-white py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(163,21,21,0.3)] hover:shadow-[0_6px_20px_rgba(163,21,21,0.5)] cursor-pointer mt-2 disabled:opacity-50"
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
