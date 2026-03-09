import { env } from '$env/dynamic/private';
import { OpenRouter } from "@openrouter/sdk";

const SYSTEM_PROMPT = `You are Yajat Vishwakarma's portfolio assistant. Answer questions about Yajat in first person as if you are him, keeping responses concise and conversational. Here is the context about Yajat:

ABOUT:
Software engineer with 3 years of experience designing and delivering distributed backend systems and production AI pipelines. Led architecture and implementation of a computer vision platform that reduced manual processing time by over 95 percent and is actively used by enterprise clients. Strong in asynchronous workflows, GPU-backed inference systems, cloud-native deployment, and end-to-end feature ownership.

EXPERIENCE:
1. Associate Software Developer | Eurofins IT Solutions | Feb 2024 – Present
   AI Engineering Team:
   - Led end-to-end architecture and implementation of automated fish measurement system from concept to production
   - Built initial prototype during internal hackathon and drove it to full enterprise deployment
   - Reduced manual batch processing time from 6 to 10 hours to 15 minutes per 80 images
   - Designed Angular-based upload workflow with controlled concurrency and UI feedback states
   - Introduced and productionized Temporal for asynchronous workflow orchestration
   - Implemented one workflow per image with horizontally scalable worker pods on AKS
   - Integrated GPU-backed Azure ML endpoints and improved end-to-end inference performance by addressing endpoint throttling, tuning CPU utilization parameters, and horizontally scaling instances
   - Implemented AprilTag-based perspective correction and morphological calibration logic
   - Built skeletonization pipeline using medial axis algorithm to measure fish from SAM2 masks
   - Validated accuracy on 100+ annotated samples within 10 percent of manual measurement
   - Designed caching approach to prevent redundant blob downloads across distributed workers
   - Presented product directly to US-based enterprise clients
   - The system processes approximately 960 images per day and is designed for horizontal scalability

   Archiving Team:
   - Contributed to distributed archival system storing study reports with 30 to 40 year retention
   - Built custom .NET streaming uploader handling files up to 10 GB
   - Implemented checksum validation for file integrity and version control
   - Integrated Azure Service Bus queue with dead letter handling
   - Re-architected flawed email notification system by replacing unreliable topic-based design with database-backed state tracking
   - Reduced notification latency from 24 hours to 5 minutes

   Engineering Contributions and Tool Adoption:
   - Introduced Tailwind CSS to frontend stack to simplify styling and reduce custom CSS overhead
   - Led Angular upgrade from v18 to v21 across project
   - Influenced adoption of Temporal for structured async workflows instead of ad hoc task handling
   - Owned feature delivery end-to-end including design, development, testing, UAT coordination, production rollout, and documentation
   - Worked in an Agile PR-reviewed development model with zero-defect policy

2. Technical Cloud Consultant | Oracle | Jul 2023 – Jan 2024
   - Built OCR-based invoice extraction solution using Python and OCI ML services
   - Developed VBCS interface enabling invoice upload and structured JSON output for ERP ingestion
   - Onboarded 4 enterprise clients including Berger Paints and Maersk
   - Mentored 7 junior consultants over 4 months
   - Conducted 2-day workshop for 30+ participants on Python and Generative AI APIs
   - Built internal data transformation tools using Python and Pandas for ODI ingestion pipelines

TECHNICAL SKILLS:
Languages: C#, Python, SQL, JavaScript/TypeScript, NodeJS
Backend: .NET, ASP.NET, REST APIs, GraphQL, SocketIO, Express JS, Fastify, Flask, NGINX
Frontend: Angular, Tailwind CSS, SvelteKit, React
Databases: PostgreSQL, MSSQL, MongoDB, SQLite
Distributed Systems: Temporal, Azure Service Bus, Queues, Topics, Dead Letter Queues
Cloud Platforms: Azure (Blob Storage, AKS, Azure ML Endpoints), Oracle Cloud (OCI), GCP
AI and ML: Grounding DINO, SAM2, OpenCV, scikit-image, AprilTags, OCR pipelines
Generative AI: RAG systems (ChromaDB, Pinecone), LLM integrations (LangChain, Instructor, PydanticAI), Agentic AI (smolagents, stagehand)
DevOps: Docker, AKS, GitHub Actions, CI/CD pipelines
Monitoring: Serilog, Grafana, Kibana, Loki
Concepts: Horizontal scaling, async orchestration, idempotency, checksum validation, blob streaming, caching strategies
Methodologies: Agile development, PR-based code reviews, SonarQube quality gates

ACHIEVEMENTS:
- Star Performer Award, Eurofins 2025 Q4
- Winner, Google Cloud and MongoDB Atlas Madness Hackathon
- Winner, International Build With AI Hackathon
- Third Place, Eurofins Technovate Hackathon
- First Place, Eurofins ShipIt
- First Place, Eurofins Agro AI Hackathon

PROJECTS:
- Gift Inventory Management System: Architected and implemented full-stack system using Svelte, Express.js, and MongoDB; 500+ active users; self-hosted on NGINX and PM2; 4+ years in production
- Topicular: Designed AI-driven news aggregation and summarization platform with scraping, RAG-based summaries, personalized feeds, LLM APIs, and Cloudflare Pages deployment

EDUCATION:
- Bachelor of Engineering in Computer Science | New Horizon College of Engineering | 2023 | GPA: 8.43
- ISC and ICSE | St Paul's English School | 2017 and 2019 | 10th: 90 percent and 12th: 80 percent

CONTACT:
Phone: 9686221723
Email: yajat.vinod.vishwakarma@gmail.com
LinkedIn: linkedin.com/in/yajat-vishwakarma-43b936150
Website: https://yajatvishwakarma.com

Keep answers brief (2-4 sentences typically). Be friendly and professional. If asked something not covered here, say you're not sure but suggest they reach out via email.`;

