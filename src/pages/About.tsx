import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, CheckCircle, Layout as LayoutIcon, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/ui/Navbar'; 
import Footer from '../components/landing/Footer';

// --- TYPES ---
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bgColor: string;
  dark: boolean;
}

const About = () => {
  const { dark } = useTheme();

  return (
    <div className={`transition-colors duration-500 ${dark ? 'bg-[#001233]' : 'bg-[#EFE6DE]'}`}>
      {/* 1. Add Navbar here */}
      <Navbar />

      {/* Increased top padding (pt-40) to account for the fixed Navbar */}
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className={`text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] ${dark ? 'text-white' : 'text-slate-900'}`}>
            Built for the <br />
            <span className="text-blue-600">1% in Central Asia.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            We aren't just a test-prep platform. We are the engine behind the next generation 
            of Ivy League leaders from Uzbekistan and beyond.
          </p>
        </motion.div>

        {/* The Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className={`p-10 rounded-[40px] border border-white/20 backdrop-blur-xl shadow-xl shadow-blue-500/5 ${dark ? 'bg-white/5' : 'bg-white/50'}`}>
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
              <Target className="text-white" size={28} />
            </div>
            <h3 className={`text-3xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>The Mission</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Founded in Uzbekistan, <strong>PREPIFY</strong> was born out of a simple frustration: elite SAT and IELTS resources were gatekept. We’re breaking those walls down with AI-driven simulations that mirror the real Digital SAT environment.
            </p>
          </div>

          <div className={`p-10 rounded-[40px] border border-white/20 backdrop-blur-xl shadow-xl shadow-emerald-500/5 ${dark ? 'bg-white/5' : 'bg-white/50'}`}>
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
              <Users className="text-white" size={28} />
            </div>
            <div className="flex flex-wrap items-baseline gap-3 mb-6">
               <h3 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Admitix Community</h3>
               <span className="text-sm font-black text-[#9A0002] tracking-widest uppercase animate-pulse">Coming soon...</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Beyond the scores, we are building <strong>Admitix</strong>—a startup community for Central Asian students targeting the Top 100 universities. It’s about networking, strategy, and winning together.
            </p>
          </div>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<CheckCircle className="text-white" size={24} />}
            bgColor="bg-indigo-500"
            title="Diagnostic Engine"
            desc="Our algorithms identify your weaknesses in the first 15 minutes, creating a surgical strike plan for your score improvement."
            dark={dark}
          />
          <FeatureCard 
            icon={<LayoutIcon className="text-white" size={24} />}
            bgColor="bg-emerald-500"
            title="AI Study Planner"
            desc="A dynamic schedule that adapts to your pace. Whether you have 3 months or 3 weeks, we optimize every hour."
            dark={dark}
          />
          <FeatureCard 
            icon={<TrendingUp className="text-white" size={24} />}
            bgColor="bg-amber-500"
            title="Progress Tracking"
            desc="Visualizing your path to success. Monitor your growth with our intuitive dashboard and track real-time score trends."
            dark={dark}
          />
        </div>
      </div>

      {/* 2. Add Footer here */}
      <Footer />
    </div>
  );
};

// --- HELPER COMPONENT ---
const FeatureCard = ({ icon, title, desc, bgColor, dark }: FeatureCardProps) => (
  <div className={`p-10 rounded-[48px] shadow-sm flex flex-col items-start transition-all duration-300 hover:-translate-y-2 ${
    dark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-white hover:shadow-2xl'
  }`}>
    <div className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
      {icon}
    </div>
    <h3 className={`text-2xl font-black mb-4 ${dark ? 'text-white' : 'text-[#1A0808]'}`}>{title}</h3>
    <p className={`font-medium leading-relaxed ${dark ? 'text-slate-400' : 'text-[#1A0808] opacity-60'}`}>
      {desc}
    </p>
  </div>
);

export default About;