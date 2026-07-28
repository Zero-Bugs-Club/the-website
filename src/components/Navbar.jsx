import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onContactClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);

    // Track page scroll for background styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close navbar when clicking or touching outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Domains', href: '/domains' },
        { name: 'Tools', href: '/tools' },
    ];

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 border-b ${
                isOpen
                    ? 'bg-black border-white/15'
                    : scrolled
                        ? 'bg-black/60 backdrop-blur-xl border-white/5'
                        : 'bg-transparent border-transparent'
            }`}
        >
            {/* Header row: Padding lives inside here so dropdown attaches immediately below with ZERO gap */}
            <div className={`w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
                <div className="flex items-center justify-between h-16 sm:h-20">
                    
                    {/* Brand Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            to="/"
                            className="flex items-center gap-3 group"
                            onClick={() => {
                                setIsOpen(false);
                                window.scrollTo(0, 0);
                            }}
                        >
                            <img className="h-14 sm:h-16 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300" src="/logo_new.png" alt="ZBC Logo" />
                            <span className="font-bold text-2xl sm:text-3xl tracking-tighter text-white">ZBC</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-4 lg:ml-8 flex items-center space-x-5 lg:space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => {
                                        if (link.href !== '/about') {
                                            window.scrollTo(0, 0);
                                        }
                                    }}
                                    className={({ isActive }) => `
                                        relative px-4 py-2 rounded-full text-base lg:text-lg font-medium transition-all duration-300 group overflow-hidden
                                        ${isActive ? 'text-black bg-white font-semibold' : 'text-gray-300 hover:text-white'}
                                    `}
                                >
                                    {link.name}
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </NavLink>
                            ))}
                            <button
                                onClick={onContactClick}
                                className="relative text-white px-6 py-2.5 rounded-full text-base lg:text-lg font-bold transition-all duration-300 border border-white/25 hover:bg-white hover:text-black overflow-hidden group cursor-pointer"
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none p-2 cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown - Encased in solid black without any transparent spacing above it */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden bg-black border-t border-white/10 overflow-hidden shadow-2xl"
                    >
                        <div className="px-4 pt-3 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (link.href !== '/about') {
                                            window.scrollTo(0, 0);
                                        }
                                    }}
                                    className={({ isActive }) => `
                                        block px-4 py-3 rounded-xl text-lg font-medium transition-colors
                                        ${isActive ? 'bg-white/15 text-white font-semibold' : 'text-gray-300 hover:bg-white/10 hover:text-white'}
                                    `}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="pt-2">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (onContactClick) onContactClick();
                                    }}
                                    className="w-full text-center bg-white text-black font-bold uppercase tracking-wider py-3.5 rounded-xl text-base transition-transform active:scale-95 shadow-lg cursor-pointer"
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;