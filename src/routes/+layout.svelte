<script>
	import './layout.css';
	import { onMount } from 'svelte';
	import Clarity from '@microsoft/clarity';

	let { children } = $props();

	onMount(() => {
		Clarity.init('vsvtrucn6o');
	});
</script>

<svelte:head>
	<title>Yajat Vishwakarma — Software Engineer</title>
	<meta name="description" content="Software Engineer building production AI systems and distributed backends. Architected a CV platform processing 960+ images/day. Building YuzuHire." />
</svelte:head>

{@render children()}
