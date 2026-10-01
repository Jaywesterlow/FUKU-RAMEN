<script lang="ts">
	import { reservations } from '$lib/state/reservations.svelte';
	import type { UI } from '$lib/data/restaurant';
	import { fadeUp } from '$lib/motion/attachments';
	import Button from './Button.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import LoopVideo from './LoopVideo.svelte';
	import RevealFrame from './RevealFrame.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = {
		facts: { term: string; detail: string }[];
		text: UI['saturday'];
		/** the plain booking link, for visitors without JavaScript */
		reserveUrl: string;
	};
	let { facts, text, reserveUrl }: Props = $props();
</script>

<section class="saturday" id="saturday">
	<div class="wrap grid">
		<RevealFrame ratio="3 / 4" ratioNarrow="4 / 5" maxHeight="86vh">
			<LoopVideo
				src="/video/bowl-portrait.mp4"
				poster="/video/saturday-poster.jpg"
				label={text.video}
			/>
		</RevealFrame>

		<div class="text">
			<Eyebrow kanji="土">{text.eyebrow}</Eyebrow>
			<RevealHeading lines={text.lines} />
			<p class="lede" data-reveal="fade" {@attach fadeUp()}>{text.lede}</p>
			<dl data-reveal="fade" {@attach fadeUp()}>
				{#each facts as fact (fact.term)}
					<div>
						<dt>{fact.term}</dt>
						<dd>{fact.detail}</dd>
					</div>
				{/each}
			</dl>
			<div><Button href={reserveUrl} onclick={reservations.open}>{text.reserve}</Button></div>
		</div>
	</div>
</section>

<style>
	.saturday {
		padding-block: var(--section);
	}
	.grid {
		display: grid;
		grid-template-columns: 5fr 6fr;
		gap: clamp(32px, 7vw, 120px);
		align-items: center;
	}
	.text {
		display: grid;
		gap: var(--space-5);
		max-width: 32rem;
	}
	dl {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4) var(--space-5);
		border-top: 1px solid var(--line);
		padding-top: var(--space-5);
		font-size: var(--text-small);
	}
	dt {
		font-size: var(--text-label);
		font-weight: var(--label-weight);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
		color: var(--ink-2);
		margin-bottom: var(--space-1);
	}
	@media (max-width: 840px) {
		.grid {
			grid-template-columns: 1fr;
		}
		dl {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
