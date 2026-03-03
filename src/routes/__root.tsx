import React, { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import CustomCursor from "@/components/custom-cursor";
import SplashScreen from "@/components/splash-screen";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ParticleBackground from "@/components/ui/particle-background";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError)
            return (
                <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-zinc-900 to-black" />
            );
        return this.props.children;
    }
}

function NotFoundComponent() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-[clamp(6rem,15vw,12rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 leading-none">
                404
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mt-4 mb-8 max-w-md">
                This page doesn't exist. Let's get you back on track.
            </p>
            <Link
                to="/"
                className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 hover:scale-105 transition-all"
            >
                Go Home
            </Link>
        </div>
    );
}

function RootLayout() {
    const [splashed, setSplashed] = useState(false);

    return (
        <>
            <CustomCursor />
            {!splashed && <SplashScreen onComplete={() => setSplashed(true)} />}

            <div
                className={`relative min-h-screen flex flex-col selection:bg-yellow-400/30 selection:text-white transition-opacity duration-300 ${splashed ? "opacity-100" : "opacity-0"}`}
            >
                <ErrorBoundary>
                    <ParticleBackground
                        connectionDistance={110}
                        mouseInfluenceRadius={150}
                        depth={500}
                    />
                </ErrorBoundary>

                <Navbar />

                <main className="flex-1 w-full flex flex-col">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>
    );
}

export const Route = createRootRoute({
    component: RootLayout,
    notFoundComponent: NotFoundComponent,
});
