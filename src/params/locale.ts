import type { ParamMatcher } from '@sveltejs/kit';

/** Only `/nl` is a language segment; English lives at `/` and has none. */
export const match = ((param: string): param is 'nl' => param === 'nl') satisfies ParamMatcher;
