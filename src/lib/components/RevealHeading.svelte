<script lang="ts">
	import { revealLines } from '$lib/motion/attachments';

	type Props = {
		lines: string[];
		level?: 'h1' | 'h2';
		/** scroll: rises when it enters the screen (GSAP) · load: rises with the page (CSS, for the hero) */
		on?: 'scroll' | 'load';
	};

	let { lines, level = 'h2', on = 'scroll' }: Props = $props();
</script>

<svelte:element
	this={level}
	class={['display', { 'on-load': on === 'load' }]}
	data-reveal={on === 'scroll' ? 'lines' : undefined}
	{@attach on === 'scroll' && revealLines()}
>
	{#each lines as line (line)}
		<span class="line"><span>{line}</span></span>
	{/each}
</svelte:element>

<style>
	@media (prefers-reduced-motion: no-preference) {
		.on-load .line > span {
			transform: translateY(110%);
			animation: rise 1.2s var(--ease-expo) forwards;
		}
		.on-load .line:nth-child(2) > span {
			animation-delay: 0.08s;
		}
	}
	@keyframes rise {
		to {
			transform: translateY(0);
		}
	}
</style>
