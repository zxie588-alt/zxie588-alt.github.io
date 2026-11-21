(() => {
  const rail = document.querySelector('[data-project-rail]');
  if (rail) {
    const controls = rail.querySelector('.rail-controls');
    const track = rail.querySelector('.project-rail');
    const buttons = [...controls.querySelectorAll('button')];
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      const end = track.scrollWidth - track.clientWidth;
      controls.hidden = end <= 2;
      buttons[0].disabled = track.scrollLeft <= 2;
      buttons[1].disabled = track.scrollLeft >= end - 2;
    };
    buttons.forEach(button => button.addEventListener('click', () => {
      const items = track.children;
      const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth;
      track.scrollBy({ left: step * Number(button.dataset.railStep), behavior: motion.matches ? 'instant' : 'smooth' });
    }));
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  const catalog = document.querySelector('[data-catalog]');
  if (!catalog) return;

  const pageSize = 12;
  const controls = catalog.querySelector('.catalog-controls');
  const form = catalog.querySelector('.catalog-search');
  const input = form.elements.q;
  const reset = form.querySelector('[data-catalog-reset]');
  const buttons = [...catalog.querySelectorAll('[data-category]')];
  const resultCount = catalog.querySelector('.catalog-count');
  const empty = catalog.querySelector('.catalog-empty');
  const more = catalog.querySelector('.catalog-more');
  const normalize = value => value.normalize('NFKD').toLowerCase().replace(/\p{Mark}/gu, '');
  const projects = [...catalog.querySelectorAll('[data-categories]')].map(element => {
    const defaultArt = element.querySelector('.project-art');
    const covers = new Map([...element.querySelectorAll('template[data-cover-for]')].map(template =>
      [template.dataset.coverFor, template.content.firstElementChild.cloneNode(true)]));
    return {
      element,
      categories: element.dataset.categories.split(' '),
      text: normalize(`${element.textContent} ${element.dataset.keywords}`),
      covers, defaultArt, currentArt: defaultArt,
    };
  });
  const validCategories = new Set(buttons.map(button => button.dataset.category));
  let category = 'all';
  let visibleLimit = pageSize;

  function update(writeUrl = true) {
    const query = input.value.trim();
    const words = normalize(query).split(/\s+/).filter(Boolean);
    let count = 0;
    projects.forEach(project => {
      const { element, categories, text } = project;
      const matches = (category === 'all' || categories.includes(category)) && words.every(word => text.includes(word));
      if (matches) count += 1;
      element.hidden = !matches || count > visibleLimit;
      if (!element.hidden) {
        const art = project.covers.get(category) || project.defaultArt;
        if (project.currentArt !== art) {
          project.currentArt.replaceWith(art);
          project.currentArt = art;
        }
      }
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
    empty.hidden = count > 0;
    more.hidden = count <= visibleLimit;
    reset.disabled = !query && category === 'all';
    resultCount.textContent = count > visibleLimit ?
      `Showing ${visibleLimit} of ${count} projects` : `${count} ${count === 1 ? 'project' : 'projects'}`;
    if (writeUrl) {
      const url = new URL(window.location.href);
      if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
      if (category === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', category);
      window.history.replaceState(null, '', url);
    }
  }

  function readUrl() {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('category');
    category = validCategories.has(requested) ? requested : 'all';
    input.value = params.get('q') || '';
    visibleLimit = pageSize;
    update(false);
  }

  input.addEventListener('input', () => { visibleLimit = pageSize; update(); });
  form.addEventListener('submit', event => { event.preventDefault(); visibleLimit = pageSize; update(); });
  buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    visibleLimit = pageSize;
    update();
  }));
  reset.addEventListener('click', () => {
    category = 'all';
    input.value = '';
    visibleLimit = pageSize;
    update();
    input.focus();
  });
  more.querySelector('button').addEventListener('click', () => {
    const before = new Set(projects.filter(p => !p.element.hidden));
    visibleLimit += pageSize;
    update(false);
    projects.find(p => !p.element.hidden && !before.has(p))?.element.querySelector('a').focus();
  });
  window.addEventListener('popstate', readUrl);
  readUrl();
  controls.hidden = false;
})();
