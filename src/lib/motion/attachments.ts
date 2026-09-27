import type { Attachment } from 'svelte/attachments';
import { prefersReducedMotion } from 'svelte/motion';
import { gsap, ScrollTrigger } from './scroll';

/**
 * Motion as Svelte attachments: `{@attach revealLines()}` on the element that moves.
 * Each one reads `prefersReducedMotion.current`, so it re-runs when the visitor flips the
 * setting, and each returns a cleanup that leaves the element in its resting state.
 *
 * Timings come from the animation library (11b, 12, 19) and are not tuned here.
 * GSAP alone sets the start state: a CSS transform on the same element would be added
 * on top of it and leave the heading stuck below its mask.
 */

/** 11b — lines rise from their mask: 110 % → 0, 1.2 s expo-out, 80 ms stagger. */
export function revealLines(): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;

		const lines = node.querySelectorAll<HTMLElement>('.line > span');
		gsap.set(lines, { y: 0, yPercent: 110 });

		const trigger = ScrollTrigger.create({
			trigger: node,
			start: 'top 85%',
			once: true,
			onEnter: () =>
				gsap.to(lines, {
					yPercent: 0,
					duration: 1.2,
					ease: 'expo.out',
					stagger: 0.08,
					overwrite: true,
					onComplete: () => gsap.set(lines, { clearProps: 'transform' })
				})
		});

		return () => {
			trigger.kill();
			gsap.killTweensOf(lines);
			gsap.set(lines, { clearProps: 'transform' });
		};
	};
}

/** Small blocks — fade and 24 px rise, 0.8 s, strong ease-out. */
export function fadeUp(): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;

		gsap.set(node, { opacity: 0, y: 24 });

		const trigger = ScrollTrigger.create({
			trigger: node,
			start: 'top 88%',
			once: true,
			onEnter: () =>
				gsap.to(node, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'expo.out',
					overwrite: true,
					onComplete: () => gsap.set(node, { clearProps: 'opacity,transform' })
				})
		});

		return () => {
			trigger.kill();
			gsap.killTweensOf(node);
			gsap.set(node, { clearProps: 'opacity,transform' });
		};
	};
}

/**
 * 12 — the frame opens from below (1 s after 0.2 s) while the photo or video inside
 * settles from 130 % to 100 % over 4 s. `onDone` fires when both have landed.
 */
export function revealFrame(onDone?: () => void): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) {
			onDone?.();
			return;
		}

		const media = node.querySelector<HTMLElement>('img, video');
		gsap.set(node, { clipPath: 'inset(100% 0% 0% 0%)' });
		if (media) gsap.set(media, { scale: 1.3 });

		let timeline: gsap.core.Timeline | undefined;

		const trigger = ScrollTrigger.create({
			trigger: node,
			start: 'top 75%',
			once: true,
			onEnter: () => {
				timeline = gsap.timeline({
					onComplete: () => {
						if (media) gsap.set(media, { clearProps: 'transform' });
						onDone?.();
					}
				});
				timeline.to(
					node,
					{ clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.out', delay: 0.2 },
					0
				);
				if (media) timeline.to(media, { scale: 1, duration: 4, ease: 'power2.out' }, 0);
			}
		});

		return () => {
			trigger.kill();
			timeline?.kill();
			gsap.set(node, { clearProps: 'clipPath' });
			if (media) gsap.set(media, { clearProps: 'transform' });
		};
	};
}

/** 19 — tells the caller when this block sits in the middle band of the screen. */
export function whenCentred(onCentred: () => void): Attachment<HTMLElement> {
	return (node) => {
		const trigger = ScrollTrigger.create({
			trigger: node,
			start: 'top 60%',
			end: 'bottom 40%',
			onEnter: onCentred,
			onEnterBack: onCentred
		});

		return () => trigger.kill();
	};
}

/** Reports whether the element is on screen (with a margin), for video loops. */
export function inView(onChange: (visible: boolean) => void): Attachment<HTMLElement> {
	return (node) => {
		const observer = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting), {
			rootMargin: '120px 0px'
		});
		observer.observe(node);

		return () => observer.disconnect();
	};
}
