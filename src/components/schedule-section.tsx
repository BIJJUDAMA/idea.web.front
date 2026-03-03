import React from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const SCHEDULE_EVENTS = [
    {
        title: "Registration Deadline",
        date: "March 8, 5:00 PM",
        desc: "Submit your registration form including the 1-2 minute compiled video recording. Late submissions will not be accepted.",
    },
    {
        title: "Orientation & Pitching (Session 1)",
        date: "March 11, 11:15 AM",
        desc: "Kick-off orientation followed immediately by the first round of Idea Pitching evaluating your validated solutions.",
    },
    {
        title: "Idea Pitching (Session 2)",
        date: "March 11, 2:30 PM",
        desc: "The pitch evaluations continue. Present your PPT clearly outlining the problem, AI relevance, and feasibility.",
    },
] as const;

const ScheduleSection = React.memo(function ScheduleSection() {
    const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

    return (
        <section
            id="schedule"
            className="py-24 px-6 max-w-5xl mx-auto w-full relative"
        >
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white">
                    Event Schedule
                </h2>
                <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6 rounded-full" />
            </div>

            <div ref={ref} className="relative w-full max-w-3xl mx-auto">
                {/* Center Line Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2">
                    <div
                        className="w-full bg-gradient-to-b from-yellow-400 to-pink-500 transition-all duration-1000 ease-out"
                        style={{ height: isIntersecting ? "100%" : "0%" }}
                    />
                </div>

                {/* Mobile Line */}
                <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-zinc-800">
                    <div
                        className="w-full bg-gradient-to-b from-yellow-400 to-pink-500 transition-all duration-1000 ease-out"
                        style={{ height: isIntersecting ? "100%" : "0%" }}
                    />
                </div>

                <div className="space-y-12">
                    {SCHEDULE_EVENTS.map((ev, i) => (
                        <div
                            key={i}
                            className={`relative flex items-center md:justify-between ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Dot */}
                            <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black -translate-x-[7px] md:-translate-x-1/2 shadow-[0_0_10px_rgba(250,204,21,0.5)] z-10" />
                            <div className="w-12 md:w-5/12" /> {/* Empty spacer */}
                            <div
                                className={`w-full pl-14 md:pl-0 md:w-5/12 ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-500`}
                                style={{ transitionDelay: `${i * 200}ms` }}
                            >
                                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
                                    <span className="text-yellow-400 font-mono text-sm mb-2 block">
                                        {ev.date}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {ev.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm">{ev.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

export default ScheduleSection;
