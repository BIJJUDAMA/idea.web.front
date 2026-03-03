import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/hero";
import MarqueeSection from "@/components/marquee-section";
import GuidelinesSection from "@/components/guidelines-section";
import ScheduleSection from "@/components/schedule-section";
import EvaluationSection from "@/components/evaluation-section";
import RegistrationSection from "@/components/registration-section";

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
