import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import LightRays from '../components/ui/LightRays';
import CompilerApp from '../compiler/App';
import '../compiler/compiler.css';

const CompilerPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black pt-20 pb-6 relative overflow-hidden flex flex-col"
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

            {/* Main Full-Bleed Content Container */}
            <div className="relative z-10 flex flex-col flex-1 w-full max-w-none px-12 sm:px-14 md:px-16 mx-auto">
                
                {/* Header Navigation */}
                <div className="w-full mb-3 pt-2">
                    <div className="flex items-center gap-4 border-b border-white/10 pb-3">
                        
                        {/* Unified All Tools Link */}
                        <Link
                            to="/tools"
                            className="group relative z-10 cursor-pointer select-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-emerald-500/10 active:scale-95"
                        >
                            <ArrowLeft 
                                size={16} 
                                className="pointer-events-none text-gray-400 group-hover:text-emerald-400 group-hover:-translate-x-1 transition-all duration-200" 
                            />
                            <span className="pointer-events-none">All Tools</span>
                        </Link>

                        <span className="text-gray-600">/</span>

                        <div className="flex items-center gap-2 text-white">
                            <Code2 size={18} className="text-emerald-400" />
                            <span className="font-semibold">Online Compiler</span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-xs md:text-sm mt-2">
                        Write and run Python, JavaScript, HTML/CSS, and C/C++ code in your browser.
                    </p>
                </div>

                {/* Compiler Workspace Container */}
                <div className="flex-1 min-h-[82vh] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/80 backdrop-blur-sm shadow-2xl mb-2">
                    <CompilerApp />
                </div>
            </div>
        </motion.div>
    );
};

export default CompilerPage;