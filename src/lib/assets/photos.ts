/**
 * Every photo goes through @sveltejs/enhanced-img: AVIF + WebP, srcset, intrinsic width/height.
 * Static imports (not a glob) so a missing file fails the build instead of the page.
 */
import p02 from './photos/p02.jpg?enhanced';
import p03 from './photos/p03.jpg?enhanced';
import p04 from './photos/p04.jpg?enhanced';
import p05 from './photos/p05.jpg?enhanced';
import p06 from './photos/p06.jpg?enhanced';
import p07 from './photos/p07.jpg?enhanced';
import p08 from './photos/p08.jpg?enhanced';
import p09 from './photos/p09.jpg?enhanced';
import p10 from './photos/p10.jpg?enhanced';
import p11 from './photos/p11.jpg?enhanced';
import p12 from './photos/p12.jpg?enhanced';

export const photos = { p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12 };

export type PhotoKey = keyof typeof photos;
