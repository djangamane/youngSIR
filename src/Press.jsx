import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ExternalLink, ArrowLeft, Film, Newspaper } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Placeholder data — swap in real URLs, titles, and sources ---

const VIDEO_CLIPS = [
  {
    id: 1,
    title: "State Championship — Decisive Assists (2026)",
    description: "Full-game breakdown: 14 assists, 0 turnovers. The performance that sealed the 4A Desert Region title.",
    youtubeId: "", // e.g. "dQw4w9WgXcQ"
    thumbnail: "/assets/pg_action1.png",
    tag: "CHAMPIONSHIP",
  },
  {
    id: 2,
    title: "Highlight Reel — 2025/26 Season",
    description: "Top plays from the championship campaign: perimeter defense, court vision, and clutch execution.",
    youtubeId: "",
    thumbnail: "/assets/pg_action2.png",
    tag: "SEASON REEL",
  },
  {
    id: 3,
    title: "Assist Breakdown — #2 State Leader",
    description: "Film session analysis of the top 20 assists from the 2025/26 season. System-first facilitation on display.",
    youtubeId: "",
    thumbnail: "/assets/pg_action1.png",
    tag: "FILM STUDY",
  },
];

const PRESS_ARTICLES = [
  {
    id: 1,
    title: "Sir Montgomery Named #2 Assist Leader in Nevada 4A",
    publication: "Nevada Preps",
    date: "March 2026",
    excerpt: "Clark High's floor general closes the season with 106 assists, trailing only one player statewide in a historic campaign.",
    url: "#",
    tag: "STATE RANKINGS",
  },
  {
    id: 2,
    title: "Scholar-Athlete Profile: The 3.9 GPA Playmaker",
    publication: "Las Vegas Review-Journal",
    date: "February 2026",
    excerpt: "How Sir Montgomery balances a 3.9 GPA with championship basketball — a profile on discipline, preparation, and purpose.",
    url: "#",
    tag: "FEATURE",
  },
  {
    id: 3,
    title: "Clark Chargers Win State: Montgomery's Steady Hand",
    publication: "MaxPreps",
    date: "March 2026",
    excerpt: "In a tight 56-54 championship finish, it was Sir Montgomery's composure under pressure that held the program together.",
    url: "#",
    tag: "CHAMPIONSHIP",
  },
  {
    id: 4,
    title: "Next-Level Prospects: Class of 2027 Guard Watch",
    publication: "247 Sports",
    date: "April 2026",
    excerpt: "A curated list of high-IQ guards flying under the radar — Sir Montgomery earns a spot as a proven system driver.",
    url: "#",
    tag: "RECRUITING",
  },
];

// --- Components ---

const PressNavbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-5 bg-obsidian/90 backdrop-blur-xl border-b border-champagne/10">
    <a href="/" className="flex items-center gap-3 text-white/60 hover:text-champagne transition-colors text-sm font-mono uppercase tracking-widest">
      <ArrowLeft size={16} />
      Back
    </a>
    <span className="text-champagne font-bold tracking-tighter text-lg">SIR MONTGOMERY</span>
    <a href="/#contact" className="btn-magnetic btn-gold px-5 py-2 text-[10px] uppercase tracking-widest">
      Contact
    </a>
  </nav>
);

