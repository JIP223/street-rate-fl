# City price page template

Every city/size page copies `tampa-10x10.html`. Its sections are marked in the HTML with `TEMPLATE 1`–`TEMPLATE 9` comments.

1. Crumbs + eyebrow (City · Size).
2. H1 = the question; lede = the answer in plain words.
3. Freshness bar: one `data-checked="YYYY-MM-DD"` pill (the script turns it into "Checked N days ago" and greys it after 45 days), company and listing counts, method link.
4. At a glance: three numbers, arithmetic from the rows below only.
5. One section per storage company, one `.facility` card per listing. The 12-bar strip needs `style="--p:PROMO/LATER"` (for example 46/92 = .5). Only use it when the company shows a later price.
6. First-year math table, formula shown in each cell.
7. "Before you sign" checklist, specific to what the company pages said.
8. Partner block, one per page, after the advice, always labelled. Disabled until an account exists.
9. Sources and corrections, always last, linking to `contact.html`.

Rules: no number that isn't on the company's own page that day; every page dated; no tracking scripts; one stylesheet (`style.css`); relative links only (no `<base>`), so the site works on github.io and on streetratefl.com.

## Plain English

Write for a regular person searching for storage, not for the industry. Use short sentences. Do not invent prices, addresses, or dates. When you are quoting the company's own wording, keep that wording.

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
