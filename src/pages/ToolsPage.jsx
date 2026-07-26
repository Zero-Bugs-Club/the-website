import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LightRays from '../components/ui/LightRays';

const tools = [
    {
        id: 'compiler',
        label: 'Online Compiler',
        icon: Terminal,
        description: 'Write and run Python, JavaScript, HTML/CSS, and C/C++ code directly in your browser. Multi-language support with syntax highlighting.',
        slug: '/tools/compiler',
        tags: ['Python', 'JavaScript', 'C++', 'HTML/CSS']
    }
];

const FULL_TEXT = "Tools";

const ToolsPage = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < FULL_TEXT.length) {
                setDisplayedText(FULL_TEXT.slice(0, index + 1));
                index++;
            } else {
                setIsTypingComplete(true);
                clearInterval(timer);
            }
        }, 150);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#cfcece"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                />
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-16">
                    {/* Typewriter Title */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 flex items-center min-h-[1.2em]">
                        <span>{displayedText}</span>
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            className="inline-block w-[3px] md:w-[5px] h-[0.8em] bg-emerald-400 ml-2 rounded-sm"
                        />
                    </h1>

                    {/* Fading Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 10 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-gray-400 text-lg max-w-2xl"
                    >
                        Developer tools and utilities running directly in your browser.
                    </motion.p>
                </div>

                {/* Tools Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
                        >
                            <Link
                                to={tool.slug}
                                className="group relative block h-full bg-gradient-to-b from-white/10 to-black/20 backdrop-blur-md border border-white/10 hover:border-white/30 hover:from-white/15 hover:to-white/5 p-8 rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] overflow-hidden"
                            >
                                {/* Top highlight subtle flare */}
                                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="flex flex-col h-full relative z-10">
                                    {/* Icon Container */}
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl mb-6 text-white group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-3 group-hover:scale-105 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                                        {typeof tool.icon === 'string' ? (
                                            <span>{tool.icon}</span>
                                        ) : (
                                            <tool.icon size={26} />
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                        {tool.label}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 group-hover:text-gray-300 transition-colors duration-300">
                                        {tool.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {tool.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono text-gray-300 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA Link */}
                                    <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-white transition-all duration-300">
                                        <span>Open Tool</span>
                                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5 text-emerald-400 group-hover:text-white" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Empty state for future tools */}
                {tools.length === 0 && (
                    <div className="text-center py-20">
                        <Wrench size={48} className="mx-auto text-gray-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">More tools coming soon</h3>
                        <p className="text-gray-600">New developer tools will be added here over time.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ToolsPage;