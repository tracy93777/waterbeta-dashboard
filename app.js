const DATA = window.WATERBETA_DATA;

const state = {
  tab: "overview",
  search: "",
  adOnly: false,
  top100Only: false,
  modelableOnly: true,
  segment: "All",
  quality: "All",
  category: "All",
  group: "All",
  sortKey: "waterVar",
  sortDir: "desc",
  selectedId: null,
  simpleMode: true,
  scenario: { ...DATA.scenarioDefaults },
};

const scenarioDefs = [
  { key: "directEbitShock", label: "Earnings pressure", min: 0, max: 30, step: 0.5, unit: "%", scale: 100, simple: true, helper: "Operating earnings pressure from water-related disruption." },
  { key: "discountUpliftBps", label: "Cost of debt", min: 0, max: 250, step: 5, unit: "bps", scale: 1, simple: true, helper: "Additional financing cost applied to brand value." },
  { key: "rbiShock", label: "Brand trust impact", min: 0, max: 30, step: 0.5, unit: "%", scale: 100, simple: true, helper: "Pressure on brand trust, preference, or demand." },
  { key: "revenueShock", label: "Revenue shock", min: -20, max: 20, step: 0.5, unit: "%", scale: 100, simple: false },
  { key: "assetPenalty", label: "fAR / asset penalty", min: 0, max: 20, step: 0.5, unit: "%", scale: 100, simple: false },
  { key: "baseDiscountRate", label: "Base discount rate", min: 0, max: 15, step: 0.25, unit: "%", scale: 100, simple: false },
  { key: "discountHorizon", label: "Discount horizon", min: 1, max: 15, step: 1, unit: "yrs", scale: 1, simple: false },
];

const moneyFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const pctFmt = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 });
const oneFmt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

const brands = DATA.brands.map((brand, index) => ({ ...brand, index }));

const logoDomains = {
  "lvmh portfolio": "lvmh.com",
  "ab inbev portfolio": "ab-inbev.com",
  "apple": "apple.com",
  "microsoft": "microsoft.com",
  "amazon": "amazon.com",
  "google": "google.com",
  "instagram": "instagram.com",
  "mercedes-benz": "mercedes-benz.com",
  "louis vuitton": "louisvuitton.com",
  "youtube": "youtube.com",
  "bmw": "bmw.com",
  "disney": "disney.com",
  "facebook": "facebook.com",
  "adobe": "adobe.com",
  "hermès": "hermes.com",
  "nike": "nike.com",
  "chanel": "chanel.com",
  "netflix": "netflix.com",
  "visa": "visa.com",
  "sony": "sony.com",
  "mastercard": "mastercard.com",
  "pepsi": "pepsi.com",
  "spotify": "spotify.com",
  "l'oréal paris": "lorealparis.com",
  "citi": "citi.com",
  "budweiser": "budweiser.com",
  "gucci": "gucci.com",
  "cartier": "cartier.com",
  "linkedin": "linkedin.com",
  "colgate": "colgate.com",
  "dior": "dior.com",
  "prada": "prada.com",
  "tiffany & co.": "tiffany.com",
  "pandora": "pandora.net",
  "lamborghini / audi / volkswagen group": "lamborghini.com",
  "boucheron / kering": "boucheron.com",
  "bulgari / lvmh": "bulgari.com",
  "como hotels": "comohotels.com",
  "iwc / richemont": "iwc.com",
  "mejuri": "mejuri.com",
  "messika": "messika.com",
  "monica vinader": "monicavinader.com",
  "piaget / richemont": "piaget.com",
  "pomellato / dodo / kering": "pomellato.com",
  "qeelin / kering": "qeelin.com",
  "swarovski": "swarovski.com",
  "sephora": "sephora.com",
  "adidas": "adidas.com",
  "zara": "zara.com",
  "h&m": "hm.com",
  "uniqlo": "uniqlo.com",
  "coca-cola": "coca-cola.com",
  "nescafé": "nescafe.com",
  "nespresso": "nespresso.com",
  "mcdonald's": "mcdonalds.com",
  "ferrari": "ferrari.com",
  "porsche": "porsche.com",
  "tesla": "tesla.com",
  "corona": "corona.com",
  "bulgari": "bulgari.com",
  "burberry": "burberry.com",
  "armani": "armani.com",
  "ralph lauren": "ralphlauren.com",
  "levi's": "levi.com",
  "heineken": "heineken.com",
  "guinness": "guinness.com",
  "moet & chandon": "moet.com",
  "hennessy": "hennessy.com",
  "starbucks": "starbucks.com",
  "burger king": "bk.com",
  "kfc": "kfc.com",
  "lancôme": "lancome.com",
  "boss": "hugoboss.com",
  "land rover": "landrover.com",
  "red bull": "redbull.com",
  "jack daniel's": "jackdaniels.com",
  "johnnie walker": "johnniewalker.com",
  "audi": "audi.com",
  "samsung": "samsung.com",
  "cisco": "cisco.com",
  "nvidia": "nvidia.com",
  "oracle": "oracle.com",
  "sap": "sap.com",
  "ibm": "ibm.com",
  "j.p. morgan": "jpmorgan.com",
  "allianz": "allianz.com",
  "honda": "honda.com",
  "hyundai": "hyundai.com",
  "blackrock": "blackrock.com",
  "booking.com": "booking.com",
  "ikea": "ikea.com",
  "accenture": "accenture.com",
  "qualcomm": "qualcomm.com",
  "paypal": "paypal.com",
  "salesforce": "salesforce.com",
  "axa": "axa.com",
  "ge aerospace": "geaerospace.com",
  "airbnb": "airbnb.com",
  "ups": "ups.com",
  "siemens": "siemens.com",
  "lego": "lego.com",
  "dell": "dell.com",
  "nintendo": "nintendo.com",
  "goldman sachs": "goldmansachs.com",
  "volkswagen": "volkswagen.com",
  "pampers": "pampers.com",
  "ebay": "ebay.com",
  "uber": "uber.com",
  "schneider electric": "se.com",
  "hp": "hp.com",
  "monster": "monsterenergy.com",
  "intel": "intel.com",
  "hsbc": "hsbc.com",
  "philips": "philips.com",
  "santander": "santander.com",
  "gillette": "gillette.com",
  "nestlé": "nestle.com",
  "xiaomi": "mi.com",
  "nissan": "nissan-global.com",
  "caterpillar": "caterpillar.com",
  "nasdaq": "nasdaq.com",
  "3m": "3m.com",
  "john deere": "deere.com",
  "kia": "kia.com",
  "byd": "byd.com",
  "danone": "danone.com",
  "fedex": "fedex.com",
  "huawei": "huawei.com",
  "range rover": "landroverusa.com",
  "shopify": "shopify.com",
  "dhl": "dhl.com",
  "toyota": "toyota.com",
};

