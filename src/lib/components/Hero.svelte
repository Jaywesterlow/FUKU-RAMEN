<script lang="ts">
	import { reservations } from '$lib/state/reservations.svelte';
	import { scrollY } from 'svelte/reactivity/window';
	import type { OpeningWords, Restaurant, UI } from '$lib/data/restaurant';
	import { opening } from '$lib/state/opening.svelte';
	import Arrow from './Arrow.svelte';
	import Button from './Button.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import RevealHeading from './RevealHeading.svelte';
	import SeamlessVideo from './SeamlessVideo.svelte';

	type Props = { restaurant: Restaurant; text: UI['hero']; words: OpeningWords };
	let { restaurant, text, words }: Props = $props();

	const scrolled = $derived((scrollY.current ?? 0) > 40);
</script>

<header class="hero" id="top">
	<div class="media" aria-hidden="true">
		<SeamlessVideo src="/video/hero-bowl.mp4" poster="/video/hero-poster.jpg" />
	</div>

	<div class="wrap inner">
		<div class="rise d1"><Eyebrow kanji="福">{restaurant.address.area}</Eyebrow></div>
		<RevealHeading level="h1" on="load" lines={text.lines} />
		<p class="lede rise d2">{text.lede}</p>
		<div class="cta rise d3">
			<Button href={restaurant.reservations.url} onclick={reservations.open} variant="light">
				{text.reserve}
			</Button>
			<a class="more" href="#evening">{text.more} <Arrow /></a>
		</div>
	</div>

	<!-- what no competitor but one puts above the fold: where, when, and a number to call -->
	<div class="wrap bar rise d4">
		<ul>
			<li>
				<a class="ul tap" href={restaurant.address.maps} target="_blank" rel="noopener">
					{restaurant.address.street}
				</a>
			</li>
			<li class="open">{opening.headline(words)}</li>
			<li><a class="ul tap numeric" href={restaurant.phone.href}>{restaurant.phone.display}</a></li>
		</ul>
		<a class={['cue', { gone: scrolled }]} href="#story" aria-label={text.cueLabel}>
			<span>{text.cue}</span>
			<svg viewBox="0 0 14 32" fill="none" stroke="currentColor" stroke-width="1.2">
				<path d="M7 0v28M1 22l6 6 6-6" />
			</svg>
		</a>
	</div>
</header>

<style>
	/* exactly one screen */
	.hero {
		--eyebrow: rgb(255 255 255 / 0.78);
		--eyebrow-mark: rgb(255 255 255 / 0.9);

		position: relative;
		height: 100vh;
		height: 100svh;
		min-height: 560px;
		display: grid;
		grid-template-rows: 1fr auto;
		color: #fff;
		background: var(--lacquer);
		overflow: hidden;
	}
	.media {
		position: absolute;
		inset: 0;
	}
	.media::after {
		content: '';
		position: absolute;
		inset: 0;
		/* C42/I23: an eased scrim behind the text block in the bottom-left corner, over the top-to-bottom fade */
		background:
			radial-gradient(
				75% 95% at 0% 100%,
				rgb(0 0 0 / 0.55),
				rgb(0 0 0 / 0.45) 50%,
				rgb(0 0 0 / 0.35) 68%,
				rgb(0 0 0 / 0.15) 85%,
				transparent
			),
			linear-gradient(180deg, rgb(0 0 0 / 0.32), rgb(0 0 0 / 0.06) 40%, rgb(0 0 0 / 0.66));
	}
	.inner {
		position: relative;
		z-index: 1;
		width: 100%;
		align-self: end;
		display: grid;
		gap: var(--space-5);
		padding-bottom: clamp(28px, 5vh, 56px);
	}
	.lede {
		color: rgb(255 255 255 / 0.9);
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4) var(--space-6);
		align-items: center;
		margin-top: var(--space-2);
	}
	.more {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-height: var(--tap);
		font-size: var(--text-label);
		font-weight: var(--label-weight);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
	}
	/* the line sits 0.35em under the text, wherever the text sits in the --tap high box */
	.more::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: calc(50% - 0.5lh - 0.35em);
		width: 100%;
		height: 1px;
		background: currentColor;
		transform-origin: left;
		transition: transform 0.5s var(--ease);
	}
	.more:hover::after {
		transform: scaleX(0);
		transform-origin: right;
	}
	.more:hover :global(svg) {
		transform: translateX(4px);
	}

	.bar {
		position: relative;
		z-index: 1;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-5);
		padding-bottom: calc(var(--space-5) + env(safe-area-inset-bottom, 0px));
		font-size: var(--text-label);
		font-weight: var(--label-weight);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
		color: rgb(255 255 255 / 0.85);
	}
	.bar ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-4);
	}
	.bar li {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}
	.bar li + li::before {
		content: '';
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: currentColor;
		opacity: 0.6;
	}
	.open {
		color: #fff;
	}
	.cue {
		flex: none;
		display: grid;
		justify-items: center;
		gap: 6px;
		font-size: 0.62rem;
		letter-spacing: 0.24em;
		transition: opacity 0.4s;
	}
	.cue.gone {
		opacity: 0;
	}
	.cue svg {
		width: 14px;
		height: 32px;
	}

	/* load-in: CSS only, so the hero never waits for JavaScript */
	@media (prefers-reduced-motion: no-preference) {
		.rise {
			opacity: 0;
			transform: translateY(14px);
			animation: rise 0.9s var(--ease) forwards;
		}
		.d1 {
			animation-delay: 0.2s;
		}
		.d2 {
			animation-delay: 0.45s;
		}
		.d3 {
			animation-delay: 0.6s;
		}
		.d4 {
			animation-delay: 0.9s;
		}
		.media {
			opacity: 0;
			animation: rise 1.4s ease forwards;
		}
		.cue svg {
			animation: cue 1.9s var(--ease) infinite alternate;
		}
	}
	@keyframes rise {
		to {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes cue {
		to {
			transform: translateY(8px);
		}
	}

	@media (max-width: 700px) {
		.bar {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-3);
		}
		.bar ul {
			flex-direction: column;
			gap: var(--space-1);
		}
		.bar li + li::before,
		.cue {
			display: none;
		}
	}
</style>
