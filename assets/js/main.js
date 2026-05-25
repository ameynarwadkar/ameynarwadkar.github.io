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
		// 2025 - Current Research & Engineering
		{ name: "Agent Failure Debugger", year: 2025, category: "engineering", tags: ["LLM Agents", "LangGraph", "FastAPI", "D3.js", "RAG"], desc: "Benchmarking platform comparing 11 LLM agent architectures (ReAct, Plan-Execute, Reflection, Debate, Orchestrator-Worker, Map-Reduce, MoA). Real-time trace streaming via SSE captures tool calls, latency, token usage, and cost. Failure diagnosis layer detects looping, planning drift, hallucinations, and context loss.", image: "images/effnlp_thumbnail.png", github: "https://github.com/ameynarwadkar" },
		{ name: "char-aware-typos", year: 2025, category: "research", tags: ["NLP", "Language Models", "Python"], desc: "Evaluated character-aware sentence encoders for robustness to misspellings. Analyzed how character-level models maintain stable embeddings and retrieval accuracy under controlled typo noise across multiple corpora.", image: "images/charlm_thumbnail.png", github: "https://github.com/ameynarwadkar/char-aware-typos" },
		{ name: "bert-early-exit-halting", year: 2025, category: "research", tags: ["BERT", "Optimization", "Machine Learning"], desc: "Explored adaptive halting strategies for early-exit BERT inference with micro self-verification. Quantified trade-offs between computational cost reduction and accuracy retention across classification tasks.", image: "images/effnlp_thumbnail.png", github: "https://github.com/ameynarwadkar/bert-early-exit-halting" },
		
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
										<i data-lucide="github" style="width: 14px; height: 14px;"></i> GitHub
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
	dock.addEventListener('click', () => {
		dock.classList.add('dock-expand');
		setTimeout(() => dock.classList.remove('dock-expand'), 300);
	});
});