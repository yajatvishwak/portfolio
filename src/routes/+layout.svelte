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
	<title>Yajat Vishwakarma</title>
</svelte:head>

{@render children()}
