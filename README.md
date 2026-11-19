# Pollution Hotspot Mapping System — EVS Kritika

A working academic prototype for turning citizen pollution reports into clearer environmental priorities. The demo combines a public complaint form, a city dashboard, an interactive pollution map, DBSCAN-inspired hotspot grouping, simulated AI classification, complaint operations, alerts and a validation workspace.

The app runs entirely in the browser. Demo records and any changes made in the UI are stored in `localStorage` under `phms_state_v1`; there is no backend and no data leaves the device.

## Run locally

```bash
npm start
```

Open <http://localhost:4173>. Any client-side route (for example `/dashboard` or `/validation`) is served through the SPA fallback.

Requires Node.js 18 or newer. The repository ships the production build in `dist/`, so there is no install or build step.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Overview and headline indicators |
| `/dashboard` | Complaint analytics, trends and category breakdowns |
| `/report` | Citizen report form with photo evidence and complaint lookup |
| `/map` | Leaflet map with category filters, markers, heatmap and hotspot zones |
| `/hotspots` | Cluster list, scores and recommended actions |
| `/ai-classify` | Simulated keyword-based classification and priority suggestion |
| `/reports` | Complaint queue, search, CSV export, status and verification updates |
| `/alerts` | Generated operational alerts and acknowledgement workflow |
| `/analysis` | Time-range analysis and area/type/severity charts |
| `/validation` | Manual verification workflow for reports and hotspot support |
| `/project` | Project scope, methodology, limitations and demo reset |

## Project structure

```text
dist/                  Production build (HTML, CSS, JS, favicon)
dist/404.html          GitHub Pages fallback for client-side routes
scripts/serve.js       Zero-dependency static server with SPA fallback
.github/workflows/     GitHub Pages deployment workflow
docs/FIXES.md          Bugs found during the review and how they were fixed
```

## Deploy to GitHub Pages

The included workflow publishes `dist/` to the `gh-pages` branch whenever `main` is updated. To serve the site:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `gh-pages` branch and the `/ (root)` folder.

The expected URL is <https://himanshuurathi21.github.io/EVS-KRITIKA/>. Asset URLs are relative and the router derives its basename from the deployed asset path, so the same build works both at a domain root and under the repository sub-path.

## Demo data and reset

- 40 seeded complaints (`RPT-2026-1001` … `RPT-2026-1040`), 5 detected clusters and generated alerts.
- New complaints receive the next available report ID in the current year.
- Use **Project Information → Reset sample data** to restore the original demo workspace.

## Notes and limitations

- The AI classifier is a transparent keyword-scoring demonstration. It has no trained weights, does not inspect image pixels and is not a real model.
- Hotspots are illustrative density groups computed from demo coordinates, not verified environmental findings.
- Verification is a manual reviewer workflow stored locally in the browser.
