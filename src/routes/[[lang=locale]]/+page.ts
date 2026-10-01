import type { EntryGenerator } from './$types';

// The page's content arrives with the layout's data; this only names both languages for the prerenderer.
export const entries: EntryGenerator = () => [{}, { lang: 'nl' }];
