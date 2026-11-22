"""Build the homepage collections and the complete project catalogue."""

import argparse
import html
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
START = '<!-- project-showcase:start -->'
END = '<!-- project-showcase:end -->'
HOME_LIMIT = 3


def escape(value):
    return html.escape(str(value), quote=True)


def image(project, category=None, featured=False):
    cover = project.get('featuredImage') if featured else project.get('categoryImages', {}).get(category)
    cover = cover or project
    if 'image' not in cover:
        return f'<span class="project-art project-art-text" aria-hidden="true">{escape(project["label"].split(" · ")[0])}</span>'
    width, height = cover['size']
    return (f'<span class="project-art art-{escape(cover["fit"])}">'
            f'<img src="{escape(cover["image"])}" alt="{escape(cover["alt"])}" width="{width}" height="{height}" '
            'loading="lazy" decoding="async"></span>')


def quick_link(project, label):
    width, height = project['size']
    return f'''          <li><a href="projects/{escape(project['id'])}.html">
            <span class="strip-image strip-{escape(project['fit'])}"><img src="{escape(project['image'])}" alt="" width="{width}" height="{height}" decoding="async"></span>
            <span>{escape(label)}</span>
          </a></li>'''


def project_card(project, *, heading='h3', category=None, featured=False, catalog=False):
    label = escape(project['label'])
    title = escape(project['title'])
    summary = escape(project['summary'])
    url = f'projects/{escape(project["id"])}.html'
    attributes = ''
    variants = ''
    if catalog:
        groups = ' '.join(project['categories'])
        keywords = ' '.join(project.get('keywords', []))
        attributes = f' data-categories="{escape(groups)}" data-keywords="{escape(keywords)}"'
        variants = ''.join(f'\n            <template data-cover-for="{escape(group)}">{image(project, category=group)}</template>'
                           for group in project.get('categoryImages', {}))
    return f'''          <li class="project-tile"{attributes}>
            <a href="{url}" class="project-tile-link">
              {image(project, category, featured)}
              <div class="project-tile-text">
                <p class="project-tile-label">{label}</p>
                <{heading}>{title}</{heading}>
                <p>{summary}</p>
              </div>
            </a>{variants}
          </li>'''


def home_showcase(data):
    projects = data['projects']
    index = {p['id']: p for p in projects}
    home_categories = [c for c in data['categories'] if c.get('home')]
    contents = []
    for category in home_categories:
        key = category['id']
        title = escape(category['title'])
        project_list = [p for p in projects if key in p['categories']]
        cards = '\n'.join(project_card(p, heading='h4', category=key) for p in project_list[:HOME_LIMIT])
        contents.append(f'''        <section class="collection" id="work-{key}" aria-labelledby="collection-{key}">
          <div class="collection-heading">
            <div><h3 id="collection-{key}">{title}</h3><p>{escape(category['description'])}</p></div>
            <a class="collection-link" href="catalog.html?category={key}">View all {title.lower()} <span>({len(project_list)})</span></a>
          </div>
          <ul class="project-tiles">\n{cards}\n          </ul>
        </section>''')

    jumps = '\n'.join(f'          <a href="#work-{c["id"]}">{escape(c["title"])}</a>' for c in home_categories)
    quick_links = '\n'.join(quick_link(index[item['id']], item['label']) for item in data['quickLinks'])
    cards = '\n'.join(project_card(index[item], heading='h3', featured=True) for item in data['featured'])
    collections = '\n\n'.join(contents)
    return f'''      <section class="section showcase" id="projects" aria-labelledby="project-heading">
        <nav class="project-strip" aria-label="Quick links to projects">
          <ul>
{quick_links}
          </ul>
        </nav>

        <div class="collection featured-collection" data-project-rail>
          <div class="collection-heading">
            <h2 id="project-heading">Featured work</h2>
            <div class="rail-controls" hidden>
              <button type="button" data-rail-step="-1" aria-controls="featured-track" aria-label="Previous featured projects"><span aria-hidden="true">‹</span></button>
              <button type="button" data-rail-step="1" aria-controls="featured-track" aria-label="Next featured projects"><span aria-hidden="true">›</span></button>
            </div>
          </div>
          <ul class="project-rail" id="featured-track" tabindex="0" aria-label="Featured project cards">
{cards}
          </ul>
        </div>

        <nav class="showcase-jumps" aria-label="Project collections">
{jumps}
        </nav>

{collections}

        <div class="showcase-end"><a class="button secondary" href="catalog.html">Find a project in the full catalogue</a></div>
      </section>'''


