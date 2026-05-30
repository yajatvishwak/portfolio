<script>
	const projects = [
		{
			title: 'Automated Fish Measurement System',
			description:
				'End-to-end <span class="tldr-em">computer vision platform</span> that replaced manual fish measurement workflows for enterprise clients. Led architecture from <span class="tldr-em">hackathon prototype to full production</span> deployment on Azure with <span class="tldr-em">Temporal orchestration</span>, <span class="tldr-em">GPU-backed ML endpoints</span>, and horizontally scalable worker pods processing <span class="tldr-em">~960 images daily</span>.',
			tags: ['AI', 'Computer Vision', 'Distributed Systems'],
			year: '2026',
			link: null,
			stats: [
				{ value: '95%', label: 'Processing time cut' },
				{ value: '$0', label: 'GPU cost (was $1.4k/mo)' },
				{ value: '960', label: 'Images per day' }
			]
		},
		{
			title: 'YuzuHire',
			description:
				'<span class="tldr-em">AI-powered screening interview platform</span>. AI conducts structured Round 1 phone interviews, generates <span class="tldr-em">evidence-backed candidate reports</span> with scoring. Monorepo: SvelteKit on <span class="tldr-em">Cloudflare Workers</span>, Python FastAPI voice gateway on EC2, Trigger.dev for background jobs.',
			tags: ['SaaS', 'AI Agents', 'Full-Stack'],
			year: '2025',
			link: 'https://yuzuhire.com',
			stats: [
				{ value: 'Live', label: 'Product status' },
				{ value: 'AI', label: 'Voice interviews' },
				{ value: '5', label: 'Services in monorepo' }
			]
		},
		{
			title: 'VisionDistill',
			description:
				'Open-source <span class="tldr-em">ML model distillation framework</span>. Uses foundation models (<span class="tldr-em">SAM2/SAM3, Grounding DINO</span>) to generate pseudo-labels, then trains smaller student models (<span class="tldr-em">YOLO, SegFormer</span>). Supports segmentation and detection with COCO-format export.',
			tags: ['ML', 'Open Source', 'Python'],
			year: '2025',
			link: 'https://github.com/yajatvishwak/visiondistill',
			stats: [
				{ value: '3', label: 'Teacher models' },
				{ value: '2', label: 'Student architectures' },
				{ value: 'Auto', label: 'Dataset generation' }
			]
		},
		{
			title: 'Deside',
			description:
				'<span class="tldr-em">AI-powered decision maker</span>. Type a dilemma, get a weighted decision matrix, score options, then have a <span class="tldr-em">Socratic debate</span> with an AI agent who pressure-tests your choice. Built with SvelteKit 5, Tailwind v4, and Claude Sonnet.',
			tags: ['AI', 'SvelteKit', 'Decision Tools'],
			year: '2025',
			link: null,
			stats: [
				{ value: '3', label: 'Interaction phases' },
				{ value: 'Live', label: 'Scoring matrix' },
				{ value: 'AI', label: 'Socratic debate' }
			]
		}
	];
</script>

<section id="work" class="mx-auto max-w-5xl px-6 py-10 md:py-16">
	<h2 class="mb-1 text-xl font-semibold text-balance text-ink md:text-2xl">notable projects</h2>
	<p class="mb-8 text-sm text-pretty text-ink-muted">Built, shipped, and running in production.</p>

	<div class="grid gap-5 md:grid-cols-2">
		{#each projects as project}
			<div
				class="grid grid-rows-[auto_auto_1fr_auto] rounded-lg border border-border bg-card p-5 md:p-6 transition-shadow hover:shadow-md"
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

				<div class="mb-1.5 flex items-center gap-2">
					<h3 class="text-lg font-semibold text-balance text-ink">{project.title}</h3>
					{#if project.link}
						<a href={project.link} target="_blank" rel="noopener noreferrer" class="text-ink-muted transition-colors hover:text-ink" aria-label="Visit {project.title}">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
						</a>
					{/if}
				</div>
				<!-- @html safe: project.description is static content from projects array only -->
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
