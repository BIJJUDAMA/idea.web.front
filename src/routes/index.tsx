import { createFileRoute } from "@tanstack/react-router";
import CountdownTimer from "@/components/countdown-timer";
import EvaluationSection from "@/components/evaluation-section";
import GuidelinesSection from "@/components/guidelines-section";
import Hero from "@/components/hero";
import MarqueeSection from "@/components/marquee-section";
import RegistrationSection from "@/components/registration-section";
import ScheduleSection from "@/components/schedule-section";

export const Route = createFileRoute("/")({
	component: Home,
});

// March 8, 2026 at 5:00 PM IST (UTC+5:30)
const REGISTRATION_DEADLINE = new Date("2026-03-08T17:00:00+05:30");

function Home() {
	return (
		<>
			<Hero />
			<CountdownTimer targetDate={REGISTRATION_DEADLINE} />
			<MarqueeSection />
			<GuidelinesSection />
			<ScheduleSection />
			<EvaluationSection />
			<RegistrationSection />
		</>
	);
}
