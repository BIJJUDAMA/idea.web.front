import React, { useEffect, useState } from "react";

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

export default EvaluationSection;
