<script lang="ts">
	import type { UI } from '$lib/data/restaurant';
	import { fadeUp } from '$lib/motion/attachments';
	import Button from './Button.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import LoopVideo from './LoopVideo.svelte';
	import RevealFrame from './RevealFrame.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { facts: { term: string; detail: string }[]; text: UI['saturday'] };
	let { facts, text }: Props = $props();
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
			<p class="lede" {@attach fadeUp()}>{text.lede}</p>
			<dl {@attach fadeUp()}>
				{#each facts as fact (fact.term)}
					<div>
						<dt>{fact.term}</dt>
						<dd>{fact.detail}</dd>
					</div>
				{/each}
			</dl>
			<div><Button href="#visit">{text.reserve}</Button></div>
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
		gap: 1.6rem;
		max-width: 32rem;
	}
	dl {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.2rem 1.6rem;
		border-top: 1px solid var(--line);
		padding-top: 1.4rem;
		font-size: 0.92rem;
	}
	dt {
		font-size: 0.66rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-2);
		margin-bottom: 0.3rem;
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
