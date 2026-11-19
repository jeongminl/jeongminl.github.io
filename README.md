# jeongminl.github.io

Source for Jeongmin Lee's academic website, served at <https://jeongminl.github.io> by GitHub Pages.

## Layout

| Path | What it is |
| --- | --- |
| `_pages/` | One file per page: About (`about.md`, the home page), Experience, Publications, Awards & Honors; `cv.md` just redirects `/cv/` to the PDF |
| `_data/cv.yml` | Education, experience, talks, publications, awards and skills; the Experience, Publications and Awards pages are generated from it |
| `_data/navigation.yml` | Links shown in the masthead |
| `_config.yml` | Site settings, including the author details shown in the sidebar |
| `_layouts/default.html` | Page shell: masthead, author sidebar, content, footer |
| `_layouts/single.html` | Page title + content, rendered inside `default` |
| `_includes/` | Masthead, author sidebar, footer, `<head>` and SEO tags |
| `_sass/` | All styles; `_palette.scss` holds the colors, `layout/_components.scss` the page building blocks (timeline, pills, skills, publication list) |
| `assets/js/site.js` | Masthead overflow menu, back-to-top button, publication toggles |
| `files/cv.pdf` | The CV linked from the sidebar |

To update the CV, replace `files/cv.pdf` and keep `_data/cv.yml` in sync with it.

The footer's "Last Updated" date is the date of the latest commit, fetched from the GitHub API in the browser; if that request fails it falls back to the build date.

## Local preview

GitHub Pages builds the live site with its own pinned toolchain; the `Gemfile` is only for previewing locally.

```bash
bundle install
bundle exec jekyll serve
# then open http://localhost:4000
```

Or with Docker: `docker compose up`.

## Acknowledgments & License

Built from the [Minimalist Academic Portfolio template](https://github.com/minimalacademicsite/minimalacademicsite.github.io) by [Md Rezwane Sadik](https://github.com/rez1sadik), which derives from [Academic Pages](https://github.com/academicpages/academicpages.github.io) and the [Minimal Mistakes Jekyll Theme](https://mmistakes.github.io/minimal-mistakes/) by Michael Rose. Released under the MIT License (see `LICENSE`).
