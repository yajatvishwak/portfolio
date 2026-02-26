<script>
	const text = `I'm Yajat Vishwakarma, a software engineer with 3 years of experience in distributed systems and AI pipelines. At Eurofins, I built a computer vision platform that cut processing from 10 hours to 15 minutes, handling 960 images daily on Azure Kubernetes. Before that, I was at Oracle, shipping OCR solutions for clients like Maersk. I've won hackathons at Google Cloud, MongoDB Atlas, and more. Star Performer, Eurofins Q4 2025. My stack: C#, Python, TypeScript, .NET, SvelteKit, React, PostgreSQL, MongoDB, Docker, Azure. When I'm not shipping code, I'm probably at the gym. I like building hard things and lifting heavy ones.`;

	const words = text.split(/\s+/);
	const VISIBLE = 1;
	const HALF = 0;

	let open = $state(false);
	let phase = $state('intro');
	let introVisible = $state(false);
	let playing = $state(false);
	let idx = $state(0);
	let wpm = $state(150);
	/** @type {ReturnType<typeof setTimeout> | null} */
	let timer = null;

	export function show() {
		open = true;
		idx = 0;
		playing = false;
		phase = 'intro';
		introVisible = false;
		queueMicrotask(() => {
			introVisible = true;
		});
	}

	export function hide() {
		stop();
		open = false;
	}

	function skipIntro() {
		introVisible = false;
		setTimeout(() => {
			phase = 'reading';
			queueMicrotask(() => start());
		}, 400);
	}

	function start() {
		if (idx >= words.length) idx = 0;
		playing = true;
		advance();
	}

	function stop() {
		playing = false;
		if (timer) clearTimeout(timer);
		timer = null;
	}

	function advance() {
		if (!playing || idx >= words.length - 1) {
			playing = false;
			return;
		}

		const word = words[idx];
		const baseMs = (60 / wpm) * 1000;
		let delay = baseMs;
		if (/[.!]$/.test(word)) delay += baseMs * 1.2;
		else if (/[,;:]$/.test(word)) delay += baseMs * 0.4;

		timer = setTimeout(() => {
			idx++;
			advance();
		}, delay);
	}

	function togglePlay() {
		playing ? stop() : start();
	}

	function handleKey(e) {
		if (!open) return;
		if (e.key === 'Escape') {
			hide();
		}
		if (phase === 'intro') {
			if (e.key === ' ' || e.key === 'Enter') {
				e.preventDefault();
				skipIntro();
			}
			return;
		}
		if (e.key === ' ') {
			e.preventDefault();
			togglePlay();
		} else if (e.key === 'ArrowRight') {
			stop();
			if (idx < words.length - 1) idx++;
		} else if (e.key === 'ArrowLeft') {
			stop();
			if (idx > 0) idx--;
		} else if (e.key === 'ArrowUp') {
			wpm = Math.min(wpm + 20, 600);
			if (playing) {
				stop();
				start();
			}
		} else if (e.key === 'ArrowDown') {
			wpm = Math.max(wpm - 20, 100);
			if (playing) {
				stop();
				start();
			}
		}
	}

	function getWindow(currentIdx) {
		const result = [];
		for (let i = currentIdx - HALF; i <= currentIdx + HALF; i++) {
			result.push({
				word: i >= 0 && i < words.length ? words[i] : '',
				dist: Math.abs(i - currentIdx),
				active: i === currentIdx
			});
		}
		return result;
	}

	function opacityFor(dist) {
		if (dist === 0) return 1;
		return 0.2;
	}

	$effect(() => {
		return () => {
			if (timer) clearTimeout(timer);
		};
	});
</script>

<svelte:window onkeydown={handleKey} />

