import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recruitmentConfig } from '../config/recruitment.config';
import Navbar from './Navbar'; // Ensure correct import path relative to your directory structure

// Decipher / Scramble Effect Component with Continuous Shine
const DecipherShineText = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    useEffect(() => {
        let iteration = 0;
        const totalDuration = 25;

        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, totalDuration);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span
            className={`inline-block text-transparent bg-clip-text bg-[length:200%_100%] bg-gradient-to-r from-gray-400 via-white to-gray-400 animate-shine ${className}`}
        >
            {displayText}
        </span>
    );
};

const Hero = ({ onContactClick }) => {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        if (recruitmentConfig.isRecruiting) {
            navigate('/recruitment');
        } else {
            alert("We aren't recruiting right now. Stay tuned for updates!");
            navigate('/about');
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white selection:bg-white selection:text-black">
            {/* 1. Navbar First */}
            <Navbar onContactClick={onContactClick} />

            {/* Main Content Area: Centered Vertically */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center py-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center"
                >
                    {/* 2. Main Text */}
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-white">
                        <span className="inline-block">
                            ZERO
                        </span>
                        <span className="inline-block mx-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-400">
                            BUGS
                        </span>
                        <span className="inline-block">
                            CLUB
                        </span>
                    </h1>

                    {/* 3. Secondary Text with Deciphering + Shining Animation */}
                    <div className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl font-mono tracking-widest leading-relaxed mb-12 min-h-[2rem]">
                        <DecipherShineText text="Explore. Engineer. Evolve." />
                    </div>

                    {/* 4. Join Us Button with Subtle Corner Curvature */}
                    <div className="flex justify-center">
                        <motion.button
                            onClick={handleJoinClick}
                            initial={{ 
                                borderRadius: "0px", 
                                backgroundColor: "#9ca3af",
                                color: "#111827" 
                            }}
                            whileHover={{ 
                                borderRadius: "12px", 
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                scale: 1.03,
                                boxShadow: "0px 0px 25px rgba(255, 255, 255, 0.6)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 260, 
                                damping: 22 
                            }}
                            className="group relative px-10 py-4 font-bold uppercase tracking-widest outline-none border border-white/20"
                        >
                            <span className="relative z-10 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                                Join Us <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;