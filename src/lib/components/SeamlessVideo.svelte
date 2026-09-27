<script lang="ts">
	import { untrack } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { inView } from '$lib/motion/attachments';

	/**
	 * A loop without a jump: two copies of the same clip. Shortly before the front copy
	 * ends, the other one starts from zero and fades over it; then they swap roles.
	 */
	type Props = { src: string; poster: string; fade?: number };
	let { src, poster, fade = 0.9 }: Props = $props();

	const copies = [0, 1];

	let front = $state(0);
	let time = $state([0, 0]);
	let duration = $state([0, 0]);
	let paused = $state([true, true]);
	let visible = $state(false);

	/** not reactive: only guards against starting a second crossing during the first */
	let crossing = false;

	const playing = $derived(visible && !prefersReducedMotion.current);

	// on screen: the front copy plays; off screen or reduced motion: both rest
	$effect(() => {
		const play = playing;
		untrack(() => {
			paused[front] = !play;
			if (!play) paused[1 - front] = true;
		});
	});

	// near the end of the front copy: start the other one and swap
	$effect(() => {
		const end = duration[front];
		if (!playing || !end || crossing || time[front] < end - fade) return;

		crossing = true;
		const leaving = front;
		const entering = 1 - front;

		untrack(() => {
			time[entering] = 0;
			paused[entering] = false;
			front = entering;
		});

		const timer = setTimeout(() => {
			paused[leaving] = true;
			crossing = false;
		}, fade * 1000);

		return () => clearTimeout(timer);
	});
</script>

<div class="seamless" style:--fade="{fade}s" {@attach inView((seen) => (visible = seen))}>
	{#each copies as copy (copy)}
		<video
			class={{ back: front !== copy }}
			{src}
			{poster}
			muted
			loop
			playsinline
			preload="metadata"
			aria-hidden="true"
			bind:currentTime={time[copy]}
			bind:duration={duration[copy]}
			bind:paused={paused[copy]}
		></video>
	{/each}
</div>

<style>
	.seamless,
	video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	video {
		object-fit: cover;
		transition: opacity var(--fade) linear;
	}
	.back {
		opacity: 0;
	}
</style>
