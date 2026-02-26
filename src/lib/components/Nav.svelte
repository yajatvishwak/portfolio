<script>
	let mobileOpen = $state(false);
	let dark = $state(false);
	let tldr = $state(false);
	let menuOpen = $state(false);
	let overDark = $state(false);

	/** @type {{ show: () => void } | null} */
	let rsvpRef = $state(null);

	const links = [
		{ label: 'work', href: '#work' },
		{ label: 'about', href: '#about' },
		{ label: 'contact', href: '#contact' }
	];

	export function setRsvpRef(ref) {
		rsvpRef = ref;
	}

	$effect(() => {
		dark = document.documentElement.classList.contains('dark');
		tldr = document.documentElement.classList.contains('tldr');
	});

	$effect(() => {
		const el = document.getElementById('skills');
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => { overDark = entry.isIntersecting; },
			{ rootMargin: '0px 0px -95% 0px' }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});

	let inverted = $derived(!dark && overDark);

	function toggleDark() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}

	export function toggleTldr() {
		tldr = !tldr;
		document.documentElement.classList.toggle('tldr', tldr);
		menuOpen = false;
	}

	export function openRsvp() {
		menuOpen = false;
		rsvpRef?.show();
	}

	function close() {
		mobileOpen = false;
		menuOpen = false;
	}

	function handleClickOutside(e) {
		if (menuOpen && !e.target.closest('[data-menu]')) {
			menuOpen = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<nav class="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md transition-colors duration-300 {inverted ? 'border-[#2e2d2a] bg-[#1a1c18]/80' : 'border-border bg-cream/10'}">
	<div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
		<a href="#top" class="font-title text-lg font-semibold tracking-tight transition-colors duration-300 {inverted ? 'text-[#e0ddd5]' : 'text-ink'}" onclick={close}
			>/yajat</a
		>

		<div class="hidden items-center gap-7 md:flex">
			{#each links as link}
				<a
					href={link.href}
					class="text-sm font-medium transition-colors duration-300 {inverted ? 'text-[#8a8880] hover:text-[#e0ddd5]' : 'text-ink-light hover:text-ink'}"
					>{link.label}</a
				>
			{/each}
			<a
				href="/Yajat_Vishwakarma_Resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium transition-colors duration-300 {inverted ? 'text-[#8a8880] hover:text-[#e0ddd5]' : 'text-ink-light hover:text-ink'}">cv</a
			>

			<!-- Dropdown trigger -->
			<div class="relative" data-menu>
				<button
					onclick={(e) => {
						e.stopPropagation();
						menuOpen = !menuOpen;
					}}
					class="flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors duration-300 {inverted ? 'border-[#2e2d2a] text-[#6b6860] hover:border-[#8a8880] hover:text-[#e0ddd5]' : 'border-border text-ink-muted hover:border-ink-muted hover:text-ink'}"
					aria-label="View modes"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
							cx="12"
							cy="12"
							r="3"
						/></svg
					>
					<span class="text-xs font-medium">View</span>
				</button>

				{#if menuOpen}
					<div
						class="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card py-1 shadow-lg"
					>
						<button
							onclick={toggleTldr}
							class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream-dark"
						>
							<span class="flex items-center gap-2.5 text-ink">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path
										d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
									/></svg
								>
								Highlight
							</span>
							<span class="rounded bg-cream px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
								{navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl'}B
							</span>
						</button>
						<button
							onclick={openRsvp}
							class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-cream-dark"
						>
							<span class="flex items-center gap-2.5 text-ink">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
								>
								Speed Read
							</span>
							<span class="rounded bg-cream px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
								{navigator?.platform?.includes('Mac') ? '⌘' : 'Ctrl'}I
							</span>
						</button>
					</div>
				{/if}
			</div>

			<button
				onclick={toggleDark}
				class="flex size-8 items-center justify-center rounded-full transition-colors duration-300 {inverted ? 'text-[#6b6860] hover:text-[#e0ddd5]' : 'text-ink-muted hover:text-ink'}"
				aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if dark}
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
						><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line
							x1="12"
							y1="21"
							x2="12"
							y2="23"
						/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
							x1="18.36"
							y1="18.36"
							x2="19.78"
							y2="19.78"
						/><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line
							x1="4.22"
							y1="19.78"
							x2="5.64"
							y2="18.36"
						/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg
					>
				{:else}
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
						><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg
					>
				{/if}
			</button>
		</div>

		<!-- Mobile -->
		<div class="flex items-center gap-2 md:hidden">
			<div class="relative" data-menu>
				<button
					onclick={(e) => {
						e.stopPropagation();
						menuOpen = !menuOpen;
					}}
					class="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-ink-muted transition-colors hover:border-ink-muted hover:text-ink"
					aria-label="View modes"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle
							cx="12"
							cy="12"
							r="3"
						/></svg
					>
					<span class="text-[10px] font-medium">View</span>
				</button>

				{#if menuOpen}
					<div
						class="absolute right-0 mt-2 w-52 rounded-lg border border-border bg-card py-1 shadow-lg"
					>
						<button
							onclick={toggleTldr}
							class="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-cream-dark"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path
									d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
								/></svg
							>
							Highlight
						</button>
						<button
							onclick={openRsvp}
							class="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-cream-dark"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg
							>
							Speed Read
						</button>
					</div>
				{/if}
			</div>

			<button
				onclick={toggleDark}
				class="flex size-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink"
				aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if dark}
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
						><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line
							x1="12"
							y1="21"
							x2="12"
							y2="23"
						/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
							x1="18.36"
							y1="18.36"
							x2="19.78"
							y2="19.78"
						/><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line
							x1="4.22"
							y1="19.78"
							x2="5.64"
							y2="18.36"
						/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg
					>
				{:else}
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
						><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg
					>
				{/if}
			</button>
			<button
				class="flex size-8 items-center justify-center"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
			>
				{#if mobileOpen}
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
						stroke-linejoin="round"
						><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line
							x1="3"
							y1="18"
							x2="21"
							y2="18"
						/></svg
					>
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div class="border-t border-border px-6 pb-3 md:hidden">
			<ul class="flex flex-col gap-3 pt-3">
				{#each links as link}
					<li>
						<a
							href={link.href}
							class="text-sm font-medium text-ink-light transition-colors hover:text-ink"
							onclick={close}>{link.label}</a
						>
					</li>
				{/each}
				<li>
					<a
						href="/Yajat_Vishwakarma_Resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm font-medium text-ink-light transition-colors hover:text-ink"
						onclick={close}>cv</a
					>
				</li>
			</ul>
		</div>
	{/if}
</nav>
