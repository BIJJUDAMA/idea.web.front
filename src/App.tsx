import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";

import logo from "./assets/main-logo-banner.jpg.jpeg";
import ParticleBackground from "./components/ui/particle-background";

const MARQUEE_SPONSORS = [
	"Professors",
	"Department Heads",
	"Wardens",
	"Students",
	"Administrative Staff",
] as const;

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

const EVALUATION_ITEMS = [
	{
		quote:
			"Greater weightage will be given to depth of problem analysis and stakeholder validation over technical complexity.",
		name: "Key Focus",
		role: "Primary Criteria",
	},
	{
		quote:
			"Ideas must be highly relevant to AI in Academia and demonstrate clear innovation and originality.",
		name: "Theme & Innovation",
		role: "Core Aspect",
	},
	{
		quote:
			"Solutions must show practical feasibility and clear application of AI concepts.",
		name: "Feasibility & Tech",
		role: "Implementation",
	},
	{
		quote:
			"The clarity of your presentation and how well you explain the problem and solution is critical to the judges.",
		name: "Presentation",
		role: "Delivery",
	},
] as const;

// --- HOOKS & UTILS ---

function useTilt(maxTilt = 12) {
	const ref = useRef<HTMLDivElement>(null);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!ref.current) return;
			const rect = ref.current.getBoundingClientRect();
			const width = rect.width;
			const height = rect.height;
			const mouseX = e.clientX - rect.left;
			const mouseY = e.clientY - rect.top;

			const xPct = mouseX / width - 0.5;
			const yPct = mouseY / height - 0.5;

			setTilt({ x: -(yPct * maxTilt), y: xPct * maxTilt });
			setGlare({
				x: (mouseX / width) * 100,
				y: (mouseY / height) * 100,
				opacity: 1,
			});
		},
		[maxTilt],
	);

	const handleMouseLeave = useCallback(() => {
		setTilt({ x: 0, y: 0 });
		setGlare((prev) => ({ ...prev, opacity: 0 }));
	}, []);

	return { ref, tilt, glare, handleMouseMove, handleMouseLeave };
}

function useIntersectionObserver(options = {}) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setIsIntersecting(true);
			},
			{ threshold: 0.1, ...options },
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [options]);

	return { ref, isIntersecting };
}

// --- ICONS ---
const Icons = {
	Menu: () => (
		<svg
			aria-hidden="true"
			focusable="false"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M4 12h16M4 6h16M4 18h16" />
		</svg>
	),
	X: () => (
		<svg
			aria-hidden="true"
			focusable="false"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	),
	Play: () => (
		<svg
			aria-hidden="true"
			focusable="false"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M5 3l14 9-14 9V3z" />
		</svg>
	),
	Check: () => (
		<svg
			aria-hidden="true"
			focusable="false"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			strokeLinecap="round"
		>
			<path d="M20 6L9 17l-5-5" />
		</svg>
	),
	Insta: () => (
		<svg
			aria-hidden="true"
			focusable="false"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<rect x="2" y="2" width="20" height="20" rx="5" />
			<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
			<path d="M17.5 6.5h.01" />
		</svg>
	),
	LinkedIn: () => (
		<svg
			aria-hidden="true"
			focusable="false"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
			<circle cx="4" cy="4" r="2" />
		</svg>
	),
	Github: () => (
		<svg
			aria-hidden="true"
			focusable="false"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
		</svg>
	),
	Twitter: () => (
		<svg
			aria-hidden="true"
			focusable="false"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
		</svg>
	),
} as const;

