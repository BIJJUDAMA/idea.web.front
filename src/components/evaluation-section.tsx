import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const CRITERIA = [
	{
		id: "theme",
		icon: (
			<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
				<path d="M12 2L2 7l10 5 10-5-10-5z" />
				<path d="M2 17l10 5 10-5" />
				<path d="M2 12l10 5 10-5" />
			</svg>
		),
		title: "Theme & Innovation",
		description: "Ideas must be highly relevant to AI in Academia and demonstrate clear innovation and originality beyond existing solutions.",
		delay: 0,
	},
	{
		id: "tech",
		icon: (
			<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
				<rect x="2" y="3" width="20" height="14" rx="2" />
				<path d="M8 21h8M12 17v4" />
				<path d="M7 8l3 3-3 3M13 14h4" />
			</svg>
		),
		title: "Technical Depth",
		description: "Greater weightage given to depth of problem analysis and stakeholder validation over surface-level technical complexity.",
		delay: 0.15,
	},
	{
		id: "impact",
		icon: (
			<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
				<circle cx="12" cy="12" r="10" />
				<path d="M12 8v4l3 3" />
				<path d="M3.05 11a9 9 0 0 1 17.9 0" />
			</svg>
		),
		title: "Impact & Feasibility",
		description: "Solutions must show practical feasibility, clear real-world application, and measurable potential to improve academia.",
		delay: 0.3,
	},
	{
		id: "presentation",
		icon: (
			<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
				<path d="M2 3h20v14H2zM8 21h8M12 17v4" />
				<path d="M7 8h10M7 11h6" />
			</svg>
		),
		title: "Presentation & Clarity",
		description: "How well you communicate the problem, solution, and impact to judges is critical. Clarity is an advantage.",
		delay: 0.45,
	},
] as const;



// ─── Tilt Card ────────────────────────────────────────────────────────────────

const TiltCard: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
	const ref = useRef<HTMLDivElement>(null);
	const rawX = useMotionValue(0);
	const rawY = useMotionValue(0);
	const x = useSpring(rawX, { stiffness: 150, damping: 20 });
	const y = useSpring(rawY, { stiffness: 150, damping: 20 });
	const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
	const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

	const handleMouseMove = (e: React.MouseEvent) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		rawX.set((e.clientX - rect.left) / rect.width - 0.5);
		rawY.set((e.clientY - rect.top) / rect.height - 0.5);
	};
	const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

	return (
		<motion.div
			ref={ref}
			style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			initial={{ opacity: 0, y: 36 }}
			whileInView={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.03 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
};

// ─── Criterion Card ───────────────────────────────────────────────────────────

const CriterionCard: React.FC<(typeof CRITERIA)[number]> = ({ icon, title, description, delay }) => {
	const [hovered, setHovered] = React.useState(false);

	return (
		<TiltCard delay={delay}>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: decorative hover state only */}
			<div
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className="relative h-full rounded-2xl p-6 sm:p-7 cursor-default select-none overflow-hidden transition-all duration-500"
				style={{
					background: hovered ? "rgba(10, 12, 22, 0.85)" : "rgba(38, 38, 42, 0.75)",
					backdropFilter: "blur(14px)",
					WebkitBackdropFilter: "blur(14px)",
					border: hovered ? "1px solid rgba(250,204,21,0.35)" : "1px solid rgba(90, 90, 100, 0.35)",
					boxShadow: hovered
						? "0 0 40px rgba(250,204,21,0.1), 0 8px 32px rgba(0,0,0,0.4)"
						: "0 4px 24px rgba(0,0,0,0.3)",
				}}
			>
				{/* Gradient glow on hover */}
				<motion.div
					className="absolute inset-0 rounded-2xl pointer-events-none"
					animate={{ opacity: hovered ? 1 : 0 }}
					transition={{ duration: 0.4 }}
					style={{
						background: "linear-gradient(135deg, rgba(250,204,21,0.07) 0%, rgba(236,72,153,0.07) 50%, rgba(99,102,241,0.07) 100%)",
					}}
				/>

				{/* Icon */}
				<div
					className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-400"
					style={{
						background: hovered ? "rgba(250,204,21,0.15)" : "rgba(250,204,21,0.08)",
						color: "#FACC15",
					}}
				>
					{icon}
				</div>

				{/* Title */}
				<h3 className="text-white font-semibold text-lg mb-3 tracking-tight">{title}</h3>

				{/* Gradient underline */}
				<div className="relative h-px mb-4 overflow-hidden rounded-full bg-white/5">
					<motion.div
						className="absolute inset-y-0 left-0 rounded-full"
						style={{ background: "linear-gradient(90deg, #FACC15, #EC4899, #6366F1)" }}
						animate={{ width: hovered ? "100%" : "32px" }}
						transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					/>
				</div>

				{/* Description */}
				<p className="text-zinc-400 text-sm leading-relaxed font-light">{description}</p>
			</div>
		</TiltCard>
	);
};

// ─── Main Section ─────────────────────────────────────────────────────────────

const EvaluationSection = React.memo(function EvaluationSection() {
	return (
		<section
			id="evaluation"
			className="relative w-full overflow-hidden py-24 sm:py-32"
		>

			<div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

				{/* Header */}
				<motion.div
					className="text-center mb-20 sm:mb-24"
					initial={{ opacity: 0, y: 24, filter: "blur(16px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					viewport={{ once: true }}
					transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
				>
					<div
						className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8"
						style={{ background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.2)" }}
					>
						<span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
						<span className="text-yellow-400 text-xs font-semibold tracking-[0.2em] uppercase">
							Evaluation Engine
						</span>
					</div>

					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-6">
						Evaluation{" "}
						<span className="font-semibold" style={{ color: "#FACC15" }}>Matrix</span>
					</h2>

					<p className="text-base sm:text-lg text-zinc-400 max-w-full sm:max-w-fit mx-auto leading-relaxed font-light">
						Ideas must align with <span className="text-yellow-400 font-medium">AI in Academia</span> and demonstrate <span className="text-yellow-400 font-medium">measurable innovation.</span>
					</p>

					<div className="flex items-center justify-center gap-4 mt-10">
						<div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1))" }} />
						<div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FACC15" }} />
						<div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.1))" }} />
					</div>
				</motion.div>

				{/* Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
					{CRITERIA.map((c) => (
						<CriterionCard key={c.id} {...c} />
					))}
				</div>

				{/* Footer note */}
				<motion.p
					className="text-center text-zinc-600 text-xs uppercase tracking-[0.2em] mt-14"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1, delay: 0.8 }}
				>
					Judging criteria are weighted equally · All decisions are final
				</motion.p>
			</div>
		</section>
	);
});

export default EvaluationSection;