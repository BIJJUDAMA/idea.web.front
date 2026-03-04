import React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useTilt } from "@/hooks/use-tilt";

const DownloadIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ArrowUpRightIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
    </svg>
);

const BentoCard = React.memo(function BentoCard({
    children,
    className,
    colSpan = 1,
}: {
    children: React.ReactNode;
    className?: string;
    colSpan?: number;
}) {
    const { ref, tilt, glare, handleMouseMove, handleMouseLeave } = useTilt(8);
    const { ref: inViewRef, isIntersecting } = useIntersectionObserver();

    return (
        // biome-ignore lint/a11y/noStaticElementInteractions: 3D tilt effect is decorative; this card is not an interactive control
        <div
            ref={(el) => {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
                (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 ease-out hover:border-yellow-400/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.08)] ${colSpan === 2 ? "md:col-span-2" : ""} ${className || ""} min-h-[280px] md:min-h-0 preserve-3d perspective-1000 ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: glare.opacity,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
                }}
            />
            <div className="relative z-10 w-full h-full p-6 md:p-8 flex flex-col">
                {children}
            </div>
        </div>
    );
});

const GuidelinesSection = React.memo(function GuidelinesSection() {
    return (
        <section id="guidelines" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
                    Event <span className="text-yellow-400">Guidelines</span>.
                </h2>
                <p className="text-lg md:text-xl text-zinc-400">
                    Everything you need to formulate your AI solution.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[280px] gap-4 md:gap-6">
                <BentoCard
                    colSpan={2}
                    className="bg-gradient-to-br from-zinc-900 to-zinc-950"
                >
                    <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between h-full">
                        <div className="pr-0 sm:pr-4 z-10 relative mb-8 sm:mb-0">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                                Theme: AI in Academia
                            </h3>
                            <p className="text-zinc-400 max-w-sm text-base md:text-lg leading-relaxed">
                                Propose ideas that demonstrate the effective use of AI to
                                enhance academic systems, learning methods, assessment, or
                                institutional processes.
                            </p>
                        </div>
                        {/* 3D Cube purely CSS - Hidden on very small screens to save space */}
                        <div className="w-24 h-24 md:w-32 md:h-32 preserve-3d animate-cubeSpin relative hidden sm:block shrink-0">
                            <div
                                className="absolute inset-0 border-2 border-yellow-400/30 bg-yellow-400/5 translate-z-[48px] md:translate-z-[64px]"
                                style={{ transform: "translateZ(clamp(48px, 10vw, 64px))" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-yellow-400/30 bg-yellow-400/5 -translate-z-[48px] md:-translate-z-[64px]"
                                style={{ transform: "translateZ(clamp(-64px, -10vw, -48px)) rotateY(180deg)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-pink-500/30 bg-pink-500/5 translate-x-[48px] md:translate-x-[64px]"
                                style={{ transform: "translateX(clamp(48px, 10vw, 64px)) rotateY(90deg)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-pink-500/30 bg-pink-500/5 -translate-x-[48px] md:-translate-x-[64px]"
                                style={{ transform: "translateX(clamp(-64px, -10vw, -48px)) rotateY(-90deg)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-indigo-400/30 bg-indigo-400/5 translate-y-[48px] md:translate-y-[64px]"
                                style={{ transform: "translateY(clamp(48px, 10vw, 64px)) rotateX(-90deg)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-indigo-400/30 bg-indigo-400/5 -translate-y-[48px] md:-translate-y-[64px]"
                                style={{ transform: "translateY(clamp(-64px, -10vw, -48px)) rotateX(90deg)" }}
                            />
                        </div>
                    </div>
                </BentoCard>

                <BentoCard>
                    <h3 className="text-xl font-bold text-white mb-2">Eligibility</h3>
                    <p className="text-zinc-400 text-sm mb-auto">
                        Open exclusively to enrolled First Year and Second Year students.
                    </p>
                    <div className="h-20 md:h-24 w-full flex items-end gap-1 md:gap-2 mt-6">
                        {[40, 70, 45, 90, 60].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-pink-500/20 to-pink-500 rounded-t-sm transition-all duration-1000 ease-out origin-bottom"
                                style={{ height: `${h}%`, transform: "scaleY(1)" }}
                            />
                        ))}
                    </div>
                </BentoCard>

                <BentoCard>
                    <h3 className="text-xl font-bold text-white mb-2">Team Size</h3>
                    <p className="text-zinc-400 text-sm mb-auto">
                        Participation is strictly team-based. Individual participation is
                        not permitted.
                    </p>
                    <div className="flex items-center mt-6">
                        <div className="flex -space-x-3 md:-space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 text-sm md:text-base"
                                >
                                    {i}
                                </div>
                            ))}
                        </div>
                        <div className="ml-4 text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
                            2-3 Members
                        </div>
                    </div>
                </BentoCard>

                <BentoCard colSpan={2} className="overflow-hidden p-0 relative">
                    <div className="p-6 md:p-8 pb-0 z-10 relative">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            Stakeholder Analysis is Key
                        </h3>
                        <p className="text-zinc-400 max-w-lg text-sm md:text-base">
                            Actively engage with campus figures to identify, validate, and
                            define a meaningful problem statement.{" "}
                            <strong className="text-zinc-300">This is heavily weighted in judging.</strong>
                        </p>
                    </div>
                    <div className="absolute bottom-6 md:bottom-8 left-0 w-full flex overflow-hidden mask-edges">
                        <div className="flex shrink-0 min-w-full justify-around gap-3 md:gap-4 animate-marquee">
                            {[
                                "Professors",
                                "HODs",
                                "Wardens",
                                "Students",
                                "Admin Staff",
                                "Professors",
                            ].map((n, i) => (
                                <div
                                    key={i}
                                    className="px-3 md:px-4 py-1.5 md:py-2 bg-zinc-800 rounded-full text-zinc-300 text-xs md:text-sm font-medium whitespace-nowrap"
                                >
                                    {n}
                                </div>
                            ))}
                        </div>
                        <div
                            className="flex shrink-0 min-w-full justify-around gap-3 md:gap-4 animate-marquee"
                            aria-hidden="true"
                        >
                            {[
                                "Professors",
                                "HODs",
                                "Wardens",
                                "Students",
                                "Admin Staff",
                                "Professors",
                            ].map((n, i) => (
                                <div
                                    key={i}
                                    className="px-3 md:px-4 py-1.5 md:py-2 bg-zinc-800 rounded-full text-zinc-300 text-xs md:text-sm font-medium whitespace-nowrap"
                                >
                                    {n}
                                </div>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                <BentoCard>
                    <h3 className="text-xl font-bold text-white mb-2">Deliverables</h3>
                    <p className="text-zinc-400 text-sm mb-6">
                        A 1-2 minute compiled video recording required as proof of
                        stakeholder engagement.
                    </p>
                    <div className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mt-auto leading-tight pb-2">
                        Video Proof <br /> & Shortlist PPT
                    </div>
                </BentoCard>

                {/* Resource 1: PPT */}
                <BentoCard className="p-0 border-0 bg-transparent min-h-[220px] md:min-h-0">
                    <a
                        href="https://docs.google.com/presentation/d/1ulrFreKlaBi_L3cXLV_dXhbkJREA23SkQP-BR4T3vAA/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full h-full bg-[#111113] border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-yellow-400/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/5 block"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex items-start justify-between relative z-10">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <path d="M22 6l-10 7L2 6" />
                                </svg>
                            </div>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300 shrink-0">
                                <ArrowUpRightIcon size={16} />
                            </div>
                        </div>

                        <div className="relative z-10 mt-6 md:mt-8">
                            <h4 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2">Presentation Template</h4>
                            <p className="text-zinc-400 text-xs md:text-sm">Download the official PPT format required for round 1 submissions.</p>
                        </div>
                    </a>
                </BentoCard>

                {/* Resource 2: Guidelines Doc */}
                <BentoCard className="p-0 border-0 bg-transparent min-h-[220px] md:min-h-0">
                    <a
                        href="https://docs.google.com/document/d/1_g_0wZV2iKojyRbhLjNjxP-ufZNUzNzzbP4vxzJQ6So/edit?tab=t.0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full h-full bg-[#111113] border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-yellow-400/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-400/5 block"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex items-start justify-between relative z-10">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300 shrink-0">
                                <ArrowUpRightIcon size={16} />
                            </div>
                        </div>

                        <div className="relative z-10 mt-6 md:mt-8">
                            <h4 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2">Guidelines Document</h4>
                            <p className="text-zinc-400 text-xs md:text-sm">Detailed rules, rubrics, and evaluation criteria in a doc.</p>
                        </div>
                    </a>
                </BentoCard>
            </div>
        </section>
    );
});

export default GuidelinesSection;