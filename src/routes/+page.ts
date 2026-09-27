import { courses, evening, goodToKnow, saturdayFacts, strip, ways } from '$lib/data/restaurant';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ courses, evening, goodToKnow, saturdayFacts, strip, ways });
