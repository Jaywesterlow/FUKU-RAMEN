<script lang="ts">
	import { reservations } from '$lib/state/reservations.svelte';
	import { fade } from 'svelte/transition';
	import { innerHeight, scrollY } from 'svelte/reactivity/window';
	import type { Restaurant } from '$lib/data/restaurant';
	import Button from './Button.svelte';

	type Props = { restaurant: Restaurant; links: { href: string; label: string }[] };
	let { restaurant, links }: Props = $props();

	let menuOpen = $state(false);

	/** past the hero (one screen high) the bar turns from white-on-photo to ink-on-paper */
	const pastHero = $derived((scrollY.current ?? 0) > (innerHeight.current ?? Infinity) - 72);
</script>

<nav class={['nav', { solid: pastHero && !menuOpen, 'over-menu': menuOpen }]} aria-label="Main">
	<a class="brand" href="#top" onclick={() => (menuOpen = false)}>
		<span class="jp" aria-hidden="true">福</span>
		<span>{restaurant.name}</span>
	</a>

	<div class="links">
		{#each links as link (link.href)}
			<a class="ul" href={link.href}>{link.label}</a>
		{/each}
	</div>

	<div class="right">
		<div class="reserve">
			<Button
				href={restaurant.reservations.url}
				onclick={reservations.open}
				variant={pastHero ? 'outline' : 'light'}
				size="sm"
				arrow={false}
			>
				Reserve
			</Button>
		</div>
		<button
			class="burger"
			aria-expanded={menuOpen}
			aria-controls="menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? 'Close' : 'Menu'}
		</button>
	</div>
</nav>

{#if menuOpen}
	<div class="menu" id="menu" transition:fade={{ duration: 300 }}>
		{#each links as link (link.href)}
			<a href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
		{/each}
		<p class="small">{restaurant.address.street} · {restaurant.address.area}</p>
	</div>
{/if}

<style>
	.nav {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: calc(16px + env(safe-area-inset-top, 0px)) var(--gutter) 16px;
		color: #fff;
		transition:
			color 0.35s,
			background 0.35s,
			box-shadow 0.35s;
	}
	.solid {
		color: var(--ink);
		background: color-mix(in srgb, var(--paper) 90%, transparent);
		backdrop-filter: blur(12px);
		box-shadow: 0 1px 0 var(--line);
	}
	.over-menu {
		color: var(--ink);
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.7em;
		font-size: 0.74rem;
		font-weight: 500;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
	.brand .jp {
		font-size: 1.45rem;
		line-height: 1;
	}
	.links {
		display: flex;
		gap: 2.2rem;
		font-size: 0.74rem;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	.links a {
		padding-block: 0.3em;
	}
	.right {
		display: flex;
		align-items: center;
		gap: 1.2rem;
	}
	.burger {
		display: none;
		background: none;
		border: 0;
		color: inherit;
		font: 500 0.74rem/1 var(--font-body);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 0.6em 0;
		cursor: pointer;
	}
	.menu {
		position: fixed;
		inset: 0;
		z-index: 40;
		background: var(--paper);
		color: var(--ink);
		display: grid;
		place-content: center;
		text-align: center;
		gap: 1.6rem;
	}
	.menu a {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 2.4rem;
		line-height: 1.1;
	}
	.menu .small {
		margin-top: 1.5rem;
	}
	@media (max-width: 840px) {
		.links,
		.reserve {
			display: none;
		}
		.burger {
			display: inline-block;
		}
	}
</style>
