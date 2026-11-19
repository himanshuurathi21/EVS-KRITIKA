# Bug review and fixes

The delivered project contained only the production build (`dist/`) and `node_modules/`; the original TypeScript source was not present. The fixes below were applied to the compiled bundle and the deployment shell, then verified in a real Chromium browser with Playwright.

## Fixed

### 1. Bulk verification marked more reports than the table showed

**Where:** Validation workspace → *Mark visible as verified*.

**Problem:** The table renders only the first 12 filtered reports and displays “Showing first 12 of N reports in this view”, but the bulk action verified every report in the filtered set. With the *Needs attention* filter this marked 15 reports while only 12 were visible.

**Fix:** The action and its disabled state now operate on the same 12-row slice that is rendered. The toast count therefore matches the rows the reviewer can see. Narrowing the queue with search or filters reveals the remaining reports.

### 2. Status timeline showed the first entry for a repeated status

**Where:** Complaint detail → *Status timeline*.

**Problem:** The timeline used `find()`, so when a complaint returned to a status it had already passed through (for example `submitted → under-review → submitted → under-review`), the date and note shown were from the first occurrence rather than the latest update.

**Fix:** The lookup now takes the last matching timeline entry (`filter(...).pop()`), so each stage reflects the most recent transition.

### 3. “Last 90 days” chart only covered 63 days

**Where:** Dashboard and analysis range selector → *Last 90 days*.

**Problem:** The 90-day option requested 9 weekly buckets (9 × 7 = 63 days), so older reports inside the selected range were silently omitted.

**Fix:** The 90-day range now requests 13 weekly buckets (91 days), matching the label and covering the full period.

### 4. Absolute asset paths broke sub-path deployment

**Where:** `dist/index.html` and the application router.

**Problem:** Assets were referenced as `/assets/...`, which resolves to the domain root. On a GitHub Pages project site the files live under `/EVS-KRITIKA/`, so the page loaded without its JavaScript and CSS. The browser router also assumed it was mounted at the domain root, so deep links under the repository path did not match a route.

**Fix:** Asset and favicon URLs are relative, the router basename is derived from the module URL at runtime, and `dist/404.html` provides the GitHub Pages fallback for client-side routes.

## Verified flows

The patched build was exercised in headless Chromium:

- All 11 routes load without console or page errors.
- Root hosting and `/EVS-KRITIKA/` sub-path hosting both load assets; a direct deep link to `/EVS-KRITIKA/validation` renders the validation workspace.
- Report submission, `localStorage` persistence and complaint lookup by ID.
- Map category filters (`40 → 29 → 0 → 40` visible reports).
- Alert acknowledgement survives reload.
- Validation bulk action verifies exactly the 12 displayed rows (25 → 37 verified) and reports the correct count.
- Future observation times are rejected by the report form.
- Dashboard type filtering, complaint search, CSV export and sample-data reset.

## Remaining known limitations (not defects)

- The classifier, hotspot scoring and alert generation are intentionally illustrative prototypes and are labelled as such in the UI.
- Verification, status changes and reports are stored only in the current browser profile.
- The 30-day trend uses five weekly buckets (35 days) to keep weekly aggregation readable; the chart subtitle says “selected range” rather than claiming an exact daily window.
