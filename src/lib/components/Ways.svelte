<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { UI, Way } from '$lib/data/restaurant';
	import Arrow from './Arrow.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import RevealFrame from './RevealFrame.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { ways: Way[]; text: UI['ways'] };
	let { ways, text }: Props = $props();
</script>

<section class="ways" id="ways">
	<div class="wrap">
		<header>
			<Eyebrow kanji="二">{text.eyebrow}</Eyebrow>
			<RevealHeading lines={text.lines} />
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
		gap: var(--space-5);
		margin-bottom: clamp(40px, 6vw, 72px);
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(24px, 4vw, 56px);
	}
	.way {
		display: grid;
		gap: var(--space-4);
		align-content: start;
	}
	/* RevealFrame marks itself .landed when its reveal is done; only then the photo may move */
	.way:hover :global(.landed img) {
		transform: scale(1.03);
	}
	.meta {
		display: flex;
		justify-content: space-between;
		gap: var(--space-4);
		border-top: 1px solid var(--ink);
		padding-top: var(--space-4);
		font-size: var(--text-label);
		font-weight: var(--label-weight);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-4);
		font-size: var(--text-body);
	}
	.way:hover .title :global(svg) {
		transform: translateX(6px);
	}
	p {
		color: var(--ink-2);
	}
	.detail {
		font-size: var(--text-small);
		white-space: nowrap;
	}
	@media (max-width: 700px) {
		.grid {
			grid-template-columns: 1fr;
			gap: var(--space-7);
		}
	}
</style>
