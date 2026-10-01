<script lang="ts">
	import type { UI } from '$lib/data/restaurant';
	import { reservations } from '$lib/state/reservations.svelte';
	import Button from './Button.svelte';

	type Props = { text: UI['demo']; href: string };
	let { text, href }: Props = $props();
</script>

<!-- Every Reserve opens this, at once: the demo takes no real bookings. -->
<dialog
	class="dialog"
	aria-labelledby="reserve-dialog-title"
	{@attach reservations.dialog}
	onclose={reservations.closed}
	onclick={reservations.backdrop}
>
	<div class="panel">
		<h2 id="reserve-dialog-title" class="display">{text.title}</h2>
		<p>{text.line}</p>
		<div class="actions">
			<Button {href} external variant="outline" size="sm">{text.link}</Button>
			<button type="button" class="close ul" onclick={reservations.close}>{text.close}</button>
		</div>
	</div>
</dialog>

<style>
	.dialog {
		width: min(30rem, calc(100% - 2 * var(--gutter)));
		max-width: none;
		padding: 0;
		border: 1px solid var(--line);
		background: var(--paper);
		color: var(--ink);
	}
	.dialog::backdrop {
		background: rgb(15 14 13 / 0.55);
	}
	/* opacity only, nothing that moves; none at all under reduced motion */
	@media (prefers-reduced-motion: no-preference) {
		.dialog[open],
		.dialog[open]::backdrop {
			animation: appear 0.24s var(--ease);
		}
	}
	@keyframes appear {
		from {
			opacity: 0;
		}
	}

	.panel {
		display: grid;
		gap: 1rem;
		padding: clamp(1.6rem, 5vw, 2.4rem);
	}
	/* .panel: outranks the global h2.display size, which is for section headings */
	.panel h2 {
		font-size: clamp(1.6rem, 3.6vw, 2.1rem);
	}
	p {
		color: var(--ink-2);
		line-height: 1.55;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.2rem 1.6rem;
		margin-top: 0.6rem;
	}
	.close {
		min-height: 2.75rem;
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		font: 500 0.74rem/1 var(--font-body);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		cursor: pointer;
	}
</style>
