import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Users, Rocket } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community First",
            description: "We are a collective of developers helping each other grow through peer learning and mentorship."
        },
        {
            icon: <Code2 className="w-8 h-8" />,
            title: "Engineering Excellence",
            description: "We don't just write code; we engineer solutions. Best practices and clean architecture are our religion."
        },
        {
            icon: <Rocket className="w-8 h-8" />,
            title: "Shipping Quality",
            description: "From idea to production, we focus on delivering bug-free, high-performance software."
        }
    ];

    return (
        <section id="about" className="py-28 bg-surface text-white relative border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    {/* Shining "Who Are We?" Heading */}
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight inline-block text-transparent bg-clip-text bg-[length:200%_100%] bg-gradient-to-r from-gray-400 via-white to-gray-400 animate-shine">
                        Who Are We?
                    </h2>
                    
                    <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
                        Zero Bugs Club is not just a student chapter; it's a movement. We are the builders, the innovators,
                        and the problem solvers. We believe in the power of open source and the art of engineering.
                    </p>
                </motion.div>

                {/* 3D Perspective Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-14 [perspective:1200px]">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="p-8 md:p-10 border border-white/10 rounded-2xl bg-black/80 hover:bg-white/10 
                                       transition-all duration-300 ease-out transform-gpu z-10 hover:z-30
                                       hover:-translate-y-6 hover:scale-110 
                                       hover:[transform:rotateX(8deg)_rotateY(-4deg)]
                                       hover:border-white 
                                       hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.9),0_0_120px_45px_rgba(255,255,255,0.55)] 
                                       group flex flex-col justify-between cursor-pointer"
                        >
                            <div>
                                <div className="p-3 bg-white/5 w-fit rounded-xl mb-6 text-white border border-white/10 group-hover:scale-125 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-md">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-white transition-colors">{feature.title}</h3>
                                <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed text-sm md:text-base transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;