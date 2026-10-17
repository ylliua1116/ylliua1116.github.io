## V6.8 (2026-10-13)

- New academic portrait mark and favicon; white blouse instead of gown; `profile.jpg` can be overwritten directly.
- Redesigned bilingual research roadmap SVG, with N02 linked to R04 causal candidate selection.
- Cleaner visitor-facing text, no internal maintenance reminders.
- Bottom-of-content bilingual visitor stats with optional GoatCounter real count, hidden until available.
- Research themes and original publications remain in place.

# CHANGELOG

## v1.3.3 on May 13, 2026
- Fixed disabled i18n mode so browser language and stored locale preferences cannot override the default locale.
- Added inline formatting for BibTeX publication titles, including `\textit`, `\emph`, `\textbf`, `\textsc`, superscript, and subscript commands.

## v1.3.2 on Mar 19, 2026
- Added Markdown rendering for card items.

## v1.3.1 on Feb 24, 2026
- Fixed SSR/client mismatch from font stylesheet toggling. Updated font settings to be deterministic.

## v1.3.0 on Feb 22, 2026
- Added support for i18n. Set `enabled = true` in config.toml to enable this feature.
- Fixed some cases where the navigation bar indicator not working correctly.

## v1.2.1 on Feb 19, 2026
- Updated the navigation bar implementation to make it more responsive, dynamic, and natural.
- The demo site is updated as well.

## v1.2.0 on Dec 6, 2025

- Added GitHub Actions workflow for automatic deployment to GitHub Pages.
- Fixed publication highlighting with site owner name.
- Fixed co-author underline.
- Fixed broken "view all" link when one-page mode is disabled.
- Updated docs and deployment guide.

## v1.1.0 on Nov 23, 2025

- Added support for one-page mode. Set `enable_one_page_mode = true` in config.toml to enable this feature. All subpages will be rendered on the same page.
- Added more flexible settings for social icons. You may leave the config blank to hide the display of any social icon.

## v1.0.0 on Nov 18, 2025

- Initial release

## V6.7 · Research and academic identity refinement
- Streamlined Research page: compact roadmap, collapsible publication evidence and methodological background.
- Added full-card hover and keyboard focus states to research themes and evidence cards.
- Added opt-in, aggregate ICLR 2027 double-blind review pipeline on Publications; no identifiable submission titles or PDF links.
- Replaced YL favicon with purple academic monogram, preserved in GitHub Pages builds.
