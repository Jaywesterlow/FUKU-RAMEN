<script lang="ts">
	import { Evening, Fortune, Hero, Saturday, Strip, Visit, Ways } from '$lib';

	let { data } = $props();
</script>

<Hero restaurant={data.restaurant} />
<Fortune restaurant={data.restaurant} />
<Ways ways={data.ways} />
<Evening
	courses={data.courses}
	evening={data.evening}
	reserveUrl={data.restaurant.reservations.url}
/>
<Saturday facts={data.saturdayFacts} reserveUrl={data.restaurant.reservations.url} />
<Strip items={data.strip} />
<Visit restaurant={data.restaurant} goodToKnow={data.goodToKnow} />
