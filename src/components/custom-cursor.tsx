import React, { useEffect, useRef, useState } from "react";

const CustomCursor = React.memo(function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -200, y: -200 });
    const outlinePos = useRef({ x: -200, y: -200 });
    const raf = useRef<number>(0);
    const isHover = useRef(false);
    const isClick = useRef(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);

            const target = e.target as HTMLElement;
            isHover.current = !!target.closest(
                "a, button, [role=button], input, textarea, select, label, .cursor-pointer",
            );
        };

        const onDown = () => {
            isClick.current = true;
        };
        const onUp = () => {
            isClick.current = false;
        };
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        document.documentElement.addEventListener("mouseleave", onLeave);
        document.documentElement.addEventListener("mouseenter", onEnter);

        const LERP = 0.18;
        const loop = () => {
            const dot = dotRef.current;
            const outline = outlineRef.current;

            if (dot) {
                dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
            }

            if (outline) {
                outlinePos.current.x +=
                    (pos.current.x - outlinePos.current.x) * LERP;
                outlinePos.current.y +=
                    (pos.current.y - outlinePos.current.y) * LERP;

                const hover = isHover.current;
                const click = isClick.current;

                const size = hover ? 36 : click ? 16 : 28;
                const offset = size / 2;
                const borderRadius = hover ? "4px" : "50%";
                const bg = hover ? "rgba(250,204,21,0.15)" : "transparent";
                const border = hover
                    ? "1.5px solid rgba(250,204,21,0.9)"
                    : "1.5px solid rgba(255,255,255,0.5)";
                const scale = click ? "scale(0.8)" : "scale(1)";

                outline.style.transform = `translate(${outlinePos.current.x}px, ${outlinePos.current.y}px) translate(-${offset}px, -${offset}px) ${scale}`;
                outline.style.width = `${size}px`;
                outline.style.height = `${size}px`;
                outline.style.borderRadius = borderRadius;
                outline.style.background = bg;
                outline.style.border = border;
            }

            raf.current = requestAnimationFrame(loop);
        };

        raf.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            document.documentElement.removeEventListener("mouseenter", onEnter);
            cancelAnimationFrame(raf.current);
        };
    }, [visible]);

    if (
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches
    )
        return null;

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none"
                style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#facc15",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.2s",
                    willChange: "transform",
                    boxShadow: "0 0 6px rgba(250,204,21,0.8)",
                }}
            />
            <div
                ref={outlineRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none"
                style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.5)",
                    background: "transparent",
                    opacity: visible ? 1 : 0,
                    transition:
                        "opacity 0.2s, width 0.15s ease, height 0.15s ease, border-radius 0.15s ease, background 0.15s ease, border 0.15s ease",
                    willChange: "transform, width, height",
                }}
            />
        </>
    );
});

export default CustomCursor;