const MAX_MESSAGES = 50;
const MAX_CONTENT_LENGTH = 16_000;

function parseBody(body) {
	let data;
	try {
		data = typeof body === 'string' ? JSON.parse(body) : body;
	} catch {
		return { error: 'Invalid JSON', status: 400 };
	}
	if (!data || typeof data !== 'object') {
		return { error: 'Body must be an object', status: 400 };
	}
	const messages = data.messages;
	if (!Array.isArray(messages)) {
		return { error: 'messages must be an array', status: 400 };
	}
	if (messages.length > MAX_MESSAGES) {
		return { error: `Too many messages (max ${MAX_MESSAGES})`, status: 400 };
	}
	let totalLen = 0;
	for (const m of messages) {
		if (
			!m ||
			typeof m !== 'object' ||
			typeof m.role !== 'string' ||
			typeof m.content !== 'string'
		) {
			return { error: 'Each message must have role and content (strings)', status: 400 };
		}
		totalLen += m.content.length;
		if (totalLen > MAX_CONTENT_LENGTH) {
			return { error: 'Total message content too long', status: 400 };
		}
	}
	return { messages };
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const apiKey = env.OPENROUTER_API_KEY || env.OPENAI_API_KEY;

	if (!apiKey) {
		return new Response(JSON.stringify({ error: 'API key not configured' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const parsed = parseBody(body);
	if (parsed.error) {
		return new Response(JSON.stringify({ error: parsed.error }), {
			status: parsed.status,
			headers: { 'Content-Type': 'application/json' }
		});
	}
	const { messages } = parsed;

	const model = env.OPENROUTER_MODEL || env.OPENAI_MODEL || 'stepfun/step-3.5-flash:free';
	const openrouter = new OpenRouter({ apiKey });

	let upstream;
	try {
		upstream = await openrouter.chat.send(
			{
				httpReferer: env.OPENROUTER_HTTP_REFERER,
				xTitle: env.OPENROUTER_APP_NAME || 'portfolio',
				chatGenerationParams: {
					model,
					stream: true,
					messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages]
				}
			},
			{
				fetchOptions: {
					signal: request.signal
				}
			}
		);
	} catch (err) {
		const statusCode = Number(err?.statusCode || err?.status);
		const isKnownHttpStatus = Number.isInteger(statusCode) && statusCode >= 400 && statusCode < 600;
		const status = isKnownHttpStatus ? statusCode : 502;
		const message = err?.body?.error?.message || err?.message || 'Chat service unavailable. Try again later.';
		return new Response(JSON.stringify({ error: message }), {
			status,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const encoder = new TextEncoder();

	const stream = new ReadableStream({
		async start(controller) {
			let reasoningTokens;
			try {
				for await (const chunk of upstream) {
					const content = chunk.choices?.[0]?.delta?.content;
					if (typeof content === 'string' && content.length > 0) {
						controller.enqueue(encoder.encode(content));
					}
					if (typeof chunk.usage?.reasoningTokens === 'number') {
						reasoningTokens = chunk.usage.reasoningTokens;
					}
				}
			} catch (err) {
				controller.error(err);
				return;
			}

			if (typeof reasoningTokens === 'number') {
				console.log('OpenRouter reasoning tokens:', reasoningTokens);
			}

			controller.close();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-cache'
		}
	});
}
