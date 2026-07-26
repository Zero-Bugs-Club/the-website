import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github, Instagram, Linkedin } from 'lucide-react';
import LightRays from '../components/ui/LightRays';
import { getDepartmentBySlug } from '../config/about.config';

const ProfileAvatar = ({ name }) => {
    const initials = name
        .split(' ')
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="h-32 w-32 shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-700 to-black flex items-center justify-center text-3xl font-bold text-white">
            {initials}
        </div>
    );
};

const MemberCard = ({ departmentSlug, member }) => (
    <Link
        to={`/about/${departmentSlug}/${member.slug}`}
        className="group block rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-black/20 p-6 backdrop-blur-sm transition-all hover:border-white/30 hover:from-white/15 hover:to-black/30"
    >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <ProfileAvatar name={member.name} />
            <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h2 className="mt-2 text-2xl font-bold text-white">{member.name}</h2>
                    </div>
                    <ArrowRight size={20} className="hidden text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-white sm:block" />
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{member.description}</p>
                <div className="mt-5 flex gap-3 text-gray-500">
                    <span className="rounded-full border border-white/10 p-2"><Github size={16} /></span>
                    <span className="rounded-full border border-white/10 p-2"><Linkedin size={16} /></span>
                    <span className="rounded-full border border-white/10 p-2"><Instagram size={16} /></span>
                </div>
            </div>
        </div>
    </Link>
);

const DepartmentPage = () => {
    const { deptName } = useParams();
    const department = getDepartmentBySlug(deptName);

    if (!department) {
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
                    <h1 className="text-4xl font-bold tracking-tighter">Department not found</h1>
                    <p className="mt-4 text-gray-400">This department profile has not been added yet.</p>
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
                    raysSpeed={1.2}
                    lightSpread={0.75}
                    rayLength={1.1}
                    followMouse={true}
                    mouseInfluence={0.08}
                    noiseAmount={0.08}
                    distortion={0.04}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                <div>
                    <Link 
                        to="/about" 
                        className="mb-16 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-white border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
                    >
                        <ArrowLeft size={16} />
                        Back to About
                    </Link>
                </div>

                <section className="mb-14 border-b border-white/10 pb-10">
                    <p className="mb-4 font-mono text-xl uppercase tracking-[0.3em] text-gray-400">Department</p>
                    <h1 className="text-7xl font-bold tracking-tighter text-white md:text-9xl">{department.name}</h1>
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">{department.summary}</p>
                </section>

                {/* Lead Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Department Lead</h2>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link to={`/about/${department.slug}/${department.slug}-lead`} className="group block rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-black/20 p-6 backdrop-blur-sm transition-all hover:border-white/30 hover:from-white/15 hover:to-black/30">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                <ProfileAvatar name={department.lead} />
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                                                <h2 className="mt-2 text-2xl font-bold text-white">{department.lead}</h2>
                                        </div>
                                        <ArrowRight size={20} className="hidden text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-white sm:block" />
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-400">{department.leadNote}</p>
                                    <div className="mt-5 flex gap-3 text-gray-500">
                                        <span className="rounded-full border border-white/10 p-2"><Github size={16} /></span>
                                        <span className="rounded-full border border-white/10 p-2"><Linkedin size={16} /></span>
                                        <span className="rounded-full border border-white/10 p-2"><Instagram size={16} /></span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <hr className="my-8 border-white/5" />

                <div className="mb-8">
                    <div>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Club Members</h2>
                    </div>
                </div>

                <div className="grid gap-5">
                    {department.members.map(member => (
                        <MemberCard key={member.slug} departmentSlug={department.slug} member={member} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default DepartmentPage;
