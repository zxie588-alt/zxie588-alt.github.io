# Ricardo Xie: Engineering Portfolio

Portfolio of Ricardo (Zhicong) Xie, graduate mechanical engineer in Auckland, New Zealand
(Master of Engineering Studies (Mechanical), University of Auckland, completing July 2027).

Live site: https://zxie588-alt.github.io/

CV: https://zxie588-alt.github.io/assets/resumes/Ricardo_Xie_CV.pdf

## Adding projects

Add the case study to `projects/` and one matching record to `data/projects.json`. The record
determines the title, categories, search keywords and cover. A project can be in more than one
category and use a different cover in each homepage collection. Set `featured` to update the
homepage rail. Each homepage category shows up to three projects in catalogue order.

Run `python scripts/build_catalog.py` from the repository root to update `catalog.html` and the
generated part of `index.html`. Use `python scripts/build_catalog.py --check` to detect stale pages.
Add the public case-study URL to `sitemap.xml` when publishing a new page. GitHub Pages serves the
checked-in HTML, so it requires no build or JavaScript to display the project catalogue.

## Contact

zxie588@aucklanduni.ac.nz · https://www.linkedin.com/in/ricardo-xie-6394643b4/
