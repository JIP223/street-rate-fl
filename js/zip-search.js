/* Street Rate FL ZIP search. Pure client-side; no external API.
 *
 * Lookup file: data/fl-zips.json
 * Built from the U.S. Census Bureau 2020 ZCTA-to-County Relationship File
 * (tab20_zcta520_county20_natl.txt), downloaded 24 November 2026 from
 * https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_county20_natl.txt
 * and filtered to Florida (county GEOID starting with 12).
 *
 * ZCTAs approximate USPS ZIP codes; some PO Box or unique ZIPs may be absent.
 * When a ZCTA overlaps more than one county, the primary county is the one
 * with the largest share of the ZCTA land area (or water area if the ZCTA
 * has no land). Other counties are listed when they contain at least 1% of
 * that area.
 */
(function () {
  var DATA_URL = "data/fl-zips.json";
  var data = null;
  var loading = null;

  function digits(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 5);
  }

  function looksFlorida(zip) {
    var n = parseInt(zip, 10);
    return n >= 32000 && n <= 34999;
  }

  function resolve(zip) {
    if (!data || !data.zips) return null;
    var rec = data.zips[zip];
    if (!rec) return null;
    if (typeof rec === "string") {
      return { slug: rec, name: data.names[rec] || rec, also: [] };
    }
    var also = rec.also || [];
    return {
      slug: rec.c,
      name: rec.n || data.names[rec.c] || rec.c,
      also: also.map(function (item) {
        if (typeof item === "string") return { slug: item, name: (data.names[item] || item) };
        return { slug: item.c, name: item.n || data.names[item.c] || item.c };
      })
    };
  }

  function pageFor(slug) {
    return slug + "-county-storage.html";
  }

  function setMessage(box, html, kind) {
    box.className = "zip-msg" + (kind ? " is-" + kind : "");
    box.innerHTML = html;
  }

  function resultHtml(zip, hit) {
    var page = pageFor(hit.slug);
    var html = "<p>ZIP " + zip + " is " + (hit.also.length ? "mostly " : "") +
      "in <a href=\"" + page + "\">" + hit.name + " County</a>.</p>";
    if (hit.also.length) {
      html += "<p>It also covers " +
        (function (links) {
          if (links.length === 1) return links[0];
          if (links.length === 2) return links[0] + " and " + links[1];
          return links.slice(0, -1).join(", ") + ", and " + links[links.length - 1];
        })(hit.also.map(function (item) {
          return "<a href=\"" + pageFor(item.slug) + "\">" + item.name + "</a>";
        })) +
        ".</p>";
    }
    html += "<p><a class=\"btn\" href=\"" + page + "\">See " + hit.name + " prices</a></p>";
    return html;
  }

  function go(zip, box, opts) {
    opts = opts || {};
    if (zip.length !== 5) {
      setMessage(box, zip.length ? "Please enter a 5-digit ZIP code." : "Enter a 5-digit Florida ZIP code.", "error");
      return;
    }
    if (!data) {
      setMessage(box, "The ZIP list is still loading. Try again in a moment, or pick a county on the map.", "error");
      return;
    }
    var hit = resolve(zip);
    if (!hit) {
      if (looksFlorida(zip)) {
        setMessage(box, "We don’t have that Florida ZIP in our list. Try another ZIP, or pick a county on the map.", "error");
      } else {
        setMessage(box, "That ZIP isn’t in our Florida list. This directory covers Florida only. Try a Florida ZIP, or pick a county on the map.", "error");
      }
      return;
    }
    setMessage(box, resultHtml(zip, hit), "ok");
    if (!hit.also.length && opts.redirect !== false) {
      window.location.href = pageFor(hit.slug);
    }
  }

  function loadData() {
    if (data) return Promise.resolve(data);
    if (loading) return loading;
    loading = fetch(DATA_URL, { credentials: "same-origin" }).then(function (res) {
      if (!res.ok) throw new Error("Could not load ZIP list");
      return res.json();
    }).then(function (json) {
      data = json;
      loading = null;
      return data;
    }).catch(function (err) {
      loading = null;
      throw err;
    });
    return loading;
  }

  function bind(root) {
    var form = root.querySelector("form") || root;
    var input = form.querySelector("input[name='zip'], input#zip, input.zip-input");
    var box = root.querySelector(".zip-msg");
    if (!form || !input || !box) return;

    input.addEventListener("input", function () {
      var next = digits(input.value);
      if (input.value !== next) input.value = next;
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var zip = digits(input.value);
      input.value = zip;
      loadData().then(function () {
        go(zip, box, { redirect: true });
      }).catch(function () {
        setMessage(box, "We couldn’t load the ZIP list. Pick a county on the map instead.", "error");
      });
    });

    var params = new URLSearchParams(window.location.search);
    var preset = digits(params.get("zip"));
    if (preset) {
      input.value = preset;
      loadData().then(function () {
        go(preset, box, { redirect: preset.length === 5 });
      }).catch(function () {
        setMessage(box, "We couldn’t load the ZIP list. Pick a county on the map instead.", "error");
      });
    } else {
      loadData().catch(function () { /* map remains usable */ });
    }
  }

  function init() {
    document.querySelectorAll("[data-zip-search]").forEach(bind);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
