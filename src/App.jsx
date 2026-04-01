import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShieldCheck, 
  Activity, 
  Target, 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  BarChart3, 
  Command, 
  Sparkles, 
  Globe,
  Settings,
  UserCheck
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    
    ScrollTrigger.create({
      start: 'top -80',
      onEnter: () => gsap.to(nav, { 
        backgroundColor: 'rgba(13, 13, 18, 0.8)', 
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(201, 168, 76, 0.2)',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        duration: 0.4 
      }),
      onLeaveBack: () => gsap.to(nav, { 
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        border: '1px solid rgba(255, 255, 255, 0)',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        duration: 0.4 
      }),
    });
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between px-8 py-6 rounded-full transition-all duration-500 w-[90%] max-w-5xl"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tighter text-champagne">SIR MONTGOMERY</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        {['Intel', 'Impact', 'Protocol', 'Contact'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-white/70 hover:text-champagne transition-colors text-sm font-medium tracking-wide uppercase hover:-translate-y-px"
          >
            {item}
          </a>
        ))}
      </div>

      <button className="btn-magnetic btn-gold px-6 py-2.5 text-xs uppercase tracking-widest">
        Request Package
      </button>
    </nav>
  );
};

const FeatureCard1 = () => {
  // Shuffler
  const [items, setItems] = useState([
    { id: 1, label: "#1 Assist Leader", value: "106 Total" },
    { id: 2, label: "Efficiency", value: "4.2 APG" },
    { id: 3, label: "Win-Share", value: "15-Game Streak" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-premium p-8 h-full flex flex-col justify-between group">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-champagne/10 flex items-center justify-center mb-6 text-champagne group-hover:scale-110 transition-transform duration-500">
          <Activity size={24} />
        </div>
        <h3 className="text-2xl mb-2 italic drama">The Facilitation Engine</h3>
        <p className="text-slate/60 text-sm mb-8">Quantitative dominance in the 4A Desert Region. A high-IQ floor general who maximizes roster value.</p>
      </div>

      <div className="relative h-40 flex flex-col items-center justify-center">
        {items.map((item, i) => (
          <div 
            key={item.id}
            className="absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-full py-4 px-6 border border-champagne/20 rounded-2xl bg-white shadow-lg"
            style={{ 
              transform: `translateY(${i * 20}px) scale(${1 - i * 0.05})`,
              zIndex: 3 - i,
              opacity: 1 - i * 0.3
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-obsidian font-bold text-lg">{item.value}</span>
              <span className="text-slate/40 text-xs uppercase tracking-widest">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureCard2 = () => {
  // Typewriter
  const stats = [
    "> SEMIFINAL: Clutch FT with 1 sec remaining → 51-48 Victory",
    "> STATE CHAMP: Stabilizing ball-handler → 56-54 Title Win",
    "> DEFENSE: 1.3 SPG — Perimeter lockdown active",
    "> OFFENSE: #1 Assistant leader — System driver"
  ];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = stats[index];
    const speed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((index + 1) % stats.length);
      } else {
        setText(fullText.substring(0, isDeleting ? text.length - 1 : text.length + 1));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <div className="card-premium p-8 h-full flex flex-col justify-between group">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-champagne/10 flex items-center justify-center mb-6 text-champagne group-hover:scale-110 transition-transform duration-500">
          <Target size={24} />
        </div>
        <h3 className="text-2xl mb-2 italic drama">Telemetry of Impact</h3>
        <p className="text-slate/60 text-sm mb-8">Live metrics from the 2026 Championship campaign. Verifiable performance data at championship scale.</p>
      </div>

      <div className="bg-obsidian rounded-2xl p-6 font-mono text-[10px] sm:text-xs min-h-[140px] border border-champagne/30 text-champagne/80">
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <div className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
          <span className="uppercase tracking-[0.2em] text-[8px]">LIVE INTELLIGENCE FEED</span>
        </div>
        <div className="flex">
          <span className="text-white brightness-125 mr-2">$</span>
          <span>{text}</span>
          <span className="w-1.5 h-4 bg-champagne ml-1 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard3 = () => {
  // Scheduler
  const [activeCell, setActiveCell] = useState(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveCell(prev => (prev === null ? 1 : (prev + 1) % 7));
    }, 2000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="card-premium p-8 h-full flex flex-col justify-between group">
      <div>
        <div className="w-12 h-12 rounded-2xl bg-champagne/10 flex items-center justify-center mb-6 text-champagne group-hover:scale-110 transition-transform duration-500">
          <Settings size={24} />
        </div>
        <h3 className="text-2xl mb-2 italic drama">Protocol Discipline</h3>
        <p className="text-slate/60 text-sm mb-8">Professional-grade preparation. From film study to perimeter defense optimization.</p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[10px] text-slate/40 mb-2 font-mono">{day}</span>
              <div 
                className={`w-full aspect-square rounded-lg transition-all duration-500 ${
                  activeCell === i ? 'bg-champagne scale-110 shadow-lg shadow-champagne/40' : 'bg-slate/5'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-slate/40 font-mono italic">
          <span>04:00 AM START</span>
          <span className="text-champagne font-bold">STATE READY</span>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".hero-line-1", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(".hero-line-2", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.4
      });
      gsap.from(".hero-cta", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      });

      // Simple Reveal for sections
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        });
      });

      // Philosophy Parallax
      gsap.to(".parallax-bg", {
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        ease: "none"
      });

      // Protocol Stacking
      const cards = gsap.utils.toArray('.stack-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top 100px",
          pin: true,
          pinSpacing: false,
          endTrigger: ".stack-container",
          end: "bottom 900px",
          onUpdate: (self) => {
            const nextCard = cards[i + 1];
            if (!nextCard) return;
            const progress = self.progress;
            gsap.set(card, {
              scale: 1 - (progress * 0.1),
              filter: `blur(${progress * 10}px)`,
              opacity: 1 - (progress * 0.5)
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [formData, setFormData] = useState({ name: '', role: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    try {
      // User requested Make.com webhook placeholder
      const response = await fetch('https://hook.us1.make.com/placeholder_id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, system: 'SIR-COMMAND-PORTAL' }),
      });
      if (response.ok) setSubmitStatus('success');
      else setSubmitStatus('error');
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div ref={containerRef} className="selection:bg-champagne/30 text-slate selection:text-white">
      <Navbar />

      {/* --- HERO --- */}
      <section className="relative h-screen flex flex-col justify-end pb-24 px-8 sm:px-12 md:px-24 overflow-hidden bg-obsidian">
        {/* Full-bleed background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/pg_action1.png" 
            alt="Sir Montgomery in Action" 
            className="w-full h-full object-cover opacity-60 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-champagne/30 bg-white/5 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/80">6'2" — 165 lbs / Class of 2027 / #1 Assist Leader</span>
          </div>
          <h1 className="flex flex-col gap-2">
            <span className="hero-line-1 text-5xl md:text-7xl font-extrabold text-white uppercase tracking-tighter leading-none">
              Aspirational meets
            </span>
            <span className="hero-line-2 text-6xl md:text-[9rem] italic text-champagne drama leading-[0.8] mb-8">
              Precision.
            </span>
          </h1>
          <div className="hero-cta">
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 font-medium">
              A high-IQ championship floor general maximizing roster value in the collegiate talent economy. Verified “Safe Harbor” asset.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => document.getElementById('impact').scrollIntoView({ behavior: 'smooth' })}
                className="btn-magnetic btn-gold group flex items-center gap-2"
              >
                REQUEST INTEL PACKAGE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES / IMPACT --- */}
      <section id="impact" className="py-32 px-8 sm:px-12 md:px-24 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 reveal">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
              Quantitative <span className="italic drama normal-case text-champagne">Utility.</span>
            </h2>
            <div className="w-24 h-1 px-1 bg-champagne mb-8" />
            <p className="text-slate/60 text-lg max-w-xl">
              Sir Montgomery represents the rarest commodity in recruitment: a high-purity stabilizer asset who prioritizes institutional winning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal"><FeatureCard1 /></div>
            <div className="reveal transition-delay-150"><FeatureCard2 /></div>
            <div className="reveal transition-delay-300"><FeatureCard3 /></div>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY --- */}
      <section id="intel" className="philosophy-section relative py-48 px-8 sm:px-12 md:px-24 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/pg_action2.png" 
            alt="Clark High Chargers Banners" 
            className="parallax-bg w-full h-[150%] object-cover opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-obsidian/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div>
              <p className="text-champagne/80 font-mono text-sm uppercase tracking-[0.3em] mb-12 reveal">THE MANIFESTO</p>
              <div className="reveal">
                <p className="text-white/40 text-xl md:text-2xl mb-8 leading-relaxed">
                  Most programs chase: <span className="text-white">mercenary hype, viral scoring, and one-and-done rentals.</span>
                </p>
                <div className="h-0.5 bg-white/10 w-full mb-8" />
                <h2 className="text-4xl md:text-7xl text-white leading-tight font-bold reveal">
                  Sir delivers: <br/>
                  <span className="italic drama text-champagne">Championship composure.</span>
                </h2>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-2xl p-12 border border-white/10 rounded-4xl reveal">
              <Sparkles className="text-champagne mb-8" size={40} />
              <p className="text-white/70 text-lg leading-relaxed mb-8 italic">
                "Subject is a primary target for readiness evaluation. His documented assist-to-turnover ratio and defensive spacing metrics signal a missionary archetype — built for institutional alignment."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-champagne/20 border border-champagne/40 flex items-center justify-center text-champagne text-xs font-bold">
                  SIR
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-widest uppercase">NIL Command</p>
                  <p className="text-white/40 text-[10px] uppercase font-mono">Strategic Analyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROTOCOL (STICKY) --- */}
      <section id="protocol" className="stack-container bg-white relative">
        <div className="px-8 sm:px-12 md:px-24">
          <div className="sticky top-0 h-screen flex flex-col justify-center max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-24 reveal">
              Engagement <span className="italic drama normal-case text-champagne">Protocol.</span>
            </h2>
            
            <div className="relative w-full h-[60vh]">
              {/* Card 1 */}
              <div className="stack-card absolute inset-0 bg-ivory border border-black/5 rounded-4xl p-12 flex flex-col md:flex-row gap-12 items-center shadow-2xl">
                <div className="md:w-1/2">
                  <span className="font-mono text-champagne text-sm uppercase tracking-widest block mb-6">01 / EVALUATE</span>
                  <h3 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter">Quantitative Review.</h3>
                  <p className="text-slate/60 text-lg leading-relaxed">
                    Review the performance matrix. 106 seasons assists. 35% from the perimeter. Every metric is litigation-grade and FMV-justified.
                  </p>
                  <div className="mt-8 flex gap-4">
                     <span className="px-4 py-2 bg-slate/5 rounded-full text-[10px] font-mono">DATA_VETERAN</span>
                     <span className="px-4 py-2 bg-slate/5 rounded-full text-[10px] font-mono">CHAMPIONSHIP_DNA</span>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative w-64 h-64 border-2 border-champagne/40 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-48 h-48 border-2 border-champagne/20 rounded-full flex items-center justify-center animate-reverse-spin">
                      <BarChart3 size={64} className="text-champagne" />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-champagne rounded-full" />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="stack-card absolute inset-0 bg-white border border-black/5 rounded-4xl p-12 flex flex-col md:flex-row gap-12 items-center shadow-2xl mt-8">
                <div className="md:w-1/2">
                  <span className="font-mono text-champagne text-sm uppercase tracking-widest block mb-6">02 / VALIDATE</span>
                  <h3 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter">Asset Integrity.</h3>
                  <p className="text-slate/60 text-lg leading-relaxed">
                    The Parent Pathway model ensures 100% compliance. No intermediaries. No hype tax. Professional-grade representation with institutional integrity.
                  </p>
                  <div className="mt-8 flex gap-4">
                     <span className="px-4 py-2 bg-slate/5 rounded-full text-[10px] font-mono">SOVEREIGN_REP</span>
                     <span className="px-4 py-2 bg-slate/5 rounded-full text-[10px] font-mono">CSC_COMPLIANT</span>
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-12 w-full bg-slate/5 rounded-xl flex items-center px-6 overflow-hidden">
                      <div className="w-1/4 h-2 bg-champagne/40 rounded-full mr-4" />
                      <div className="w-full h-1 bg-slate/10 rounded-full relative">
                        <div className="absolute inset-0 bg-champagne h-full rounded-full animate-scan" style={{ animationDelay: `${i * 0.5}s` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3 */}
              <div className="stack-card absolute inset-0 bg-obsidian border border-white/10 rounded-4xl p-12 flex flex-col md:flex-row gap-12 items-center shadow-2xl mt-16">
                <div className="md:w-1/2 text-white">
                  <span className="font-mono text-champagne text-sm uppercase tracking-widest block mb-6">03 / INTEGRATE</span>
                  <h3 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter">System Integration.</h3>
                  <p className="text-white/40 text-lg leading-relaxed">
                    Finalize synchronization with the program. Coordinate directly with Boss Steph to execute the recruitment and NIL engagement strategy.
                  </p>
                  <button className="mt-12 btn-magnetic btn-gold">
                    EXECUTE SYNC
                  </button>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-full max-w-sm h-40 bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden">
                    <svg viewBox="0 0 400 100" className="w-full h-full stroke-champagne fill-none">
                      <path 
                        d="M0,50 Q25,10 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50" 
                        strokeWidth="2" 
                        className="animate-wave"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-48 px-8 sm:px-12 md:px-24 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 items-start">
            <div className="reveal">
              <p className="text-champagne font-mono text-xs uppercase tracking-widest mb-8">THE PARENT PATHWAY</p>
              <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-12">
                Connect with <br/> the <span className="italic drama text-champagne">Advocate.</span>
              </h2>
              
              <div className="relative rounded-4xl overflow-hidden group mb-12 w-full max-w-md aspect-[3/4]">
                <img 
                  src="/assets/boss_steph.png" 
                  alt="Boss Steph — Primary Advocate" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12">
                  <p className="text-white font-bold text-2xl mb-2">Boss Steph</p>
                  <p className="text-champagne font-mono text-[10px] uppercase tracking-widest">Primary Contact & Advocate</p>
                </div>
              </div>

              <div className="flex flex-col gap-6 text-slate/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate/5 flex items-center justify-center text-obsidian"><Globe size={18}/></div>
                  <span className="text-sm font-medium">LAS VEGAS RECRUITMENT HUB</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate/5 flex items-center justify-center text-obsidian"><ShieldCheck size={18}/></div>
                  <span className="text-sm font-medium">SOVEREIGN FAMILY REPRESENTATION</span>
                </div>
              </div>
            </div>

            <div className="reveal transition-delay-300">
              <div className="card-premium p-12 bg-white sticky top-32">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate/40 ml-4">Full Identity</label>
                    <input 
                      type="text" required 
                      className="w-full bg-slate/5 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-champagne transition-all"
                      placeholder="Organization Representative"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate/40 ml-4">NIL Goal / Organization</label>
                    <input 
                      type="text" required
                      className="w-full bg-slate/5 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-champagne transition-all"
                      placeholder="e.g. Agency, Brand, Program"
                      value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate/40 ml-4">Digital Frequency</label>
                    <input 
                      type="email" required
                      className="w-full bg-slate/5 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-champagne transition-all"
                      placeholder="contact@verified.com"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate/40 ml-4">Intel Requirement</label>
                    <textarea 
                      required rows={4}
                      className="w-full bg-slate/5 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-champagne transition-all"
                      placeholder="Specific request for Sir's recruitment package..."
                      value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  
                  <button 
                    disabled={submitStatus === 'sending' || submitStatus === 'success'}
                    type="submit" 
                    className={`btn-magnetic text-sm uppercase tracking-widest py-5 flex items-center justify-center gap-3 transition-all ${
                      submitStatus === 'success' ? 'bg-green-500 text-white' : 'bg-obsidian text-white'
                    }`}
                  >
                    {submitStatus === 'sending' ? 'Transmitting...' : 
                     submitStatus === 'success' ? 'Intel Transmitted' : 'Synchronize Sync'}
                    <ChevronRight size={18} />
                  </button>

                  <p className="text-[9px] font-mono text-slate/30 text-center uppercase tracking-widest leading-relaxed">
                    BY SUBMITTING, YOU ACKNOWLEDGE THE PARENT PATHWAY ARCHITECTURE AND COMPLIANCE GUARDRAILS.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-obsidian py-32 px-8 sm:px-12 md:px-24 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-32">
            <div className="md:col-span-2">
              <span className="text-2xl font-bold text-champagne mb-8 block">SIR MONTGOMERY</span>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed italic">
                Championship-caliber floor general. Class of 2027. Las Vegas desert region #1 assist leader. A AAA-rated mission asset for elite programs.
              </p>
            </div>
            <div>
              <h4 className="text-white text-xs uppercase tracking-widest mb-8">Navigation</h4>
              <ul className="flex flex-col gap-4 text-white/60 text-sm">
                 <li><a href="#intel" className="hover:text-champagne transition-colors">Intel</a></li>
                 <li><a href="#impact" className="hover:text-champagne transition-colors">Impact</a></li>
                 <li><a href="#protocol" className="hover:text-champagne transition-colors">Protocol</a></li>
                 <li><a href="#contact" className="hover:text-champagne transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-xs uppercase tracking-widest mb-8">Verification</h4>
              <div className="flex items-center gap-2 text-green-500 font-mono text-[10px] mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SYSTEM OPERATIONAL
              </div>
              <p className="text-white/20 text-[9px] font-mono uppercase tracking-widest">
                PORTAL_ID: YOUN-SIR-2027<br/>
                LOC: LV_NEVADA_USA
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono">
            <span>© 2026 THE MONTGOMERY FAMILY</span>
            <div className="flex gap-12 mt-8 md:mt-0">
              <a href="#" className="hover:text-white transition-colors underline-offset-4 underline decoration-white/10">Compliance</a>
              <a href="#" className="hover:text-white transition-colors underline-offset-4 underline decoration-white/10">Fair Market Value</a>
              <a href="#" className="hover:text-white transition-colors underline-offset-4 underline decoration-white/10">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global CSS for some missing bits */}
      <style>{`
        .animate-spin-slow { animation: spin 12s linear infinite; }
        .animate-reverse-spin { animation: spin-reverse 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes wave {
          0% { transform: translateX(-10%); }
          100% { transform: translateX(10%); }
        }
        .animate-wave { animation: wave 2s ease-in-out infinite alternate; }
        @keyframes scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-scan { animation: scan 2s linear infinite; position: absolute; width: 50%; height: 100%; }
      `}</style>
    </div>
  );
};

export default App;
