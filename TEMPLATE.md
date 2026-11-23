# City price page template

Every city/size page copies `tampa-10x10.html`. Its sections are marked in the HTML with `TEMPLATE 1`–`TEMPLATE 9` comments.

1. Crumbs + eyebrow (City · Size).
2. H1 = the question; lede = the answer in plain words.
3. Freshness bar: one `data-checked="YYYY-MM-DD"` pill (the script turns it into "Checked N days ago" and greys it after 45 days), company and listing counts, method link.
4. At a glance: three numbers, added up only from the rows below.
5. One section per storage company, one `.facility` card per listing. The 12-bar strip needs `style="--p:PROMO/LATER"` (for example 46/92 = .5). Only use it when the company shows a later price.
6. First-year math table, formula shown in each cell.
7. "Before you sign" checklist, specific to what the company pages said.
8. Partner block, one per page, after the advice, always labelled. Disabled until an account exists.
9. Sources and corrections, always last, linking to `contact.html`.

Rules: no number that isn't on the company's own page that day; every page dated; keep the Google Analytics snippet already in the `<head>` of `tampa-10x10.html` (measurement ID `G-L0DSH6DGEX`) and do not add any other tracking scripts; one stylesheet (`style.css`); relative links only (no `<base>`), so the site works on github.io and on streetratefl.com.

Every page includes the standard Google Analytics (gtag.js) snippet in `<head>`, right after the opening meta tags, with measurement ID `G-L0DSH6DGEX`. Copy that snippet from `tampa-10x10.html` when you start a new county page. Do not remove it, and do not add other tracking scripts.

## Plain English

Write for a regular person searching for storage, not for the industry. Use short sentences that sound like everyday spoken English, not stiff or formal phrasing. Do not invent prices, addresses, or dates. When you are quoting the company’s own wording, keep that wording.

Use these substitutions in reader-facing copy:

- operator → storage company (or just "company")
- published month-5 rate → what you'll pay from month 5
- Copied from the operator's own page → Prices from each company's own website
- Promo vs the published month-5 rate → Ad price vs. what you pay later
- facility (when talking to readers) → location
- publish / published (about a price) → show / shows, or "the company listed"
- promo (when you mean the ad) → ad price or starter price, unless you are quoting the company
- reserve / commission → book / fee

Keep numbers, addresses, dates, source links, meta tags, canonicals, and `data-checked` pills unchanged when you edit wording.

The top nav on every page is Home, Counties (`counties.html`), How we check, and Contact. Do not put a city or county name in the header nav. Only `counties.html` should mark Counties as the current page. Tampa and each county stay linked from the home page and from `counties.html`.

The footer Pages list should include a Wind link to `wind/`. Do not add Wind to the header nav. The site-wide footer disclosure is: “If you use a partner link we tell you about, we may earn a fee. We never take money to change prices or rankings. No partner links are active yet. Figures can change. Confirm with the company or your insurer before you pay.”

