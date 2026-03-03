import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icons } from "./icons";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const routerState = useRouterState();

	useEffect(() => {
		const cb = () => setScrolled(window.scrollY > 80);
		window.addEventListener("scroll", cb);
		return () => window.removeEventListener("scroll", cb);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run when the route changes
	useEffect(() => setMobileMenuOpen(false), [routerState.location.pathname]);

	const links = [
		{ name: "Home", path: "/" },
		{ name: "Archives", path: "/archives" },
	];

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl shadow-lg border-b border-white/5 py-3" : "bg-transparent py-6"}`}
		>
			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3">
					<span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 cursor-pointer">
						IDEA
					</span>
				</Link>

				<div className="hidden md:flex space-x-8 items-center bg-zinc-900/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
					{links.map((link) => (
						<Link
							key={link.name}
							to={link.path}
							className="text-sm font-medium text-zinc-400 hover:text-white hover:![text-shadow:0_0_12px_rgba(255,255,255,0.6),0_0_5px_rgba(255,255,255,0.4)] transition-all duration-300"
						>
							{link.name}
						</Link>
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
						<Link
							key={l.name}
							to={l.path}
							className="text-zinc-300 font-medium text-lg hover:text-white hover:![text-shadow:0_0_12px_rgba(255,255,255,0.6),0_0_5px_rgba(255,255,255,0.4)] transition-all duration-300"
						>
							{l.name}
						</Link>
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