def catalog_page(data, home):
    projects = data['projects']
    navigation = home[home.index('    <header class="site-header">'):home.index('    <main id="main">')]
    navigation = navigation.replace('<a href="catalog.html">Projects</a>', '<a href="catalog.html" class="nav-current" aria-current="page">Projects</a>')
    for section in ('fit', 'experience', 'contact'):
        navigation = navigation.replace(f'href="#{section}"', f'href="index.html#{section}"')
    footer = home[home.index('    <footer class="footer'):home.index('  </body>')]
    categories = ['          <button type="button" data-category="all" aria-pressed="true">All projects</button>']
    for c in data['categories']:
        categories.append(f'          <button type="button" data-category="{escape(c["id"])}" aria-pressed="false">{escape(c["title"])}</button>')
    controls = '\n'.join(categories)
    cards = '\n'.join(project_card(p, catalog=True) for p in projects)
    return f'''<!doctype html>
<html lang="en-NZ">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Project catalogue | Ricardo Xie</title>
    <meta name="description" content="Explore Ricardo Xie's mechanical engineering catalogue, including CAD models, physical prototypes, simulations and practical engineering projects.">
    <link rel="canonical" href="https://zxie588-alt.github.io/catalog.html">
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <script src="assets/js/theme.js?v=2"></script>
    <script src="assets/js/collections.js" defer></script>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="portfolio.css?v=3">
    <link rel="stylesheet" href="collections.css?v=3">
  </head>
  <body class="portfolio-catalog">
    <a class="skip-link" href="#main">Skip to content</a>
{navigation}    <main id="main" class="section catalog" data-catalog>
      <header class="catalog-intro">
        <p class="eyebrow">Ricardo Xie · Engineering portfolio</p>
        <h1>Project catalogue</h1>
        <p class="lead">CAD models, built prototypes, simulation studies and practical engineering work.</p>
      </header>

      <div class="catalog-controls" hidden>
        <form class="catalog-search" role="search" aria-label="Search the project catalogue">
          <label for="project-query">Search projects</label>
          <div class="search-row"><input type="search" name="q" id="project-query" placeholder="Project name, tool or topic" autocomplete="off">
          <button type="button" class="button secondary" data-catalog-reset>Reset</button></div>
        </form>
        <div class="catalog-filters" role="group" aria-label="Filter projects by category">
{controls}
        </div>
      </div>

      <p class="catalog-count" role="status" id="catalog-count">{len(projects)} projects</p>
      <div class="catalog-empty" hidden><h2>No projects found</h2><p>Try a shorter search or choose a different category.</p></div>
      <ul class="project-tiles catalog-results" aria-label="Projects" aria-describedby="catalog-count">
{cards}
      </ul>
      <div class="catalog-more" hidden><button type="button" class="button secondary">Show more projects</button></div>
    </main>
{footer}  </body>
</html>
'''


def validate(data):
    projects = data['projects']
    by_id = {p['id']: p for p in projects}
    categories = {c['id'] for c in data['categories']}
    pages = {p.stem for p in (ROOT / 'projects').glob('*.html')}
    if len(by_id) != len(projects) or set(by_id) != pages:
        raise ValueError(f'One record per project page is required. Unmatched: {set(by_id) ^ pages}')
    if not set(data['featured']) <= by_id.keys():
        raise ValueError('Featured IDs must reference existing projects.')
    for link in data['quickLinks']:
        if link['id'] not in by_id or 'image' not in by_id[link['id']]:
            raise ValueError(f'Quick link needs an existing project with a cover: {link["id"]}')
    for p in projects:
        if not p['categories'] or set(p['categories']) - categories:
            raise ValueError(f'Invalid categories on {p["id"]}')
        for cover in [p, p.get('featuredImage', {}), *p.get('categoryImages', {}).values()]:
            if 'image' in cover and (not (ROOT / cover['image']).is_file() or len(cover['size']) != 2):
                raise ValueError(f'Invalid cover on {p["id"]}')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Check the existing generated pages without writing.')
    args = parser.parse_args()
    data = json.loads((ROOT / 'data/projects.json').read_text('utf-8'))
    validate(data)
    index = ROOT / 'index.html'
    home = index.read_text('utf-8')
    region = re.compile(re.escape(START) + r'.*?' + re.escape(END), flags=re.S)
    updated, matches = region.subn(lambda _: START + '\n' + home_showcase(data) + '\n      ' + END, home)
    if matches != 1:
        raise ValueError('The homepage needs one generated project showcase region.')
    outputs = {index: updated, ROOT / 'catalog.html': catalog_page(data, updated)}
    for path, rendered in outputs.items():
        if args.check:
            if not path.is_file() or path.read_text('utf-8') != rendered:
                raise SystemExit(f'{path.name} is out of date. Run scripts/build_catalog.py.')
        else:
            path.write_text(rendered, encoding='utf-8', newline='\n')
    print(f'{len(data["projects"])} projects across {len(data["categories"])} categories.')


if __name__ == '__main__':
    main()
