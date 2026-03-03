import React, { useCallback, useEffect, useRef, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

/* ─── Animated digit cell ─── */
const TimerCard = React.memo(function TimerCard({
    value,
    label,
    index,
}: {
    value: number;
    label: string;
    index: number;
}) {
    const display = String(value).padStart(2, "0");
    const prevRef = useRef(display);
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        if (prevRef.current !== display) {
            setFlip(true);
            const t = setTimeout(() => setFlip(false), 400);
            prevRef.current = display;
            return () => clearTimeout(t);
        }
    }, [display]);

    return (
        <div
            className="flex flex-col items-center animate-fade-in-up"
            style={{ animationDelay: `${index * 120}ms` }}
        >
            <div className="countdown-card group relative">
                {/* Gradient border glow */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-yellow-400/40 via-pink-500/20 to-indigo-500/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />

                {/* Glass card */}
                <div className="relative w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 flex items-center justify-center rounded-2xl bg-zinc-900/70 backdrop-blur-xl border border-white/[0.06] overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
                    </div>

                    {/* Number */}
                    <span
                        className={`relative z-10 text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500 tabular-nums transition-all duration-300 ${flip ? "countdown-flip" : ""}`}
                    >
                        {display}
                    </span>
                </div>
            </div>

            {/* Label */}
            <span className="mt-3 text-[10px] sm:text-xs font-bold tracking-[0.25em] text-zinc-500 uppercase">
                {label}
            </span>
        </div>
    );
});

/* ─── Separator colon ─── */
function Separator() {
    return (
        <div className="flex flex-col gap-2 items-center justify-center pb-6 opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse delay-200" />
        </div>
    );
}

/* ─── Main countdown component ─── */
const CountdownTimer = React.memo(function CountdownTimer({
    targetDate,
}: {
    targetDate: Date;
}) {
    const calcTimeLeft = useCallback((): TimeLeft | null => {
        const diff = targetDate.getTime() - Date.now();
        if (diff <= 0) return null;
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft);

    useEffect(() => {
        const id = setInterval(() => {
            const t = calcTimeLeft();
            setTimeLeft(t);
            if (!t) clearInterval(id);
        }, 1000);
        return () => clearInterval(id);
    }, [calcTimeLeft]);

    /* ─── Expired state ─── */
    if (!timeLeft) {
        return (
            <section className="py-16 px-6 flex justify-center">
                <div className="relative animate-fade-in-up">
                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-500/20 via-yellow-400/10 to-indigo-500/20 blur-xl" />
                    <div className="relative px-12 py-8 bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 text-center">
                        <h3 className="text-2xl md:text-3xl font-black text-white">
                            Submission Closed
                        </h3>
                        <p className="mt-2 text-zinc-400 text-sm">
                            The registration deadline has passed.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const units: { key: string; value: number; label: string }[] = [
        { key: "d", value: timeLeft.days, label: "Days" },
        { key: "h", value: timeLeft.hours, label: "Hours" },
        { key: "m", value: timeLeft.minutes, label: "Minutes" },
        { key: "s", value: timeLeft.seconds, label: "Seconds" },
    ];

    return (
        <section id="countdown" className="py-16 md:py-20 px-6 w-full">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2 animate-fade-in-up text-center">
                    Time Left to{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        Register
                    </span>
                </h2>
                <p className="text-zinc-500 text-sm mb-10 animate-fade-in-up delay-100">
                    Registration closes March 8, 5:00 PM
                </p>

                {/* Timer container */}
                <div className="relative">
                    {/* Outer glow */}
                    <div className="absolute -inset-6 md:-inset-8 rounded-[2rem] bg-gradient-to-r from-yellow-400/10 via-pink-500/5 to-indigo-500/10 blur-2xl animate-pulse pointer-events-none" />

                    {/* Cards */}
                    <div className="relative flex items-start gap-2 sm:gap-3 md:gap-5">
                        {units.map((u, i) => (
                            <React.Fragment key={u.key}>
                                {i > 0 && <Separator />}
                                <TimerCard value={u.value} label={u.label} index={i} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default CountdownTimer;
