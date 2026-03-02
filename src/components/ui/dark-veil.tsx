import { useEffect, useRef } from "react";

interface DarkVeilProps {
	hueShift?: number;
	noiseIntensity?: number;
	scanlineIntensity?: number;
	speed?: number;
	warpAmount?: number;
	resolutionScale?: number;
}

export default function DarkVeil({
	hueShift = 0,
	noiseIntensity = 0.05,
	speed = 1,
	warpAmount = 1,
}: DarkVeilProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animFrameId: number;
		let t = 0;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener("resize", resize);

		const draw = () => {
			t += 0.005 * speed;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const blobs = [
				{
					x: 0.3 + Math.sin(t * 0.7) * 0.15 * warpAmount,
					y: 0.3 + Math.cos(t * 0.5) * 0.1,
					r: 0.4,
					h: (210 + hueShift) % 360,
				},
				{
					x: 0.7 + Math.cos(t * 0.6) * 0.1 * warpAmount,
					y: 0.5 + Math.sin(t * 0.8) * 0.15,
					r: 0.35,
					h: (270 + hueShift) % 360,
				},
				{
					x: 0.5 + Math.sin(t * 0.4) * 0.2 * warpAmount,
					y: 0.7 + Math.cos(t * 0.6) * 0.1,
					r: 0.3,
					h: (240 + hueShift) % 360,
				},
			];

			for (const blob of blobs) {
				const cx = blob.x * canvas.width;
				const cy = blob.y * canvas.height;
				const radius = blob.r * canvas.width;
				const alpha = 0.12 + noiseIntensity;
				const color0 = `hsla(${blob.h}, 80%, 30%, ${alpha})`;
				const color1 = "hsla(0,0%,0%,0)";
				const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
				grd.addColorStop(0, color0);
				grd.addColorStop(1, color1);
				ctx.fillStyle = grd;
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}

			animFrameId = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			cancelAnimationFrame(animFrameId);
			window.removeEventListener("resize", resize);
		};
	}, [hueShift, noiseIntensity, speed, warpAmount]);

	return (
		<canvas
			ref={canvasRef}
			style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
		/>
	);
}
