import React from "react";
import { useTilt } from "@/hooks/use-tilt";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

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
            className={`relative group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 ease-out hover:border-yellow-400/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.08)] ${colSpan === 2 ? "md:col-span-2" : ""} ${className || ""} preserve-3d perspective-1000 ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: glare.opacity,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
                }}
            />
            <div className="relative z-10 w-full h-full p-8 flex flex-col">
                {children}
            </div>
        </div>
    );
});

const GuidelinesSection = React.memo(function GuidelinesSection() {
    return (
        <section id="guidelines" className="py-24 px-6 max-w-7xl mx-auto w-full">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                    Event <span className="text-yellow-400">Guidelines</span>.
                </h2>
                <p className="text-xl text-zinc-400">
                    Everything you need to formulate your AI solution.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-6">
                <BentoCard
                    colSpan={2}
                    className="bg-gradient-to-br from-zinc-900 to-zinc-950"
                >
                    <div className="flex-1 flex items-center justify-between h-full">
                        <div className="pr-4 z-10 relative">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Theme: AI in Academia
                            </h3>
                            <p className="text-zinc-400 max-w-sm text-lg leading-relaxed">
                                Propose ideas that demonstrate the effective use of AI to
                                enhance academic systems, learning methods, assessment, or
                                institutional processes.
                            </p>
                        </div>
                        {/* 3D Cube purely CSS */}
                        <div className="w-32 h-32 preserve-3d animate-cubeSpin relative hidden sm:block">
                            <div
                                className="absolute inset-0 border-2 border-yellow-400/30 bg-yellow-400/5 translate-z-[64px]"
                                style={{ transform: "translateZ(64px)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-yellow-400/30 bg-yellow-400/5 -translate-z-[64px]"
                                style={{ transform: "translateZ(-64px) rotateY(180deg)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-pink-500/30 bg-pink-500/5 translate-x-[64px]"
                                style={{ transform: "translateX(64px) rotateY(90deg)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-pink-500/30 bg-pink-500/5 -translate-x-[64px]"
                                style={{ transform: "translateX(-64px) rotateY(-90deg)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-indigo-400/30 bg-indigo-400/5 translate-y-[64px]"
                                style={{ transform: "translateY(64px) rotateX(-90deg)" }}
                            />
                            <div
                                className="absolute inset-0 border-2 border-indigo-400/30 bg-indigo-400/5 -translate-y-[64px]"
                                style={{ transform: "translateY(-64px) rotateX(90deg)" }}
                            />
                        </div>
                    </div>
                </BentoCard>

                <BentoCard>
                    <h3 className="text-xl font-bold text-white mb-2">Eligibility</h3>
                    <p className="text-zinc-400 text-sm mb-auto">
                        Open exclusively to enrolled First Year and Second Year students.
                    </p>
                    <div className="h-24 w-full flex items-end gap-2 mt-4">
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
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="w-12 h-12 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center font-bold text-zinc-500"
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
                    <div className="p-8 pb-0 z-10 relative">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Stakeholder Analysis is Key
                        </h3>
                        <p className="text-zinc-400 max-w-lg">
                            Actively engage with campus figures to identify, validate, and
                            define a meaningful problem statement.{" "}
                            <strong>This is heavily weighted in judging.</strong>
                        </p>
                    </div>
                    <div className="absolute bottom-8 left-0 w-full flex overflow-hidden mask-edges">
                        <div className="flex shrink-0 min-w-full justify-around gap-4 animate-marquee">
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
                                    className="px-4 py-2 bg-zinc-800 rounded-full text-zinc-300 text-sm font-medium whitespace-nowrap"
                                >
                                    {n}
                                </div>
                            ))}
                        </div>
                        <div
                            className="flex shrink-0 min-w-full justify-around gap-4 animate-marquee"
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
                                    className="px-4 py-2 bg-zinc-800 rounded-full text-zinc-300 text-sm font-medium whitespace-nowrap"
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
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mt-auto leading-tight">
                        Video Proof <br /> & Shortlist PPT
                    </div>
                </BentoCard>
            </div>
        </section>
    );
});

export default GuidelinesSection;
