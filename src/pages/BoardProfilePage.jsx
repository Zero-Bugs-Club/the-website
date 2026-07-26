import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Github, Instagram, Linkedin } from 'lucide-react';
import LightRays from '../components/ui/LightRays';
import { getBoardMemberBySlug } from '../config/about.config';

const ProfileAvatar = ({ name }) => {
    const initials = name
        .split(' ')
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="h-36 w-36 rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-700 via-neutral-900 to-black flex items-center justify-center text-4xl font-bold text-white shadow-2xl sm:h-44 sm:w-44">
            {initials}
        </div>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target={href === '#' ? undefined : '_blank'}
        rel={href === '#' ? undefined : 'noopener noreferrer'}
        aria-label={label}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-white/30 hover:bg-white hover:text-black"
    >
        {icon}
    </a>
);

const BoardProfilePage = () => {
    const { memberName } = useParams();
    const member = getBoardMemberBySlug(memberName);

    if (!member) {
        return (
            <main className="min-h-screen bg-black px-4 pt-32 text-white">
                <div className="mx-auto max-w-4xl">
                    <Link 
                        to="/about" 
                        className="mb-12 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
                    >
                        <ArrowLeft size={16} />
                        Back to About
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tighter">Board member profile not found</h1>
                    <p className="mt-4 text-gray-400">This board profile has not been added yet.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-black px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#cfcece"
                    raysSpeed={1}
                    lightSpread={0.7}
                    rayLength={1}
                    followMouse={true}
                    mouseInfluence={0.08}
                    noiseAmount={0.08}
                    distortion={0.04}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                <Link 
                    to="/about" 
                    className="mb-16 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
                >
                    <ArrowLeft size={16} />
                    Back to About
                </Link>

                <section className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[auto_1fr] lg:items-end">
                    <ProfileAvatar name={member.name} />
                    <div>
                        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-gray-500">Board</p>
                        <h1 className="text-5xl font-bold tracking-tighter text-white md:text-8xl">{member.name}</h1>
                        <p className="mt-3 font-mono text-sm uppercase tracking-[0.24em] text-blue-400">{member.role}</p>
                        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">{member.description}</p>
                        <div className="mt-8 flex gap-3">
                            <SocialLink href={member.github} label="GitHub" icon={<Github size={18} />} />
                            <SocialLink href={member.linkedin} label="LinkedIn" icon={<Linkedin size={18} />} />
                            <SocialLink href={member.instagram} label="Instagram" icon={<Instagram size={18} />} />
                        </div>
                    </div>
                </section>

                <section className="grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
                    <div>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Note from the Faculty Coordinator</h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-black/20 p-8 backdrop-blur-sm">
                        <p className="text-gray-300 leading-relaxed">{member.note}</p>
                    </div>
                </section>

                <section>
                    <div className="mb-6">
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Contributions</h2>
                    </div>
                    <div className="grid gap-4">
                        {member.contributions.map((contribution, index) => (
                            <div
                                key={contribution}
                                className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                            >
                                <span className="font-mono text-sm text-gray-600">/{String(index + 1).padStart(2, '0')}</span>
                                <p className="text-gray-300">{contribution}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default BoardProfilePage;
