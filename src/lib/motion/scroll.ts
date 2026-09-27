import { browser } from '$app/environment';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (browser) {
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

/**
 * Lenis + ScrollTrigger on one clock (library base, once per site).
 * Returns the cleanup, so it can be the body of an $effect.
 */
export function startSmoothScroll(): () => void {
	const lenis = new Lenis({ autoRaf: false, anchors: true });
	const raf = (time: number) => lenis.raf(time * 1000);

	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add(raf);
	gsap.ticker.lagSmoothing(0);

	return () => {
		gsap.ticker.remove(raf);
		lenis.destroy();
	};
}

/** Trigger positions are only right once fonts and images have their final size. */
export function refreshWhenSettled(): () => void {
	const refresh = () => ScrollTrigger.refresh();

	document.fonts?.ready.then(refresh);
	window.addEventListener('load', refresh);

	return () => window.removeEventListener('load', refresh);
}
