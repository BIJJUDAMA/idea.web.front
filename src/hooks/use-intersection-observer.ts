import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(threshold = 0.1, rootMargin?: string) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setIsIntersecting(true);
			},
			{ threshold, rootMargin },
		);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [threshold, rootMargin]);

	return { ref, isIntersecting };
}