function finite(value) {
  return Number.isFinite(Number(value));
}

function num(value) {
  return finite(value) ? Number(value) : null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatMoney(value) {
  if (!finite(value)) return "n/a";
  return `$${moneyFmt.format(value)}mm`;
}

function formatCompactMoney(value) {
  if (!finite(value)) return "n/a";
  const abs = Math.abs(Number(value));
  if (abs >= 1_000_000) return `$${(Number(value) / 1_000_000).toFixed(1)}tn`;
  if (abs >= 1_000) return `$${(Number(value) / 1_000).toFixed(1)}bn`;
  return `$${moneyFmt.format(value)}mm`;
}

function formatRoundedImpact(value) {
  if (!finite(value)) return "not available";
  const abs = Math.abs(Number(value));
  if (abs >= 1_000_000) return `$${(Number(value) / 1_000_000).toFixed(1)} trillion`;
  if (abs >= 1_000) return `$${(Number(value) / 1_000).toFixed(1)} billion`;
  return `$${moneyFmt.format(value)} million`;
}

function formatPct(value) {
  if (!finite(value)) return "n/a";
  return pctFmt.format(value);
}

function formatNumber(value, digits = 2) {
  if (!finite(value)) return "n/a";
  return Number(value).toLocaleString("en-US", { maximumFractionDigits: digits });
}

function shortSource(path) {
  if (!path) return "";
  const parts = path.split("/");
  return parts.slice(-2).join("/");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function logoKey(brand) {
  return String(brand || "").trim().toLowerCase();
}

function logoDomain(brand) {
  const exact = logoDomains[logoKey(brand)];
  if (exact) return exact;
  const primaryName = String(brand || "").split("/")[0].trim();
  return logoDomains[logoKey(primaryName)] || "";
}

function brandInitials(brand) {
  const primaryName = String(brand || "Brand").split("/")[0].replace(/&/g, " ");
  const words = primaryName.match(/[A-Za-z0-9À-ÿ]+/g) || ["B"];
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function brandLogoMarkup(brand, extraClass = "") {
  const domain = logoDomain(brand);
  const initials = brandInitials(brand);
  const image = domain
    ? `<img src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=96" alt="" loading="lazy" referrerpolicy="no-referrer" />`
    : "";
  return `
    <span class="brand-logo ${extraClass} ${domain ? "" : "fallback"}" aria-hidden="true">
      ${image}
      <span class="brand-logo-fallback">${escapeHtml(initials)}</span>
    </span>
  `;
}

function wireLogoFallbacks(scope = document) {
  scope.querySelectorAll(".brand-logo img").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        const logo = img.closest(".brand-logo");
        if (logo) logo.classList.add("fallback");
        img.remove();
      },
      { once: true },
    );
  });
}

function isModelable(brand) {
  return (
    brand.modelInclusion === "Include" &&
    finite(brand.baseBvUsd) &&
    Number(brand.baseBvUsd) > 0 &&
    finite(brand.baseNopat) &&
    Number(brand.baseNopat) > 0 &&
    finite(brand.scenarioLambda)
  );
}

function calcWater(brand) {
  const baseBv = num(brand.baseBvUsd);
  const baseNopat = num(brand.baseNopat);
  const lambda = num(brand.scenarioLambda);
  if (!isModelable(brand)) {
    return {
      ...brand,
      modelable: false,
      baseBv,
      waterBv: null,
      waterVar: null,
      waterVarPct: null,
      combinedImpact: null,
      nopatRatio: null,
    };
  }

  const revenueShock = state.scenario.revenueShock;
  const directShock = state.scenario.directEbitShock;
  const assetPenalty = state.scenario.assetPenalty;
  const revPass = finite(brand.revToEbitPass) ? Number(brand.revToEbitPass) : 0;
  const combinedImpact = clamp(assetPenalty + directShock + revenueShock * revPass, -0.95, 0.95);
  const waterNopat = baseNopat * (1 - combinedImpact);
  const nopatRatio = Math.max(0.01, waterNopat / baseNopat);
  const baseDiscount = state.scenario.baseDiscountRate;
  const discountUplift = state.scenario.discountUpliftBps / 10000;
  const discountFactor = Math.pow((1 + baseDiscount) / (1 + baseDiscount + discountUplift), state.scenario.discountHorizon);
  const rbiFactor = Math.max(0, 1 - state.scenario.rbiShock);
  const waterBv = baseBv * Math.pow(nopatRatio, lambda) * discountFactor * rbiFactor;
  const waterVar = baseBv - waterBv;

  return {
    ...brand,
    modelable: true,
    baseBv,
    waterBv,
    waterVar,
    waterVarPct: baseBv ? waterVar / baseBv : null,
    combinedImpact,
    waterNopat,
    nopatRatio,
    discountFactor,
    rbiFactor,
  };
}

