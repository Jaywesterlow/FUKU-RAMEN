import adapter from '@sveltejs/adapter-vercel';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// must come before sveltekit(): rewrites <enhanced:img> to <picture> with AVIF/WebP + srcset
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// The page is prerendered, so Vercel serves static files; no function runs per visit.
			adapter: adapter()
		})
	],
	// gsap ships ESM without "type": "module"; bundle it for SSR and prerendering
	ssr: { noExternal: ['gsap'] }
});
