import type React from "react";
import { useCallback, useRef, useState } from "react";

export function useTilt(maxTilt = 12) {
	const ref = useRef<HTMLDivElement>(null);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!ref.current) return;
			const rect = ref.current.getBoundingClientRect();
			const width = rect.width;
			const height = rect.height;
			const mouseX = e.clientX - rect.left;
			const mouseY = e.clientY - rect.top;

			const xPct = mouseX / width - 0.5;
			const yPct = mouseY / height - 0.5;

			setTilt({ x: -(yPct * maxTilt), y: xPct * maxTilt });
			setGlare({
				x: (mouseX / width) * 100,
				y: (mouseY / height) * 100,
				opacity: 1,
			});
		},
		[maxTilt],
	);

	const handleMouseLeave = useCallback(() => {
		setTilt({ x: 0, y: 0 });
		setGlare((prev) => ({ ...prev, opacity: 0 }));
	}, []);

	return { ref, tilt, glare, handleMouseMove, handleMouseLeave };
}
