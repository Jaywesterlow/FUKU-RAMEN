<script lang="ts">
	import { Evening, Fortune, Hero, Saturday, Strip, Visit, Ways } from '$lib';

	let { data } = $props();
</script>

<Hero restaurant={data.restaurant} text={data.ui.hero} words={data.opening} />
<Fortune restaurant={data.restaurant} text={data.ui.fortune} />
<Ways ways={data.ways} text={data.ui.ways} />
<Evening
	courses={data.courses}
	evening={data.evening}
	text={data.ui.evening}
	reserveUrl={data.restaurant.reservations.url}
/>
<Saturday
	facts={data.saturdayFacts}
	text={data.ui.saturday}
	reserveUrl={data.restaurant.reservations.url}
/>
<Strip items={data.strip} text={data.ui.strip} />
<Visit restaurant={data.restaurant} goodToKnow={data.goodToKnow} text={data.ui.visit} />
