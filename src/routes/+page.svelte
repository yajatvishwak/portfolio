<script>
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Achievements from '$lib/components/Achievements.svelte';
	import Chatbot from '$lib/components/Chatbot.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Rsvp from '$lib/components/Rsvp.svelte';

	let nav = $state(null);
	let rsvp = $state(null);

	$effect(() => {
		if (nav && rsvp) nav.setRsvpRef(rsvp);
	});

	function handleGlobalKeys(e) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
			e.preventDefault();
			nav?.toggleTldr();
		}
		if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
			e.preventDefault();
			nav?.openRsvp();
		}
	}
</script>

<svelte:window onkeydown={handleGlobalKeys} />

<Nav bind:this={nav} />

<main>
	<Hero />
	<Projects />
	<Experience />
	<Skills />
	<Achievements />
	<Chatbot />
	<Contact />
</main>

<Footer />
<Rsvp bind:this={rsvp} />