const VideoCard = ({ clip }) => {
  const hasVideo = Boolean(clip.youtubeId);

  return (
    <div className="card-premium group overflow-hidden bg-white">
      <div className="relative aspect-video overflow-hidden bg-obsidian">
        <img
          src={clip.thumbnail}
          alt={clip.title}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {hasVideo ? (
            <a
              href={`https://www.youtube.com/watch?v=${clip.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full bg-champagne/90 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
            >
              <Play size={24} className="text-obsidian ml-1" fill="currentColor" />
            </a>
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/10 border border-champagne/30 flex items-center justify-center backdrop-blur-sm">
              <Play size={24} className="text-champagne/60 ml-1" />
            </div>
          )}
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-champagne text-obsidian text-[9px] font-mono font-bold uppercase tracking-widest rounded-full">
            {clip.tag}
          </span>
        </div>
        {!hasVideo && (
          <div className="absolute bottom-4 right-4 text-[9px] font-mono text-white/30 uppercase tracking-widest">
            CLIP COMING SOON
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-obsidian mb-2 leading-tight">{clip.title}</h3>
        <p className="text-slate/50 text-sm leading-relaxed">{clip.description}</p>
      </div>
    </div>
  );
};

const ArticleCard = ({ article }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className="card-premium p-8 bg-white group flex flex-col gap-4 hover:border-champagne/40 transition-all duration-300 cursor-pointer"
  >
    <div className="flex items-start justify-between gap-4">
      <span className="px-3 py-1 bg-champagne/10 text-champagne text-[9px] font-mono font-bold uppercase tracking-widest rounded-full shrink-0">
        {article.tag}
      </span>
      <ExternalLink size={14} className="text-slate/20 group-hover:text-champagne transition-colors shrink-0 mt-0.5" />
    </div>
    <div>
      <h3 className="font-bold text-lg text-obsidian leading-tight mb-2 group-hover:text-champagne transition-colors duration-300">
        {article.title}
      </h3>
      <p className="text-slate/50 text-sm leading-relaxed">{article.excerpt}</p>
    </div>
    <div className="flex items-center gap-3 pt-2 border-t border-slate/10 mt-auto">
      <span className="text-champagne font-bold text-[11px] uppercase tracking-widest font-mono">{article.publication}</span>
      <span className="text-slate/30 text-[11px] font-mono">{article.date}</span>
    </div>
  </a>
);

// --- Page ---

const Press = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.press-hero-title', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
      gsap.from('.press-hero-sub', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.5 });

      gsap.utils.toArray('.press-reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-ivory selection:bg-champagne/30 selection:text-white text-slate min-h-screen">
      <PressNavbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 sm:px-12 md:px-24 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/assets/pg_action2.png" alt="" className="w-full h-full object-cover brightness-50" />
          <div className="absolute inset-0 bg-obsidian/70" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-champagne/30 bg-white/5 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/80">MEDIA VAULT — CLASS OF 2027</span>
          </div>
          <h1 className="press-hero-title text-5xl md:text-8xl font-extrabold text-white uppercase tracking-tighter leading-none mb-6">
            Showcase &amp; <br />
            <span className="italic drama text-champagne">Press.</span>
          </h1>
          <p className="press-hero-sub text-white/50 text-lg max-w-xl leading-relaxed">
            Game film, season highlights, and verified press coverage. Everything a program needs to evaluate Sir Montgomery's market value.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-32 px-8 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="press-reveal flex items-center gap-4 mb-16">
            <div className="w-10 h-10 rounded-2xl bg-champagne/10 flex items-center justify-center text-champagne">
              <Film size={20} />
            </div>
            <div>
              <p className="text-champagne font-mono text-[10px] uppercase tracking-[0.3em]">VIDEO INTELLIGENCE</p>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                Game <span className="italic drama text-champagne">Film.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VIDEO_CLIPS.map((clip, i) => (
              <div key={clip.id} className="press-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <VideoCard clip={clip} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-24">
        <div className="h-px bg-champagne/15" />
      </div>

      {/* Press Section */}
      <section className="py-32 px-8 sm:px-12 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="press-reveal flex items-center gap-4 mb-16">
            <div className="w-10 h-10 rounded-2xl bg-champagne/10 flex items-center justify-center text-champagne">
              <Newspaper size={20} />
            </div>
            <div>
              <p className="text-champagne font-mono text-[10px] uppercase tracking-[0.3em]">VERIFIED COVERAGE</p>
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                Press <span className="italic drama text-champagne">Room.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRESS_ARTICLES.map((article, i) => (
              <div key={article.id} className="press-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-32 px-8 sm:px-12 md:px-24 bg-obsidian rounded-t-[4rem]">
        <div className="max-w-4xl mx-auto text-center press-reveal">
          <p className="text-champagne font-mono text-[10px] uppercase tracking-[0.3em] mb-6">READY TO ENGAGE</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-8">
            Request the Full <span className="italic drama text-champagne">Intel Package.</span>
          </h2>
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Film, stats, transcripts, and direct access to Stephanie Gunner — Sir's primary advocate and parent contact.
          </p>
          <a href="/#contact" className="btn-magnetic btn-gold inline-flex items-center gap-3 text-sm uppercase tracking-widest py-5 px-10">
            Contact Stephanie <ArrowLeft size={18} className="rotate-180" />
          </a>
        </div>
      </section>

      <style>{`
        .btn-magnetic { border-radius: 9999px; font-weight: 700; }
        .btn-gold { background: #c9a84c; color: #0d0d12; }
        .btn-gold:hover { background: #e0c06e; }
        .card-premium { border-radius: 1.5rem; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 32px rgba(0,0,0,0.06); }
      `}</style>
    </div>
  );
};

export default Press;
