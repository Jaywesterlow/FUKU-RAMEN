<script lang="ts">
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { prefersReducedMotion, Tween } from 'svelte/motion';
	import { MediaQuery } from 'svelte/reactivity';
	import Arrow from './Arrow.svelte';

	type Props = {
		href: string;
		/** ink: solid · light: white outline on a photo · dark: outline on the dark chapter · outline: ink outline on paper */
		variant?: 'ink' | 'light' | 'dark' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		arrow?: boolean;
		external?: boolean;
		/** 27c: the button leans 30 % toward the cursor. For the one button that matters. */
		magnetic?: boolean;
		onclick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) => void;
		children: Snippet;
	};

	let {
		href,
		variant = 'ink',
		size = 'md',
		arrow = true,
		external = false,
		magnetic = false,
		onclick,
		children
	}: Props = $props();

	const hasCursor = new MediaQuery('(hover: hover)');
	const pull = new Tween({ x: 0, y: 0 }, { duration: 200, easing: expoOut });

	const magnetOn = $derived(magnetic && hasCursor.current && !prefersReducedMotion.current);

	function follow(event: MouseEvent & { currentTarget: HTMLAnchorElement }) {
		if (!magnetOn) return;
		const box = event.currentTarget.getBoundingClientRect();
		pull.target = {
			x: (event.clientX - (box.left + box.width / 2)) * 0.3,
			y: (event.clientY - (box.top + box.height / 2)) * 0.3
		};
	}

	function release() {
		pull.target = { x: 0, y: 0 };
	}
</script>

{#snippet label()}
	{@render children()}
	{#if arrow}<Arrow />{/if}
{/snippet}

<!-- The fill carries its own copy of the label, clipped with it: the text is readable at every frame. -->
<a
	{href}
	class={['btn', variant, size]}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener' : undefined}
	style:transform={magnetOn ? `translate(${pull.current.x}px, ${pull.current.y}px)` : undefined}
	onmousemove={follow}
	onmouseleave={release}
	{onclick}
>
	<span>{@render label()}</span>
	<span class="fill" aria-hidden="true">{@render label()}</span>
</a>

<style>
	.btn {
		position: relative;
		display: inline-grid;
		isolation: isolate;
		overflow: hidden;
		border-radius: 999px;
		border: 1px solid currentColor;
		font: 500 0.74rem/1 var(--font-body);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		will-change: transform;
		transition: scale 0.2s var(--ease);
	}
	/* 27c press: the `scale` property, so it stacks on the magnetic translate instead of replacing it */
	.btn:active {
		scale: 0.97;
	}
	.btn > span {
		grid-area: 1 / 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.7em;
		padding: 1em 1.7em;
		white-space: nowrap;
	}
	.sm > span {
		padding: 0.8em 1.3em;
	}
	.lg {
		font-size: 0.82rem;
	}
	.lg > span {
		padding: 1.25em 2.2em;
	}

	/* one direction only: in from the bottom on hover, out through the top on leave */
	.fill {
		background: var(--fill);
		color: var(--fill-text);
		border-radius: 999px;
		clip-path: inset(0 0 100% 0);
		transition: clip-path 0.38s var(--ease);
	}
	.btn:hover .fill,
	.btn:focus-visible .fill {
		clip-path: inset(0 0 0 0);
		animation: fill-in 0.38s var(--ease);
	}
	@keyframes fill-in {
		from {
			clip-path: inset(100% 0 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}
	.btn:hover :global(svg) {
		transform: translateX(4px);
	}

	.ink {
		background: var(--ink);
		color: var(--paper);
		border-color: var(--ink);
		--fill: var(--sage-deep);
		--fill-text: #fff;
	}
	.light {
		color: #fff;
		--fill: #fff;
		--fill-text: var(--ink);
	}
	.dark {
		color: var(--paper-d);
		--fill: var(--paper-d);
		--fill-text: var(--ink);
	}
	.outline {
		color: var(--ink);
		--fill: var(--ink);
		--fill-text: var(--paper);
	}
</style>
