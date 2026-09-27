import { navLinks, restaurant } from '$lib/data/restaurant';
import type { LayoutLoad } from './$types';

// One page of fixed content: render it at build time.
export const prerender = true;

export const load: LayoutLoad = () => ({ restaurant, navLinks });
