
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FogBackground from '../components/ui/FogBackground';
import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    ChevronDown,
    Sparkles,
} from 'lucide-react';

// Starter event data. Add only verified events and dates here.
const events = [
    {
        id: 'findathon',
        title: 'Findathon',
        month: '2026-07',
        date: '2026-07-18',
        description:
            'Explore unfamiliar technology stacks, build full-stack solutions, and turn ideas into working projects.',
        takeaways: [
            'Random tech stacks',
            'Full-stack development',
            'Problem-solving',
        ],
        outcomes: [
            'Explore unfamiliar technologies.',
            'Practice full-stack development.',
            'Apply problem-solving skills through building.',
        ],
    },
];

const formatMonth = (value) => {
    const [year, month] = value.split('-');
    const monthName = new Date(
        Number(year),
        Number(month) - 1,
        1
    ).toLocaleString('en-US', { month: 'long' });

    return `${monthName} '${year.slice(-2)}`;
};
const formatDate = (value) =>
    new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

const EventsPage = () => {
    const monthOptions = [
        ...new Set(events.map((event) => event.month)),
    ].sort().reverse();

    const [selectedMonth, setSelectedMonth] = useState(
        monthOptions[0] || ''
    );
    const [selectedEvent, setSelectedEvent] = useState(null);

    const visibleEvents = events.filter(
        (event) => event.month === selectedMonth
    );

    return (
        <motion.div
        
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative min-h-screen overflow-hidden bg-black px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8"
        >   <FogBackground />
            <div className="relative z-10 mx-auto max-w-6xl">
                {!selectedEvent ? (
                    <>
                        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
                                    Zero Bugs Club
                                </p>
                                <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
                                    Events
                                    <span className="text-gray-600">.</span>
                                </h1>
                                <p className="mt-4 max-w-xl text-gray-400">
                                    Ideas, experiments, and experiences
                                    that bring our community together.
                                </p>
                            </div>

                            <div className="relative w-full sm:w-48">
                                <CalendarDays
                                    size={16}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <select
                                    aria-label="Filter events by month and year"
                                    value={selectedMonth}
                                    onChange={(event) =>
                                        setSelectedMonth(event.target.value)
                                    }
                                    className="w-full appearance-none rounded-full border border-white/15 bg-[#111] py-3 pl-11 pr-10 text-sm text-white outline-none transition hover:border-white/40 focus:border-white/60"
                                >
                                    {monthOptions.map((month) => (
                                        <option key={month} value={month}>
                                            {formatMonth(month)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="grid gap-5">
                            
{visibleEvents.map((item, index) => (
    <motion.button
        key={item.id}
        type="button"
        onClick={() => setSelectedEvent(item)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
            y: -8,
            scale: 1.02,
            boxShadow: "0px 12px 35px 2px rgba(255, 255, 255, 0.2)",
            zIndex: 20,
        }}
        transition={{
            delay: index * 0.08,
            y: { type: "spring", stiffness: 300, damping: 25 },
            scale: { type: "spring", stiffness: 300, damping: 25 },
            boxShadow: { duration: 0.25 },
        }}
        className="group w-full rounded-2xl border border-white/10 bg-[#101010] p-6 text-left shadow-xl transition-colors duration-300 hover:border-white/20 sm:p-8"
    >
        <div className="flex items-start justify-between gap-4">
            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
                    {formatMonth(item.month)}
                </p>

                <h2 className="text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                    {item.title}
                </h2>

                <p className="mt-3 max-w-2xl leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-200">
                    {item.description}
                </p>
            </div>

            <span className="rounded-full border border-white/15 p-3 text-gray-400 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight size={20} />
            </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
            {item.takeaways.map((takeaway) => (
                <span
                    key={takeaway}
                    className="rounded-full bg-neutral-800 px-3 py-2 text-xs text-gray-300 transition-all duration-300 group-hover:bg-neutral-700 group-hover:text-white"
                >
                    {takeaway}
                </span>
            ))}
        </div>
    </motion.button>
))}


                            {visibleEvents.length === 0 && (
                                <p className="rounded-2xl border border-white/10 p-8 text-gray-400">
                                    No events found for this month.
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <motion.section
                        key={selectedEvent.id}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mx-auto max-w-4xl"
                        
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedEvent(null)}
                            className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                        >
                            <ArrowLeft size={16} />
                            Back to events
                        </button>

                        <p className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gray-500">
                            <CalendarDays size={16} />
                            {formatDate(selectedEvent.date)}
                        </p>

                        <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl">
                            {selectedEvent.title}
                            <span className="text-gray-600">.</span>
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
                            {selectedEvent.description}
                        </p>

                        
<div className="mt-10 space-y-10">
    <div>
        <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold">
            <Sparkles size={19} />
            Key takeaways
        </h2>

        <ul className="flex flex-wrap gap-3">
            {selectedEvent.takeaways.map((item) => (
                <li
                    key={item}
                    className="text-sm text-gray-300"
                >
                    {item}
                </li>
            ))}
        </ul>
    </div>

    <div>
        <h2 className="mb-4 text-xl font-semibold">
            Outcomes
        </h2>

        <ul className="space-y-3">
            {selectedEvent.outcomes.map((item) => (
                <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-gray-400"
                >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                    {item}
                </li>
            ))}
        </ul>
    </div>
</div>

                    </motion.section>
                )}
            </div>
        </motion.div>
    );
};

export default EventsPage;