{#if open}
	<div class="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#0a0a0a]">
		{#if phase === 'intro'}
			<!-- Intro screen -->
			<button
				onclick={skipIntro}
				class="flex flex-col items-center gap-6 px-8 transition-opacity duration-500 {introVisible
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<p
					class="max-w-md text-center text-2xl leading-relaxed font-medium text-[#e8e4dc] md:text-3xl"
				>
					Here's everything you need to know about me.
				</p>
				<p class="max-w-sm text-center text-sm leading-relaxed text-[#666]">
					This is a speed reader. Words will flash one at a time. Just keep your eyes on the center.
					It'll take about a minute.
				</p>
				<p class="mt-2 text-xs text-[#444]">press any key or tap to start</p>
			</button>
		{:else}
			<!-- Progress bar -->
			<div class="absolute top-0 right-0 left-0 h-0.5 bg-[#222]">
				<div
					class="h-full bg-[#555] transition-[width] duration-150"
					style="width: {((idx + 1) / words.length) * 100}%"
				></div>
			</div>

			<!-- Close -->
			<button
				onclick={hide}
				class="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full text-[#555] transition-colors hover:text-[#aaa]"
				aria-label="Close"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
				>
			</button>

			<!-- Word display -->
			<div class="-mt-10 flex flex-col items-center gap-3">
				<div class="h-px w-16 bg-[#444]"></div>
				<div class="rsvp-track" style="--cols: {VISIBLE};">
					{#each getWindow(idx) as item, i}
						<span
							class="rsvp-cell"
							style="opacity: {opacityFor(item.dist)}; font-weight: {item.active ? '700' : '400'};"
							>{item.word}</span
						>
					{/each}
				</div>
			</div>

			<!-- Controls -->
			<div class="absolute bottom-8 flex flex-col items-center gap-4">
				<div class="flex items-center gap-4">
					<button
						onclick={() => {
							stop();
							idx = 0;
						}}
						class="flex size-9 items-center justify-center rounded-full text-[#555] transition-colors hover:text-[#aaa]"
						aria-label="Restart"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><polyline points="1 4 1 10 7 10" /><path
								d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
							/></svg
						>
					</button>

					<button
						onclick={() => {
							stop();
							if (idx > 0) idx--;
						}}
						class="flex size-9 items-center justify-center rounded-full text-[#555] transition-colors hover:text-[#aaa]"
						aria-label="Previous"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg
						>
					</button>

					<button
						onclick={togglePlay}
						class="flex size-12 items-center justify-center rounded-full bg-[#222] text-[#ccc] transition-colors hover:bg-[#333]"
						aria-label={playing ? 'Pause' : 'Play'}
					>
						{#if playing}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><rect x="6" y="4" width="4" height="16" /><rect
									x="14"
									y="4"
									width="4"
									height="16"
								/></svg
							>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
							>
						{/if}
					</button>

					<button
						onclick={() => {
							stop();
							if (idx < words.length - 1) idx++;
						}}
						class="flex size-9 items-center justify-center rounded-full text-[#555] transition-colors hover:text-[#aaa]"
						aria-label="Next"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg
						>
					</button>

					<div class="flex items-center gap-1.5 rounded-full bg-[#1a1a1a] px-3 py-1.5">
						<button
							onclick={() => {
								wpm = Math.max(wpm - 20, 100);
								if (playing) {
									stop();
									start();
								}
							}}
							class="text-[#555] hover:text-[#aaa]"
							aria-label="Slower"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"><line x1="5" y1="12" x2="19" y2="12" /></svg
							>
						</button>
						<span class="min-w-[3.5rem] text-center font-mono text-xs text-[#777] tabular-nums"
							>{wpm} wpm</span
						>
						<button
							onclick={() => {
								wpm = Math.min(wpm + 20, 600);
								if (playing) {
									stop();
									start();
								}
							}}
							class="text-[#555] hover:text-[#aaa]"
							aria-label="Faster"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg
							>
						</button>
					</div>
				</div>

				<p class="text-[10px] text-[#444]">
					space to play/pause &middot; arrows to navigate &middot; esc to close
				</p>
			</div>
		{/if}
	</div>
{/if}

<style>
	.rsvp-track {
		display: grid;
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		width: min(90vw, 700px);
		align-items: center;
		gap: 0.5em;
	}

	.rsvp-cell {
		text-align: center;
		font-size: clamp(1.5rem, 4vw, 2.75rem);
		line-height: 1.2;
		color: #e8e4dc;
		white-space: nowrap;
		overflow: visible;
		transition:
			opacity 0.12s ease,
			font-weight 0.12s ease;
	}
</style>
