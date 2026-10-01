import { facts } from '$lib/data/restaurant';

const { origin, url } = facts.reservations;

/** How long the widget may take to say hello before Reserve falls back to the plain link. */
const PATIENCE = 8000;

/**
 * Tebi's booking widget, loaded on the first Reserve click and never before.
 *
 * `requested` flips on that click; the layout then renders Tebi's own snippet into the head.
 * Their manager script builds the widget iframe, which posts `appear` when it is ready.
 * From then on Reserve asks the widget to open, the same message Tebi's own links send.
 * If the script fails or the widget stays silent, Reserve follows the plain link instead.
 */
class Reservations {
	/** True from the first Reserve click: the layout renders the Tebi script. */
	requested = $state(false);
	/** True once the widget has said it is ready. */
	ready = $state(false);
	/** True while the widget is open. */
	expanded = $state(false);

	#widget: Window | null = null;
	#pending = false;
	#trigger: HTMLElement | null = null;
	#timer: ReturnType<typeof setTimeout> | undefined;

	/** Click handler for every Reserve link. Their href stays the plain link for no-JS. */
	open = (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => {
		// a new tab or window on purpose: let the browser follow the link
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		event.preventDefault();
		this.#trigger = event.currentTarget;

		if (this.ready) {
			this.#send('openReservationsWidget');
			return;
		}
		this.#pending = true;
		this.requested = true;
		clearTimeout(this.#timer);
		this.#timer = setTimeout(() => this.fail(), PATIENCE);
	};

	/** The script did not load, or the widget never answered: take the visitor to the plain link. */
	fail = () => {
		clearTimeout(this.#timer);
		if (!this.#pending) return;
		this.#pending = false;
		window.location.assign(url);
	};

	/** Window `message` handler: only Tebi's own origin is listened to. */
	receive = (event: MessageEvent) => {
		if (event.origin !== origin || !event.source) return;
		let type: unknown;
		try {
			const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
			type = message?.type;
		} catch {
			return;
		}

		if (type === 'appear') {
			this.#widget = event.source as Window;
			this.ready = true;
			clearTimeout(this.#timer);
			if (this.#pending) {
				this.#pending = false;
				this.#send('openReservationsWidget');
			}
		} else if (type === 'expand') {
			this.expanded = true;
			// keyboard users land in the widget, not behind it
			this.#widget?.focus();
		} else if (type === 'collapse') {
			const wasOpen = this.expanded;
			this.expanded = false;
			if (wasOpen) this.#trigger?.focus();
		}
	};

	/** Window `keydown` handler: Esc closes the widget while focus is on our page. */
	key = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && this.expanded) this.#send('close');
	};

	#send(type: string) {
		this.#widget?.postMessage(JSON.stringify({ type }), origin);
	}
}

export const reservations = new Reservations();