// --- COMPONENTS ---

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
		// Hide on touch devices
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

		// rAF loop — dot snaps instantly, outline lerps
		const LERP = 0.18;
		const loop = () => {
			const dot = dotRef.current;
			const outline = outlineRef.current;

			if (dot) {
				// Dot: snaps to cursor immediately
				dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
			}

			if (outline) {
				// Outline: spring lerp
				outlinePos.current.x += (pos.current.x - outlinePos.current.x) * LERP;
				outlinePos.current.y += (pos.current.y - outlinePos.current.y) * LERP;

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

function SplashScreen({ onComplete }: { onComplete: () => void }) {
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

function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const cb = () => setScrolled(window.scrollY > 80);
		window.addEventListener("scroll", cb);
		return () => window.removeEventListener("scroll", cb);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run when the route changes
	useEffect(() => setMobileMenuOpen(false), [location.pathname]);

	const links = [
		{ name: "Home", path: "/" },
		{ name: "Archives", path: "/archives" },
	];

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl shadow-lg border-b border-white/5 py-3" : "bg-transparent py-6"}`}
		>
			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
				<NavLink to="/" className="flex items-center gap-3">
					<img
						src={logo}
						alt="Logo"
						className="h-8 w-auto object-contain cursor-pointer"
						loading="lazy"
						decoding="async"
					/>
				</NavLink>

				<div className="hidden md:flex space-x-8 items-center bg-zinc-900/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
					{links.map((link) => (
						<a
							key={link.name}
							href={link.path}
							className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
						>
							{link.name}
						</a>
					))}
				</div>

				<div className="hidden md:flex">
					<a
						href="#register"
						className="bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-yellow-300 transition-colors"
					>
						Register Team
					</a>
				</div>

				<button
					type="button"
					className="md:hidden text-white"
					aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					aria-expanded={mobileMenuOpen}
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
				</button>
			</div>

			<div
				className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-[400px]" : "max-h-0"}`}
			>
				<div className="flex flex-col px-6 py-6 space-y-4">
					{links.map((l) => (
						<a
							key={l.name}
							href={l.path}
							className="text-zinc-300 font-medium text-lg hover:text-yellow-400"
						>
							{l.name}
						</a>
					))}
					<a
						href="#register"
						className="text-yellow-400 font-medium text-lg pt-2 border-t border-zinc-800"
					>
						Register Team →
					</a>
				</div>
			</div>
		</nav>
	);
}

const Hero = React.memo(function Hero() {
	const [toastVisible, setToastVisible] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setToastVisible(true), 2000);
		const t2 = setTimeout(() => setToastVisible(false), 8000);
		return () => {
			clearTimeout(t);
			clearTimeout(t2);
		};
	}, []);

	return (
		<section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
			<div className="max-w-5xl mx-auto w-full flex flex-col items-center">
				<div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/5 text-yellow-400 text-xs font-bold tracking-widest uppercase">
					<span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
					Ideathon Event 2026 · Amrita Vishwa Vidyapeetham
				</div>

				<h1 className="font-black leading-[0.9] tracking-tighter flex flex-col items-center justify-center whitespace-nowrap mb-8 text-center uppercase">
					<span className="text-[clamp(1.5rem,4vw,3.5rem)] text-zinc-300 font-extrabold mb-2 tracking-widest block">
						AI in Academia
					</span>
					<span className="text-[clamp(4rem,12vw,13rem)] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 drop-shadow-[0_0_40px_rgba(250,204,21,0.2)] pb-4">
						IDEATHON
					</span>
				</h1>

				<p className="mt-4 text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-medium animate-fade-in-up delay-200">
					An innovation-focused event fostering critical thinking and
					problem-solving through structured stakeholder requirement analysis.
				</p>

				<div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in-up delay-300">
					<a
						href="#register"
						className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 hover:scale-105 transition-all outline-none focus-visible:ring-4 ring-yellow-400/50 block"
					>
						Register Now
					</a>
					<a
						href="#guidelines"
						className="px-8 py-4 bg-transparent border border-zinc-700 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all block"
					>
						View Guidelines
					</a>
				</div>

				<div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-zinc-800/60 pt-8 animate-fade-in-up delay-400">
					<div className="flex flex-col items-center">
						<span className="text-3xl font-black text-white">2-3</span>
						<span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
							Team Members
						</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="text-3xl font-black text-white">March 8</span>
						<span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
							Registration Deadline
						</span>
					</div>
					<div className="flex flex-col items-center">
						<span className="text-3xl font-black text-white">March 11</span>
						<span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
							Event Day
						</span>
					</div>
				</div>
			</div>

			{/* Floating Notifications */}
			<div
				className={`fixed bottom-6 left-6 flex flex-col gap-3 z-40 transition-all duration-500 ${toastVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"}`}
			>
				<div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-2xl flex items-center gap-3 w-72">
					<div className="text-2xl">📹</div>
					<div className="text-sm">
						<span className="font-bold text-white">Reminder</span>: 1-2 minute
						video proof required.
					</div>
				</div>
				<div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-2xl flex items-center gap-3 w-72 translate-x-4 delay-100 transition-transform">
					<div className="text-2xl">🎯</div>
					<div className="text-sm">
						<span className="font-bold text-white">Focus on</span> stakeholder
						analysis!
					</div>
				</div>
			</div>
		</section>
	);
});

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
				(ref as any).current = el;
				(inViewRef as any).current = el;
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

