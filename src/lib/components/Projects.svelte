<script>
	const projects = [
		{
			title: 'Automated Fish Measurement System',
			description:
				'End-to-end <span class="tldr-em">computer vision platform</span> that replaced manual fish measurement workflows for enterprise clients. Led architecture from <span class="tldr-em">hackathon prototype to full production</span> deployment on Azure with <span class="tldr-em">Temporal orchestration</span>, <span class="tldr-em">GPU-backed ML endpoints</span>, and horizontally scalable worker pods processing <span class="tldr-em">~960 images daily</span>.',
			tags: ['AI', 'Computer Vision', 'Distributed Systems'],
			year: '2026',
			stats: [
				{ value: '95%', label: 'Processing time cut' },
				{ value: '960', label: 'Images per day' },
				{ value: '15 min', label: 'Was 6-10 hours' }
			]
		},
		{
			title: 'Gift Inventory Management System',
			description:
				'Full-stack inventory system built with Svelte, Express.js, and MongoDB, serving <span class="tldr-em">500+ concurrent users</span> with <span class="tldr-em">role-based access control</span>. Self-hosted on NGINX with PM2 workers, maintained in <span class="tldr-em">continuous production for over 4 years</span> with ongoing uptime, version updates, and backward compatibility.',
			tags: ['Full-Stack', 'Self-Hosted', 'Svelte'],
			year: '2021',
			stats: [
				{ value: '500+', label: 'Active users' },
				{ value: '4+ yrs', label: 'In production' },
				{ value: '80%', label: 'Effort reduced' }
			]
		}
	];
</script>

<section id="work" class="mx-auto max-w-5xl px-6 py-10 md:py-16">
	<h2 class="mb-1 text-xl font-semibold text-balance text-ink md:text-2xl">notable projects</h2>
	<p class="mb-8 text-sm text-pretty text-ink-muted">Built, shipped, and running in production.</p>

	<div class="grid grid-rows-[1fr] gap-5 md:grid-cols-2">
		{#each projects as project}
			<div
				class="grid grid-rows-[auto_auto_1fr_auto] rounded-lg border border-border bg-card p-5 md:p-6"
			>
				<div class="mb-3 flex flex-wrap items-center gap-2">
					{#each project.tags as tag}
						<span
							class="rounded-full border border-border bg-cream px-2.5 py-0.5 text-xs font-medium text-ink-light"
							>{tag}</span
						>
					{/each}
					<span class="ml-auto text-xs text-ink-muted">{project.year}</span>
				</div>

				<h3 class="mb-1.5 text-lg font-semibold text-balance text-ink">{project.title}</h3>
				<p class="tldr-dim text-sm text-pretty text-ink-light">{@html project.description}</p>

				{#if project.stats.length > 0}
					<div class="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
						{#each project.stats as stat}
							<div>
								<p class="text-xl font-bold text-ink tabular-nums">{stat.value}</p>
								<p class="text-xs text-ink-muted">{stat.label}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
