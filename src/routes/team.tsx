import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/team")({
    component: TeamRoute,
});

const GithubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

const LinkedinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const teamMembers = [
    {
        name: "SH Nihil Mukkesh",
        role: "Frontend Developer",
        initials: "NM",
        github: "https://github.com/SH-Nihil-Mukkesh-25",
        linkedin: "https://www.linkedin.com/in/sh-nihil-mukkesh/",
    },
    {
        name: "Dakshin Raj P",
        role: "Frontend Developer",
        initials: "DR",
        github: "https://github.com/Dakshin10",
        linkedin: "https://www.linkedin.com/in/dakshin-raj/",
    },
];

function TeamRoute() {
    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center py-24 sm:py-32 px-6">
            {/* Header */}
            <motion.div
                className="text-center mb-16 sm:mb-20"
                initial={{ opacity: 0, y: 24, filter: "blur(16px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8"
                    style={{ background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.2)" }}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    <span className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
                        The Builders
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-6">
                    Website{" "}
                    <span className="font-semibold" style={{ color: "#FACC15" }}>Team</span>
                </h1>

                <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
                    The technical minds behind the{" "}
                    <span className="text-yellow-400 font-medium">AI in Academia</span>{" "}
                    IDEATHON platform.
                </p>

                <div className="flex items-center justify-center gap-4 mt-10">
                    <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1))" }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FACC15" }} />
                    <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.1))" }} />
                </div>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-3xl">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.name}
                        className="relative rounded-2xl p-7 sm:p-8 flex flex-col items-center text-center cursor-default select-none overflow-hidden group transition-all duration-500"
                        style={{
                            background: "rgba(38, 38, 42, 0.75)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            border: "1px solid rgba(90, 90, 100, 0.35)",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                        }}
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.03 }}
                    >
                        {/* Hover glow */}
                        <div
                            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                            style={{
                                background: "linear-gradient(135deg, rgba(250,204,21,0.07) 0%, rgba(236,72,153,0.07) 50%, rgba(99,102,241,0.07) 100%)",
                            }}
                        />

                        {/* Initials avatar */}
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-400"
                            style={{
                                background: "rgba(250,204,21,0.1)",
                                border: "2px solid rgba(250,204,21,0.25)",
                            }}
                        >
                            <span className="text-yellow-400 text-2xl font-bold tracking-wide">
                                {member.initials}
                            </span>
                        </div>

                        {/* Name */}
                        <h3 className="text-white font-semibold text-xl mb-1.5 tracking-tight">
                            {member.name}
                        </h3>

                        {/* Role */}
                        <p className="text-yellow-400/80 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
                            {member.role}
                        </p>

                        {/* Gradient underline */}
                        <div className="relative h-px w-full mb-6 overflow-hidden rounded-full bg-white/5">
                            <div
                                className="absolute inset-y-0 left-0 rounded-full w-8 group-hover:w-full transition-all duration-500"
                                style={{ background: "linear-gradient(90deg, #FACC15, #EC4899, #6366F1)" }}
                            />
                        </div>

                        {/* Social links */}
                        <div className="flex items-center gap-5">
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-500 hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                            >
                                <span className="sr-only">GitHub</span>
                                <GithubIcon />
                            </a>
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-500 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.4)]"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <LinkedinIcon />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}