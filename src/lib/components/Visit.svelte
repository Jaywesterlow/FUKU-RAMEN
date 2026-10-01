<script lang="ts">
	import type { Restaurant, UI } from '$lib/data/restaurant';
	import { fadeUp } from '$lib/motion/attachments';
	import { opening } from '$lib/state/opening.svelte';
	import Button from './Button.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import LoopVideo from './LoopVideo.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { restaurant: Restaurant; goodToKnow: string[]; text: UI['visit'] };
	let { restaurant, goodToKnow, text }: Props = $props();
</script>

<section class="visit" id="visit">
	<div class="band">
		<div class="media" aria-hidden="true">
			<LoopVideo src="/video/noodles-boil.mp4" poster="/video/visit-poster.jpg" />
		</div>
		<div class="wrap">
			<Eyebrow kanji="訪">{text.eyebrow}</Eyebrow>
			<RevealHeading lines={text.lines} />
		</div>
	</div>

	<div class="wrap cols">
		<div class="col" data-reveal="fade" {@attach fadeUp()}>
			<h3>{text.hours}</h3>
			<div class="hours">
				{#each restaurant.hours as block (block.label)}
					<p>
						<b>
							{block.label}
							{#if opening.isToday(block.days)}<span class="today">{text.today}</span>{/if}
						</b>
						<span class="numeric">{block.opens} – {block.closes}</span> · {block.note}
					</p>
				{/each}
				<p><b>{restaurant.closedLabel}</b>{text.closed}</p>
			</div>
		</div>

		<div class="col" data-reveal="fade" {@attach fadeUp()}>
			<h3>{text.find}</h3>
			<p>
				<a class="ul" href={restaurant.address.maps} target="_blank" rel="noopener">
					{restaurant.address.street}<br />
					{restaurant.address.postalCode}
					{restaurant.address.city}
				</a>
			</p>
			<p>
				<a class="ul" href="mailto:{restaurant.email}">{restaurant.email}</a><br />
				<a class="ul numeric" href={restaurant.phone.href}>{restaurant.phone.display}</a><br />
				<span class="small">{restaurant.phone.hours}</span>
			</p>
		</div>

		<div class="col" data-reveal="fade" {@attach fadeUp()}>
			<h3>{text.good}</h3>
			<ul>
				{#each goodToKnow as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="wrap reserve">
		<Button href={restaurant.reserveUrl} size="lg" external magnetic>{text.reserve}</Button>
		<p class="small">{text.waitlist}</p>
	</div>
</section>

<style>
	.band {
		--eyebrow: rgb(255 255 255 / 0.75);
		--eyebrow-mark: #fff;

		position: relative;
		min-height: 52vh;
		display: grid;
		align-items: end;
		color: #fff;
		background: var(--lacquer);
		overflow: hidden;
	}
	.media {
		position: absolute;
		inset: 0;
	}
	.media :global(video) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.9;
	}
	.media::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgb(0 0 0 / 0.15), rgb(0 0 0 / 0.55));
	}
	.band .wrap {
		position: relative;
		z-index: 1;
		width: 100%;
		padding-block: 12vh 7vh;
		display: grid;
		gap: 1rem;
	}

	.cols {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: clamp(28px, 4vw, 56px);
		padding-top: clamp(56px, 8vw, 96px);
	}
	.col {
		display: grid;
		gap: 0.9rem;
		align-content: start;
		border-top: 1px solid var(--ink);
		padding-top: 1.2rem;
		font-size: 0.98rem;
	}
	.col h3 {
		font-family: var(--font-body);
		font-weight: 500;
		font-size: 0.7rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--ink-2);
	}
	.col p {
		max-width: 26em;
	}
	.col ul {
		display: grid;
		gap: 0.55rem;
	}
	.col li {
		position: relative;
		padding-left: 1.1em;
	}
	.col li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.7em;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--sage);
	}
	.hours {
		display: grid;
		gap: 0.8rem;
	}
	.hours b {
		display: block;
		font-weight: 500;
	}
	.today {
		margin-left: 0.5em;
		font-size: 0.8rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--sage-deep);
	}

	.reserve {
		display: grid;
		justify-items: center;
		text-align: center;
		gap: 1.2rem;
		padding-block: clamp(64px, 9vw, 120px);
	}

	@media (max-width: 840px) {
		.cols {
			grid-template-columns: 1fr;
		}
	}
</style>
