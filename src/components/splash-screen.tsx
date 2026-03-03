import { useEffect, useState } from "react";
import logo from "@/assets/main-logo-banner.jpg.jpeg";

export default function SplashScreen({
    onComplete,
}: { onComplete: () => void }) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), 800);
        const t2 = setTimeout(() => onComplete(), 1200);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [onComplete]);

    if (stage === 1) return null;

    return (
        <div
            className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center transition-opacity duration-400 ${stage === 1 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
            <div
                className="absolute top-0 left-0 h-1 bg-yellow-400 transition-all duration-800 ease-in-out"
                style={{ width: stage === 0 ? "100%" : "100%" }}
            />
            <img
                src={logo}
                alt="Amrita Idea Club"
                className="w-32 h-auto animate-splash-logo"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
}
