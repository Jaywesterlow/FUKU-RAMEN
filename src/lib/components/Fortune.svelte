<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { Restaurant, UI } from '$lib/data/restaurant';
	import { fadeUp } from '$lib/motion/attachments';
	import Eyebrow from './Eyebrow.svelte';
	import RevealFrame from './RevealFrame.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { restaurant: Restaurant; text: UI['fortune'] };
	let { restaurant, text }: Props = $props();
</script>

<section class="fortune" id="story">
	<div class="wrap grid">
		<aside class="vert" aria-hidden="true"><span class="jp">福</span>{text.vertical}</aside>
		<div class="text">
			<Eyebrow kanji="福">{text.eyebrow}</Eyebrow>
			<RevealHeading lines={text.lines} />
			<p class="lede" {@attach fadeUp()}>{text.lede}</p>
		</div>
	</div>

	<div class="wrap">
		<figure>
			<RevealFrame ratio="16 / 9" ratioNarrow="4 / 5" maxHeight="78vh">
				<enhanced:img
					src={photos.p05}
					alt={text.alt}
					sizes="(min-width: 1280px) 1136px, 90vw"
					loading="lazy"
				/>
			</RevealFrame>
			<figcaption><span>{text.caption}</span><span>{restaurant.address.street}</span></figcaption>
		</figure>
	</div>
</section>

<style>
	.fortune {
		padding-block: var(--section);
	}
	.grid {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: clamp(24px, 5vw, 72px);
		align-items: start;
	}
	.vert {
		writing-mode: vertical-rl;
		font-size: 0.68rem;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--ink-2);
		padding-top: 0.4rem;
		white-space: nowrap;
	}
	.vert .jp {
		font-size: 1.05rem;
		letter-spacing: 0.3em;
		margin-bottom: 0.6em;
		color: var(--sage-deep);
	}
	.text {
		display: grid;
		gap: 1.8rem;
		max-width: 52rem;
	}
	figure {
		margin-top: clamp(56px, 9vw, 120px);
		display: grid;
		gap: 1rem;
	}
	figcaption {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.72rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-2);
	}
	@media (max-width: 700px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.vert {
			writing-mode: horizontal-tb;
			padding: 0;
		}
		.vert .jp {
			margin: 0 0.6em 0 0;
		}
	}
</style>
