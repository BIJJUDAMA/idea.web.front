import { createFileRoute } from "@tanstack/react-router";
import EvaluationSection from "@/components/evaluation-section";
import GuidelinesSection from "@/components/guidelines-section";
import Hero from "@/components/hero";
import MarqueeSection from "@/components/marquee-section";
import RegistrationSection from "@/components/registration-section";
import ScheduleSection from "@/components/schedule-section";

export const Route = createFileRoute("/")({
	component: Home,
});

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
