<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { StripPhoto } from '$lib/data/restaurant';

	/** 06 — endless strip. The loop is CSS; the second set is rendered, not cloned. */
	type Props = { items: StripPhoto[] };
	let { items }: Props = $props();

	const sets = [
		{ id: 'first', copy: false },
		{ id: 'copy', copy: true }
	];
</script>

<section class="strip" aria-label="Photos of Fuku Ramen">
	<div class="scroller">
		<div class="track">
			{#each sets as set (set.id)}
				<div class={['set', { copy: set.copy }]} aria-hidden={set.copy ? 'true' : undefined}>
					{#each items as item (item.photo)}
						<div class={['cell', { wide: item.wide }]}>
							<enhanced:img
								src={photos[item.photo]}
								alt={set.copy ? '' : item.alt}
								sizes="(min-width: 700px) 510px, 60vw"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.strip {
		--gap: 12px;
		padding-bottom: var(--section);
		overflow: hidden;
	}
	.scroller {
		overflow: hidden;
		mask: linear-gradient(90deg, transparent, #fff 8%, #fff 92%, transparent);
	}
	.track {
		display: flex;
		gap: var(--gap);
		width: max-content;
		animation: slide 60s linear infinite;
	}
	.scroller:hover .track {
		animation-play-state: paused;
	}
	.set {
		display: flex;
		gap: var(--gap);
	}
	.cell {
		flex: none;
		height: clamp(200px, 32vw, 340px);
		aspect-ratio: 4 / 5;
	}
	.cell.wide {
		aspect-ratio: 3 / 2;
	}
	.cell :global(picture) {
		display: contents;
	}
	.cell :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	@keyframes slide {
		to {
			transform: translateX(calc(-50% - var(--gap) / 2));
		}
	}

	/* less motion: the photos stand still in a row you can scroll sideways */
	@media (prefers-reduced-motion: reduce) {
		.scroller {
			overflow-x: auto;
			mask: none;
			padding-inline: var(--gutter);
		}
		.track {
			animation: none;
		}
		.copy {
			display: none;
		}
	}
</style>
