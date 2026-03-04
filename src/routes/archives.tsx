import { createFileRoute } from '@tanstack/react-router'
import ParticleBackground from '@/components/ui/particle-background'
import Navbar from '@/components/navbar'

export const Route = createFileRoute('/archives')({
  component: ArchivesRoute,
})

function ArchivesRoute() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center overflow-hidden">
      {/* Navbar for navigation back to home */}
      <Navbar />

      {/* Interactive particle background for the "cursor interaction animations" requirement */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* "Coming Soon" Animated Text */}
        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] mb-8 animate-fade-in-up">
          Coming Soon
        </h1>

        {/* CTA Section */}
        <div
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 md:p-12 max-w-2xl w-full flex flex-col items-center animate-fade-in-up delay-200"
          style={{ animationFillMode: "both" }}
        >
          <p className="text-xl md:text-2xl text-zinc-300 font-medium mb-8 text-balance">
            While you wait for our archives, register for the <span className="text-yellow-400 font-bold">AI in Academia IDEATHON</span>!
          </p>

          <a
            href="https://forms.office.com/r/nMMTPg4Rua"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-yellow-400 text-black font-bold text-xl rounded-2xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-[0_0_40px_rgba(250,204,21,0.3)] outline-none focus-visible:ring-4 ring-yellow-400/50 block"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  )
}
