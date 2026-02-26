<script>
	/** @type {Record<string, string>} */
	const iconSlug = {
		'C#': 'csharp',
		'Python': 'python',
		'SQL': 'mysql',
		'JavaScript': 'javascript',
		'TypeScript': 'typescript',
		'Node.js': 'nodedotjs',
		'.NET': 'dotnet',
		'ASP.NET': 'dotnet',
		'GraphQL': 'graphql',
		'SocketIO': 'socketdotio',
		'Express': 'express',
		'Fastify': 'fastify',
		'Flask': 'flask',
		'NGINX': 'nginx',
		'Angular': 'angular',
		'Tailwind CSS': 'tailwindcss',
		'SvelteKit': 'svelte',
		'React': 'react',
		'PostgreSQL': 'postgresql',
		'MSSQL': 'microsoftsqlserver',
		'MongoDB': 'mongodb',
		'SQLite': 'sqlite',
		'Temporal': 'temporal',
		'Azure Service Bus': 'microsoftazure',
		'Azure': 'microsoftazure',
		'Oracle Cloud': 'oracle',
		'GCP': 'googlecloud',
		'AKS': 'kubernetes',
		'Azure ML': 'microsoftazure',
		'Blob Storage': 'microsoftazure',
		'OpenCV': 'opencv',
		'scikit-image': 'scikitlearn',
		'Pinecone': 'pinecone',
		'LangChain': 'langchain',
		'PydanticAI': 'pydantic',
		'Docker': 'docker',
		'ECS': 'amazonecs',
		'GitHub Actions': 'githubactions',
		'Grafana': 'grafana',
		'Kibana': 'kibana',
		'ChromaDB': 'chroma',
		'REST APIs': 'openapiinitiative'
	};

	const ICON_COLOR = 'c8c4bc';

	const categories = [
		{
			name: 'Languages',
			items: ['C#', 'Python', 'SQL', 'JavaScript', 'TypeScript', 'Node.js']
		},
		{
			name: 'Backend',
			items: ['.NET', 'ASP.NET', 'REST APIs', 'GraphQL', 'SocketIO', 'Express', 'Fastify', 'Flask', 'NGINX']
		},
		{
			name: 'Frontend',
			items: ['Angular', 'Tailwind CSS', 'SvelteKit', 'React']
		},
		{
			name: 'Databases',
			items: ['PostgreSQL', 'MSSQL', 'MongoDB', 'SQLite']
		},
		{
			name: 'Distributed Systems',
			items: ['Temporal', 'Azure Service Bus', 'Queues', 'Dead Letter Queues']
		},
		{
			name: 'Cloud',
			items: ['Azure', 'Oracle Cloud', 'GCP', 'AKS', 'Azure ML', 'Blob Storage']
		},
		{
			name: 'AI & ML',
			items: ['Grounding DINO', 'SAM2', 'OpenCV', 'scikit-image', 'AprilTags', 'OCR']
		},
		{
			name: 'Generative AI',
			items: ['RAG', 'ChromaDB', 'Pinecone', 'LangChain', 'Instructor', 'PydanticAI', 'Agentic AI']
		},
		{
			name: 'DevOps',
			items: ['Docker', 'AKS', 'ECS', 'GitHub Actions', 'CI/CD']
		},
		{
			name: 'Monitoring',
			items: ['Serilog', 'Grafana', 'Kibana', 'Loki']
		}
	];

	function getIconUrl(item) {
		const slug = iconSlug[item];
		if (!slug) return null;
		return `https://cdn.simpleicons.org/${slug}/${ICON_COLOR}`;
	}

	function handleImgError(e) {
		e.target.style.display = 'none';
	}
</script>

<section id="skills" class="bg-[#1a1c18] py-10 md:py-16">
	<div class="mx-auto max-w-5xl px-6">
		<h2 class="mb-1 text-balance text-xl font-semibold text-[#e0ddd5] md:text-2xl">tools & skills</h2>
		<p class="mb-8 text-sm text-[#8a8880]">What I work with day to day.</p>

		<div class="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
			{#each categories as category}
				<div>
					<h3 class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#6b6860]">{category.name}</h3>
					<div class="flex flex-wrap gap-2">
						{#each category.items as item}
							{@const icon = getIconUrl(item)}
							<span class="inline-flex items-center gap-1.5 rounded-full border border-[#2e2d2a] bg-[#232320] px-3 py-1.5 text-xs font-medium text-[#c8c4bc]">
								{#if icon}
									<img
										src={icon}
										alt=""
										width="14"
										height="14"
										class="shrink-0"
										loading="lazy"
										onerror={handleImgError}
									/>
								{:else}
									<svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
								{/if}
								{item}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
