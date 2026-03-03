import React, { useEffect, useState } from "react";

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

export default Hero;
