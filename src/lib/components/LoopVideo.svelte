<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { inView } from '$lib/motion/attachments';

	type Props = { src: string; poster: string; label?: string };
	let { src, poster, label }: Props = $props();

	let visible = $state(false);
	/** plays only on screen; stays on its poster when the visitor asked for less motion */
	const paused = $derived(!visible || prefersReducedMotion.current);
</script>

<!-- bind:paused is one-way here on purpose: the derived value drives the element -->
<video
	{src}
	{poster}
	muted
	loop
	playsinline
	preload="metadata"
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
	bind:paused={() => paused, () => {}}
	{@attach inView((seen) => (visible = seen))}
></video>
