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
		gap: var(--space-2);
		/* T21: closer to its heading than the heading is to what follows; the parent's gap minus this */
		margin-bottom: calc(var(--space-2) * -1);
		font-size: var(--text-label);
		font-weight: var(--label-weight);
		letter-spacing: var(--label-tracking);
		text-transform: uppercase;
		color: var(--eyebrow, var(--ink-2));
	}
	.jp {
		font-weight: 500;
		letter-spacing: 0;
		font-size: var(--text-body);
		color: var(--eyebrow-mark, var(--sage-deep));
	}
</style>
