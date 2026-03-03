import React from "react";

const MARQUEE_SPONSORS = [
	"Professors",
	"Department Heads",
	"Wardens",
	"Students",
	"Administrative Staff",
] as const;

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

export default MarqueeSection;
