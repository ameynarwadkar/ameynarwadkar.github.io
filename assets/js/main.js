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
		{ name: "RAG", color: "#7c3aed", icon: "search" },
		{ name: "Hugging Face", color: "#FFD21E", icon: "sparkles" },
		{ name: "ChromaDB", color: "#e85d4a", icon: "layers" },
		{ name: "Streamlit", color: "#FF4B4B", icon: "layout" },
		{ name: "Pydantic", color: "#e92063", icon: "shield" },
		{ name: "Docker", color: "#2496ED", icon: "box" },
		{ name: "Git", color: "#F05032", icon: "file-code" },
		{ name: "Linux", color: "#FCC624", icon: "globe" },
		{ name: "Pandas", color: "#150458", icon: "bar-chart-3" },
		{ name: "Scikit-Learn", color: "#F7931E", icon: "code-2" },
		{ name: "D3.js", color: "#f9a03c", icon: "activity" },
		{ name: "NLP", color: "#4CAF50", icon: "message-square" },
		{ name: "pytest", color: "#0a9396", icon: "check-circle" },
		{ name: "Machine Learning", color: "#47A248", icon: "cpu" },
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
		{ name: "Research Agent", year: 2026, category: "engineering", tags: ["Google ADK", "LLM Agents", "FastAPI", "Python", "Academic Search"], desc: "A multi-agent research assistant built with Google ADK that automatically searches academic databases (ArXiv, PubMed, OpenAlex), clusters papers, assesses evidence quality, and synthesizes a structured literature review.", image: "images/research_agent_thumbnail.png", github: "https://github.com/ameynarwadkar/adk-research-agent" },
		{ name: "EU Financial Regulation Hybrid RAG System", year: 2026, category: "engineering", tags: ["Azure OpenAI", "Qdrant", "FastAPI", "BM25", "FlashRank", "Ragas"], desc: "A hybrid RAG system querying 382 parsed articles of EU Regulations. Features dual-index search, RRF fusion, ONNX-powered FlashRank reranking, and schema-constrained LLM generation.", image: "images/finrag_thumbnail.png", github: "https://github.com/ameynarwadkar/finRAG" },

		// 2025 - Research & Optimization
		{ name: "char-aware-typos", year: 2025, category: "research", tags: ["NLP", "Language Models", "Python"], desc: "Evaluated character-aware sentence encoders for robustness to misspellings. Analyzed how character-level models maintain stable embeddings and retrieval accuracy under controlled typo noise across multiple corpora.", image: "images/charlm_thumbnail.png", github: "https://github.com/ameynarwadkar/char-aware-typos" },
		{ name: "bert-early-exit-halting", year: 2025, category: "research", tags: ["BERT", "Optimization", "Machine Learning"], desc: "Explored adaptive halting strategies for early-exit BERT inference with micro self-verification. Quantified trade-offs between computational cost reduction and accuracy retention across classification tasks.", image: "images/effnlp_thumbnail.png", github: "https://github.com/ameynarwadkar/bert-early-exit-halting" },

		// 2024 - Core Development
		{ name: "Tennis Analysis System", year: 2024, category: "engineering", tags: ["Computer Vision", "Machine Learning", "Tracking"], desc: "Advanced computer vision system for analyzing tennis matches, tracking player movements, ball trajectories, and key stats.", image: "images/tennis.jpg", github: "https://github.com/ameynarwadkar/Tennis-Analysis-System" },

		// 2023 - Foundation
		{ name: "ML Algorithms from Scratch", year: 2023, category: "research", tags: ["Python", "Mathematics", "NumPy"], desc: "Implemented core ML algorithms from scratch in Python — linear/logistic regression, decision trees, SVMs, k-means, PCA — with mathematical derivations and gradient computations, no sklearn.", image: "images/ml_algo_thumbnail.png", github: "https://github.com/ameynarwadkar/ML-algorithms-from-scratch" },
	];

	let searchQuery = '';

	const renderProjects = () => {
		// Filter projects based on search
		const filtered = projectList.filter(p =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
			p.year.toString().includes(searchQuery)
		);

		// Group by year (descending)
		const projectsByYear = {};
		filtered.forEach(proj => {
			if (!projectsByYear[proj.year]) {
				projectsByYear[proj.year] = [];
			}
			projectsByYear[proj.year].push(proj);
		});

		const years = Object.keys(projectsByYear).sort((a, b) => b - a);

		const grid = document.getElementById('projects-grid');
		grid.innerHTML = years.map(year => `
			<div class="year-section">
				<div class="year-header">
					<div class="year-badge">${year}</div>
					<div class="year-divider"></div>
				</div>
				<div class="year-projects">
					${projectsByYear[year].map(proj => `
						<div class="grid-item smooth-reveal">
							<div class="item-img">
								<img src="${proj.image}" alt="${proj.name}" />
							</div>
							<div class="item-details">
								<div class="item-header">
									<div class="title-row">
										<h3>${proj.name}</h3>
										<span class="category-badge ${proj.category}">${proj.category}</span>
									</div>
									<div class="tags-row">
										${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
									</div>
								</div>
								<p class="item-desc">${proj.desc}</p>
								<div class="project-links">
									${proj.github ? `
									<a href="${proj.github}" target="_blank" rel="noreferrer" class="btn-github">
										<svg viewBox="0 0 24 24" style="width: 14px; height: 14px;" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> GitHub
									</a>` : ''}
									${proj.website ? `
									<a href="${proj.website}" target="_blank" rel="noreferrer" class="btn-website">
										<i data-lucide="globe" style="width: 14px; height: 14px;"></i> Website
									</a>` : ''}
								</div>
							</div>
						</div>
					`).join('')}
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
});