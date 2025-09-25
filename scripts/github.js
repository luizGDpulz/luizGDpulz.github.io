// scripts/github.js
// Busca repositórios do GitHub do usuário, ordena e exibe na grid de projetos
// Fallback para dados simulados se rate-limited ou erro

const API_URL = 'https://api.github.com/users/luizGDpulz/repos';
const grid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

const FALLBACK_PROJECTS = [
  {
    name: 'Portfolio',
    description: 'Site pessoal com projetos, skills e contato.',
    language: 'JavaScript',
    stargazers_count: 10,
    homepage: 'https://luizGDpulz.github.io/',
    html_url: 'https://github.com/luizGDpulz/portfolio',
    updated_at: '2025-09-01T12:00:00Z',
  },
  {
    name: 'CRM Plugin',
    description: 'Plugin para integração de CRM em PHP.',
    language: 'PHP',
    stargazers_count: 7,
    homepage: '',
    html_url: 'https://github.com/luizGDpulz/crm-plugin',
    updated_at: '2025-08-15T09:00:00Z',
  },
  // ...adicione mais exemplos se quiser
];

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

function renderProjects(projects) {
  grid.innerHTML = '';
  projects.forEach((repo, i) => {
    const card = document.createElement('div');
    card.className = 'card bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 flex flex-col gap-4 fade-up';
    card.style.animationDelay = `${i * 80}ms`;
    card.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <img src="assets/placeholder.png" alt="thumb" class="w-10 h-10 rounded-xl mr-2" loading="lazy">
        <h3 class="font-bold text-xl text-cyan-500">${repo.name}</h3>
      </div>
      <p class="text-slate-700 dark:text-slate-300">${truncate(repo.description || 'Sem descrição', 140)}</p>
      <div class="flex gap-2 flex-wrap mb-2">
        <span class="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs">${repo.language || 'N/A'}</span>
        <span class="px-2 py-1 rounded bg-cyan-100 text-cyan-700 text-xs"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
        <span class="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-xs">Atualizado: ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</span>
      </div>
      <div class="flex gap-2 mt-auto">
        <a href="${repo.html_url}" target="_blank" rel="noopener" class="px-3 py-1 rounded-xl border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition">GitHub</a>
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="px-3 py-1 rounded-xl border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition">Demo</a>` : ''}
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterProjects(lang) {
  let projects = JSON.parse(localStorage.getItem('projects')) || FALLBACK_PROJECTS;
  if (lang !== 'all') {
    projects = projects.filter(p => p.language === lang);
  }
  renderProjects(projects);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('bg-cyan-500', 'text-white'));
    btn.classList.add('bg-cyan-500', 'text-white');
    filterProjects(btn.dataset.lang);
  });
});

async function fetchProjects() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API error');
    let repos = await res.json();
    // Filtra e ordena
    repos = repos.filter(r => r.description || r.homepage);
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    localStorage.setItem('projects', JSON.stringify(repos));
    renderProjects(repos);
  } catch (e) {
    renderProjects(FALLBACK_PROJECTS);
  }
}

window.addEventListener('DOMContentLoaded', fetchProjects);

// Inicializa grid com todos
window.addEventListener('DOMContentLoaded', () => filterProjects('all'));
