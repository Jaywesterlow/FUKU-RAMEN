<script lang="ts">
	import type { Snippet } from 'svelte';

	/** Section label: one kanji, then the English. Colours come from --eyebrow and --eyebrow-mark. */
	type Props = { kanji: string; children: Snippet };
	let { kanji, children }: Props = $props();
</script>

<p class="eyebrow">
	<span class="jp" aria-hidden="true">{kanji}</span>
	{@render children()}
</p>

<style>
	.eyebrow {
		display: flex;
		align-items: center;
		gap: 0.8em;
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--eyebrow, var(--ink-2));
	}
	.jp {
		font-weight: 500;
		letter-spacing: 0;
		font-size: 1.05rem;
		color: var(--eyebrow-mark, var(--sage-deep));
	}
</style>
