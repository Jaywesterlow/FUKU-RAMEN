<script lang="ts">
	import type { Snippet } from 'svelte';
	import { revealFrame } from '$lib/motion/attachments';

	type Props = {
		/** aspect ratio on wide screens, e.g. "16 / 9" */
		ratio?: string;
		/** aspect ratio below 700 px; falls back to `ratio` */
		ratioNarrow?: string;
		maxHeight?: string;
		children: Snippet;
	};

	let { ratio = '4 / 5', ratioNarrow, maxHeight = 'none', children }: Props = $props();

	/** true once the reveal has landed; only then may hover move the photo */
	let landed = $state(false);
</script>

<div
	class={['frame', { landed }]}
	style:--ratio={ratio}
	style:--ratio-narrow={ratioNarrow ?? ratio}
	style:--max-height={maxHeight}
	{@attach revealFrame(() => (landed = true))}
>
	{@render children()}
</div>

<style>
	.frame {
		position: relative;
		overflow: hidden;
		aspect-ratio: var(--ratio);
		max-height: var(--max-height);
	}
	@media (max-width: 700px) {
		.frame {
			aspect-ratio: var(--ratio-narrow);
		}
	}
	/* <enhanced:img> renders a <picture>; let the <img> be the layout child */
	.frame :global(picture) {
		display: contents;
	}
	.frame :global(img),
	.frame :global(video) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		will-change: transform;
	}
	.landed :global(img) {
		transition: transform 1.4s var(--ease);
	}
</style>
