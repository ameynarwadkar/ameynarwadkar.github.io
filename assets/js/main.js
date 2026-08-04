document.addEventListener("DOMContentLoaded", () => {
	// 1. Initialize Lucide Icons
	if (typeof lucide !== 'undefined') {
		lucide.createIcons();
	}

	// 2. Initialize Particles.js (tsParticles)
	if (typeof tsParticles !== 'undefined') {
		tsParticles.load("particles-js", {
			background: {
				color: { value: "transparent" },
			},
			fpsLimit: 120,
			interactivity: {
				events: {
					onClick: { enable: true, mode: "push" },
					onHover: { enable: true, mode: "repulse" },
				},
				modes: {
					push: { quantity: 4 },
					repulse: { distance: 200, duration: 0.4 },
				},
			},
			particles: {
				color: { value: "#ffffff" },
				links: {
					color: "#ffffff",
					distance: 150,
					enable: true,
					opacity: 0.5,
					width: 1,
				},
				move: {
					direction: "none",
					enable: true,
					outModes: { default: "bounce" },
					random: false,
					speed: 2,
					straight: false,
				},
				number: { density: { enable: true }, value: 80 },
				opacity: { value: 0.5 },
				shape: { type: "circle" },
				size: { value: { min: 1, max: 5 } },
			},
			detectRetina: true,
		});
	}

	// 3. Populate Skills Marquee
	const techIcons = [
		{ name: "Python", color: "#3776ab", icon: "cpu" },
		{ name: "SQL", color: "#4479A1", icon: "database" },
		{ name: "Bash", color: "#4EAA25", icon: "terminal" },
		{ name: "PyTorch", color: "#EE4C2C", icon: "brain" },
		{ name: "LangGraph", color: "#1c7ed6", icon: "git-branch" },
		{ name: "FastAPI", color: "#009688", icon: "zap" },
		{ name: "Azure OpenAI", color: "#0078D4", icon: "cloud" },
		{ name: "Pinecone", color: "#000000", icon: "layers" },
		{ name: "ONNX Runtime", color: "#005CED", icon: "activity" },
		{ name: "CrewAI", color: "#FF4B4B", icon: "users" },
		{ name: "Langfuse", color: "#2E3B4E", icon: "eye" },
		{ name: "Docker", color: "#2496ED", icon: "box" },
		{ name: "Git", color: "#F05032", icon: "file-code" },
		{ name: "Linux", color: "#FCC624", icon: "terminal" },
		{ name: "Pydantic", color: "#e92063", icon: "shield" },
		{ name: "Google ADK", color: "#4285F4", icon: "cpu" },
	];

	const row1 = techIcons.slice(0, 8);
	const row2 = techIcons.slice(8);

	const generateMarqueeHTML = (items) => {
		// Repeat 2 times for seamless infinite scroll
		let html = '';
		for (let j = 0; j < 2; j++) {
			items.forEach(item => {
				html += `
                <div class="marquee-pair">
                    <i data-lucide="${item.icon}" style="color: ${item.color}; width: 22px; height: 22px;"></i>
                    <span class="marquee-text">${item.name}</span>
                </div>`;
			});
		}
		return html;
	};

	document.getElementById('marquee-row-1').innerHTML = generateMarqueeHTML(row1);
	document.getElementById('marquee-row-2').innerHTML = generateMarqueeHTML(row2);
	lucide.createIcons(); // Re-init icons for newly added ones

	// 4. Populate and Filter Projects (organized by year)
	const projectList = [
		// 2026 - Current Research & Engineering
		{ id: "thesis-kg", name: "Thesis: Neuro-Symbolic Knowledge Graph Completion for Biomedical Discovery", year: 2026, category: "research", tags: ["PyKEEN", "AnyBURL", "PubMedBERT", "Graph Attention Networks", "Neo4j"], desc: "M.Sc. thesis building a neuro-symbolic KG completion pipeline over OptimusKG (12M+ edges). Combines PubMedBERT semantic embeddings with AnyBURL logical rule injection into a KBGAT architecture.<br/><br/><b>0.5306</b> MRR (RotatE Baseline)<br/><b>5.84%</b> vs <b>3.67%</b> Hits@10 (KBGAT vs Plain GAT)<br/><b>0.59%</b> Hits@10 (32-dim bottleneck)", image: "images/image.png", imageFit: "contain", imageBg: "#000000" },
		{ id: "multi-agent-research-system", name: "Multi-Agent Research System", year: 2026, category: "engineering", tags: ["Google ADK", "LangGraph", "FastAPI", "Python", "Academic Search"], desc: "LangGraph-based multi-agent system orchestrating specialized agents to search academic databases (ArXiv, PubMed, OpenAlex), extract evidence, and synthesize literature reviews.<br/><br/><b>80%</b> latency reduction via parallel verification & caching<br/><b>4×</b> grounding accuracy improvement via Atomic Fact Extraction", image: "images/research_agent_thumbnail.png", github: "https://github.com/ameynarwadkar/adk-research-agent", imageFit: "contain", imageBg: "#000000" },
		{ id: "anyrag", name: "AnyRAG: Hybrid RAG System", year: 2026, category: "engineering", tags: ["Azure OpenAI", "Qdrant", "FastAPI", "BM25", "FlashRank", "Ragas"], desc: "Production-ready Hybrid RAG system over EU regulations featuring BM25 & dense retrieval with Reciprocal Rank Fusion, ONNX-powered FlashRank reranking, and semantic caching.<br/><br/><b>96.8%</b> Recall@10 & <b>0.891</b> nDCG@10 (Hybrid RRF)<br/><b>5.9%</b> MRR improvement over BM25", image: "images/AnyRAG.png", github: "https://github.com/ameynarwadkar/AnyRAG", website: "https://any-rag.vercel.app/", imageFit: "contain", imageBg: "#0a0a0a" },

		// 2025 - Research & Optimization
		{ id: "char-aware-typos", name: "char-aware-typos", year: 2025, category: "research", tags: ["NLP", "Language Models", "Python"], desc: "Evaluated character-aware sentence encoders for robustness to misspellings. Analyzed how character-level models maintain stable embeddings and retrieval accuracy under controlled typo noise across multiple corpora.<br/><br/><b>0.046</b> vs <b>0.462</b> Accuracy Drop (CANINE vs BERT under typo attack)", image: "images/charlm_thumbnail.png", github: "https://github.com/ameynarwadkar/char-aware-typos", imageFit: "contain", imageBg: "#000000" },
		{ id: "bert-early-exit-halting", name: "bert-early-exit-halting", year: 2025, category: "research", tags: ["BERT", "Optimization", "Machine Learning"], desc: "Explored adaptive halting strategies for early-exit BERT inference with micro self-verification. Quantified trade-offs between computational cost reduction and accuracy retention across classification tasks.", image: "images/effnlp_thumbnail.png", github: "https://github.com/ameynarwadkar/bert-early-exit-halting", imageFit: "contain", imageBg: "#000000" },

		// 2024 - Core Development
		{ id: "tennis-analysis", name: "Tennis Analysis System", year: 2024, category: "engineering", tags: ["Computer Vision", "Machine Learning", "Tracking"], desc: "Advanced computer vision system for analyzing tennis matches, tracking player movements, ball trajectories, and key stats.", image: "images/tennis.jpg", github: "https://github.com/ameynarwadkar/Tennis-Analysis-System", imageFit: "contain", imageBg: "#000000" },

		// 2023 - Foundation
		{ id: "ml-from-scratch", name: "ML Algorithms from Scratch", year: 2023, category: "research", tags: ["Python", "Mathematics", "NumPy"], desc: "Implemented core ML algorithms from scratch in Python — linear/logistic regression, decision trees, SVMs, k-means, PCA — with mathematical derivations and gradient computations, no sklearn.", image: "images/ml_algo_thumbnail.png", github: "https://github.com/ameynarwadkar/ML-algorithms-from-scratch", imageFit: "contain", imageBg: "#000000" },
	];

	let searchQuery = '';

	const renderProjects = () => {
		// Filter projects based on search
		const filtered = projectList.filter(p =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
			p.year.toString().includes(searchQuery)
		);

		// Sort by year descending
		filtered.sort((a, b) => b.year - a.year);

		const grid = document.getElementById('projects-grid');
		grid.className = 'writings-thread'; // Use the timeline container class
		grid.style.marginTop = '40px';

		grid.innerHTML = filtered.map(proj => `
			<div class="thread-item smooth-reveal">
				<div class="thread-line">
					<div class="thread-dot"></div>
				</div>
				<div class="writing-card-vertical timeline-project-card" onclick="window.location.href='projects/${proj.id}.html'">
					<div class="timeline-project-img item-img" style="${proj.imageBg ? `background-color: ${proj.imageBg};` : ''}">
						<img src="${proj.image}" alt="${proj.name}" style="width: 100%; height: 100%; ${proj.imageFit ? `object-fit: ${proj.imageFit}; object-position: center; padding: 10px;` : 'object-fit: cover;'}" />
					</div>
					<div class="item-details" style="flex: 1; padding: 24px; display: flex; flex-direction: column; justify-content: center;">
						<div class="item-header">
							<div class="title-row" style="display: flex; align-items: center; gap: 8px;">
								<h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: var(--text-main);">${proj.name}</h3>
								<span class="category-badge ${proj.category}">${proj.category}</span>
								<span class="year-pill" style="margin-left: auto; font-family: monospace; font-size: 0.9rem; color: #888;">${proj.year}</span>
							</div>
							<div class="tags-row" style="margin-top: 12px;">
								${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
							</div>
						</div>
						<p class="item-desc" style="margin-top: 16px; font-size: 0.95rem; line-height: 1.6; color: var(--text-dim);">${proj.desc}</p>
						<div class="project-links" style="margin-top: auto; padding-top: 16px;">
							${proj.github ? `
							<a href="${proj.github}" target="_blank" rel="noreferrer" class="btn-github" onclick="event.stopPropagation()">
								<svg viewBox="0 0 24 24" style="width: 14px; height: 14px;" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub
							</a>` : ''}
							${proj.website ? `
							<a href="${proj.website}" target="_blank" rel="noreferrer" class="btn-website" onclick="event.stopPropagation()">
								<i data-lucide="globe" style="width: 14px; height: 14px;"></i> Demo
							</a>` : ''}
						</div>
					</div>
				</div>
			</div>
		`).join('');
		lucide.createIcons();
	};

	document.getElementById('project-search').addEventListener('input', (e) => {
		searchQuery = e.target.value;
		renderProjects();
	});

	renderProjects(); // Initial render

	// 5. Dock interaction
	const dock = document.getElementById('nav-dock');
	if (dock) {
		dock.addEventListener('click', (e) => {
			// Ignore if clicking a button inside
			if (e.target.closest('button') || e.target.closest('a')) return;
			dock.classList.add('dock-expand');
			setTimeout(() => dock.classList.remove('dock-expand'), 300);
		});
	}

	// 6. Specular Button Effect for .btn-primary and .btn-ghost
	const specularBtns = document.querySelectorAll('.btn-primary, .btn-ghost');

	document.addEventListener('mousemove', (e) => {
		specularBtns.forEach(btn => {
			const rect = btn.getBoundingClientRect();

			// Calculate position relative to the button
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// Check proximity (190px as per the React component)
			// Center of the button
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			// Distance from mouse to center
			const distX = e.clientX - (rect.left + centerX);
			const distY = e.clientY - (rect.top + centerY);
			const distance = Math.sqrt(distX * distX + distY * distY);

			// Proximity check: 190px from the center
			if (distance < 190 + Math.max(rect.width, rect.height) / 2) {
				btn.style.setProperty('--x', `${x}px`);
				btn.style.setProperty('--y', `${y}px`);
				btn.classList.add('in-proximity');
			} else {
				btn.classList.remove('in-proximity');
			}
		});
	});
});