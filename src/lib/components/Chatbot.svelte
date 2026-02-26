<script>
	const starters = [
		"What's the most complex system you've built?",
		'Tell me about the fish measurement project.',
		"What's your tech stack of choice?",
		'How do you approach system design?',
		'What hackathons have you won?'
	];

	/** @type {{ role: 'user' | 'assistant', content: string }[]} */
	let messages = $state([]);
	let input = $state('');
	let loading = $state(false);
	/** @type {HTMLElement | null} */
	let messagesEnd = $state(null);

	function scrollToBottom() {
		messagesEnd?.scrollIntoView({ behavior: 'smooth' });
	}

	async function send(text = input.trim()) {
		if (!text || loading) return;
		input = '';

		messages.push({ role: 'user', content: text });
		loading = true;
		scrollToBottom();

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: messages.map((m) => ({ role: m.role, content: m.content }))
				})
			});

			if (!res.ok) {
				messages.push({ role: 'assistant', content: 'Sorry, something went wrong. Try again later.' });
				loading = false;
				scrollToBottom();
				return;
			}

			messages.push({ role: 'assistant', content: '' });
			const idx = messages.length - 1;

			const reader = res.body?.getReader();
			const decoder = new TextDecoder();

			if (reader) {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					messages[idx].content += decoder.decode(value, { stream: true });
					scrollToBottom();
				}
			}
		} catch {
			messages.push({ role: 'assistant', content: 'Sorry, something went wrong. Try again later.' });
		}

		loading = false;
		scrollToBottom();
	}

	function handleKeydown(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}
</script>

<section class="mx-auto max-w-5xl px-6 py-10 md:py-16">
	<h2 class="mb-1 text-balance text-xl font-semibold text-ink md:text-2xl">curious? just ask</h2>
	<p class="mb-6 text-sm text-pretty text-ink-muted">
		An AI trained on my background. Ask about my work, stack, or projects.
	</p>

	<div class="rounded-lg border border-border bg-card">
		<div class="flex flex-col gap-3 p-4" style="min-height: 260px; max-height: 400px; overflow-y: auto;">
			{#if messages.length === 0}
				<div class="flex flex-1 flex-col items-center justify-center gap-3">
					<p class="text-xs text-ink-muted">Pick a question or type your own.</p>
					<div class="flex flex-wrap justify-center gap-1.5">
						{#each starters as q}
							<button
								class="rounded-full border border-border bg-cream px-3 py-1.5 text-left text-xs text-ink-light transition-colors hover:border-ink-muted hover:text-ink"
								onclick={() => send(q)}
							>{q}</button>
						{/each}
					</div>
				</div>
			{:else}
				{#each messages as msg}
					<div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
						<div
							class="max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed {msg.role === 'user'
								? 'bg-ink text-cream'
								: 'bg-cream-dark text-ink'}"
						>
							{#if msg.content}
								<p class="whitespace-pre-wrap">{msg.content}</p>
							{:else}
								<span class="inline-block size-1.5 rounded-full bg-ink-muted" style="animation: pulse 1.2s infinite"></span>
								<span class="inline-block size-1.5 rounded-full bg-ink-muted" style="animation: pulse 1.2s infinite 0.2s"></span>
								<span class="inline-block size-1.5 rounded-full bg-ink-muted" style="animation: pulse 1.2s infinite 0.4s"></span>
							{/if}
						</div>
					</div>
				{/each}
			{/if}
			<div bind:this={messagesEnd}></div>
		</div>

		<div class="border-t border-border p-3">
			<div class="flex gap-2">
				<input
					type="text"
					bind:value={input}
					onkeydown={handleKeydown}
					placeholder="Ask something..."
					class="flex-1 rounded-lg border border-border bg-cream px-3 py-2 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-ink-muted"
				/>
				<button
					onclick={() => send()}
					disabled={loading || !input.trim()}
					class="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-cream transition-opacity disabled:opacity-40"
				>Send</button>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes pulse {
		0%, 80%, 100% { opacity: 0.3; }
		40% { opacity: 1; }
	}
</style>
