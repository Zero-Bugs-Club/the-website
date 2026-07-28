import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Linkedin, Github, Instagram, Mail, CheckCircle2, Quote } from 'lucide-react';
import FogBackground from '../components/ui/FogBackground';
import { getBoardMemberBySlug, getPersonByDeptAndSlug, getDepartmentBySlug } from '../data/teamData';

const SocialIcon = ({ platform }) => {
    switch (platform) {
        case 'linkedin':
            return <Linkedin size={20} />;
        case 'github':
            return <Github size={20} />;
        case 'instagram':
            return <Instagram size={20} />;
        case 'mail':
            return <Mail size={20} />;
        default:
            return null;
    }
};

// Reusable spring hover settings to keep animations consistent
const cardHover = {
    y: -6,
    scale: 1.01,
    boxShadow: "0px 12px 35px 2px rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.35)",
    transition: {
        y: { type: "spring", stiffness: 300, damping: 25 },
        scale: { type: "spring", stiffness: 300, damping: 25 },
        boxShadow: { duration: 0.25 },
        borderColor: { duration: 0.25 }
    }
};

const PersonDetailPage = () => {
    const { dept: deptSlug, name: personSlug, slug: singleSlug } = useParams();
    const navigate = useNavigate();

    let person = null;
    let backPath = '/about';
    let backText = 'Back to Team';

    if (deptSlug && personSlug) {
        person = getPersonByDeptAndSlug(deptSlug, personSlug);
        backPath = `/about/${deptSlug}`;
        backText = 'Back to Department';
    } else if (singleSlug) {
        person = getBoardMemberBySlug(singleSlug);
        if (!person) {
            const deptObj = getDepartmentBySlug(singleSlug);
            if (deptObj) {
                // handled by department resolver
            }
        }
    }

    if (!person) {
        return (
            <div className="min-h-screen bg-black pt-36 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Member Profile Not Found</h1>
                <Link to="/about" className="text-blue-400 hover:underline">
                    Back to About Page
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white"
        >
            {/* 1. Isolated Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <FogBackground />
            </div>

            <div className="max-w-7xl mx-auto relative z-20">
                {/* Clickable Back Navigation Button */}
                <div className="mb-3 relative z-30">
                    <button
                        onClick={() => navigate(backPath)}
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white transition-all cursor-pointer font-mono text-sm uppercase tracking-wider shadow-lg"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        {backText}
                    </button>
                </div>

                {/* Profile Card Content centered inside max-w-4xl */}
                <div className="max-w-4xl mx-auto">
                    
                    {/* 2. Profile Header Card - Animated with spring hover */}
                    <motion.div 
                        whileHover={cardHover}
                        className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10 rounded-2xl border border-white/15 bg-gradient-to-b from-zinc-900 to-neutral-950 mb-10 shadow-2xl relative z-10 transition-colors"
                    >
                        {/* Square Profile Avatar with scale hover */}
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-neutral-800 border-2 border-white/20 overflow-hidden relative shrink-0 shadow-lg"
                        >
                            {person.image ? (
                                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-700 to-gray-600"></div>
                            )}
                        </motion.div>

                        {/* Basic Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-white">
                                {person.name}
                            </h1>
                            <p className="text-lg text-blue-400 font-mono tracking-wide mb-4 uppercase font-semibold">
                                {person.role}
                            </p>

                            {/* Social Links with individual bounce animations */}
                            <div className="flex justify-center md:justify-start gap-4">
                                {person.socials?.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        whileHover={{ scale: 1.15, y: -3 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        className="p-3 bg-neutral-800/80 hover:bg-neutral-700 rounded-full text-gray-300 hover:text-white transition-colors duration-300 border border-white/10 shadow-md"
                                    >
                                        <SocialIcon platform={social.platform} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Note Section - Animated with spring hover */}
                    {person.note && (
                        <motion.div 
                            whileHover={cardHover}
                            className="p-8 rounded-2xl border border-white/15 bg-gradient-to-b from-zinc-900 to-neutral-950 mb-10 relative overflow-hidden shadow-xl z-10 transition-colors"
                        >
                            <Quote className="absolute top-4 right-4 text-white/5 w-20 h-20 pointer-events-none" />
                            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
                                Note from {person.noteFrom || 'Leadership'}
                            </h2>
                            <p className="text-gray-300 text-lg italic leading-relaxed relative z-10">
                                "{person.note}"
                            </p>
                        </motion.div>
                    )}

                    {/* Contributions List - Animated with spring hover */}
                    {person.contributions && person.contributions.length > 0 && (
                        <motion.div 
                            whileHover={cardHover}
                            className="p-8 rounded-2xl border border-white/15 bg-gradient-to-b from-zinc-900 to-neutral-950 shadow-xl relative z-10 transition-colors"
                        >
                            <h2 className="text-xl font-bold tracking-tight mb-6 text-white uppercase font-mono text-sm tracking-widest">
                                Key Contributions
                            </h2>
                            <ul className="space-y-4">
                                {person.contributions.map((item, index) => (
                                    <motion.li 
                                        key={index} 
                                        whileHover={{ x: 6 }}
                                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                        className="flex items-start gap-3 text-gray-300 text-base leading-relaxed p-2 -mx-2 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <CheckCircle2 size={20} className="text-blue-400 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PersonDetailPage;