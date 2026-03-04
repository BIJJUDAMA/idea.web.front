import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import avishkarLogo from "../assets/avishkarlogo_withoutbg.png";
import { Icons } from "./icons";

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const routerState = useRouterState();

	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally re-run when the route changes
	useEffect(() => setMobileMenuOpen(false), [routerState.location.pathname]);

	const links = [
		{ name: "Home", path: "/" },
		{ name: "Archives", path: "/archives" },
	];

	return (
		<nav className="absolute top-0 w-full z-50 bg-transparent py-6">
			<div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3">
					<img
						src={avishkarLogo}
						alt="Avishkar Logo"
						className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.2)]"
					/>
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

				</div>
			</div>
		</nav>
	);
}
