import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logoImg from "@/assets/idea_logo.png";
import amritaLogoImg from "@/assets/amrita-logo.webp";

// ─── Ambient Glow Background ──────────────────────────────────────────────────

const AmbientGlow: React.FC = () => {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{/* Large soft blue-purple orb */}
			<motion.div
				className="absolute rounded-full mix-blend-screen"
				style={{
					width: "clamp(400px, 80vw, 800px)",
					height: "clamp(400px, 80vw, 800px)",
					background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
					filter: "blur(80px)",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.08, 0.15, 0.08],
					x: ["clamp(-100px, -10vw, -40px)", "clamp(-50px, 5vw, 50px)", "clamp(-100px, -10vw, -40px)"],
					y: ["clamp(-50px, -5vw, -20px)", "clamp(50px, 10vw, 80px)", "clamp(-50px, -5vw, -20px)"],
				}}
				transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Large soft pink orb */}
			<motion.div
				className="absolute rounded-full mix-blend-screen"
				style={{
					width: "clamp(350px, 70vw, 700px)",
					height: "clamp(350px, 70vw, 700px)",
					background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
					filter: "blur(80px)",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
				animate={{
					scale: [1.1, 0.9, 1.1],
					opacity: [0.1, 0.2, 0.1],
					x: ["clamp(50px, 10vw, 80px)", "clamp(-50px, -5vw, -50px)", "clamp(50px, 10vw, 80px)"],
					y: ["clamp(25px, 5vw, 80px)", "clamp(-80px, -10vw, -50px)", "clamp(25px, 5vw, 80px)"],
				}}
				transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
			/>
		</div>
	);
};

// ─── Splash Screen ────────────────────────────────────────────────────────────

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
	const [isVisible, setIsVisible] = useState(true);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const t0 = setTimeout(() => setShowContent(true), 200);
		const t1 = setTimeout(() => setIsVisible(false), 2400);
		const t2 = setTimeout(() => onComplete(), 3200);
		return () => {
			clearTimeout(t0);
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [onComplete]);

	return (
		<motion.div
			className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
			animate={{ opacity: isVisible ? 1 : 0 }}
			transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
		>
			{/* Soft ethereal glowing background */}
			<AmbientGlow />

			{/* Minimal dotted texture overlay for premium depth */}
			<div
				className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
				style={{
					backgroundImage:
						"radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
					backgroundSize: "clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px)",
				}}
			/>

			{/* Center content container */}
			<AnimatePresence>
				{showContent && (
					<motion.div
						key="content"
						className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 sm:px-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
					>
						{/* ── Seamless Logo Implementation ── 
                            Gradient orb is now properly centered behind the logo with
                            responsive sizing to work across all screen sizes.
                        */}
						<motion.div
							className="relative flex items-center justify-center w-full max-w-xs sm:max-w-sm"
							initial={{ scale: 0.85, opacity: 0, filter: "blur(20px)" }}
							animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
							transition={{
								duration: 1.2,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							{/* Gradient orb — properly centered and responsive */}
							<motion.div
								className="absolute rounded-full pointer-events-none"
								style={{
									width: "clamp(240px, 60vw, 380px)",
									height: "clamp(240px, 60vw, 380px)",
									background:
										"radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.25) 0%, rgba(59, 130, 246, 0.16) 45%, transparent 75%)",
									filter: "blur(40px)",
									top: "50%",
									left: "50%",
								}}
								initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
								animate={{ opacity: [0, 1, 0.9, 1], scale: [0.8, 1.05, 1], x: "-50%", y: "-50%" }}
								transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
							/>

							{/* Logos container */}
							<div className="relative flex items-center justify-center gap-6 sm:gap-8 md:gap-10 z-10 w-full">
								<img
									src={amritaLogoImg}
									alt="Amrita Logo"
									className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-contain"
									style={{
										filter: "drop-shadow(0px 8px 32px rgba(59,130,246,0.15))",
									}}
								/>

								<span className="text-zinc-500 font-light text-2xl sm:text-3xl md:text-4xl">
									×
								</span>

								<img
									src={logoImg}
									alt="IDEA Club Logo"
									className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 object-contain"
									style={{
										filter: "drop-shadow(0px 8px 32px rgba(236,72,153,0.15))",
									}}
								/>
							</div>
						</motion.div>

						{/* ── Tagline & Minimal Progress ── */}
						<motion.div
							className="flex flex-col items-center w-full mt-6 sm:mt-8 px-4"
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
						>
							{/* Premium wide-tracked tagline text */}
							<span className="text-zinc-400 text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-medium mb-4 sm:mb-6">
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
									Igniting Innovation
								</span>
							</span>

							{/* Ultra-sleek, minimalist progress bar directly under the tagline */}
							<div className="w-40 sm:w-48 h-[1px] bg-zinc-800/50 overflow-hidden rounded-full">
								<motion.div
									className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
									initial={{ width: "0%" }}
									animate={{ width: "100%" }}
									transition={{ duration: 2.2, ease: "circInOut" }}
								/>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}