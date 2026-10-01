<script lang="ts">
	import { reservations } from '$lib/state/reservations.svelte';
	import { fade } from 'svelte/transition';
	import { photos } from '$lib/assets/photos';
	import type { Course, UI } from '$lib/data/restaurant';
	import { fadeUp, whenCentred } from '$lib/motion/attachments';
	import Button from './Button.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = {
		courses: Course[];
		evening: { price: string; priceNote: string; note: string };
		text: UI['evening'];
		/** the plain booking link, for visitors without JavaScript */
		reserveUrl: string;
	};
	let { courses, evening, text, reserveUrl }: Props = $props();

	/** the course in the middle of the screen; the photo and the caption follow it */
	let activeId = $state(1);
	const active = $derived(courses.find((course) => course.id === activeId) ?? courses[0]);

	const number = (id: number) => String(id).padStart(2, '0');
</script>

<section class="evening" id="evening">
	<div class="wrap">
		<header>
			<Eyebrow kanji="夜">{text.eyebrow}</Eyebrow>
			<RevealHeading lines={text.lines} />
			<p class="note" {@attach fadeUp()}>{evening.note}</p>
		</header>

		<div class="stack">
			<!-- signature (19): the photo holds the middle of the screen while the courses pass -->
			<div class="visual">
				<div class="frame" aria-hidden="true">
					{#each courses as course (course.id)}
						<div class={['photo', { shown: course.id === activeId }]}>
							<enhanced:img
								src={photos[course.photo]}
								alt=""
								sizes="(min-width: 840px) 45vw, 100vw"
								loading="lazy"
							/>
						</div>
					{/each}
				</div>
				<div class="caption">
					{#key active.id}
						<span in:fade={{ duration: 400 }}>{number(active.id)} · {active.title}</span>
					{/key}
					<span>{text.sample}</span>
				</div>
			</div>

			<ol>
				{#each courses as course (course.id)}
					<li
						class={['course', { active: course.id === activeId }]}
						{@attach whenCentred(() => (activeId = course.id))}
					>
						<span class="jp" aria-hidden="true">{course.kanji}</span>
						<div class="body">
							<p class="n">{text.course} {number(course.id)}</p>
							<h3>{course.title}</h3>
							<!-- only the active course speaks: text through the scroll, nothing to click -->
							<p class="say">{course.line}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>

		<footer>
			<p class="price">{evening.price} <small>{evening.priceNote}</small></p>
			<Button href={reserveUrl} onclick={reservations.open} variant="dark">{text.reserve}</Button>
		</footer>
	</div>
</section>

<style>
	.evening {
		--eyebrow: var(--muted-d);
		--eyebrow-mark: var(--sage);

		padding-block: var(--section);
		background: var(--lacquer);
		color: var(--paper-d);
	}
	header {
		display: grid;
		gap: 1.4rem;
		max-width: 56rem;
		margin-bottom: clamp(40px, 6vw, 88px);
	}
	.note {
		font-size: 0.9rem;
		color: var(--muted-d);
	}

	.stack {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(32px, 7vw, 120px);
		align-items: start;
	}
	/* one screen high and sticky, so the frame inside sits in the middle of the viewport */
	.visual {
		position: sticky;
		top: 0;
		height: 100vh;
		height: 100svh;
		display: grid;
		align-content: center;
		gap: 0.9rem;
	}
	.frame {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 5;
		max-height: 74svh;
		overflow: hidden;
		background: #1a1917;
	}
	.photo {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.5s ease;
	}
	.photo.shown {
		opacity: 1;
	}
	.photo :global(picture) {
		display: contents;
	}
	.photo :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.caption {
		display: flex;
		justify-content: space-between;
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted-d);
	}

	ol {
		display: grid;
		padding-block: 14vh 22vh;
	}
	.course {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem 2rem;
		align-items: start;
		padding-block: clamp(32px, 5vh, 56px);
		border-top: 1px solid var(--line-d);
		min-height: 26vh;
		opacity: 0.35;
		transform: translateY(10px);
		transition:
			opacity 0.4s var(--ease),
			transform 0.4s var(--ease);
	}
	.course:last-child {
		border-bottom: 1px solid var(--line-d);
	}
	.course.active {
		opacity: 1;
		transform: none;
	}
	.course .jp {
		font-size: clamp(2.2rem, 4vw, 3.4rem);
		line-height: 1;
		color: var(--muted-d);
		transition: color 0.4s;
	}
	.course.active .jp {
		color: var(--sage);
	}
	.body {
		display: grid;
		gap: 0.6rem;
		max-width: 26em;
	}
	.n {
		font-size: 0.68rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--muted-d);
	}
	.say {
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.5s ease 0.1s,
			transform 0.5s var(--ease) 0.1s;
	}
	.course.active .say {
		opacity: 0.85;
		transform: none;
	}

	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 1.6rem 3rem;
		margin-top: clamp(40px, 6vw, 88px);
	}
	.price {
		font-family: var(--font-display);
		font-style: italic;
		font-size: clamp(1.8rem, 3vw, 2.6rem);
		line-height: 1;
	}
	.price small {
		font: 300 0.92rem/1 var(--font-body);
		color: var(--muted-d);
		margin-left: 0.8rem;
		letter-spacing: 0.04em;
	}

	@media (max-width: 840px) {
		.stack {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.visual {
			top: calc(58px + env(safe-area-inset-top, 0px));
			height: auto;
			z-index: 1;
			background: var(--lacquer);
			padding-bottom: 0.6rem;
			align-content: start;
		}
		.frame {
			aspect-ratio: 16 / 10;
			max-height: 44svh;
		}
		.caption {
			display: none;
		}
		ol {
			padding-block: 2vh 6vh;
		}
		.course {
			min-height: 0;
		}
		.say {
			opacity: 0.85;
			transform: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.say {
			opacity: 0.85;
			transform: none;
		}
	}
</style>
