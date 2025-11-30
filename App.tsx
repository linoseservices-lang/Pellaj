import React from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Linkedin, Facebook, Twitter, CheckCircle, ArrowRight, Award, Users, Globe, Briefcase, Zap, Shield, ExternalLink, PenTool, Trash2, Plus, Save, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION & ASSETS ---
// REPLACE THESE URLS WITH YOUR OWN IMAGE LINKS
const ASSETS = {
  // Brand
  logoText: "PELLAJ",
  logoAccent: "VENTURES",
  
  // Home Page
  heroBackground: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  
  // About Page
  companyCulture: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  
  // Services Images
  serviceSoftware: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
  serviceGovt: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  serviceConsulting: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",

  // Portfolio Images (Add more as needed)
  project1: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  project2: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop",
  project3: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
  project4: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",

  // Default Blog Image
  blogDefault: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000&auto=format&fit=crop",
  
  // Team Placeholders
  team1: "https://source.unsplash.com/random/400x400?portrait&sig=1",
  team2: "https://source.unsplash.com/random/400x400?portrait&sig=2",
  team3: "https://source.unsplash.com/random/400x400?portrait&sig=3",
};

const WHATSAPP_LINK = "https://wa.me/2348069646617";

// --- Utils ---
const useSeo = (title: string, description: string) => {
  React.useEffect(() => {
    document.title = `${title} | Pellaj Ventures`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// --- Shared Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0 cursor-pointer group">
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-1 group-hover:scale-105 transition-transform duration-300">
              {ASSETS.logoText}<span className="text-[#FFD700]">{ASSETS.logoAccent}</span>
            </span>
          </Link>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    isActive(link.path) 
                      ? 'text-[#FFD700] border-b-2 border-[#FFD700]' 
                      : 'text-gray-300 hover:text-[#FFD700]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noreferrer"
                className="ml-4 px-5 py-2 rounded-full gradient-bg text-[#000000] font-bold text-sm hover:shadow-lg hover:shadow-[#FFD700]/30 transition-all transform hover:scale-105"
              >
                Let's Talk
              </a>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#FFD700] hover:text-white hover:bg-[#FFD700]/10 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#000000] border-b border-[#FFD700]/20 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'text-[#FFD700] bg-[#FFD700]/10'
                      : 'text-gray-300 hover:text-[#FFD700] hover:bg-[#FFD700]/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="block mt-4 px-3 py-3 rounded-md text-center text-[#000000] font-bold gradient-bg"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#000000] border-t border-[#FFD700]/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#000000] via-[#FFD700] to-[#000000]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              {ASSETS.logoText}<span className="text-[#FFD700]">{ASSETS.logoAccent}</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Innovating Solutions. Powering Institutions.<br/>
              Delivering excellence in software and contracting since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1005] border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700] hover:text-[#000000] transition-all duration-300"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1005] border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700] hover:text-[#000000] transition-all duration-300"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#1A1005] border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700] hover:text-[#000000] transition-all duration-300"><Facebook size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#FFD700] mb-6 border-b border-[#FFD700]/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 text-sm flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#FFD700] mb-6 border-b border-[#FFD700]/20 pb-2 inline-block">Our Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm hover:text-white transition-colors">Proprietary Software</li>
              <li className="text-gray-400 text-sm hover:text-white transition-colors">Government Contracting</li>
              <li className="text-gray-400 text-sm hover:text-white transition-colors">Tech Consulting</li>
              <li className="text-gray-400 text-sm hover:text-white transition-colors">Procurement</li>
              <li className="text-gray-400 text-sm hover:text-white transition-colors">Digital Strategy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#FFD700] mb-6 border-b border-[#FFD700]/20 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-[#FFD700] mr-3 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400 text-sm">No. 7, Nobakhare Close, Off GRA Ihama Road, Benin City, Edo State, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-[#FFD700] mr-3 flex-shrink-0" size={18} />
                <a href={WHATSAPP_LINK} className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">+234-806-964-6617</a>
              </li>
              <li className="flex items-center">
                <Mail className="text-[#FFD700] mr-3 flex-shrink-0" size={18} />
                <a href="mailto:info@pellajng.com" className="text-gray-400 text-sm hover:text-[#FFD700] transition-colors">info@pellajng.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#FFD700]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 Pellaj Ventures Limited. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs uppercase tracking-wider text-center">
            Subsidiary of Pellaj Empire Bakery Enterprise
          </p>
        </div>
      </div>
    </footer>
  );
};

