# City price page template

Every city/size page copies `tampa-10x10.html`. Its sections are marked in the HTML with `TEMPLATE 1`–`TEMPLATE 9` comments.

1. Crumbs + eyebrow (City · Size).
2. H1 = the question; lede = the answer in plain words.
3. Freshness bar: one `data-checked="YYYY-MM-DD"` pill (the script turns it into "Checked N days ago" and greys it after 45 days), operator and listing counts, method link.
4. At a glance: three numbers, arithmetic from the rows below only.
5. One section per operator, one `.facility` card per listing. The 12-bar strip needs `style="--p:PROMO/LATER"` (for example 46/92 = .5). Only use it when the operator publishes a later rate.
6. First-year math table, formula shown in each cell.
7. "Before you sign" checklist, specific to what the operator pages said.
8. Partner block, one per page, after the advice, always labelled. Disabled until an account exists.
9. Sources and corrections, always last, linking to `contact.html`.

Rules: no number that isn't on the operator's own page that day; every page dated; no tracking scripts; one stylesheet (`style.css`); relative links only (no `<base>`), so the site works on github.io and on streetratefl.com.