const MarqueeSection = React.memo(function MarqueeSection() {
	return (
		<div className="w-full py-16 border-y border-zinc-900 bg-black/50 backdrop-blur-sm overflow-hidden flex flex-col items-center mask-edges">
			<p className="text-xs uppercase tracking-widest text-zinc-600 mb-8 font-bold">
				Engage and validate with stakeholders
			</p>
			<div className="flex w-full overflow-hidden">
				<div className="flex shrink-0 min-w-full justify-around items-center gap-16 animate-marquee-slow">
					{MARQUEE_SPONSORS.map((s, i) => (
						<span
							key={i}
							className="text-2xl md:text-3xl font-black text-zinc-600 opacity-60 tracking-tighter"
						>
							{s}
						</span>
					))}
				</div>
				<div
					className="flex shrink-0 min-w-full justify-around items-center gap-16 animate-marquee-slow"
					aria-hidden="true"
				>
					{MARQUEE_SPONSORS.map((s, i) => (
						<span
							key={i}
							className="text-2xl md:text-3xl font-black text-zinc-600 opacity-60 tracking-tighter"
						>
							{s}
						</span>
					))}
				</div>
			</div>
		</div>
	);
});

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

const EvaluationSection = React.memo(function EvaluationSection() {
	const [act, setAct] = useState(0);

	useEffect(() => {
		const int = setInterval(
			() => setAct((p) => (p + 1) % EVALUATION_ITEMS.length),
			5000,
		);
		return () => clearInterval(int);
	}, []);

	return (
		<section
			id="evaluation"
			className="py-24 px-6 max-w-4xl mx-auto w-full text-center"
		>
			<h2 className="text-2xl text-zinc-500 font-medium mb-12">
				Evaluation Criteria
			</h2>
			<div className="relative h-48 flex items-center justify-center overflow-hidden">
				{EVALUATION_ITEMS.map((item, i) => (
					<div
						key={i}
						className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${i === act ? "opacity-100 z-10" : "opacity-0 z-0"}`}
					>
						<p className="text-xl md:text-3xl font-medium text-white mb-6 leading-tight max-w-3xl">
							"{item.quote}"
						</p>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center font-bold text-white">
								{item.name[0]}
							</div>
							<div className="text-left">
								<div className="font-bold text-white text-sm">{item.name}</div>
								<div className="text-xs text-zinc-500">{item.role}</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-center gap-2 mt-8">
				{EVALUATION_ITEMS.map((_, i) => (
					<button
						type="button"
						key={i}
						aria-label={`Show evaluation criterion ${i + 1}`}
						onClick={() => setAct(i)}
						className={`w-2 h-2 rounded-full transition-all ${i === act ? "bg-yellow-400 w-6" : "bg-zinc-700"}`}
					/>
				))}
			</div>
		</section>
	);
});

const RegistrationSection = React.memo(function RegistrationSection() {
	return (
		<section
			id="register"
			className="relative w-full py-32 overflow-hidden border-t border-zinc-900 bg-black items-center justify-center flex flex-col"
		>
			<div className="aurora-bg">
				<div className="aurora-blob w-[60vw] h-[60vw] bg-pink-500/30 left-[-10%] top-[-10%]" />
				<div
					className="aurora-blob w-[50vw] h-[50vw] bg-indigo-500/30 right-[-10%] bottom-[-10%]"
					style={{ animationDelay: "-5s" }}
				/>
			</div>

			<div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
				<h2 className="text-4xl md:text-6xl font-black text-white mb-4">
					Ready to innovate?
				</h2>
				<p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
					Complete the registration form with your team details and 1-2 minute
					video proof before <strong>March 8, 2026, 5:00 PM</strong>.
				</p>

				<a
					href="/#register"
					className="inline-block px-10 py-5 bg-yellow-400 text-black font-bold text-xl rounded-2xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-[0_0_40px_rgba(250,204,21,0.3)]"
				>
					Register Your Team
				</a>
			</div>
		</section>
	);
});

const Footer = React.memo(function Footer() {
	const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<footer className="w-full relative z-10 bg-black pt-20 pb-10 border-t border-zinc-900">
			<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500 opacity-50" />

			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					<div className="flex flex-col space-y-4">
						<img
							src={logo}
							alt="Idea Club"
							className="h-10 w-auto object-contain self-start"
							loading="lazy"
							decoding="async"
						/>
						<p className="text-zinc-500 text-sm leading-relaxed">
							Cultivating the spirit of entrepreneurship and innovation at
							Amrita Vishwa Vidyapeetham.
						</p>
					</div>

					<div className="flex flex-col space-y-3">
						<h4 className="text-white font-bold mb-2">Navigation</h4>
						<a
							href="/#guidelines"
							className="text-sm text-zinc-400 hover:text-white transition-colors w-fit"
						>
							Guidelines
						</a>
						<a
							href="/#schedule"
							className="text-sm text-zinc-400 hover:text-white transition-colors w-fit"
						>
							Schedule
						</a>
						<a
							href="/#evaluation"
							className="text-sm text-zinc-400 hover:text-white transition-colors w-fit"
						>
							Evaluation
						</a>
					</div>

					<div className="flex flex-col space-y-3">
						<h4 className="text-white font-bold mb-2">Legal</h4>
						<a
							href="/#code-of-conduct"
							className="text-sm text-zinc-400 hover:text-white transition-colors w-fit"
						>
							Code of Conduct
						</a>
						<a
							href="/#privacy-policy"
							className="text-sm text-zinc-400 hover:text-white transition-colors w-fit"
						>
							Privacy Policy
						</a>
					</div>

					<div className="flex flex-col space-y-4">
						<h4 className="text-white font-bold mb-2">Connect</h4>
						<div className="flex space-x-3">
							<a
								href="https://instagram.com/"
								aria-label="Instagram"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all"
							>
								<Icons.Insta />
							</a>
							<a
								href="https://www.linkedin.com/"
								aria-label="LinkedIn"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all"
							>
								<Icons.LinkedIn />
							</a>
							<a
								href="https://github.com/"
								aria-label="GitHub"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all"
							>
								<Icons.Github />
							</a>
							<a
								href="https://x.com/"
								aria-label="X (Twitter)"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-all"
							>
								<Icons.Twitter />
							</a>
						</div>
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-900 text-sm text-zinc-600">
					<p>Built with ❤️ at Amrita. © {new Date().getFullYear()}</p>
					<button
						type="button"
						onClick={toTop}
						className="mt-4 md:mt-0 px-4 py-2 border border-zinc-800 rounded-full hover:bg-zinc-900 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
					>
						Back to top
					</button>
				</div>
			</div>
		</footer>
	);
});

// --- MAIN LAYOUT & ROUTES ---
function Home() {
	return (
		<>
			<Hero />
			<MarqueeSection />
			<GuidelinesSection />
			<ScheduleSection />
			<EvaluationSection />
			<RegistrationSection />
		</>
	);
}

class ErrorBoundary extends React.Component<
	{ children: React.ReactNode },
	{ hasError: boolean }
> {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	render() {
		if (this.state.hasError)
			return (
				<div className="fixed inset-0 -z-10 bg-gradient-to-tr from-zinc-900 to-black" />
			);
		return this.props.children;
	}
}

export default function App() {
	const [splashed, setSplashed] = useState(false);
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location);
	const [transitionStage, setTransistionStage] = useState("fadeIn");

	// Page Transition logic
	useEffect(() => {
		if (location !== displayLocation) {
			setTransistionStage("fadeOut");
			const t = setTimeout(() => {
				setDisplayLocation(location);
				setTransistionStage("fadeIn");
				window.scrollTo(0, 0);
			}, 150);
			return () => clearTimeout(t);
		}
	}, [location, displayLocation]);

	return (
		<>
			<CustomCursor />
			{!splashed && <SplashScreen onComplete={() => setSplashed(true)} />}

			<div
				className={`relative min-h-screen flex flex-col selection:bg-yellow-400/30 selection:text-white transition-opacity duration-300 ${splashed ? "opacity-100" : "opacity-0"}`}
			>
				<ErrorBoundary>
					<ParticleBackground
						connectionDistance={110}
						mouseInfluenceRadius={150}
						depth={500}
					/>
				</ErrorBoundary>

				<Navbar />

				<main
					className={`flex-1 w-full flex flex-col transition-opacity duration-150 ${transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"}`}
				>
					<Routes location={displayLocation}>
						<Route path="/" element={<Home />} />
					</Routes>
				</main>

				<Footer />
			</div>
		</>
	);
}
