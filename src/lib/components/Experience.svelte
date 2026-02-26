<script>
	const roles = [
		{
			period: 'Feb 2024 – Present',
			title: 'Associate Software Developer',
			company: 'Eurofins IT Solutions',
			sections: [
				{
					subtitle: 'AI Engineering Team',
					bullets: [
						{ text: '<span class="tldr-em">Led end-to-end architecture</span> and implementation of automated fish measurement system from <span class="tldr-em">concept to production</span>', key: true },
						{ text: 'Built initial prototype during internal hackathon and drove it to full enterprise deployment', key: false },
						{ text: 'Reduced manual batch processing time from <span class="tldr-em">6–10 hours to 15 minutes</span> per 80 images', key: true },
						{ text: 'Introduced and productionized <span class="tldr-em">Temporal</span> for asynchronous workflow orchestration with <span class="tldr-em">horizontally scalable</span> worker pods on AKS', key: true },
						{ text: 'Integrated <span class="tldr-em">GPU-backed Azure ML endpoints</span> and tuned inference performance across distributed workers', key: false },
						{ text: 'Built skeletonization pipeline using medial axis algorithm to measure fish from SAM2 masks', key: false },
						{ text: 'Presented product directly to <span class="tldr-em">US-based enterprise clients</span>', key: true }
					]
				},
				{
					subtitle: 'Archiving Team',
					bullets: [
						{ text: 'Contributed to distributed archival system storing study reports with 30–40 year retention', key: false },
						{ text: 'Built custom .NET streaming uploader handling files up to <span class="tldr-em">10 GB</span> with checksum validation', key: false },
						{ text: 'Re-architected email notification system, reducing latency from <span class="tldr-em">24 hours to 5 minutes</span>', key: true }
					]
				},
				{
					subtitle: 'Engineering Contributions',
					bullets: [
						{ text: 'Introduced <span class="tldr-em">Tailwind CSS</span> to frontend stack, led <span class="tldr-em">Angular upgrade from v18 to v21</span>', key: true },
						{ text: 'Influenced adoption of Temporal for structured async workflows across the org', key: false },
						{ text: 'Owned feature delivery <span class="tldr-em">end-to-end</span>: design, development, testing, UAT, production rollout', key: true }
					]
				}
			]
		},
		{
			period: 'Jul 2023 – Jan 2024',
			title: 'Technical Cloud Consultant',
			company: 'Oracle',
			sections: [
				{
					subtitle: null,
					bullets: [
						{ text: 'Built <span class="tldr-em">OCR-based invoice extraction</span> solution using Python and OCI ML services', key: true },
						{ text: 'Developed VBCS interface enabling invoice upload and structured JSON output for ERP ingestion', key: false },
						{ text: 'Onboarded <span class="tldr-em">4 enterprise clients</span> including Berger Paints and Maersk', key: true },
						{ text: 'Mentored <span class="tldr-em">7 junior consultants</span> over 4 months', key: true },
						{ text: 'Conducted 2-day workshop for 30+ participants on Python and Generative AI APIs', key: false }
					]
				}
			]
		}
	];
</script>

<section id="about" class="mx-auto max-w-5xl px-6 py-10 md:py-16">
	<h2 class="mb-1 text-balance text-xl font-semibold text-ink md:text-2xl">experience</h2>
	<p class="mb-8 text-sm text-pretty text-ink-muted">From concept to production, end-to-end.</p>

	<div class="flex flex-col gap-8">
		{#each roles as role}
			<div class="grid gap-2 md:grid-cols-[1fr_180px] md:gap-6">
				<div>
					<h3 class="text-balance text-base font-semibold text-ink">{role.title}</h3>
					<p class="mb-3 text-sm text-ink-light">{role.company}</p>

					{#each role.sections as section, i}
						{#if section.subtitle}
							<p class="mt-3 mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">{section.subtitle}</p>
						{/if}
						<ul class="flex flex-col gap-1 {i < role.sections.length - 1 ? 'mb-2' : ''}">
							{#each section.bullets as bullet}
								<li class="flex gap-2 text-pretty text-sm text-ink-light {bullet.key ? '' : 'tldr-fade'}">
									<span class="mt-1.5 size-1 shrink-0 rounded-full bg-ink-muted"></span>
									<span>{@html bullet.text}</span>
								</li>
							{/each}
						</ul>
					{/each}
				</div>
				<div class="text-xs text-ink-muted md:pt-0.5 md:text-right">{role.period}</div>
			</div>
		{/each}
	</div>
</section>
