<script>
	const achievements = [
		{ icon: 'star', label: 'Award', title: 'Star Performer', detail: 'Eurofins · 2025 Q4' },
		{
			icon: 'trophy',
			label: '1st Place',
			title: 'Google Cloud & MongoDB Atlas Madness',
			detail: 'Hackathon · 2023'
		},
		{
			icon: 'trophy',
			label: 'Winner',
			title: 'International Build With AI',
			detail: 'Hackathon · 2022'
		},
		{
			icon: null,
			label: '3rd Place',
			title: 'Eurofins Technovate Hackathon',
			detail: 'Hackathon · 2025'
		},
		{
			icon: 'trophy',
			label: '1st Place',
			title: 'Eurofins ShipIt Hackathon',
			detail: 'Hackathon · 2025'
		},
		{
			icon: 'trophy',
			label: '1st Place',
			title: 'Eurofins Agro AI Hackathon',
			detail: 'Hackathon · 2025'
		},
		{
			icon: 'newspaper',
			label: 'Featured',
			title: 'Times of India',
			detail: 'News Article · 2016'
		}
	];
</script>

<section class="mx-auto max-w-5xl px-6 py-10 md:py-16">
	<h2 class="mb-1 text-xl font-semibold text-balance text-ink md:text-2xl">achievements</h2>
	<p class="mb-8 text-sm text-pretty text-ink-muted">Hackathons won and awards earned.</p>

	<div class="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each achievements as a}
			<div
				class="flex h-full flex-col rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
			>
				<span
					class="mb-3 flex w-fit items-center gap-1.5 rounded-full border border-border bg-cream-dark px-2.5 py-0.5 text-[10px] font-semibold text-ink-light"
				>
					{#if a.icon === 'trophy'}
						<svg
							class="achv-badge-icon"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M8 21h8" />
							<path d="M12 17v4" />
							<path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
							<path d="M17 5h3v1a5 5 0 0 1-3 4" />
							<path d="M7 5H4v1a5 5 0 0 0 3 4" />
						</svg>
					{:else if a.icon === 'star'}
						<svg class="achv-badge-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path
								d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
							/>
						</svg>
					{:else if a.icon === 'newspaper'}
						<svg
							class="achv-badge-icon"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M6 3h12a2 2 0 0 1 2 2v14" />
							<path d="M6 3v16a2 2 0 0 0 2 2h12" />
							<path d="M6 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
							<path d="M10 7h8" />
							<path d="M10 11h8" />
							<path d="M10 15h6" />
						</svg>
					{/if}
					{a.label}
				</span>

				<p class="achv-title tldr-em text-sm leading-snug font-semibold text-balance text-ink">
					{a.title}
				</p>
				<p class="achv-detail tldr-fade mt-1 text-xs text-ink-muted">{a.detail}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	.achv-title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
	}

	.achv-detail {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.achv-badge-icon {
		width: 12px;
		height: 12px;
		flex: 0 0 12px;
		opacity: 0.9;
	}
</style>
