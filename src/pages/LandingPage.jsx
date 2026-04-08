import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [activeTab, setActiveTab] = useState('founders');
  const [stats, setStats] = useState({ ideas: 0, funded: 0, investors: 0, deals: 0 });
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { user } = useAuth?.() || {};
  const navigate = useNavigate();
  const pricingSectionRef = useRef(null);
  const marketplaceRef = useRef(null);
  const pillarsRef = useRef(null);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '-100px' });
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 90;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      opacity: Math.random() * 0.45 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,168,130,${p.opacity * 0.5})`;
        ctx.fill();
      });
      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196,168,130,${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  /* ── Mouse glow follow ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  const trendingIdeas = [
    { id: 1, title: "Eco-Charge AI", category: "Hardware / SaaS", price: "₹2,50,000", type: "Buy Concept", equity: "100% IP", votes: 234, daysLeft: 12, badge: "HOT", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", color: "#16a34a", founder: "Ravi S.", location: "Chennai" },
    { id: 2, title: "FinFlow Tamil", category: "Fintech", price: "₹5,00,000", type: "Seeking Seed", equity: "10% Equity", votes: 189, daysLeft: 8, badge: "NEW", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80", color: "#0891b2", founder: "Meena K.", location: "Coimbatore" },
    { id: 3, title: "QuickDeli MVP", category: "Logistics", price: "₹85,000", type: "Buy Codebase", equity: "Full Transfer", votes: 156, daysLeft: 21, badge: "DEAL", img: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=600&q=80", color: "#d97706", founder: "Arjun M.", location: "Madurai" },
    { id: 4, title: "EduTech Pro", category: "Education", price: "₹3,20,000", type: "Equity Deal", equity: "15% Equity", votes: 312, daysLeft: 5, badge: "URGENT", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80", color: "#dc2626", founder: "Priya L.", location: "Trichy" },
    { id: 5, title: "AgriSense IoT", category: "AgriTech", price: "₹7,50,000", type: "Seeking Series A", equity: "18% Equity", votes: 428, daysLeft: 14, badge: "TOP", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80", color: "#3a6b4a", founder: "Kumar R.", location: "Salem" },
    { id: 6, title: "HealthSync App", category: "HealthTech", price: "₹4,00,000", type: "Equity Deal", equity: "12% Equity", votes: 267, daysLeft: 9, badge: "HOT", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80", color: "#0891b2", founder: "Divya N.", location: "Chennai" },
  ];

  const founderWins = [
    { name: "Arun Kumar", amount: "₹15 Lakhs", label: "Equity Funded", text: "I uploaded my prototype for an automated irrigation system. Within 2 weeks, I found an investor who bought 15% equity. MicroStartupX changed my life completely.", role: "CEO, AgriSmart", initials: "AK", tag: "AgriTech", year: "2025" },
    { name: "Priya Lakshmi", amount: "₹4 Lakhs", label: "IP Sold", text: "I am a developer but didn't want to run a business. I sold my SaaS codebase here to a business owner and immediately moved on to my next project. Brilliant platform.", role: "Independent Developer", initials: "PL", tag: "SaaS Dev", year: "2025" },
    { name: "Karthik Rajan", amount: "₹25 Lakhs", label: "Seed Round", text: "Three investors competed to fund my logistics startup. The platform made due diligence seamless and secure. It's the real Shark Tank for Tamil Nadu founders.", role: "Founder, SwiftDeliver", initials: "KR", tag: "Logistics", year: "2026" },
  ];

  const pricingPlans = [
    { name: "Seedling", price: "Free", period: "forever", features: ["1 Active Listing", "Community Chat", "Standard Support", "Basic Analytics", "Public Profile"], cta: "Start Free", popular: false },
    { name: "Singam Pro", price: "₹1,499", period: "/mo", features: ["Unlimited Listings", "Verified Badge", "Direct Investor DMs", "NDA Templates", "Priority Support", "Advanced Analytics"], cta: "Go Pro", popular: true },
    { name: "Enterprise", price: "₹4,999", period: "/mo", features: ["Featured Placement", "Legal Assistance", "Valuation Report", "Priority Matching", "Dedicated Manager", "API Access"], cta: "Scale Now", popular: false },
  ];

  const categories = [
    { name: "SaaS", count: 234, icon: "💻" }, { name: "Fintech", count: 156, icon: "💰" },
    { name: "E-commerce", count: 189, icon: "🛒" }, { name: "AI/ML", count: 98, icon: "🤖" },
    { name: "HealthTech", count: 67, icon: "🏥" }, { name: "EdTech", count: 123, icon: "📚" },
    { name: "Logistics", count: 88, icon: "🚚" }, { name: "AgriTech", count: 45, icon: "🌾" },
  ];

  const howItWorksFounders = [
    { num: "01", icon: "💡", title: "Post Your Idea", sub: "Share your concept", desc: "Upload your pitch deck, MVP demo, business plan or concept note. Set your funding goal or selling price." },
    { num: "02", icon: "🔍", title: "Get Discovered", sub: "Reach 450+ investors", desc: "Your listing reaches verified investors, business buyers and developers actively looking for opportunities." },
    { num: "03", icon: "🤝", title: "Negotiate", sub: "Protected discussions", desc: "Chat via secure DMs, share NDA-protected documents, and negotiate deal terms with confidence." },
    { num: "04", icon: "💰", title: "Close the Deal", sub: "Escrow-backed payment", desc: "Complete the transaction securely. Funds are held in escrow until both parties confirm." },
  ];

  const howItWorksInvestors = [
    { num: "01", icon: "🔎", title: "Browse Deals", sub: "Filter by category", desc: "Explore thousands of verified ideas, codebases and startups filtered by sector, stage and investment size." },
    { num: "02", icon: "📊", title: "Due Diligence", sub: "Request documents", desc: "Access founder details, financial projections, IP documents and chat directly with the startup team." },
    { num: "03", icon: "⚡", title: "Make an Offer", sub: "Transparent bidding", desc: "Submit your offer, negotiate equity or price. See competing interest to make faster decisions." },
    { num: "04", icon: "🏆", title: "Acquire & Grow", sub: "Secure transfer", desc: "All documentation, IP transfer and onboarding is handled on-platform with full legal support." },
  ];

  const pillars = [
    { key: 'founders', label: 'For Founders', headline: 'Post & Fund\nYour Idea', sub: 'Turn concepts into capital', desc: 'Upload your pitch, set your price, reach 450+ verified investors. From concept to funded in days.', points: ['Set your funding goal or selling price', 'Reach 450+ verified investors instantly', 'Escrow-protected deal closing', 'NDA-backed negotiations'] },
    { key: 'developers', label: 'For Developers', headline: 'Sell Code\nor IP', sub: 'Monetise your work', desc: 'List your codebase, SaaS, or app. Sell outright or license your IP. Full legal transfer support.', points: ['Sell outright or licence your IP', 'Full NDA & IP transfer support', 'Set your price, receive offers', 'Get paid, move to next project'] },
    { key: 'investors', label: 'For Investors', headline: 'Invest &\nAcquire', sub: 'Discover Tamil Nadu deals', desc: 'Browse 2,500+ verified startups. AI-matched deal suggestions, due diligence tools built in.', points: ['Browse 2,500+ verified startups', 'Filter by sector, stage & ticket', 'AI-matched deal suggestions', 'Due diligence tools built in'] },
  ];

  const liveDeals = [
    { name: "AgriSense IoT", amt: "₹7.5L", type: "funded", time: "2m ago" },
    { name: "FinFlow Tamil", amt: "₹5L", type: "listed", time: "5m ago" },
    { name: "QuickDeli MVP", amt: "₹85K", type: "sold", time: "12m ago" },
    { name: "EduTech Pro", amt: "₹3.2L", type: "offer", time: "18m ago" },
    { name: "HealthSync", amt: "₹4L", type: "funded", time: "24m ago" },
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentStory(p => (p + 1) % founderWins.length), 6000);
    const targets = { ideas: 2500, funded: 180, investors: 450, deals: 89 };
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = Math.min(step / 60, 1);
      setStats({
        ideas: Math.floor(targets.ideas * p),
        funded: Math.floor(targets.funded * p),
        investors: Math.floor(targets.investors * p),
        deals: Math.floor(targets.deals * p),
      });
      if (step >= 60) clearInterval(timer);
    }, 30);
    return () => { clearInterval(interval); clearInterval(timer); };
  }, []);

  const C = {
    bg: '#f6f5f2',
    bg2: '#ffffff',
    bgDark: '#0a0908',
    bgDark2: '#0e0d0b',
    surface: '#eeede8',
    border: '#e4e2db',
    borderLight: '#efede8',
    text: '#181715',
    textMid: '#6b685e',
    textLight: '#a6a298',
    accentWarm: '#c4a882',
    green: '#3a6b4a',
    orange: '#e8622a',
    white: '#ffffff',
  };

  return (
    <div style={{ fontFamily: "'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif", background: C.bg, color: C.text, overflowX: 'hidden', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #e8e6e1; }
        ::-webkit-scrollbar-thumb { background: #c4a882; border-radius: 5px; }
        .serif { font-family: 'Instrument Serif', 'Times New Roman', serif; }
        .sans { font-family: 'Inter', 'SF Pro Text', system-ui, sans-serif; }

        @keyframes marquee    { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
        @keyframes marqueeRev { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
        @keyframes pulse-live { 0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(34,197,94,.4); } 50% { opacity:.7; box-shadow:0 0 0 5px rgba(34,197,94,0); } }
        @keyframes bar-anim   { from { width:0; } to { width:var(--w); } }
        @keyframes feed-in    { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float-orb  { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-22px) scale(1.04); } }
        @keyframes float-orb2 { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(18px) scale(.97); } }
        @keyframes scroll-line { 0%,100% { opacity:.15; transform:scaleY(1); } 50% { opacity:.5; transform:scaleY(1.4); } }
        @keyframes shimmer    { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
        @keyframes ring-pulse { 0% { transform:scale(.9); opacity:.5; } 100% { transform:scale(1.7); opacity:0; } }
        @keyframes badge-in   { from { opacity:0; transform:translateY(10px) scale(.95); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes word-up    { from { opacity:0; transform:translateY(40px) rotateX(-20deg); } to { opacity:1; transform:translateY(0) rotateX(0deg); } }
        @keyframes fade-slide { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }

        .mq-track     { display:flex; width:max-content; animation: marquee 40s linear infinite; }
        .mq-track-rev { display:flex; width:max-content; animation: marqueeRev 50s linear infinite; }

        .btn-cta { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; background:#1a1a18; border:none; border-radius:40px; font-family:'Inter',sans-serif; font-size:15px; font-weight:500; color:#fff; cursor:pointer; transition:all .22s; letter-spacing:-.01em; }
        .btn-cta:hover { background:#2c2b28; transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,.12); }
        .btn-outline-hero { display:inline-flex; align-items:center; gap:8px; padding:13px 26px; background:transparent; border:1px solid rgba(0,0,0,.12); border-radius:40px; font-family:'Inter',sans-serif; font-size:14px; font-weight:500; color:rgba(0,0,0,.52); cursor:pointer; transition:all .22s; }
        .btn-outline-hero:hover { border-color:rgba(0,0,0,.32); color:#000; background:rgba(0,0,0,.02); }
        .btn-ghost { display:inline-flex; align-items:center; gap:8px; padding:10px 22px; background:transparent; border:1px solid rgba(0,0,0,.08); border-radius:40px; font-family:'Inter',sans-serif; font-size:13px; font-weight:500; color:rgba(0,0,0,.48); cursor:pointer; transition:all .22s; }
        .btn-ghost:hover { background:rgba(0,0,0,.04); color:#000; border-color:rgba(0,0,0,.16); }
        .btn-dark { display:inline-flex; align-items:center; gap:8px; padding:12px 24px; background:#1a1a18; border:none; border-radius:40px; font-family:'Inter',sans-serif; font-size:13px; font-weight:500; color:#fff; cursor:pointer; transition:all .22s; }
        .btn-dark:hover { background:#2c2b28; transform:translateY(-1px); }
        .btn-outline-light { display:inline-flex; align-items:center; gap:8px; padding:11px 24px; background:transparent; border:1.5px solid #e4e2db; border-radius:40px; font-family:'Inter',sans-serif; font-size:13px; font-weight:500; color:#6b685e; cursor:pointer; transition:all .22s; }
        .btn-outline-light:hover { border-color:#181715; color:#181715; }

        .deal-card { background:#fff; border-radius:24px; overflow:hidden; border:1px solid #efede8; transition:all .3s cubic-bezier(.22,1,.36,1); cursor:pointer; }
        .deal-card:hover { transform:translateY(-5px); box-shadow:0 18px 42px rgba(0,0,0,.06); border-color:#d8d5cf; }
        .pillar-card { border:1px solid #e4e2db; border-radius:24px; padding:38px 30px; cursor:pointer; transition:all .4s cubic-bezier(.22,1,.36,1); background:#fff; position:relative; overflow:hidden; }
        .pillar-card.active { background:#1a1a18; border-color:#1a1a18; }
        .pillar-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:#c4a882; border-radius:0 0 24px 24px; transform:scaleX(0); transform-origin:left; transition:transform .4s cubic-bezier(.22,1,.36,1); }
        .pillar-card.active::after, .pillar-card:hover::after { transform:scaleX(1); }
        .step-card { background:#fff; border:1px solid #e4e2db; border-radius:24px; padding:30px 26px; position:relative; overflow:hidden; transition:all .28s; }
        .step-card:hover { border-color:#c8c5bf; box-shadow:0 8px 24px rgba(0,0,0,.04); }
        .price-card { border:1px solid #e4e2db; border-radius:28px; padding:34px 30px; background:#fff; position:relative; transition:all .28s; }
        .price-card:hover { border-color:#c8c5bf; transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,.05); }
        .price-card.popular { background:#1a1a18; border-color:#1a1a18; }

        .live-dot { width:7px; height:7px; background:#22c55e; border-radius:50%; animation:pulse-live 1.8s ease-in-out infinite; display:inline-block; flex-shrink:0; }
        .feed-row { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:12px; background:rgba(0,0,0,.02); border:1px solid rgba(0,0,0,.04); margin-bottom:6px; cursor:default; animation:feed-in .45s ease forwards; transition:background .18s; }
        .feed-row:hover { background:rgba(0,0,0,.04); }
        .bar-track { height:3px; background:rgba(0,0,0,.06); border-radius:4px; overflow:hidden; margin-top:5px; }
        .bar-fill  { height:100%; border-radius:4px; animation:bar-anim 2s cubic-bezier(.22,1,.36,1) forwards; }

        .section-eyebrow { font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:#a6a298; margin-bottom:16px; display:flex; align-items:center; gap:10px; font-family:'Inter',sans-serif; }
        .section-eyebrow::before { content:''; width:24px; height:2px; background:#c4a882; border-radius:2px; flex-shrink:0; }
        .tag-badge { display:inline-block; padding:3px 12px; border-radius:30px; font-size:9px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; font-family:'Inter',sans-serif; }

        /* Hero specific */
        .hero-word { display:inline-block; animation:word-up .7s cubic-bezier(.22,1,.36,1) forwards; opacity:0; }
        .stat-chip { display:flex; align-items:center; gap:10px; padding:12px 20px; background:rgba(0,0,0,.02); border:1px solid rgba(0,0,0,.06); border-radius:20px; backdrop-filter:blur(8px); }
        .orb-1 { position:absolute; border-radius:50%; pointer-events:none; animation:float-orb 9s ease-in-out infinite; }
        .orb-2 { position:absolute; border-radius:50%; pointer-events:none; animation:float-orb2 12s ease-in-out infinite 1s; }
        .cta-shimmer { background: linear-gradient(90deg, #1a1a18 0%, #3a3a36 40%, #1a1a18 60%, #2a2a26 100%); background-size:200% auto; animation:shimmer 3s linear infinite; }
        .ring { position:absolute; border-radius:50%; border:1px solid rgba(0,0,0,.04); pointer-events:none; animation:ring-pulse 4s cubic-bezier(.22,1,.36,1) infinite; }

        input:focus { outline: none; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — PREMIUM LIGHT GREY / WHITE THEME
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: '#fafaf8' }}
      >
        {/* Particle canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />

        {/* Mouse-follow glow */}
        <div style={{
          position: 'absolute', zIndex: 1, pointerEvents: 'none',
          left: mousePos.x, top: mousePos.y,
          width: 600, height: 600,
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(196,168,130,.06) 0%, transparent 65%)',
          transition: 'left .18s ease, top .18s ease',
        }} />

        {/* Static deep glows */}
        <div className="orb-1" style={{ width: 680, height: 680, top: '-22%', right: '-12%', background: 'radial-gradient(circle, rgba(58,107,74,.04) 0%, transparent 62%)', zIndex: 1 }} />
        <div className="orb-2" style={{ width: 500, height: 500, bottom: '-14%', left: '-8%', background: 'radial-gradient(circle, rgba(196,168,130,.05) 0%, transparent 62%)', zIndex: 1 }} />

        {/* Noise texture overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: .015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }} />

        {/* Pulsing rings */}
        <div className="ring" style={{ width: 420, height: 420, top: '50%', left: '50%', marginLeft: -210, marginTop: -210, zIndex: 2, animationDelay: '0s' }} />
        <div className="ring" style={{ width: 640, height: 640, top: '50%', left: '50%', marginLeft: -320, marginTop: -320, zIndex: 2, animationDelay: '1.3s' }} />
        <div className="ring" style={{ width: 860, height: 860, top: '50%', left: '50%', marginLeft: -430, marginTop: -430, zIndex: 2, animationDelay: '2.6s' }} />

        {/* Live ticker */}
        <div style={{ background: 'rgba(232,98,42,.04)', borderBottom: '1px solid rgba(0,0,0,.06)', padding: '7px 48px', overflow: 'hidden', position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#e8622a', whiteSpace: 'nowrap', flexShrink: 0 }}>Live</span>
          <span className="live-dot" />
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div className="mq-track" style={{ animation: 'marquee 28s linear infinite' }}>
              {[...liveDeals, ...liveDeals, ...liveDeals, ...liveDeals].map((d, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 22px', fontSize: 12, color: 'rgba(0,0,0,.42)', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,.08)', fontFamily: "'Inter',sans-serif" }}>
                  <span style={{ color: '#c4a882', fontWeight: 500 }}>{d.name}</span> · {d.type} {d.amt} · <span style={{ color: 'rgba(0,0,0,.32)' }}>{d.time}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hero body */}
        <motion.div style={{ opacity: heroOpacity, y: heroY, flex: 1, position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px 80px' }}>

          {/* Top badge */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .6, ease: [.22, 1, .36, 1] }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 18px', border: '1px solid rgba(0,0,0,.06)', borderRadius: 40, marginBottom: 52, background: 'rgba(255,255,255,.6)', backdropFilter: 'blur(8px)' }}>
              <span className="live-dot" />
              <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,.48)', fontFamily: "'Inter',sans-serif" }}>Tamil Nadu's #1 Startup Exchange</span>
              <span style={{ fontSize: 11, color: 'rgba(0,0,0,.32)', fontFamily: "'Inter',sans-serif" }}>· 451 investors online</span>
            </div>
          </motion.div>

          {/* Main headline — refined typography */}
          <div style={{ textAlign: 'center', marginBottom: 32, perspective: 800 }}>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <span className="hero-word serif" style={{ fontSize: 'clamp(56px,9vw,120px)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(0,0,0,.12)', letterSpacing: '-.02em', lineHeight: 1, animationDelay: '.18s' }}>Where</span>
                <span className="hero-word serif" style={{ fontSize: 'clamp(56px,9vw,120px)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(0,0,0,.12)', letterSpacing: '-.02em', lineHeight: 1, animationDelay: '.28s' }}>Ideas</span>
                <span className="hero-word serif" style={{ fontSize: 'clamp(56px,9vw,120px)', fontWeight: 600, color: '#181715', letterSpacing: '-.02em', lineHeight: 1, animationDelay: '.38s' }}>Meet</span>
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                <span className="hero-word serif" style={{ fontSize: 'clamp(56px,9vw,120px)', fontWeight: 600, fontStyle: 'italic', color: '#e8622a', letterSpacing: '-.02em', lineHeight: 1, animationDelay: '.52s' }}>Capital.</span>
              </div>
            </div>
            <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: .8, duration: .8, ease: [.22, 1, .36, 1] }} style={{ width: 180, height: 2, background: '#c4a882', margin: '20px auto 0', transformOrigin: 'center' }} />
          </div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7, duration: .6 }} style={{ fontSize: 'clamp(16px,1.8vw,19px)', color: 'rgba(0,0,0,.52)', lineHeight: 1.7, textAlign: 'center', maxWidth: 560, marginBottom: 44, fontWeight: 400, letterSpacing: '-.01em', fontFamily: "'Inter',sans-serif" }}>
            India's first micro-startup exchange —{' '}
            <span style={{ color: '#181715', fontWeight: 500 }}>founders sell ideas, developers sell code</span>,
            {' '}investors discover Tamil Nadu's next big opportunity.
          </motion.p>

          {/* CTA row */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .86, duration: .55 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 72 }}>
            <button
              className="btn-cta"
              onClick={() => navigate('/post-idea')}
              style={{ fontSize: 15, padding: '14px 32px' }}
            >
              Post Your Idea
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h11M8 2.5l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="btn-outline-hero" onClick={() => navigate('/projectpage')}>
              Browse Deals
            </button>
            <button
              className="btn-outline-hero"
              style={{ borderColor: 'rgba(0,0,0,.12)', color: 'rgba(0,0,0,.48)' }}
              onClick={() => navigate('/register')}
            >
              Become Investor →
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.04, duration: .6 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { v: stats.ideas, s: '+', l: 'Ideas Listed', color: '#c4a882', icon: '💡' },
              { v: stats.funded, s: 'L+', l: 'Lakhs Funded', color: '#22c55e', icon: '💰' },
              { v: stats.investors, s: '+', l: 'Verified Investors', color: '#e8622a', icon: '🤝' },
              { v: stats.deals, s: '', l: 'Deals Closed', color: 'rgba(0,0,0,.52)', icon: '🏆' },
            ].map((s, i) => (
              <div key={i} className="stat-chip" style={{ animation: `badge-in .5s ease forwards`, animationDelay: `${1.1 + i * .08}s`, opacity: 0 }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 24, fontWeight: 500, color: s.color, letterSpacing: '-.02em', lineHeight: 1 }}>
                    {s.v.toLocaleString()}{s.s}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(0,0,0,.42)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 3, fontFamily: "'Inter',sans-serif" }}>{s.l}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 9, color: 'rgba(0,0,0,.32)', letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 500, fontFamily: "'Inter',sans-serif" }}>Scroll</span>
            <div style={{ width: 1, height: 38, background: 'linear-gradient(to bottom, rgba(196,168,130,.5), transparent)', animation: 'scroll-line 2.2s ease-in-out infinite' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '12px 0', background: '#efede8', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,.04)', borderBottom: '1px solid rgba(0,0,0,.04)' }}>
        <div style={{ overflow: 'hidden', marginBottom: 8 }}>
          <div className="mq-track">
            {[...categories, ...categories].map((cat, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 26px', fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,.52)', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,.08)', letterSpacing: '.02em', fontFamily: "'Inter',sans-serif" }}>
                {cat.icon} {cat.name} <span style={{ color: 'rgba(0,0,0,.32)', fontSize: 10 }}>{cat.count}</span>
              </span>
            ))}
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="mq-track-rev">
            {[...categories.slice().reverse(), ...categories.slice().reverse()].map((cat, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 26px', fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,.38)', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,.05)', letterSpacing: '.02em', fontFamily: "'Inter',sans-serif" }}>
                {cat.icon} {cat.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PILLARS
      ══════════════════════════════════════════════════════ */}
      <section ref={pillarsRef} style={{ padding: '96px 40px', background: C.bg }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
            <p className="section-eyebrow">What you can do here</p>
            <h2 className="serif" style={{ fontSize: 52, fontWeight: 500, letterSpacing: '-.02em', color: C.text, lineHeight: 1.1, maxWidth: 540 }}>
              One Platform.<br /><em style={{ fontWeight: 400, fontStyle: 'italic' }}>Every Startup Need.</em>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: hoveredPillar !== null ? pillars.map((_, i) => i === hoveredPillar ? '2fr' : '1fr').join(' ') : 'repeat(3,1fr)', gap: 14, transition: 'grid-template-columns .48s cubic-bezier(.22,1,.36,1)' }}>
            {pillars.map((p, i) => (
              <motion.div key={p.key} className={`pillar-card${hoveredPillar === i ? ' active' : ''}`} initial={{ opacity: 0, y: 26 }} animate={pillarsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * .1, duration: .55 }} onMouseEnter={() => setHoveredPillar(i)} onMouseLeave={() => setHoveredPillar(null)}>
                <div style={{ minHeight: 290 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: hoveredPillar === i ? 'rgba(196,168,130,.75)' : C.textLight, marginBottom: 22, fontFamily: "'Inter',sans-serif" }}>{p.label}</div>
                  <h3 className="serif" style={{ fontSize: hoveredPillar === i ? 42 : 34, fontWeight: hoveredPillar === i ? 600 : 400, color: hoveredPillar === i ? 'white' : C.text, lineHeight: 1.15, marginBottom: 12, whiteSpace: 'pre-line', transition: 'all .4s', letterSpacing: '-.01em' }}>{p.headline}</h3>
                  <p style={{ fontSize: 10, color: hoveredPillar === i ? 'rgba(255,255,255,.42)' : C.textLight, marginBottom: hoveredPillar === i ? 22 : 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: "'Inter',sans-serif" }}>{p.sub}</p>
                  <motion.div animate={{ opacity: hoveredPillar === i ? 1 : 0, height: hoveredPillar === i ? 'auto' : 0 }} transition={{ duration: .28 }} style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,.58)', lineHeight: 1.78, marginBottom: 22, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>{p.desc}</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26 }}>
                      {p.points.map((pt, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: 'rgba(255,255,255,.56)', fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>
                          <span style={{ color: '#c4a882', fontWeight: 600, marginTop: 1, flexShrink: 0 }}>—</span>{pt}
                        </li>
                      ))}
                    </ul>
                    <button className="btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.2)' }} onClick={() => navigate(i === 0 ? '/post-idea' : i === 1 ? '/post-idea' : '/register')}>Get started →</button>
                  </motion.div>
                  <div className="serif" style={{ fontSize: 64, fontWeight: 400, fontStyle: 'italic', color: hoveredPillar === i ? 'rgba(255,255,255,.04)' : 'rgba(26,25,23,.04)', position: 'absolute', bottom: 18, right: 22, lineHeight: 1, userSelect: 'none', transition: 'all .4s' }}>{String(i + 1).padStart(2, '0')}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRENDING DEALS
      ══════════════════════════════════════════════════════ */}
      <section ref={marketplaceRef} style={{ padding: '96px 40px', background: C.bg2 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44 }}>
            <div>
              <p className="section-eyebrow">Live Marketplace</p>
              <h2 className="serif" style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-.02em', color: C.text }}>Trending Deals</h2>
              <p style={{ color: C.textMid, marginTop: 8, fontSize: 15, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>The hottest pitches this week across Tamil Nadu</p>
            </div>
            <button className="btn-outline-light" onClick={() => navigate('/projectpage')}>View All Deals →</button>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
            {trendingIdeas.map((idea, i) => (
              <motion.div key={idea.id} className="deal-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .07 }} onClick={() => navigate(`/project/${idea.id}`)}>
                <div style={{ position: 'relative', height: 192, overflow: 'hidden' }}>
                  <img src={idea.img} alt={idea.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .55s', filter: 'saturate(.75)' }} onMouseEnter={e => e.target.style.transform = 'scale(1.06)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.52) 0%,transparent 60%)' }} />
                  <span className="tag-badge" style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,.92)', color: C.text, backdropFilter: 'blur(4px)' }}>{idea.badge}</span>
                  <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,.82)', fontWeight: 500, fontFamily: "'Inter',sans-serif" }}>{idea.votes} interested</span>
                    <span style={{ fontSize: 10, color: '#fca5a5', fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{idea.daysLeft}d left</span>
                  </div>
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 10, color: C.textLight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: "'Inter',sans-serif" }}>{idea.category}</span>
                    <span className="tag-badge" style={{ background: C.surface, color: C.textMid, fontSize: 9 }}>{idea.type}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: C.text, marginBottom: 4, letterSpacing: '-.01em', fontFamily: "'Inter',sans-serif" }}>{idea.title}</h3>
                  <div style={{ fontSize: 12, color: C.textLight, marginBottom: 14, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>{idea.founder} · {idea.location}</div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                    <div style={{ flex: 1, background: C.bg, borderRadius: 16, padding: '9px 12px', border: `1px solid ${C.borderLight}` }}>
                      <div style={{ fontSize: 9, color: C.textLight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: "'Inter',sans-serif" }}>Ask Price</div>
                      <div className="serif" style={{ fontSize: 15, fontWeight: 500, color: C.text, marginTop: 2 }}>{idea.price}</div>
                    </div>
                    <div style={{ flex: 1, background: C.bg, borderRadius: 16, padding: '9px 12px', border: `1px solid ${C.borderLight}` }}>
                      <div style={{ fontSize: 9, color: C.textLight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: "'Inter',sans-serif" }}>Equity</div>
                      <div className="serif" style={{ fontSize: 15, fontWeight: 500, color: C.text, marginTop: 2 }}>{idea.equity}</div>
                    </div>
                  </div>
                  <button className="btn-dark" style={{ width: '100%', justifyContent: 'center' }}>View Proposal →</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 40px', background: C.bg }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 46 }}>
            <p className="section-eyebrow">The Singam Journey</p>
            <h2 className="serif" style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-.02em', color: C.text, marginBottom: 8 }}>How It Works</h2>
            <p style={{ color: C.textMid, fontSize: 15, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>Four steps from idea to funded startup</p>
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 36 }}>
            <div style={{ display: 'inline-flex', padding: 4, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 40 }}>
              {[['founders', 'For Founders'], ['investors', 'For Investors']].map(([tab, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '9px 22px', borderRadius: 40, border: 'none', fontWeight: 500, fontSize: 13, cursor: 'pointer', fontFamily: "'Inter',sans-serif", transition: 'all .22s', background: activeTab === tab ? C.text : 'transparent', color: activeTab === tab ? 'white' : C.textLight, letterSpacing: '-.01em' }}>{label}</button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                {(activeTab === 'founders' ? howItWorksFounders : howItWorksInvestors).map((item, i) => (
                  <motion.div key={i} className="step-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }}>
                    <div className="serif" style={{ fontSize: 44, fontWeight: 400, fontStyle: 'italic', color: C.text, opacity: .08, lineHeight: 1, marginBottom: 16 }}>{item.num}</div>
                    <div style={{ fontSize: 24, marginBottom: 13 }}>{item.icon}</div>
                    <div style={{ fontSize: 10, color: C.accentWarm, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>{item.sub}</div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 9, letterSpacing: '-.01em', fontFamily: "'Inter',sans-serif" }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.74, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '44px 40px', background: '#1a1a18' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 20, textAlign: 'center' }}>
          {[
            { icon: '🔐', t: 'NDA Protected', s: 'Every deal covered' },
            { icon: '⚡', t: 'Escrow Payments', s: 'Secure fund transfer' },
            { icon: '✅', t: 'Verified Founders', s: '100% ID verified' },
            { icon: '🤝', t: 'Deal Support', s: 'End-to-end help' },
            { icon: '🏆', t: 'TN #1 Platform', s: '2,500+ trust us' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.72)', letterSpacing: '.01em', fontFamily: "'Inter',sans-serif" }}>{item.t}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.32)', fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>{item.s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUNDER WINS
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '96px 40px', background: C.bg2 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
            <p className="section-eyebrow">Real Results</p>
            <h2 className="serif" style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-.02em', color: C.text }}>Founder Wins</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {founderWins.map((w, i) => (
                <motion.div key={i} onClick={() => setCurrentStory(i)} whileHover={{ x: 3 }} style={{ padding: '26px 28px', cursor: 'pointer', background: currentStory === i ? C.text : C.bg2, borderRadius: 20, border: `1px solid ${currentStory === i ? C.text : C.border}`, transition: 'all .28s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: currentStory === i ? C.accentWarm : C.textLight, fontFamily: "'Inter',sans-serif" }}>{w.tag}</span>
                    <span style={{ fontSize: 10, color: currentStory === i ? 'rgba(255,255,255,.28)' : C.textLight, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>{w.year}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: currentStory === i ? 'white' : C.text, marginBottom: 3, letterSpacing: '-.01em', fontFamily: "'Inter',sans-serif" }}>{w.name}</div>
                  <div style={{ fontSize: 12, color: currentStory === i ? 'rgba(255,255,255,.4)' : C.textLight, fontWeight: 400, marginBottom: 11, fontFamily: "'Inter',sans-serif" }}>{w.role}</div>
                  <span className="serif" style={{ fontSize: 22, fontWeight: 500, color: currentStory === i ? C.accentWarm : C.green }}>{w.amount}</span>
                  <span style={{ fontSize: 10, color: currentStory === i ? 'rgba(255,255,255,.36)' : C.textLight, marginLeft: 6, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 500, fontFamily: "'Inter',sans-serif" }}>{w.label}</span>
                </motion.div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentStory} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: .36 }} style={{ background: C.bg2, padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 24, border: `1px solid ${C.border}` }}>
                <div>
                  <div className="serif" style={{ fontSize: 72, color: C.border, lineHeight: .85, marginBottom: 20, fontWeight: 400, fontStyle: 'italic' }}>"</div>
                  <p className="serif" style={{ fontSize: 24, fontWeight: 400, fontStyle: 'italic', color: C.text, lineHeight: 1.62, marginBottom: 34, letterSpacing: '-.01em' }}>{founderWins[currentStory].text}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 26, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                    <div style={{ width: 40, height: 40, background: C.text, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: 'white', flexShrink: 0, fontFamily: "'Inter',sans-serif" }}>{founderWins[currentStory].initials}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: '-.01em', fontFamily: "'Inter',sans-serif" }}>{founderWins[currentStory].name}</div>
                      <div style={{ fontSize: 12, color: C.textLight, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>{founderWins[currentStory].role}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: C.green, marginBottom: 3, fontFamily: "'Inter',sans-serif" }}>✓ Closed</div>
                    <div className="serif" style={{ fontSize: 26, fontWeight: 500, color: C.text }}>{founderWins[currentStory].amount}</div>
                    <div style={{ fontSize: 11, color: C.textLight, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>{founderWins[currentStory].label}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
            {founderWins.map((_, i) => (
              <button key={i} onClick={() => setCurrentStory(i)} style={{ height: 3, width: i === currentStory ? 28 : 8, background: i === currentStory ? C.text : C.border, border: 'none', borderRadius: 2, cursor: 'pointer', transition: 'all .28s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════ */}
      <section ref={pricingSectionRef} style={{ padding: '96px 40px', background: C.bg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 50 }}>
            <p className="section-eyebrow">Pricing Plans</p>
            <h2 className="serif" style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-.02em', color: C.text, marginBottom: 8 }}>Choose Your Path</h2>
            <p style={{ color: C.textMid, fontSize: 15, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>From first-time founders to seasoned entrepreneurs</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {pricingPlans.map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .09 }} className={`price-card${plan.popular ? ' popular' : ''}`}>
                {plan.popular
                  ? <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: C.accentWarm, marginBottom: 13, fontFamily: "'Inter',sans-serif" }}>Most Popular</div>
                  : <div style={{ marginBottom: 13, height: 13 }} />}
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: plan.popular ? 'rgba(255,255,255,.3)' : C.textLight, marginBottom: 7, fontFamily: "'Inter',sans-serif" }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${plan.popular ? 'rgba(255,255,255,.09)' : C.borderLight}` }}>
                  <span className="serif" style={{ fontSize: 42, fontWeight: 500, color: plan.popular ? 'white' : C.text, letterSpacing: '-.02em' }}>{plan.price}</span>
                  <span style={{ fontSize: 13, color: plan.popular ? 'rgba(255,255,255,.3)' : C.textLight, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: plan.popular ? 'rgba(255,255,255,.6)' : C.textMid, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>
                      <span style={{ width: 17, height: 17, border: `1.5px solid ${plan.popular ? 'rgba(196,168,130,.5)' : C.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: plan.popular ? C.accentWarm : C.textLight, fontWeight: 600, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/register')} style={{ width: '100%', padding: '12px', borderRadius: 40, border: plan.popular ? 'none' : `1.5px solid ${C.border}`, background: plan.popular ? C.accentWarm : 'transparent', color: plan.popular ? 'white' : C.text, fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: "'Inter',sans-serif", transition: 'all .22s', letterSpacing: '-.01em' }}
                  onMouseEnter={e => { if (!plan.popular) { e.currentTarget.style.background = C.text; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = C.text; } }}
                  onMouseLeave={e => { if (!plan.popular) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.border; } }}>
                  {plan.cta} →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 40px', background: C.bg2 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: '#f2f0eb', borderRadius: 32, padding: '70px 60px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -80, right: 60, width: 300, height: 300, background: 'radial-gradient(circle,rgba(232,98,42,.06) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, left: 80, width: 240, height: 240, background: 'radial-gradient(circle,rgba(58,107,74,.05) 0%,transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="section-eyebrow" style={{ color: 'rgba(0,0,0,.42)' }}>Ready?</p>
              <h2 className="serif" style={{ fontSize: 58, fontWeight: 500, letterSpacing: '-.02em', color: '#1a1a18', marginBottom: 14, lineHeight: 1.05 }}>
                Make Your<br /><em style={{ color: C.accentWarm, fontWeight: 400, fontStyle: 'italic' }}>Move.</em>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(0,0,0,.52)', lineHeight: 1.8, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>Join 2,500+ founders and 450+ investors already building<br />Tamil Nadu's startup future.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1, flexShrink: 0 }}>
              <button className="btn-cta" onClick={() => navigate('/post-idea')} style={{ fontSize: 15, padding: '14px 32px', justifyContent: 'center' }}>Post Your Idea →</button>
              <button onClick={() => navigate('/projectpage')} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 32px', background: 'transparent', border: 'none', fontWeight: 500, fontSize: 14, color: 'rgba(0,0,0,.48)', cursor: 'pointer', fontFamily: "'Inter',sans-serif", letterSpacing: '-.01em', transition: 'color .2s' }} onMouseEnter={e => e.currentTarget.style.color = '#1a1a18'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,.48)'}>Browse Projects</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER — improved visibility
      ══════════════════════════════════════════════════════ */}
      <footer style={{ background: '#eae8e2', padding: '58px 40px 26px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', gap: 48, marginBottom: 46 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, background: 'linear-gradient(135deg,#e8622a,#c4a882)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: 'white', fontFamily: "'Inter',sans-serif" }}>M</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a18', letterSpacing: '-.01em', fontFamily: "'Inter',sans-serif" }}>MicroStartupX</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,.58)', lineHeight: 1.8, maxWidth: 226, marginBottom: 20, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>Tamil Nadu's premier hub for startup acquisitions, angel investments, and idea trading.</p>
              <div style={{ display: 'flex', gap: 7 }}>
                {['𝕏', 'in', 'YT', 'IG'].map((s, i) => (
                  <a key={i} href="#" style={{ width: 30, height: 30, background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,.48)', fontSize: 10, fontWeight: 600, textDecoration: 'none', transition: 'all .2s', fontFamily: "'Inter',sans-serif" }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,.08)'; e.currentTarget.style.color = 'rgba(0,0,0,.78)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,.04)'; e.currentTarget.style.color = 'rgba(0,0,0,.48)'; }}>{s}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Marketplace', links: ['Browse Ideas', 'Featured Deals', 'Founder Wins', 'Investor Network'] },
              { title: 'Resources', links: ['NDA Templates', 'Valuation Guide', 'Legal Docs', 'Blog'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press Kit', 'Contact'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: 9, fontWeight: 600, color: 'rgba(0,0,0,.42)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11 }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: 13, color: 'rgba(0,0,0,.62)', textDecoration: 'none', fontWeight: 400, transition: 'color .2s', fontFamily: "'Inter',sans-serif" }} onMouseEnter={e => e.target.style.color = '#1a1a18'} onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,.62)'}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 style={{ fontSize: 9, fontWeight: 600, color: 'rgba(0,0,0,.42)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>Stay Updated</h4>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,.56)', marginBottom: 12, lineHeight: 1.68, fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>Weekly updates on the hottest deals.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <input type="email" placeholder="Your email" style={{ padding: '10px 13px', background: 'rgba(0,0,0,.02)', border: '1px solid rgba(0,0,0,.12)', borderRadius: 12, color: '#1a1a18', fontSize: 13, fontFamily: "'Inter',sans-serif", outline: 'none' }} />
                <button style={{ padding: '10px', background: 'rgba(232,98,42,.12)', border: '1px solid rgba(232,98,42,.2)', borderRadius: 40, color: '#e8622a', fontWeight: 500, fontSize: 13, cursor: 'pointer', fontFamily: "'Inter',sans-serif", transition: 'all .2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,98,42,.2)'; e.currentTarget.style.color = '#d4531f'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,98,42,.12)'; e.currentTarget.style.color = '#e8622a'; }}>Subscribe →</button>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 20, borderTop: '1px solid rgba(0,0,0,.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: 'rgba(0,0,0,.48)', fontWeight: 400, fontFamily: "'Inter',sans-serif" }}>© 2026 MicroStartupX. Built with ❤️ for Tamil Nadu Founders.</p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(0,0,0,.48)', textDecoration: 'none', fontWeight: 400, transition: 'color .2s', fontFamily: "'Inter',sans-serif" }} onMouseEnter={e => e.target.style.color = '#1a1a18'} onMouseLeave={e => e.target.style.color = 'rgba(0,0,0,.48)'}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;