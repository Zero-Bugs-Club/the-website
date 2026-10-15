import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectsPage = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-black px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8"
    >
        <div className="mx-auto max-w-6xl">
            <header className="mb-10">
                <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-blue-400">What we build</p>
                <h1 className="mb-4 text-5xl font-bold tracking-tighter md:text-7xl">Projects</h1>
                <p className="max-w-2xl text-lg leading-relaxed text-gray-400">
                    Explore projects built by the Zero Bugs Club community.
                </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <motion.article
                        key={project.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="h-full"
                    >
                        <Link
                            to={`/projects/${project.slug}`}
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition-colors hover:border-white/25"
                        >
                            <img
                                src={project.image}
                                alt={project.imageAlt}
                                width="960"
                                height="600"
                                loading="lazy"
                                decoding="async"
                                className="aspect-[8/5] w-full object-cover"
                            />
                            <div className="flex flex-1 flex-col p-6">
                                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-blue-400">{project.category}</p>
                                <h2 className="mb-3 text-2xl font-bold tracking-tight text-white group-hover:text-blue-200">{project.title}</h2>
                                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">{project.description}</p>
                                <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                                    Explore project
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </div>
        </div>
    </motion.div>
);

export default ProjectsPage;
