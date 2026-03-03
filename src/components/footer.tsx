import React from "react";
import { Icons } from "./icons";

const Footer = React.memo(function Footer() {
	const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<footer className="w-full relative z-10 bg-black pt-20 pb-10 border-t border-zinc-900">
			<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-pink-500 via-yellow-400 to-indigo-500 opacity-50" />

			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					<div className="flex flex-col space-y-4">
						<span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
							IDEA
						</span>
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

export default Footer;
