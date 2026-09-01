# SETUP

Developer setup for the GB Renovations NYC site.

## What this is

One static page. `index.html` is the entire site: markup, CSS, and JavaScript
in a single file. There is no build step, no package manager, no dependencies,
and no server-side code. If you can open a file in a browser, you can work on
this project.

The only external request the page makes is to Google Fonts. Everything else
ships in the file.

## Run it locally

Fastest option, no tooling at all:

```
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

The page works fine over `file://` because it loads no modules and makes no
fetch calls. Edit the file, save, hit reload.

If you prefer a real local server (closer to production, gives you a stable
URL for phone testing on the same network):

```
python -m http.server 8000
```

Then open http://localhost:8000. Node users can run `npx serve` instead.

## File layout

Everything lives in `index.html`, in this order:

| Lines | What |
| --- | --- |
| 1 to 9 | Head: title, Google Fonts link |
| 10 to 284 | `<style>`: design tokens first, then components |
| 285 to 707 | Markup: sticky title bar, then one `<section class="sheet">` per sheet |
| 708 to 848 | `<script>`: the floor plan interaction |

Content sections are numbered like drawing sheets and carry matching ids:

- `a101` Scope Plan (interactive floor plan)
- `a201` Sequence (construction schedule)
- `a301` Coordination (trade list and comparison table)
- `a401` Approvals (Manhattan building process)
- `a501` Design Team
- `a601` Contact

The cover sheet at the top has no id. Nav links in the title bar point at the
ids above, so renaming an id means updating the nav.

## Editing conventions

**Colors.** Never hardcode a color in a component rule. Every color comes from
a CSS custom property declared in the bare `:root` block near the top of the
`<style>`. Adding a new color means adding it in three places: `:root` (light),
the `prefers-color-scheme: dark` block, and the `[data-theme="dark"]` block. A
token defined in only one of those will break one of the themes.

**Type.** Three faces, each with a job. `var(--sans)` (Archivo) for headings and
labels, `var(--serif)` (Newsreader) for body copy, `var(--mono)` (IBM Plex Mono)
for sheet numbers, week counts, and anything tabular.

**Spacing.** Sibling groups use flex or grid with `gap`. Avoid per-element
margins that fight the grid.

## The two interactive pieces

### Floor plan (A-101)

Room copy lives in the `SCOPE` object at the top of the script. Keys match the
`id` on each `<g class="room">` in the SVG. To add a room:

1. Add a `<g class="room" id="r-yourroom" role="button" tabindex="0" aria-pressed="false" aria-label="Your room">` containing a `<rect>` and label `<text>` elements.
2. Add a matching `SCOPE["r-yourroom"]` entry with `name`, `sub`, `items`, and `trades`.

Nothing else needs wiring. The script picks up every `.room` on load. The panel
renders whichever room `render()` is called with at the bottom of the script,
currently `r-kitchen`.

### Schedule (A-201)

Bars are positioned with inline percentages, not JavaScript. The track spans
week -10 to week +22, so 32 weeks total. For a phase running from week `s` to
week `e`:

```
left  = (s + 10) / 32 * 100
width = (e - s)  / 32 * 100
```

Week 0 (the vertical brass line) sits at 31.25 percent. If you change the span,
update the axis labels, the `.track::before` line position, and every bar.

## Test checklist

Run through this before pushing. It takes about two minutes.

1. **Both themes.** In Chrome DevTools, open the command menu (Ctrl+Shift+P or
   Cmd+Shift+P) and run "Show Rendering", then toggle
   `Emulate prefers-color-scheme`. Check light and dark. You can also force a
   theme by putting `data-theme="dark"` on the `<html>` tag temporarily. Look
   for text that vanishes into its background, which is the usual symptom of a
   token defined in only one theme block.
2. **Floor plan.** Click every room. Each should highlight in blue, and the
   right panel should swap its heading, subtitle, bullets, and trade chips.
3. **Keyboard.** Tab into the plan, then use Enter and Space to select rooms.
   Every focused element needs a visible blue focus ring.
4. **Narrow viewport.** Resize down through 900px and 680px, the two
   breakpoints. The plan should stack above its detail panel, sheet margins
   should collapse, and the body must never scroll sideways. The schedule and
   the comparison table scroll horizontally inside their own containers, which
   is intended.
5. **Fonts.** Confirm headings render in Archivo, not a fallback sans. A silent
   fallback usually means the Google Fonts request failed.
6. **Console.** No errors.

## Deploying

The site is served from the repo root, so GitHub Pages on the `main` branch
publishes `index.html` as is. No workflow file, no build. Any static host works
the same way: upload the one file.

## Notes for Windows

The repo has LF line endings and Git converts on checkout. A message like
"LF will be replaced by CRLF" on commit is expected and harmless.

## Known gaps

Contact details in sheet A-601 are bracketed placeholders. Replace them with
real values before the site goes live. There is nothing else stubbed out.
