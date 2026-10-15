import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getPersonByDeptAndSlug } from '../data/teamData';
import { getProjectBySlug } from '../data/projects';

const ContributorAvatar = ({ person }) => (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-gradient-to-br from-blue-400/30 to-violet-400/20 text-sm font-semibold text-white">
        {person.image ? (
            <img
                src={person.image}
                alt=""
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
            />
        ) : (
            <span aria-label={`${person.name} portrait unavailable`}>
                {person.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
            </span>
        )}
    </div>
);

const ProjectDetailPage = () => {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);

    if (!project) {
        return (
            <div className="min-h-screen bg-black px-4 pb-20 pt-36 text-center text-white">
                <h1 className="mb-4 text-4xl font-bold">Project Not Found</h1>
                <Link to="/projects" className="text-blue-400 hover:underline">Back to Projects</Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-5xl">
                <Link
                    to="/projects"
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-sm uppercase tracking-wider text-gray-300 transition-colors hover:bg-white/15 hover:text-white"
                >
                    <ArrowLeft size={18} />
                    Back to Projects
                </Link>

                <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-blue-400">{project.category}</p>
                <h1 className="mb-8 text-4xl font-bold tracking-tighter md:text-6xl">{project.title}</h1>

                <img
                    src={project.image}
                    alt={project.imageAlt}
                    width="960"
                    height="600"
                    fetchPriority="high"
                    decoding="async"
                    className="mb-10 aspect-[8/5] w-full rounded-2xl border border-white/10 object-cover"
                />

                <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)]">
                    <section aria-labelledby="project-description" className="space-y-4">
                        <h2 id="project-description" className="font-mono text-sm uppercase tracking-widest text-gray-400">About the project</h2>
                        <p className="text-lg leading-relaxed text-gray-200">{project.description}</p>
                    </section>

                    <section aria-labelledby="project-deployment" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <h2 id="project-deployment" className="mb-4 font-mono text-sm uppercase tracking-widest text-gray-400">Deployment</h2>
                        <p className="flex items-start gap-3 leading-relaxed text-gray-200">
                            <MapPin size={20} className="mt-0.5 shrink-0 text-blue-400" />
                            <span>{project.deployment}</span>
                        </p>
                    </section>
                </div>

                <section aria-labelledby="project-contributors" className="mt-12">
                    <h2 id="project-contributors" className="mb-6 font-mono text-sm uppercase tracking-widest text-gray-400">Contributors</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {project.contributors.map((contributor) => {
                            const person = getPersonByDeptAndSlug(contributor.departmentSlug, contributor.memberSlug);

                            if (!person) return null;

                            return (
                                <article
                                    key={`${contributor.departmentSlug}/${contributor.memberSlug}`}
                                    className="flex gap-4 rounded-2xl border border-white/10 bg-[#111111] p-5"
                                >
                                    <ContributorAvatar person={person} />
                                    <div className="min-w-0">
                                        <Link
                                            to={`/about/${person.deptSlug}/${person.slug}`}
                                            className="font-semibold text-white hover:text-blue-300 hover:underline"
                                        >
                                            {person.name}
                                        </Link>
                                        <p className="mb-3 mt-1 text-sm text-gray-500">{person.role}</p>
                                        <p className="text-sm leading-relaxed text-gray-300">{contributor.contribution}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default ProjectDetailPage;