function enrichedBrands() {
  return brands.map(calcWater);
}

function filteredBrands() {
  const query = state.search.trim().toLowerCase();
  return enrichedBrands().filter((brand) => {
    if (query) {
      const haystack = `${brand.brand} ${brand.parent} ${brand.segment} ${brand.sector}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (state.adOnly && brand.selectedByAD !== "Yes") return false;
    if (state.top100Only && brand.top100 !== "Yes") return false;
    if (state.modelableOnly && !brand.modelable) return false;
    if (state.segment !== "All" && brand.segment !== state.segment) return false;
    if (state.quality !== "All" && brand.qualityTier !== state.quality) return false;
    if (state.category !== "All" && brand.outputCategory !== state.category) return false;
    if (state.group !== "All" && brand.selectionGroup !== state.group) return false;
    return true;
  });
}

function modelRows(rows) {
  return rows.filter((row) => row.modelable);
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + (finite(row[key]) ? Number(row[key]) : 0), 0);
}

function groupBy(rows, key, valueKey = null) {
  const map = new Map();
  rows.forEach((row) => {
    const label = row[key] || "Unclassified";
    const value = valueKey ? (finite(row[valueKey]) ? Number(row[valueKey]) : 0) : 1;
    map.set(label, (map.get(label) || 0) + value);
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
}

function fillSelect(id, values) {
  const select = document.getElementById(id);
  select.innerHTML = "";
  ["All", ...values].forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function initFilters() {
  const unique = (key) =>
    Array.from(new Set(brands.map((b) => b[key]).filter(Boolean))).sort((a, b) => a.localeCompare(b));
  fillSelect("segmentFilter", unique("segment"));
  fillSelect("categoryFilter", unique("outputCategory"));
  fillSelect("groupFilter", unique("selectionGroup"));

  document.getElementById("sourceName").textContent = shortSource(DATA.sourceWorkbook);
  document.getElementById("generatedAt").textContent = `Dashboard data refreshed ${DATA.generatedAt}`;
}

function initScenarioControls() {
  const root = document.getElementById("scenarioControls");
  root.innerHTML = "";
  scenarioDefs.forEach((def) => {
    const wrapper = document.createElement("div");
    wrapper.className = `slider-control${def.simple ? "" : " technical-only"}`;
    const displayValue = state.scenario[def.key] * def.scale;
    wrapper.innerHTML = `
      <div class="slider-top">
        <span>${def.label}</span>
        <span id="${def.key}Value">${formatSlider(displayValue, def.unit)}</span>
      </div>
      <input id="${def.key}" type="range" min="${def.min}" max="${def.max}" step="${def.step}" value="${displayValue}" />
      ${def.helper ? `<p class="slider-help">${def.helper}</p>` : ""}
    `;
    root.appendChild(wrapper);
    wrapper.querySelector("input").addEventListener("input", (event) => {
      const raw = Number(event.target.value);
      state.scenario[def.key] = raw / def.scale;
      if (def.scale === 1) state.scenario[def.key] = raw;
      document.getElementById(`${def.key}Value`).textContent = formatSlider(raw, def.unit);
      render();
    });
  });
}

function formatSlider(value, unit) {
  if (unit === "%") return `${Number(value).toFixed(value % 1 ? 1 : 0)}%`;
  if (unit === "bps") return `${Math.round(value)} bps`;
  return `${Math.round(value)} ${unit}`;
}

function confidenceCounts(rows) {
  const counts = { high: 0, medium: 0, low: 0 };
  modelRows(rows).forEach((brand) => {
    const quality = brand.qualityTier || "Low";
    if (quality === "High") counts.high += 1;
    else if (quality === "Medium") counts.medium += 1;
    else counts.low += 1;
  });
  return counts;
}

function confidenceMixMarkup(counts) {
  return `
    <div class="confidence-mix" aria-label="Confidence mix">
      <span class="confidence-pill high">High <strong>${counts.high}</strong></span>
      <span class="confidence-pill medium">Medium <strong>${counts.medium}</strong></span>
      <span class="confidence-pill low">Low <strong>${counts.low}</strong></span>
    </div>
  `;
}

function renderKpis(rows) {
  const model = modelRows(rows);
  const baseBv = sum(model, "baseBv");
  const waterBv = sum(model, "waterBv");
  const waterVar = sum(model, "waterVar");
  const confidence = confidenceCounts(rows);
  const cards = state.simpleMode
    ? [
        { label: "Water impact on brand value", value: formatCompactMoney(waterVar), note: `${formatPct(baseBv ? waterVar / baseBv : 0)} of base brand value` },
        { label: "Brand value after water impact", value: formatCompactMoney(waterBv), note: "Scenario-adjusted estimate" },
        { label: "Base brand value", value: formatCompactMoney(baseBv), note: "Included brand set" },
        { label: "Signal confidence", valueHtml: confidenceMixMarkup(confidence), note: "High / Medium / Low brand reads" },
      ]
    : [
        { label: "Water impact on brand value", value: formatCompactMoney(waterVar), note: `${formatPct(baseBv ? waterVar / baseBv : 0)} of base brand value` },
        { label: "Brand value after water impact", value: formatCompactMoney(waterBv), note: "Scenario-adjusted estimate" },
        { label: "Base brand value", value: formatCompactMoney(baseBv), note: "Included brand set" },
        { label: "Signal confidence", valueHtml: confidenceMixMarkup(confidence), note: "High / Medium / Low brand reads" },
      ];
  document.getElementById("kpiGrid").innerHTML = cards
    .map(
      ({ label, value, valueHtml, note }) => `
        <div class="kpi-card">
          <span>${label}</span>
          ${valueHtml || `<strong>${value}</strong>`}
          <small>${note}</small>
        </div>
      `,
    )
    .join("");
  renderConfidenceFootnotes(model.length);
}

function renderConfidenceFootnotes(outputCount) {
  const root = document.getElementById("confidenceFootnotes");
  if (!root) return;
  root.innerHTML = `
    <p><strong>Signal confidence:</strong> counts reflect ${outputCount} modeled brand reads currently in view.</p>
    <p><strong>High</strong> = strongest public data and model support. <strong>Medium</strong> = useful directional read with caveats. <strong>Low</strong> = early signal; do not cite as standalone proof.</p>
  `;
}

function renderBarList(containerId, data, formatter, accent = "teal", limit = 12) {
  const root = document.getElementById(containerId);
  const rows = data.filter((d) => finite(d.value) && d.value > 0).slice(0, limit);
  if (!rows.length) {
    root.innerHTML = `<div class="empty-state">No visible values for this filter set.</div>`;
    return;
  }
  const max = Math.max(...rows.map((d) => d.value));
  const color = accent === "coral" ? "var(--coral)" : accent === "gold" ? "var(--gold)" : "var(--teal)";
  root.innerHTML = rows
    .map((d) => {
      const width = Math.max(2, (d.value / max) * 100);
      return `
        <div class="bar-row">
          <div class="bar-label" title="${d.name}">${d.name}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%;background:${color}"></div></div>
          <div class="bar-value">${formatter(d.value)}</div>
        </div>
      `;
    })
    .join("");
}

function polarToCartesian(cx, cy, radius, angle) {
  const radians = (angle - 90) * Math.PI / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function pieSlicePath(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

function renderPieChart(containerId, data) {
  const root = document.getElementById(containerId);
  const rows = data.filter((d) => finite(d.value) && d.value > 0).slice(0, 9);
  if (!rows.length) {
    root.innerHTML = `<div class="empty-state">No visible values for this filter set.</div>`;
    return;
  }
  const total = rows.reduce((acc, row) => acc + row.value, 0);
  const palette = ["#0b756f", "#d96b4f", "#af8b3f", "#386f9d", "#2d8a52", "#8d6d9f", "#ba7c3e", "#5d8b8a", "#9aa25b"];
  let cursor = 0;
  const slices = rows
    .map((row, index) => {
      const start = cursor;
      const end = cursor + (row.value / total) * 360;
      cursor = end;
      return `<path d="${pieSlicePath(102, 102, 86, start, end)}" fill="${palette[index % palette.length]}" stroke="#fff" stroke-width="2"><title>${row.name}: ${Math.round(row.value)} brands</title></path>`;
    })
    .join("");
  root.innerHTML = `
    <div class="pie-layout">
      <svg class="pie-svg" viewBox="0 0 204 204" role="img" aria-label="Included segment distribution pie chart">
        ${slices}
        <circle cx="102" cy="102" r="46" fill="#fff" stroke="#e2e8e3" stroke-width="1"></circle>
        <text x="102" y="96" text-anchor="middle" class="pie-total">${Math.round(total)}</text>
        <text x="102" y="116" text-anchor="middle" class="pie-caption">brands</text>
      </svg>
      <div class="pie-legend">
        ${rows
          .map(
            (row, index) => `
              <div class="pie-legend-row">
                <span class="legend-dot" style="background:${palette[index % palette.length]}"></span>
                <span class="legend-name" title="${row.name}">${row.name}</span>
                <strong>${Math.round(row.value)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderOverview(rows) {
  const model = modelRows(rows);
  const bySector = groupBy(model, "segment", "waterVar");
  const mix = groupBy(rows, "segment");

  document.getElementById("sectorChartNote").textContent = `${model.length} brand reads`;
  document.getElementById("mixCount").textContent = `${rows.length} brands`;
  renderBarList("sectorVarChart", bySector, formatCompactMoney, "teal", 10);
  renderPieChart("segmentMixChart", mix);
  renderManagerInsights(rows, model, bySector);
}

function renderManagerInsights(rows, model, bySector) {
  const root = document.getElementById("managerInsights");
  if (!root) return;
  const baseBv = sum(model, "baseBv");
  const waterVar = sum(model, "waterVar");
  const waterVarPct = baseBv ? waterVar / baseBv : 0;
  const topSegment = bySector.find((item) => finite(item.value) && item.value > 0);
  const topBrands = [...model]
    .filter((brand) => finite(brand.waterVar) && brand.waterVar > 0)
    .sort((a, b) => Number(b.waterVar) - Number(a.waterVar))
    .slice(0, 3);
  const confidence = confidenceCounts(rows);
  const topBrandText = topBrands.length
    ? topBrands.map((brand) => `${brand.brand} (${formatCompactMoney(brand.waterVar)})`).join(", ")
    : "No brand-level values are available for this filter.";
  root.innerHTML = `
    <article class="manager-card focus">
      <span>Brand value impact</span>
      <h3>${formatCompactMoney(waterVar)} estimated impact</h3>
      <p>This is the estimated water-related impact on brand value under the current scenario.</p>
    </article>
    <article class="manager-card">
      <span>Relative scale</span>
      <h3>${formatPct(waterVarPct)} of base brand value</h3>
      <p>Use this percentage to compare smaller and larger brands on a fairer basis.</p>
    </article>
    <article class="manager-card">
      <span>Where to focus</span>
      <h3>${topSegment ? topSegment.name : "No clear segment"}</h3>
      <p>${topSegment ? `This segment has the largest estimated exposure: ${formatCompactMoney(topSegment.value)}.` : "The current filter does not show a clear segment concentration."}</p>
    </article>
    <article class="manager-card">
      <span>Brand conversation starters</span>
      <h3>Highest estimated exposure</h3>
      <p>${topBrands.length ? `Start the discussion with ${escapeHtml(topBrandText)}.` : escapeHtml(topBrandText)}</p>
    </article>
    <article class="manager-card">
      <span>Signal confidence</span>
      <h3>High ${confidence.high} / Medium ${confidence.medium} / Low ${confidence.low}</h3>
      <p>Use High as the cleanest group to cite. Medium and Low need caveats before a formal brand conversation.</p>
    </article>
    <article class="manager-card">
      <span>Best use</span>
      <h3>Choose where to ask next</h3>
      <p>Use this view to choose the brands, sectors, and assumptions that deserve deeper follow-up.</p>
    </article>
  `;
}

function categoryClass(text) {
  const lower = (text || "").toLowerCase();
  if (lower.includes("ready")) return "ready";
  if (lower.includes("close")) return "close";
  if (lower.includes("direction")) return "direction";
  if (lower.includes("insufficient")) return "insufficient";
  if (lower.includes("review")) return "review";
  return "unknown";
}

function qualityClass(text) {
  return (text || "unknown").toLowerCase();
}

function riskLabel(brand) {
  if (!brand.modelable || !finite(brand.waterVarPct)) return { label: "Needs data", className: "insufficient" };
  const pct = Number(brand.waterVarPct);
  if (pct >= 0.05) return { label: "High impact", className: "review" };
  if (pct >= 0.02) return { label: "Moderate impact", className: "direction" };
  if (pct > 0) return { label: "Low impact", className: "ready" };
  return { label: "No visible impact", className: "unknown" };
}

function sensitivityLabel(lambda) {
  if (!finite(lambda)) return "Not enough history";
  const value = Number(lambda);
  if (value === 0) return "Low / floored";
  if (value < 0.25) return "Low";
  if (value < 0.75) return "Medium";
  return "High";
}

function confidenceSentence(brand) {
  const quality = brand.qualityTier || "Unknown";
  const scope = brand.financialScopeMatch || "source scope not specified";
  if (quality === "High") return `High confidence: ${scope}.`;
  if (quality === "Medium") return `Usable with a caveat: ${scope}.`;
  if (quality === "Low") return `Directional only: ${scope}.`;
  return `Needs review: ${scope}.`;
}

function useSentence(brand) {
  const category = brand.outputCategory || "";
  if (category === "Ready to use") return "Use as a core output.";
  if (category.includes("Close")) return "Use directionally; the size is close but the movement evidence is weaker.";
  if (category.includes("Right direction")) return "Use for direction, not precise sizing.";
  if (category.includes("Insufficient")) return "Do not cite as a standalone output yet.";
  return "Use with clear caveats before citing.";
}

function useShortLabel(brand) {
  const category = brand.outputCategory || "";
  if (category === "Ready to use") return "Core output";
  if (category.includes("Close")) return "Directional sizing";
  if (category.includes("Right direction")) return "Direction only";
  if (category.includes("Insufficient")) return "Not standalone";
  return "Use with caveat";
}

function sortedRows(rows) {
  const copy = [...rows];
  copy.sort((a, b) => {
    const av = a[state.sortKey];
    const bv = b[state.sortKey];
    const dir = state.sortDir === "asc" ? 1 : -1;
    if (finite(av) && finite(bv)) return (Number(av) - Number(bv)) * dir;
    return String(av || "").localeCompare(String(bv || "")) * dir;
  });
  return copy;
}

function renderTable(rows) {
  const sorted = sortedRows(rows);
  const root = document.getElementById("brandCards");
  document.getElementById("tableCount").textContent = `${rows.length} brands`;
  root.innerHTML = sorted
    .map(
      (b) => {
        const risk = riskLabel(b);
        const useText = b.modelable ? useShortLabel(b) : "Needs more support";
        return `
          <button type="button" data-id="${b.id}" class="brand-card ${b.id === state.selectedId ? "selected" : ""}">
            ${brandLogoMarkup(b.brand)}
            <span class="brand-card-main">
              <strong>${escapeHtml(b.brand)}</strong>
              <small>${escapeHtml(b.segment || "Unclassified")}</small>
            </span>
            <span class="brand-card-impact">
              <strong>${b.modelable ? formatRoundedImpact(b.waterVar) : "Needs data"}</strong>
              <small>${useText}</small>
            </span>
            <span class="badge ${risk.className}">${risk.label}</span>
          </button>
        `;
      },
    )
    .join("");
  wireLogoFallbacks(root);
  root.querySelectorAll(".brand-card").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedId = row.dataset.id;
      render();
      document.getElementById("detailBrand").scrollIntoView({ block: "nearest" });
    });
  });
}

function renderDetail(rows) {
  const visible = rows.length ? sortedRows(rows) : sortedRows(enrichedBrands());
  const selected = visible.find((b) => b.id === state.selectedId) || visible[0];
  if (!selected) {
    document.getElementById("detailBrand").textContent = "Brand Read";
    document.getElementById("detailMetrics").innerHTML = "";
    return;
  }
  state.selectedId = selected.id;
  const risk = riskLabel(selected);
  const sensitivity = sensitivityLabel(selected.scenarioLambda);
  document.getElementById("detailBrand").innerHTML =
    `${brandLogoMarkup(selected.brand, "detail-logo")}<span>${escapeHtml(selected.brand)}</span>`;
  document.getElementById("detailStatus").innerHTML = `<span class="badge ${risk.className}">${risk.label}</span>`;
  document.getElementById("brandStory").innerHTML = selected.modelable
    ? `
      <p class="story-lead">Under this scenario, <strong>${escapeHtml(selected.brand)}</strong> shows ${risk.label.toLowerCase()}: <strong>${formatRoundedImpact(selected.waterVar)}</strong>, or <strong>${formatPct(selected.waterVarPct)}</strong> of its base brand value.</p>
      <p>${confidenceSentence(selected)} ${useSentence(selected)}</p>
    `
    : `
      <p class="story-lead"><strong>${escapeHtml(selected.brand)}</strong> does not have enough supported inputs for a clean standalone output yet.</p>
      <p>${useSentence(selected)} ${confidenceSentence(selected)}</p>
    `;
  wireLogoFallbacks(document.getElementById("detailBrand"));
  renderImpactBridge(selected);
  const tiles = [
    ["Water impact on brand value", selected.modelable ? formatRoundedImpact(selected.waterVar) : "Needs data"],
    ["Share of base brand value", selected.modelable ? formatPct(selected.waterVarPct) : "n/a"],
    ["Base brand value year", selected.baseBvYear || "n/a"],
    ["λ_EBIT sensitivity", sensitivity],
    ["Signal confidence", selected.qualityTier || "Unknown"],
    ["Scope", selected.type === "Portfolio" ? "Portfolio" : selected.financialScopeMatch || "Standalone / proxy"],
  ];
  document.getElementById("detailMetrics").innerHTML = tiles
    .map(
      ([label, value]) => `
        <div class="metric-tile">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `,
    )
    .join("");
  renderHistoryChart(selected);
  document.getElementById("detailSource").textContent =
    `${confidenceSentence(selected)} ${useSentence(selected)}`;
  document.getElementById("detailNotes").textContent =
    selected.validationNotes || selected.notes || selected.lambdaYears || "No validation note in extracted workbook row.";
}

function renderImpactBridge(brand) {
  const root = document.getElementById("impactBridge");
  if (!brand.modelable || !finite(brand.baseBv) || !finite(brand.waterBv)) {
    root.innerHTML = `
      <div class="impact-empty">
        <strong>No clean output yet</strong>
        <span>${brand.modelInclusion || "More input support is needed."}</span>
      </div>
    `;
    return;
  }
  const base = Math.max(brand.baseBv, 1);
  const waterWidth = Math.max(1, Math.min(100, (brand.waterBv / base) * 100));
  const varWidth = Math.max(1, Math.min(100, (brand.waterVar / base) * 100));
  root.innerHTML = `
    <div class="impact-row">
      <span>Base brand value</span>
      <div class="impact-track"><div class="impact-fill base" style="width:100%"></div></div>
      <strong>${formatCompactMoney(brand.baseBv)}</strong>
    </div>
    <div class="impact-row">
      <span>Brand value after water impact</span>
      <div class="impact-track"><div class="impact-fill water" style="width:${waterWidth}%"></div></div>
      <strong>${formatCompactMoney(brand.waterBv)}</strong>
    </div>
    <div class="impact-row">
      <span>Water impact on brand value</span>
      <div class="impact-track"><div class="impact-fill risk" style="width:${varWidth}%"></div></div>
      <strong>${formatCompactMoney(brand.waterVar)}</strong>
    </div>
  `;
}

function renderHistoryChart(brand) {
  const root = document.getElementById("historyChart");
  const hist = (brand.history || []).filter((p) => p.year && (p.bv || p.ebit));
  if (hist.length < 2) {
    root.innerHTML = `<div class="empty-state">Not enough historical points to chart.</div>`;
    return;
  }
  const width = 520;
  const height = 210;
  const pad = { l: 42, r: 18, t: 18, b: 28 };
  const years = hist.map((p) => p.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const bvValues = hist.map((p) => p.bv).filter((v) => finite(v) && v > 0);
  const ebitValues = hist.map((p) => p.ebit).filter((v) => finite(v) && v > 0);
  const maxBv = Math.max(...bvValues);
  const maxEbit = Math.max(...ebitValues, 1);
  const x = (year) => pad.l + ((year - minYear) / Math.max(1, maxYear - minYear)) * (width - pad.l - pad.r);
  const yBv = (value) => height - pad.b - (value / maxBv) * (height - pad.t - pad.b);
  const yEbit = (value) => height - pad.b - (value / maxEbit) * (height - pad.t - pad.b);
  const path = (values, yFn) =>
    values
      .filter((p) => finite(p.value) && p.value > 0)
      .map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.year).toFixed(1)} ${yFn(p.value).toFixed(1)}`)
      .join(" ");
  const bvPath = path(
    hist.map((p) => ({ year: p.year, value: p.bv })),
    yBv,
  );
  const ebitPath = path(
    hist.map((p) => ({ year: p.year, value: p.ebit })),
    yEbit,
  );
  root.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${brand.brand} historical brand value and EBIT">
      <line x1="${pad.l}" y1="${height - pad.b}" x2="${width - pad.r}" y2="${height - pad.b}" stroke="#dfe5df"/>
      <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${height - pad.b}" stroke="#dfe5df"/>
      <text x="${pad.l}" y="${height - 7}" class="chart-muted">${minYear}</text>
      <text x="${width - pad.r - 30}" y="${height - 7}" class="chart-muted">${maxYear}</text>
      <path d="${bvPath}" fill="none" stroke="var(--teal)" stroke-width="3" stroke-linecap="round"/>
      <path d="${ebitPath}" fill="none" stroke="var(--coral)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="5 4"/>
      <text x="${pad.l + 8}" y="${pad.t + 8}" class="chart-label">BV</text>
      <text x="${pad.l + 42}" y="${pad.t + 8}" class="chart-label" fill="var(--coral)">EBIT</text>
      <text x="${pad.l}" y="${height - pad.b - 8}" class="chart-muted">Indexed scale</text>
    </svg>
  `;
}

function renderPortfolio(rows) {
  const portfolios = enrichedBrands().filter((b) => b.type === "Portfolio").map(calcWater);
  document.getElementById("portfolioGrid").innerHTML = portfolios
    .map((p) => {
      const brandList = (p.notes || "").replace("Included brands: ", "").split(", ").filter(Boolean);
      return `
        <article class="portfolio-card">
          <div class="panel-head">
            <h3>${p.brand}</h3>
            <span class="badge ${qualityClass(p.qualityTier)}">${p.dataQuality}</span>
          </div>
          <div class="portfolio-metrics">
            <div class="metric-tile"><span>Base brand value</span><strong>${formatMoney(p.baseBv)}</strong></div>
            <div class="metric-tile"><span>Water impact</span><strong>${formatMoney(p.waterVar)}</strong></div>
            <div class="metric-tile"><span>Impact %</span><strong>${formatPct(p.waterVarPct)}</strong></div>
          </div>
          <p>${p.sourceBasis}</p>
          <strong>Included Interbrand-valued brands</strong>
          <ul class="portfolio-list">${brandList.map((name) => `<li>${name}</li>`).join("")}</ul>
        </article>
      `;
    })
    .join("");
}

function renderBacktest(rows) {
  const tested = rows
    .filter((b) => b.backtest && finite(b.backtest.mape) && finite(b.backtest.r2))
    .sort((a, b) => (a.backtest.mape || 0) - (b.backtest.mape || 0));
  document.getElementById("backtestCount").textContent = `${tested.length} tested outputs`;
  renderScatter(tested);
  const tbody = document.querySelector("#backtestTable tbody");
  tbody.innerHTML = tested
    .map(
      (b) => `
        <tr>
          <td><strong>${b.brand}</strong></td>
          <td class="num">${b.backtest.points}</td>
          <td class="num">${formatPct(b.backtest.mape)}</td>
          <td class="num">${formatNumber(b.backtest.r2)}</td>
          <td>${b.lambdaYears || "n/a"}</td>
          <td><span class="badge ${categoryClass(b.outputCategory)}">${b.outputCategory}</span></td>
        </tr>
      `,
    )
    .join("");
}

function renderScatter(rows) {
  const root = document.getElementById("backtestScatter");
  if (!rows.length) {
    root.innerHTML = `<div class="empty-state">No back-tested rows for this filter set.</div>`;
    return;
  }
  const width = 820;
  const height = 360;
  const pad = { l: 54, r: 24, t: 22, b: 42 };
  const maxMape = Math.max(0.4, ...rows.map((b) => Math.min(1.2, b.backtest.mape || 0)));
  const x = (mape) => pad.l + (Math.min(mape, maxMape) / maxMape) * (width - pad.l - pad.r);
  const y = (r2) => height - pad.b - (Math.max(0, Math.min(1, r2)) / 1) * (height - pad.t - pad.b);
  const points = rows
    .map((b) => {
      const color = b.outputCategory === "Ready to use" ? "var(--green)" : b.outputCategory.includes("Review") ? "var(--coral)" : "var(--gold)";
      return `<circle cx="${x(b.backtest.mape).toFixed(1)}" cy="${y(b.backtest.r2).toFixed(1)}" r="5" fill="${color}"><title>${b.brand}: MAPE ${formatPct(b.backtest.mape)}, R² ${formatNumber(b.backtest.r2)}</title></circle>`;
    })
    .join("");
  root.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Back-test MAPE versus R squared">
      <rect x="${pad.l}" y="${pad.t}" width="${width - pad.l - pad.r}" height="${height - pad.t - pad.b}" fill="#fbfcfb" stroke="#dfe5df"/>
      <line x1="${x(DATA.thresholds.lowMape)}" y1="${pad.t}" x2="${x(DATA.thresholds.lowMape)}" y2="${height - pad.b}" stroke="var(--teal)" stroke-dasharray="5 4"/>
      <line x1="${pad.l}" y1="${y(DATA.thresholds.highR2)}" x2="${width - pad.r}" y2="${y(DATA.thresholds.highR2)}" stroke="var(--teal)" stroke-dasharray="5 4"/>
      ${points}
      <text x="${pad.l}" y="${height - 12}" class="axis-label">MAPE / prediction miss</text>
      <text x="8" y="${pad.t + 15}" class="axis-label">R²</text>
      <text x="${x(DATA.thresholds.lowMape) + 4}" y="${pad.t + 14}" class="chart-muted">25%</text>
      <text x="${pad.l + 4}" y="${y(DATA.thresholds.highR2) - 6}" class="chart-muted">0.60</text>
    </svg>
  `;
}

function renderAudit(rows) {
  const model = modelRows(rows);
  const proxyCount = rows.filter((b) => (b.financialScopeMatch || "").toLowerCase().includes("proxy")).length;
  const floored = model.filter((b) => finite(b.rawLambda) && Number(b.rawLambda) < 0).length;
  const weak = rows.filter((b) => b.qualityTier === "Low").length;
  const cards = [
    {
      title: "Formula",
      body: [
        "Brand value after water impact = Base BV × (Water NOPAT ÷ Base NOPAT)^λ × Discount factor × brand trust factor.",
        "Water impact on brand value = Base BV − Brand value after water impact.",
        "λ_EBIT = SLOPE(LN(Brand Value), LN(EBIT)) using positive historical pairs.",
      ],
    },
    {
      title: "Currency Treatment",
      body: [
        "Base brand value remains USD mm.",
        "Revenue, EBIT, and NOPAT remain in native currency because the NOPAT ratio cancels the currency unit.",
        "FX rate is kept as a display and sanity-check field, not multiplied inside λ or NOPAT ratio math.",
      ],
    },
    {
      title: "Proxy Scope",
      body: [
        `${proxyCount} visible rows use a proxy or portfolio scope.`,
        "Direct company matches are stronger. Segment, group, and portfolio proxies are directional and need caveats.",
      ],
    },
    {
      title: "λ_EBIT Guardrail",
      body: [
        `${floored} visible rows have negative raw λ_EBIT and are floored at zero in Scenario λ_EBIT.`,
        "This prevents a water-related earnings decline from mechanically increasing brand value.",
      ],
    },
    {
      title: "Data Quality",
      body: [
        `${weak} visible rows are low quality or limited support.`,
        "Low-quality rows should be used as context unless the underlying input support is improved.",
      ],
    },
    {
      title: "Workbook Link",
      body: [DATA.sourceWorkbook, `Dashboard data extracted on ${DATA.generatedAt}.`],
    },
  ];
  document.getElementById("auditGrid").innerHTML = cards
    .map(
      (card) => `
        <article class="audit-card">
          <h3>${card.title}</h3>
          <ul>${card.body.map((line) => `<li>${line}</li>`).join("")}</ul>
        </article>
      `,
    )
    .join("");
}

function render() {
  const rows = filteredBrands();
  renderKpis(rows);
  renderOverview(rows);
  renderTable(rows);
  renderDetail(rows);
  renderPortfolio(rows);
  renderBacktest(rows);
  renderAudit(rows);
}

function resetScenario() {
  state.scenario = { ...DATA.scenarioDefaults };
  scenarioDefs.forEach((def) => {
    const raw = state.scenario[def.key] * def.scale;
    const value = def.scale === 1 ? state.scenario[def.key] : raw;
    const input = document.getElementById(def.key);
    input.value = value;
    document.getElementById(`${def.key}Value`).textContent = formatSlider(value, def.unit);
  });
  render();
}

function exportVisibleCsv() {
  const rows = sortedRows(filteredBrands());
  const headers = [
    "Brand",
    "Parent",
    "Segment",
    "Base BV Year",
    "Base BV USD mm",
    "Brand Value After Water Impact USD mm",
    "Water Impact on Brand Value USD mm",
    "Water Impact on Brand Value %",
    "Scenario lambda EBIT",
    "R squared",
    "MAPE",
    "Data Quality",
    "Model Inclusion",
    "Source Basis",
  ];
  const csvRows = [headers];
  rows.forEach((b) => {
    csvRows.push([
      b.brand,
      b.parent,
      b.segment,
      b.baseBvYear,
      b.baseBv,
      b.waterBv,
      b.waterVar,
      b.waterVarPct,
      b.scenarioLambda,
      b.r2,
      b.backtest?.mape,
      b.dataQuality,
      b.modelInclusion,
      b.sourceBasis,
    ]);
  });
  const text = csvRows
    .map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "waterbeta_dashboard_visible_rows.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function wireEvents() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.search = e.target.value;
    render();
  });
  document.getElementById("adOnly").addEventListener("change", (e) => {
    state.adOnly = e.target.checked;
    render();
  });
  document.getElementById("top100Only").addEventListener("change", (e) => {
    state.top100Only = e.target.checked;
    render();
  });
  document.getElementById("modelableOnly").addEventListener("change", (e) => {
    state.modelableOnly = e.target.checked;
    render();
  });
  document.getElementById("segmentFilter").addEventListener("change", (e) => {
    state.segment = e.target.value;
    render();
  });
  document.getElementById("qualityFilter").addEventListener("change", (e) => {
    state.quality = e.target.value;
    render();
  });
  document.getElementById("categoryFilter").addEventListener("change", (e) => {
    state.category = e.target.value;
    render();
  });
  document.getElementById("groupFilter").addEventListener("change", (e) => {
    state.group = e.target.value;
    render();
  });
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
      state.tab = tab.dataset.tab;
    });
  });
  document.querySelectorAll("#brandTable th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (state.sortKey === key) state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      else {
        state.sortKey = key;
        state.sortDir = key === "brand" || key === "segment" || key === "qualityTier" ? "asc" : "desc";
      }
      render();
    });
  });
  document.getElementById("resetScenario").addEventListener("click", resetScenario);
  document.getElementById("exportCsv").addEventListener("click", exportVisibleCsv);
  document.getElementById("advancedToggle").addEventListener("click", () => {
    state.simpleMode = !state.simpleMode;
    document.body.classList.toggle("simple-mode", state.simpleMode);
    document.getElementById("advancedToggle").textContent = state.simpleMode ? "Explain results" : "Hide explanation";
    if (state.simpleMode && ["portfolio", "backtest", "audit"].includes(state.tab)) {
      document.querySelector('[data-tab="overview"]').click();
    }
    render();
    if (!state.simpleMode) {
      requestAnimationFrame(() => {
        document.getElementById("managerInsights")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  });
}

initFilters();
initScenarioControls();
wireEvents();
render();
