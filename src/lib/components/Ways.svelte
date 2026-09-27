<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { Way } from '$lib/data/restaurant';
	import Arrow from './Arrow.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import RevealFrame from './RevealFrame.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { ways: Way[] };
	let { ways }: Props = $props();
</script>

<section class="ways" id="ways">
	<div class="wrap">
		<header>
			<Eyebrow kanji="二">Two ways to eat here</Eyebrow>
			<RevealHeading lines={['An evening, or a Saturday.']} />
		</header>

		<div class="grid">
			{#each ways as way (way.href)}
				<!-- the whole card is the link: no "click here" needed -->
				<a class="way" href={way.href}>
					<RevealFrame>
						<enhanced:img
							src={photos[way.photo]}
							alt={way.alt}
							sizes="(min-width: 700px) 45vw, 90vw"
							loading="lazy"
						/>
					</RevealFrame>
					<div class="meta">
						<span>{way.days}</span>
						<span class="numeric">{way.hours}</span>
					</div>
					<div class="title">
						<h3>{way.title}</h3>
						<Arrow />
					</div>
					<p>{way.line} <span class="detail">{way.detail}</span></p>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.ways {
		padding-bottom: var(--section);
	}
	header {
		display: grid;
		gap: 1.2rem;
		margin-bottom: clamp(40px, 6vw, 72px);
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(24px, 4vw, 56px);
	}
	.way {
		display: grid;
		gap: 1.2rem;
		align-content: start;
	}
	/* RevealFrame marks itself .landed when its reveal is done; only then the photo may move */
	.way:hover :global(.landed img) {
		transform: scale(1.03);
	}
	.meta {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		border-top: 1px solid var(--ink);
		padding-top: 1rem;
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		font-size: 1.1rem;
	}
	.way:hover .title :global(svg) {
		transform: translateX(6px);
	}
	p {
		color: var(--ink-2);
	}
	.detail {
		font-size: 0.95rem;
		white-space: nowrap;
	}
	@media (max-width: 700px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 56px;
		}
	}
</style>
