import React from "react";

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

export default RegistrationSection;