const PageTransition = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Section = ({ children, className = "", id = "" }: { children?: React.ReactNode, className?: string, id?: string }) => (
  <div id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', onClick, href, className = "", target }: { children?: React.ReactNode, variant?: 'primary' | 'outline' | 'white' | 'danger', onClick?: () => void, href?: string, className?: string, target?: string }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "gradient-bg text-[#000000] shadow-lg shadow-[#FFD700]/20 hover:shadow-[#FFD700]/40",
    outline: "border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#000000]",
    white: "bg-white text-[#000000] hover:bg-gray-100 shadow-lg",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg"
  };

  if (href) {
    if (href.startsWith('/')) {
        return (
            <Link to={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
                {children}
            </Link>
        )
    }
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : ""} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// --- Pages ---

const HomePage = () => {
  useSeo("Home", "Innovating Solutions, Powering Institutions. Empowering organizations with high-quality software and strategic consulting.");

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 mix-blend-overlay transition-opacity duration-1000"
          style={{ backgroundImage: `url(${ASSETS.heroBackground})` }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-[#000000] via-transparent to-[#000000]"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#FFD700]/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#5A3D2D]/30 rounded-full blur-[100px] md:blur-[150px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 backdrop-blur-md">
              <span className="text-xs md:text-sm font-bold tracking-wider text-[#FFD700] uppercase">
                Pellaj Ventures Limited
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 md:mb-8 leading-tight">
              Innovating Solutions. <br />
              <span className="gradient-text">Powering Institutions.</span>
            </h1>
            
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed">
              Empowering organizations and government bodies with high-quality software, 
              infrastructure, and strategic consulting for a digital future.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Button href={WHATSAPP_LINK} target="_blank" className="w-full sm:w-auto">
                <Phone className="mr-2 h-5 w-5" /> Chat on WhatsApp
              </Button>
              <Button variant="outline" href="/portfolio" className="w-full sm:w-auto">
                View Our Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section - Responsive Grid */}
      <div className="border-y border-[#FFD700]/10 bg-[#5A3D2D]/20 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { label: 'Years in Business', value: '5+' },
              { label: 'Projects Delivered', value: '100+' },
              { label: 'Client Satisfaction', value: '100%' },
              { label: 'Govt Partners', value: '10+' },
            ].map((stat, idx) => (
              <div key={idx} className="p-2">
                <div className="text-3xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Offerings Preview */}
      <Section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Do</h2>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { 
              icon: <Zap className="h-8 w-8 text-[#FFD700]" />,
              title: "Proprietary Software", 
              desc: "Secure, scalable cloud platforms for operations, finance, and workforce management." 
            },
            { 
              icon: <Shield className="h-8 w-8 text-[#FFD700]" />,
              title: "Government Contracting", 
              desc: "Infrastructure supply, system deployment, and compliance monitoring tools." 
            },
            { 
              icon: <Briefcase className="h-8 w-8 text-[#FFD700]" />,
              title: "Strategy Consulting", 
              desc: "Digital transformation and process automation to optimize performance." 
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl hover:bg-[#5A3D2D]/40 transition-all duration-300 group flex flex-col items-start border-t-2 border-t-transparent hover:border-t-[#FFD700]">
              <div className="mb-6 p-4 bg-[#FFD700]/10 rounded-xl inline-block group-hover:bg-[#FFD700]/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed flex-grow text-sm md:text-base">
                {item.desc}
              </p>
              <Link to="/services" className="text-[#FFD700] font-bold hover:text-white flex items-center uppercase text-xs tracking-widest mt-auto group-hover:translate-x-2 transition-transform">
                Learn more <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="glass-card rounded-3xl p-8 md:p-20 text-center relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-[80px] -ml-32 -mb-32"></div>
           
           <div className="relative z-10">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Operations?</h2>
             <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
               Join over 100+ satisfied clients across government and private sectors who trust Pellaj Ventures for their technology needs.
             </p>
             <Button href={WHATSAPP_LINK} target="_blank" className="text-lg px-10 py-4">
               Get Started on WhatsApp
             </Button>
           </div>
        </div>
      </Section>
    </PageTransition>
  );
};

const AboutPage = () => {
  useSeo("About Us", "Pellaj Ventures - Mission, Vision, and Team. Trusted technology partners in Nigeria.");

  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Established in 2020, Pellaj Ventures Limited is a subsidiary of Pellaj Empire Bakery Enterprise, dedicated to technological excellence and institutional growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-32">
          <div className="glass-card p-8 md:p-12 rounded-2xl border-l-4 border-l-[#FFD700] hover:bg-[#5A3D2D]/40 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Globe className="mr-3 text-[#FFD700]" /> Our Mission
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              To deliver high-quality software and service solutions that empower organisations and government institutions to operate with efficiency, excellence and transparency.
            </p>
          </div>
          <div className="glass-card p-8 md:p-12 rounded-2xl border-l-4 border-l-[#FFD700] hover:bg-[#5A3D2D]/40 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Award className="mr-3 text-[#FFD700]" /> Our Vision
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              To become one of Nigeria's most trusted technology and contracting partners, known for reliability, integrity, and world-class innovation.
            </p>
          </div>
        </div>

        {/* Team Preview (Mock Data) */}
         <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet The Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { id: 1, img: ASSETS.team1 }, 
              { id: 2, img: ASSETS.team2 }, 
              { id: 3, img: ASSETS.team3 }
            ].map((item) => (
              <div key={item.id} className="glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300">
                <div className="h-64 bg-[#5A3D2D] relative">
                    <img src={item.img} alt="Team Member" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">Team Member Name</h3>
                  <p className="text-[#FFD700] text-sm mb-4">Position / Title</p>
                  <p className="text-gray-400 text-sm">Dedicated professional with years of experience in delivering excellence.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-2xl flex flex-col lg:flex-row items-center gap-12">
           <img 
            src={ASSETS.companyCulture}
            alt="Company Culture" 
            className="rounded-xl w-full lg:w-1/2 object-cover h-[300px] lg:h-[400px] border border-[#FFD700]/20 shadow-2xl" 
           />
           <div className="lg:w-1/2">
             <h3 className="text-3xl font-bold text-white mb-6">Our Culture & History</h3>
             <p className="text-gray-300 mb-6 text-lg leading-relaxed">
               Since our establishment in 2020, we have grown from a small consultancy to a powerhouse serving federal agencies and private enterprises.
             </p>
             <p className="text-gray-300 text-lg leading-relaxed mb-8">
               At Pellaj, we believe in a culture of continuous learning and "Service Excellence". We don't just build software; we build relationships that foster institutional growth.
             </p>
             <Button href={WHATSAPP_LINK} target="_blank">Join Our Story</Button>
           </div>
        </div>
      </div>
    </PageTransition>
  );
};

const ServicesPage = () => {
  useSeo("Services", "Proprietary Software, Government Contracting, and Strategy Consulting by Pellaj Ventures.");

  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions tailored for complex needs. We deliver excellence across software, infrastructure, and strategy.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {/* Service 1 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block p-4 rounded-2xl bg-[#FFD700]/10 mb-6 border border-[#FFD700]/20">
                <Zap className="text-[#FFD700] h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Proprietary Software Development</h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                We build high-performing, secure, and user-friendly platforms designed to streamline operations and enhance engagement. Our software is cloud-ready and API-driven.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Operations Management",
                  "Workforce & HR Automation",
                  "Accounting & Finance",
                  "Case Monitoring",
                  "E-government Apps",
                  "Mobile Solutions"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-[#FFD700] mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href={WHATSAPP_LINK} target="_blank">Request Demo</Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-10 rounded-full"></div>
                <img 
                  src={ASSETS.serviceSoftware}
                  alt="Software Dev" 
                  className="relative rounded-2xl shadow-2xl border border-[#FFD700]/20 w-full h-[300px] md:h-[400px] object-cover" 
                />
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="relative order-1">
               <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-10 rounded-full"></div>
               <img 
                src={ASSETS.serviceGovt}
                alt="Govt Contracting" 
                className="relative rounded-2xl shadow-2xl border border-[#FFD700]/20 w-full h-[300px] md:h-[400px] object-cover" 
               />
            </div>
            <div className="order-2">
              <div className="inline-block p-4 rounded-2xl bg-[#FFD700]/10 mb-6 border border-[#FFD700]/20">
                <Shield className="text-[#FFD700] h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Government Contracting Services</h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Reliable procurement and infrastructure support for public institutions, ensuring compliance, transparency, and operational readiness.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  "ICT Infrastructure",
                  "System Deployment",
                  "Data Management",
                  "Workforce Training",
                  "Procurement Services",
                  "General Contracting"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-[#FFD700] mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href={WHATSAPP_LINK} target="_blank">Consult Us</Button>
            </div>
          </div>

          {/* Service 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block p-4 rounded-2xl bg-[#FFD700]/10 mb-6 border border-[#FFD700]/20">
                <Briefcase className="text-[#FFD700] h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Technology & Strategy Consulting</h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Guiding organizations through digital transformation with data-driven strategies, software integration, and process optimization.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Digital Transformation",
                  "Process Automation",
                  "Software Selection",
                  "MIS Implementation",
                  "Efficiency Optimization",
                  "Change Management"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300 text-sm">
                    <CheckCircle size={16} className="text-[#FFD700] mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button href={WHATSAPP_LINK} target="_blank">Start Strategy Session</Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-10 rounded-full"></div>
                <img 
                  src={ASSETS.serviceConsulting}
                  alt="Consulting" 
                  className="relative rounded-2xl shadow-2xl border border-[#FFD700]/20 w-full h-[300px] md:h-[400px] object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const PortfolioPage = () => {
  useSeo("Portfolio", "Case studies and projects completed by Pellaj Ventures.");

  const projects = [
    {
      id: 1,
      title: "National ID System Upgrade",
      category: "Government Contracting",
      image: ASSETS.project1,
      desc: "Upgraded data infrastructure for NIMC to support high-volume processing."
    },
    {
      id: 2,
      title: "Agro-Tech Supply Chain App",
      category: "Proprietary Software",
      image: ASSETS.project2,
      desc: "Developed a mobile-first platform for the Federal Ministry of Agriculture."
    },
    {
      id: 3,
      title: "E-Learning Portal",
      category: "Web Development",
      image: ASSETS.project3,
      desc: "Secure remote learning environment for the Federal College of Fisheries."
    },
    {
      id: 4,
      title: "Corporate FinTech Dashboard",
      category: "Software",
      image: ASSETS.project4,
      desc: "Real-time analytics and financial reporting tool for private enterprise clients."
    }
  ];

  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of our impact across sectors. From government infrastructure to enterprise software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {projects.map((project) => (
             <div key={project.id} className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                   <div className="absolute inset-0 bg-[#000000]/30 group-hover:bg-transparent transition-colors z-10"></div>
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-4 right-4 z-20 bg-[#FFD700] text-[#000000] text-xs font-bold px-3 py-1 rounded-full">
                     {project.category}
                   </div>
                </div>
                <div className="p-8">
                   <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors">{project.title}</h3>
                   <p className="text-gray-400 mb-6">{project.desc}</p>
                   <a href="#" className="inline-flex items-center text-[#FFD700] text-sm font-bold uppercase tracking-wider hover:underline">
                     View Case Study <ArrowRight size={16} className="ml-2" />
                   </a>
                </div>
             </div>
          ))}
        </div>

        {/* Clients List as a footer to Portfolio */}
        <div className="text-center border-t border-[#FFD700]/10 pt-16">
          <h3 className="text-2xl font-bold text-white mb-8">Trusted Partners</h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-70">
            {["NDDC", "NIMC", "Fed. Ministry of Agriculture", "Fed. College of Fisheries"].map((client, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-gray-500 hover:text-[#FFD700] transition-colors cursor-default">
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

// --- BLOG SYSTEM (LocalStorage Based) ---

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

const BlogPage = () => {
  useSeo("Blog", "Latest insights and news from Pellaj Ventures.");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [editor, setEditor] = React.useState({ title: '', excerpt: '', content: '', image: '' });
  const [isEditing, setIsEditing] = React.useState<string | null>(null);

  // Load posts on mount
  React.useEffect(() => {
    const savedPosts = localStorage.getItem('pellaj_blog_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Seed data if empty
      const seedData = [
        {
          id: '1',
          title: "The Future of E-Government in Nigeria",
          excerpt: "How digital transformation is reshaping public sector efficiency.",
          content: "Full article content goes here...",
          date: new Date().toLocaleDateString(),
          image: ASSETS.blogDefault
        },
        {
          id: '2',
          title: "Optimizing Supply Chains with Tech",
          excerpt: "Case study on our recent agricultural logistics project.",
          content: "Full article content goes here...",
          date: new Date().toLocaleDateString(),
          image: ASSETS.serviceGovt
        }
      ];
      setPosts(seedData);
      localStorage.setItem('pellaj_blog_posts', JSON.stringify(seedData));
    }
  }, []);

  const savePost = () => {
    if (!editor.title || !editor.excerpt) return;
    
    let newPosts = [...posts];
    if (isEditing) {
      newPosts = newPosts.map(p => p.id === isEditing ? { ...p, ...editor } : p);
    } else {
      const newPost = {
        id: Date.now().toString(),
        ...editor,
        date: new Date().toLocaleDateString(),
        image: editor.image || ASSETS.blogDefault
      };
      newPosts.unshift(newPost);
    }
    
    setPosts(newPosts);
    localStorage.setItem('pellaj_blog_posts', JSON.stringify(newPosts));
    setEditor({ title: '', excerpt: '', content: '', image: '' });
    setIsEditing(null);
  };

  const deletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const newPosts = posts.filter(p => p.id !== id);
      setPosts(newPosts);
      localStorage.setItem('pellaj_blog_posts', JSON.stringify(newPosts));
    }
  };

  const editPost = (post: BlogPost) => {
    setEditor({ title: post.title, excerpt: post.excerpt, content: post.content, image: post.image });
    setIsEditing(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-[#FFD700]/20 pb-8">
           <div>
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Blog & Insights</h1>
             <p className="text-gray-400">Updates, news, and tech trends.</p>
           </div>
           <button 
             onClick={() => setIsAdmin(!isAdmin)}
             className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${isAdmin ? 'bg-[#FFD700] text-black' : 'bg-[#5A3D2D] text-gray-300'}`}
           >
             {isAdmin ? 'Exit Admin' : 'Admin Login'}
           </button>
        </div>

        {/* ADMIN DASHBOARD */}
        {isAdmin && (
          <div className="bg-[#5A3D2D]/30 border border-[#FFD700]/30 rounded-2xl p-8 mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-6 flex items-center">
              <PenTool className="mr-2" /> {isEditing ? 'Edit Post' : 'Create New Post'}
            </h2>
            <div className="grid gap-6">
              <input 
                className="w-full bg-[#000000] border border-[#FFD700]/20 rounded-lg p-4 text-white focus:border-[#FFD700] outline-none"
                placeholder="Post Title"
                value={editor.title}
                onChange={e => setEditor({...editor, title: e.target.value})}
              />
              <input 
                className="w-full bg-[#000000] border border-[#FFD700]/20 rounded-lg p-4 text-white focus:border-[#FFD700] outline-none"
                placeholder="Image URL (Unsplash link etc.)"
                value={editor.image}
                onChange={e => setEditor({...editor, image: e.target.value})}
              />
              <textarea 
                className="w-full bg-[#000000] border border-[#FFD700]/20 rounded-lg p-4 text-white focus:border-[#FFD700] outline-none h-24"
                placeholder="Short Excerpt (SEO Description)"
                value={editor.excerpt}
                onChange={e => setEditor({...editor, excerpt: e.target.value})}
              />
              <textarea 
                className="w-full bg-[#000000] border border-[#FFD700]/20 rounded-lg p-4 text-white focus:border-[#FFD700] outline-none h-48"
                placeholder="Full Content (HTML or Text)"
                value={editor.content}
                onChange={e => setEditor({...editor, content: e.target.value})}
              />
              <div className="flex gap-4">
                <Button onClick={savePost}>
                  <Save size={18} className="mr-2" /> {isEditing ? 'Update Post' : 'Publish Post'}
                </Button>
                {isEditing && (
                  <Button variant="outline" onClick={() => { setIsEditing(null); setEditor({title:'', excerpt:'', content:'', image:''}); }}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* POSTS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group h-full">
              <div className="h-48 overflow-hidden relative">
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 {isAdmin && (
                   <div className="absolute top-2 right-2 flex gap-2">
                     <button onClick={() => editPost(post)} className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700"><PenTool size={14} /></button>
                     <button onClick={() => deletePost(post.id)} className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700"><Trash2 size={14} /></button>
                   </div>
                 )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-[#FFD700] text-xs font-bold mb-2 uppercase">{post.date}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFD700] transition-colors">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{post.excerpt}</p>
                
                {/* Social Share Mockup */}
                <div className="flex items-center justify-between border-t border-[#FFD700]/10 pt-4 mt-auto">
                   <a href="#" className="text-[#FFD700] text-sm font-bold hover:underline">Read More</a>
                   <div className="flex gap-2">
                     <Twitter size={16} className="text-gray-500 hover:text-white cursor-pointer" />
                     <Facebook size={16} className="text-gray-500 hover:text-white cursor-pointer" />
                     <Linkedin size={16} className="text-gray-500 hover:text-white cursor-pointer" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const ContactPage = () => {
  useSeo("Contact", "Get in touch with Pellaj Ventures for inquiries and support.");
  const [formState, setFormState] = React.useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission to WhatsApp for immediate action
    const text = `*New Website Inquiry*%0A*Name:* ${formState.name}%0A*Email:* ${formState.email}%0A*Message:* ${formState.message}`;
    window.open(`https://wa.me/2348069646617?text=${text}`, '_blank');
    
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <PageTransition>
      <div className="pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">Get In Touch</h1>
            <p className="text-lg md:text-xl text-gray-400 mb-12">
              Have a project in mind or need expert advice? Reach out to us today. We are responsive and ready to help.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-[#FFD700]/10 p-4 rounded-xl mr-6 border border-[#FFD700]/20">
                  <MapPin className="text-[#FFD700] h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Our Location</h4>
                  <p className="text-gray-400 text-lg">No. 7, Nobakhare Close, Off GRA Ihama Road,<br/> Benin City, Edo State, Nigeria</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#FFD700]/10 p-4 rounded-xl mr-6 border border-[#FFD700]/20">
                  <Phone className="text-[#FFD700] h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Phone Number</h4>
                  <p className="text-gray-400 text-lg mb-2">+234-806-964-6617</p>
                  <a href={WHATSAPP_LINK} target="_blank" className="text-[#FFD700] font-semibold text-sm hover:underline flex items-center">
                     Chat on WhatsApp <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#FFD700]/10 p-4 rounded-xl mr-6 border border-[#FFD700]/20">
                  <Mail className="text-[#FFD700] h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Email Address</h4>
                  <p className="text-gray-400 text-lg">info@pellajng.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-3xl border-t border-[#FFD700]/30">
            <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-[#000000] border border-[#FFD700]/20 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-[#000000] border border-[#FFD700]/20 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">Message</label>
                <textarea 
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-[#000000] border border-[#FFD700]/20 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <Button className="w-full text-lg">Submit Inquiry</Button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className="min-h-screen bg-[#000000] flex flex-col font-sans selection:bg-[#FFD700] selection:text-[#000000]">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;