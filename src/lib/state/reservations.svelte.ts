/**
 * What Reserve does in this demo: open a small "this is a concept demo" dialog, at once.
 *
 * The demo must not take real bookings at Fuku, so Fuku's Tebi widget is not loaded here.
 * Every Reserve link keeps Fuku's own /reservations page as its href, for visitors without
 * JavaScript and for a new tab. Production would open Tebi in-page instead, preloaded so it
 * opens without a wait; the ids for that are kept in `facts.reservations`.
 */
class Reservations {
	/** True while the demo dialog is open. */
	isOpen = $state(false);

	#dialog: HTMLDialogElement | null = null;
	#opener: HTMLElement | null = null;

	/** Attachment for the `<dialog>`: Reserve can open it from anywhere on the page. */
	dialog = (node: HTMLDialogElement) => {
		this.#dialog = node;
		return () => {
			if (this.#dialog === node) this.#dialog = null;
		};
	};

	/** Click handler for every Reserve link: shows the dialog in the same frame, no network. */
	open = (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => {
		// a new tab or window on purpose: let the browser follow the link
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		if (!this.#dialog) return;
		event.preventDefault();
		this.#opener = event.currentTarget;
		if (!this.#dialog.open) this.#dialog.showModal();
		this.isOpen = true;
	};

	close = () => {
		this.#dialog?.close();
	};

	/** The dialog's `close` event, whatever closed it (Esc, backdrop, button): focus goes back. */
	closed = () => {
		this.isOpen = false;
		this.#opener?.focus();
		this.#opener = null;
	};

	/** A click on the backdrop lands on the `<dialog>` itself, outside its inner panel. */
	backdrop = (event: MouseEvent & { currentTarget: EventTarget & HTMLDialogElement }) => {
		if (event.target === event.currentTarget) this.close();
	};
}

export const reservations = new Reservations();
