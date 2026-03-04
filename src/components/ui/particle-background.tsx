import { useEffect, useRef } from "react";

interface ParticleBgProps {
	particleCount?: number;
	connectionDistance?: number;
	mouseInfluenceRadius?: number;
	depth?: number;
}

export default function ParticleBackground({
	particleCount,
	connectionDistance,
	mouseInfluenceRadius = 150,
	depth = 500,
}: ParticleBgProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		// ── Device detection ──────────────────────────────────────────────────
		const isMobile = window.matchMedia("(pointer: coarse)").matches;

		let W = 0,
			H = 0,
			raf = 0;

		// Dynamically sized based on viewport
		let N = particleCount ?? (isMobile ? 180 : 700);
		let connDist = connectionDistance ?? (isMobile ? 70 : 110);

		const mouse = { x: 0, y: 0 };
		const cam = { rotX: 0, rotY: 0, targetX: 0, targetY: 0 };

		let px: Float32Array, py: Float32Array, pz: Float32Array;
		let vx: Float32Array, vy: Float32Array;
		let baseX: Float32Array, baseY: Float32Array, baseZ: Float32Array;
		let bright: Float32Array;
		let chars: string[];

		function init() {
			px = new Float32Array(N);
			py = new Float32Array(N);
			pz = new Float32Array(N);
			vx = new Float32Array(N);
			vy = new Float32Array(N);
			baseX = new Float32Array(N);
			baseY = new Float32Array(N);
			baseZ = new Float32Array(N);
			bright = new Float32Array(N);
			chars = [];
			for (let i = 0; i < N; i++) {
				const x = (Math.random() - 0.5) * W * 1.4;
				const y = (Math.random() - 0.5) * H * 1.4;
				const z = (Math.random() - 0.5) * depth;
				baseX[i] = px[i] = x;
				baseY[i] = py[i] = y;
				baseZ[i] = pz[i] = z;
				bright[i] = 0.3 + Math.random() * 0.4;
				chars.push(Math.random() > 0.5 ? "1" : "0");
			}
		}

		function resize() {
			if (!canvas) return;
			W = canvas.width = window.innerWidth;
			H = canvas.height = window.innerHeight;
			// Re-evaluate responsive values on resize (e.g. orientation change)
			const nowMobile = window.matchMedia("(pointer: coarse)").matches;
			N = particleCount ?? (nowMobile ? 180 : 700);
			connDist = connectionDistance ?? (nowMobile ? 70 : 110);
			init();
		}

		function project(x: number, y: number, z: number) {
			const cosY = Math.cos(cam.rotY),
				sinY = Math.sin(cam.rotY);
			const cosX = Math.cos(cam.rotX),
				sinX = Math.sin(cam.rotX);
			const x1 = x * cosY + z * sinY;
			const z1 = -x * sinY + z * cosY;
			const y1 = y * cosX - z1 * sinX;
			const z2 = y * sinX + z1 * cosX;
			const fov = 600;
			const scale = fov / (fov + z2 + depth * 0.5);
			return { sx: W / 2 + x1 * scale, sy: H / 2 + y1 * scale, scale };
		}

		function draw() {
			if (!ctx) return;
			ctx.clearRect(0, 0, W, H);
			cam.rotX += (cam.targetX - cam.rotX) * 0.04;
			cam.rotY += (cam.targetY - cam.rotY) * 0.04;

			const mwx = mouse.x - W / 2;
			const mwy = mouse.y - H / 2;
			const sxArr = new Float32Array(N);
			const syArr = new Float32Array(N);
			const ssArr = new Float32Array(N);

			for (let i = 0; i < N; i++) {
				px[i] += (baseX[i] - px[i]) * 0.03;
				py[i] += (baseY[i] - py[i]) * 0.03;
				const dx = px[i] - mwx;
				const dy = py[i] - mwy;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < mouseInfluenceRadius) {
					const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
					vx[i] += dx * force * 0.3;
					vy[i] += dy * force * 0.3;
				}
				px[i] += vx[i] * 0.08;
				py[i] += vy[i] * 0.08;
				vx[i] *= 0.82;
				vy[i] *= 0.82;
				const p = project(px[i], py[i], pz[i]);
				sxArr[i] = p.sx;
				syArr[i] = p.sy;
				ssArr[i] = p.scale;
			}

			// Draw connections
			ctx.lineWidth = 0.5;
			for (let i = 0; i < N; i++) {
				if (ssArr[i] < 0.4) continue; // aggressive culling

				for (let j = i + 1; j < N; j++) {
					if (ssArr[j] < 0.4) continue;

					// Spatial optimization: check X diff before full dist formula
					const ddx = sxArr[i] - sxArr[j];
					if (Math.abs(ddx) > connDist) continue;

					const ddy = syArr[i] - syArr[j];
					const d2 = ddx * ddx + ddy * ddy;
					const cd = connDist * ssArr[i];

					if (d2 < cd * cd) {
						const alpha = (1 - Math.sqrt(d2) / cd) * 0.08 * ssArr[i];

						ctx.beginPath();
						ctx.moveTo(sxArr[i], syArr[i]);
						ctx.lineTo(sxArr[j], syArr[j]);
						ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
						ctx.stroke();
					}
				}
			}

			// Draw '0'/'1' characters as particles
			// Font size scales with viewport width for mobile legibility
			const baseFontPx = Math.max(6, Math.round(W / 120));
			for (let i = 0; i < N; i++) {
				if (ssArr[i] < 0.2) continue;

				const dxM = sxArr[i] - mouse.x;
				const dyM = syArr[i] - mouse.y;
				const nearMouse =
					dxM * dxM + dyM * dyM < mouseInfluenceRadius * mouseInfluenceRadius;

				const alpha = bright[i] * ssArr[i] * (nearMouse ? 1 : 0.4);
				const fontSize = Math.max(6, Math.round(baseFontPx * ssArr[i]));
				ctx.font = `${fontSize}px monospace`;

				if (nearMouse) {
					ctx.fillStyle = `rgba(250,204,21,${Math.min(0.85, alpha).toFixed(3)})`;
				} else {
					ctx.fillStyle = `rgba(255,255,255,${Math.min(0.35, alpha).toFixed(3)})`;
				}
				ctx.fillText(chars[i], sxArr[i], syArr[i]);
			}

			raf = requestAnimationFrame(draw);
		}

		const onMouseMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			// Camera tilt only on pointer devices (not touch)
			if (!isMobile) {
				cam.targetY = (e.clientX / W - 0.5) * 2 * 0.12;
				cam.targetX = (e.clientY / H - 0.5) * 2 * -0.1;
			}
		};

		// Touch support — maps first touch point to mouse position
		const onTouchMove = (e: TouchEvent) => {
			const touch = e.touches[0];
			if (!touch) return;
			mouse.x = touch.clientX;
			mouse.y = touch.clientY;
		};
		const onTouchEnd = () => {
			// Fade mouse position off-screen so particles relax back
			mouse.x = -9999;
			mouse.y = -9999;
		};

		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("touchmove", onTouchMove, { passive: true });
		window.addEventListener("touchend", onTouchEnd, { passive: true });
		raf = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", onTouchEnd);
		};
	}, [particleCount, connectionDistance, mouseInfluenceRadius, depth]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				inset: 0,
				width: "100%",
				height: "100%",
				zIndex: -10,
				backgroundColor: "#000000",
				background:
					"radial-gradient(ellipse at 50% 60%, #06060a 0%, #000000 70%)",
				pointerEvents: "none",
			}}
		/>
	);
}