/* eslint-disable no-console */
'use strict';

/* global Highcharts */

const roleToggleEl = document.getElementById('role-toggle');
const username = 'phun-ky';

let currentRole = 'author';
let currentAbort = null;

const isAbort = (e) => e?.name === 'AbortError';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const ls = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);

      if (!raw) return null;

      const parsed = JSON.parse(raw);

      if (!parsed || typeof parsed !== 'object') return null;

      // exp is required
      if (typeof parsed.exp !== 'number') {
        localStorage.removeItem(key);

        return null;
      }

      if (Date.now() > parsed.exp) {
        localStorage.removeItem(key);

        return null;
      }

      return parsed.v ?? null;
    } catch {
      // corrupt entry
      localStorage.removeItem(key);

      return null;
    }
  },

  set(key, value, ttlMs = ONE_DAY_MS) {
    try {
      const payload = { v: value, exp: Date.now() + ttlMs };

      localStorage.setItem(key, JSON.stringify(payload));
    } catch (e) {
      console.warn('localStorage cache set failed', e);
    }
  },

  del(key) {
    try {
      localStorage.removeItem(key);
      // eslint-disable-next-line no-empty
    } catch {}
  }
};
const LS_PREFIX = 'ph:npmdash:';
const lsKey = (k) => `${LS_PREFIX}${k}`;
const cachedAsync = (
  memPromiseCache,
  key,
  { ttlMs = ONE_DAY_MS, signal } = {},
  fn
) => {
  // 1) memory (in-flight or resolved promise)
  if (memPromiseCache.has(key)) return memPromiseCache.get(key);

  // 2) localStorage
  const hit = ls.get(lsKey(key));

  if (hit != null) return Promise.resolve(hit);

  // 3) fetch + store
  const p = (async () => {
    try {
      const value = await fn();

      ls.set(lsKey(key), value, ttlMs);

      return value;
    } catch (e) {
      // don't keep rejected promises in memory
      memPromiseCache.delete(key);

      if (isAbort(e)) throw e;

      throw e;
    } finally {
      // If you want resolved promises to stay in the map, do nothing.
      // If you prefer only in-flight dedupe, uncomment:
      // memPromiseCache.delete(key);
    }
  })();

  memPromiseCache.set(key, p);

  return p;
};
const downloadHistoryCache = new Map();
const registryCache = new Map();
const searchCache = new Map();
const fetchRegistry = (name, { signal } = {}) => {
  const key = `registry:${name}`;

  return cachedAsync(
    registryCache,
    key,
    { ttlMs: ONE_DAY_MS, signal },
    async () => {
      const res = await fetch(`https://registry.npmjs.org/${name}`, { signal });

      if (!res.ok) throw new Error(`Registry fetch failed: ${res.status}`);

      return await res.json();
    }
  );
};
const searchRegistry = (role, username, { signal } = {}) => {
  const query = `${role}:${username}`;
  const key = `search:${query}`;

  return cachedAsync(
    searchCache,
    key,
    { ttlMs: ONE_DAY_MS, signal },
    async () => {
      const searchUrl = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=250`;
      const res = await fetch(searchUrl, { signal });

      if (!res.ok) throw new Error(`Search failed: ${res.status}`);

      return await res.json();
    }
  );
};
const normalizeRepoUrl = (raw) => {
  if (!raw) return null;

  const rawUrl = typeof raw === 'string' ? raw : raw.url; // tolerate {url:"..."}

  if (!rawUrl) return null;

  let url = rawUrl.replace(/^git\+/, '').replace(/\.git$/, '');

  if (url.startsWith('git@github.com:'))
    url = url.replace('git@github.com:', 'https://github.com/');

  url = url
    .replace(/^git:\/\//, 'https://')
    .replace(/^ssh:\/\/git@/, 'https://')
    .replace(/^git@/, 'https://');

  return url.startsWith('https://') ? url : null;
};
const clearUI = () => {
  downloadsElement.innerHTML = '';
  packageCardsEl.innerHTML = '';
  monthlyDownloadsElement.innerHTML = '';
};
const downloadsElement = document.getElementById('downloads');
const monthlyDownloadsElement = document.getElementById('chart-container');
const totalEl = document.getElementById('total_downloads');
const popularEl = document.getElementById('popular_package');
const newestEl = document.getElementById('newest_package');
const packageCardsEl = document.getElementById('package-cards');
const toggleLabelEl = document.querySelector('[for="role-toggle"]');
const paneElement = document.querySelector('.ph.pane');
// const fetchPackageDeprecationStatus = async (pkgName) => {
//   var _a;
//   const url = `https://registry.npmjs.org/${pkgName}`;
//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error(`Failed for ${pkgName}`);
//     const data = await res.json();
//     const latestVersion = data['dist-tags'].latest;
//     const deprecated =
//       ((_a = data.versions[latestVersion]) === null || _a === void 0
//         ? void 0
//         : _a.deprecated) || null;
//     return { name: pkgName, deprecated };
//   } catch (err) {
//     console.warn(`Deprecation check failed for ${pkgName}:`, err);
//     return { name: pkgName, deprecated: null };
//   }
// };
// const fetchAllDeprecationStatuses = async (packageNames, concurrency = 5) => {
//   const results = {};
//   let index = 0;
//   const worker = async () => {
//     while (index < packageNames.length) {
//       const currentIndex = index++;
//       const pkg = packageNames[currentIndex];
//       const result = await fetchPackageDeprecationStatus(pkg);
//       results[result.name] = result.deprecated;
//     }
//   };
//   // Run N workers in parallel
//   await Promise.all(Array.from({ length: concurrency }, () => worker()));
//   return results;
// };
/**
 * Fetch all npm packages by a user and their monthly download counts.
 */
const fetchUserPackageDownloads = async (username, { signal } = {}) => {
  const data = await searchRegistry(currentRole, username, { signal });
  const packages = await Promise.all(
    data.objects.map(async (pkg) => {
      var _a;

      const name = pkg.package.name;

      let maintainers = [];

      try {
        const detailData = await fetchRegistry(name, { signal });

        maintainers = detailData.maintainers || [];
      } catch (err) {
        console.warn(`Failed to fetch maintainers for ${name}:`, err);
      }

      return {
        package: Object.assign(Object.assign({}, pkg.package), {
          updated: pkg.updated,
          maintainers
        }),
        downloads: {
          monthly:
            parseInt(
              (_a = pkg.downloads) === null || _a === void 0
                ? void 0
                : _a.monthly
            ) || 0
        }
      };
    })
  );
  // const names = packages.map((pkg) => pkg.package.name);
  // const deprecationStatuses = await fetchAllDeprecationStatuses(names);
  // console.log('deprecationStatuses', deprecationStatuses);
  const totalDownloads = packages.reduce(
    (sum, pkg) => sum + pkg.downloads.monthly,
    0
  );

  if (totalEl) {
    totalEl.textContent = new Intl.NumberFormat(navigator.language, {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(totalDownloads);
  }

  return packages;
};
/**
 * Render download statistics in the DOM.
 */
const renderDownloadStats = (packages, { signal } = {}) => {
  console.log(packages, downloadsElement);

  if (!downloadsElement) return;

  if (!packages?.length) return;

  const sortedByDownloads = [...packages].sort(
    (a, b) => b.downloads.monthly - a.downloads.monthly
  );
  const maxPackage = sortedByDownloads[0];
  const newestPackage = packages.reduce((latest, current) => {
    const a = new Date(
      current.package.date ?? current.package.updated ?? 0
    ).getTime();
    const b = new Date(
      latest.package.date ?? latest.package.updated ?? 0
    ).getTime();

    return a > b ? current : latest;
  });

  if (popularEl) popularEl.textContent = maxPackage.package.name;

  if (newestEl) newestEl.textContent = newestPackage.package.name;

  const listFrag = document.createDocumentFragment();
  const cardsFrag = document.createDocumentFragment();
  const numberFormat = new Intl.NumberFormat(navigator.language);
  const packageCardMeta = [];

  sortedByDownloads.forEach((pkg, index) => {
    const { name, links, maintainers = [] } = pkg.package;
    const dl = document.createElement('dl');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    const link = document.createElement('a');

    dl.classList.add('ph');
    dt.classList.add('ph', 'name');
    dd.classList.add('ph', 'downloads');
    link.classList.add('ph');
    link.href = links.npm;

    const packageNameElement = document.createElement('span');

    packageNameElement.classList.add('ph');
    packageNameElement.textContent = name;
    link.appendChild(packageNameElement);
    dt.appendChild(link);

    const monthlyDownloads = numberFormat.format(pkg.downloads.monthly);

    dd.textContent = monthlyDownloads;

    const packageCardEl = document.createElement('div');

    packageCardEl.classList.add('ph', 'card');

    const title = document.createElement('a');

    title.setAttribute('href', links.npm);
    title.setAttribute('target', '_blank');
    title.setAttribute('rel', 'noopener noreferrer');
    title.classList.add('ph', 'title');
    title.addEventListener('click', (e) => e.stopPropagation());
    title.textContent = name;

    const downloads = document.createElement('span');

    downloads.classList.add('ph', 'package-card-downloads');
    downloads.textContent = numberFormat.format(pkg.downloads.monthly);
    dl.append(dt, dd);
    listFrag.appendChild(dl);

    // Maintainers section
    const maintainersContainer = document.createElement('div');

    maintainersContainer.classList.add('ph', 'maintainers');
    maintainers.forEach(({ name }) => {
      const avatar = document.createElement('img');

      avatar.src = `https://avatars.githubusercontent.com/${name}`;
      avatar.alt = name;
      avatar.loading = 'lazy';
      avatar.title = name;
      avatar.classList.add('ph');

      const link = document.createElement('a');

      link.classList.add('ph');
      link.href = `https://www.npmjs.com/~${name}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.appendChild(avatar);
      maintainersContainer.appendChild(link);
    });

    const chartEl = document.createElement('div');

    chartEl.id = `chart-${index}`;
    chartEl.classList.add('ph', 'chart');

    const repoUrl = normalizeRepoUrl(links.repository);

    if (repoUrl) {
      const githubLinkEl = document.createElement('a');

      githubLinkEl.classList.add('ph', 'github-link');
      githubLinkEl.setAttribute('target', '_blank');
      githubLinkEl.setAttribute('rel', 'noopener noreferrer');
      githubLinkEl.setAttribute('href', repoUrl);
      githubLinkEl.addEventListener('click', (e) => e.stopPropagation());
      githubLinkEl.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96"><path fill="currentColor" fill-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" clip-rule="evenodd"/></svg>';
      packageCardEl.append(
        title,
        githubLinkEl,
        downloads,
        maintainersContainer,
        chartEl
      );
    } else {
      packageCardEl.append(title, downloads, maintainersContainer, chartEl);
    }

    packageCardEl.addEventListener('click', () => {
      paneElement.classList.toggle('is-open');
    });
    cardsFrag.append(packageCardEl);

    packageCardMeta.push({ name, id: chartEl.id });
  });

  downloadsElement.appendChild(listFrag);
  packageCardsEl.appendChild(cardsFrag);
  packageCardMeta.forEach((card) => {
    renderSinglePackageChart(card.name, card.id, { signal });
  });
};
const renderSinglePackageChart = async (
  pkgName,
  containerId,
  { signal } = {}
) => {
  if (!document.getElementById(containerId)) return;

  try {
    const data = await fetchLastYearDownloads(pkgName, { signal });
    // Aggregate daily data into monthly, excluding the current (incomplete) month
    const monthly = {};
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM" in UTC

    for (const { day, downloads } of data.downloads || []) {
      const month = day.slice(0, 7); // "YYYY-MM"

      if (month === currentMonth) continue; // skip current month

      monthly[month] = (monthly[month] || 0) + downloads;
    }

    // Build [timestamp, value] points (timestamp = first of month in UTC)
    const monthKeys = Object.keys(monthly).sort((a, b) => {
      const [ya, ma] = a.split('-').map(Number);
      const [yb, mb] = b.split('-').map(Number);

      return ya !== yb ? ya - yb : ma - mb;
    });
    const seriesData = monthKeys.map((m) => {
      const [y, mth] = m.split('-').map(Number);

      return [Date.UTC(y, mth - 1, 1), monthly[m]];
    });
    const chartOptions = {
      chart: {
        type: 'areaspline',
        margin: 0,
        backgroundColor: 'rgba(255,255,255,0)'
      },
      title: { text: undefined },
      xAxis: {
        gridLineColor: 'rgba(255,255,255,0.05)',
        gridLineWidth: 0,
        margin: 0,
        maxPadding: 0,
        type: 'datetime'
      },
      yAxis: {
        title: { text: undefined },
        margin: 0,
        gridLineWidth: 0,
        maxPadding: 0,
        gridLineColor: 'rgba(255,255,255,0.05)'
      },
      tooltip: {
        xDateFormat: '%Y-%m', // show month
        shared: true
      },
      legend: { enabled: false },
      plotOptions: {
        areaspline: {
          fillOpacity: 1,
          marker: { enabled: false }
        }
      },
      series: [
        {
          name: 'Downloads',
          data: seriesData,
          color: 'var(--ph-brand-color)',
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'var(--ph-color-chart-gradient-start)'],
              [1, 'var(--ph-color-chart-gradient-stop)']
            ]
          }
        }
      ],
      credits: { enabled: false }
    };

    if (!document.getElementById(containerId)) return;

    Highcharts.chart(containerId, chartOptions);
  } catch (err) {
    console.warn(`Chart error for ${pkgName}:`, err);
  }
};
const fetchLastYearDownloads = (name, { signal } = {}) => {
  const key = `downloads:last-year:${name}`;

  return cachedAsync(
    downloadHistoryCache,
    key,
    { ttlMs: ONE_DAY_MS, signal },
    async () => {
      const url = `https://api.npmjs.org/downloads/range/last-year/${encodeURIComponent(name)}`;
      const res = await fetch(url, { signal });

      if (!res.ok) throw new Error(`Downloads fetch failed: ${res.status}`);

      return await res.json();
    }
  );
};
/**
 * Fetch total monthly downloads across all packages by user,
 * excluding the current (incomplete) month.
 */
const fetchAllPackagesMonthlyDownloads = async (username, { signal } = {}) => {
  const data = await searchRegistry(currentRole, username, { signal });
  const downloadsPerMonth = {};
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM" in UTC

  for (const item of data.objects || []) {
    const name = item.package.name;

    try {
      const { downloads } = await fetchLastYearDownloads(name, { signal });

      for (const { day, downloads: dayDownloads } of downloads) {
        const month = day.slice(0, 7); // "YYYY-MM"

        if (month === currentMonth) continue; // skip current month

        downloadsPerMonth[month] =
          (downloadsPerMonth[month] || 0) + dayDownloads;
      }
    } catch (err) {
      console.warn(`Failed for ${name}:`, err);
    }
  }

  // Safety: ensure current month isn't present even if added elsewhere.
  delete downloadsPerMonth[currentMonth];

  return downloadsPerMonth;
};

/**
 * Render downloads as a Highcharts areaspline chart.
 */
let currentChart = null;
let currentResizeObserver = null;

const renderMonthlyDownloadsChart = async (username, { signal } = {}) => {
  const data = await fetchAllPackagesMonthlyDownloads(username, { signal });
  const seriesData = Object.entries(data)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([month, value]) => [new Date(`${month}-01`).getTime(), value]);
  const container = document.getElementById('chart-container');

  if (!container) {
    console.warn('Chart container not found.');

    return;
  }

  // 🧹 Clean up previous chart and observer
  if (currentChart) {
    currentChart.destroy();
    currentChart = null;
  }

  if (currentResizeObserver) {
    currentResizeObserver.disconnect();
    currentResizeObserver = null;
  }

  const chartOptions = {
    chart: {
      type: 'areaspline',
      margin: 0,
      marginBottom: 40,
      backgroundColor: 'rgba(255,255,255,0)'
    },
    title: { text: undefined },
    xAxis: {
      type: 'datetime',
      margin: 0,
      maxPadding: 0,
      gridLineColor: 'rgba(255,255,255,0.05)',
      labels: {
        format: '{value:%b}',
        style: { color: 'var(--ph-color-text, #9fa8ad)', fontSize: '1rem' }
      }
    },
    yAxis: {
      title: { text: undefined },
      margin: 0,
      maxPadding: 0,
      gridLineColor: 'rgba(255,255,255,0.05)'
    },
    tooltip: {
      xDateFormat: '%Y-%m-%d',
      shared: true
    },
    legend: { enabled: false },
    plotOptions: {
      areaspline: {
        fillOpacity: 1,
        marker: { enabled: false }
      }
    },
    series: [
      {
        name: 'Downloads',
        data: seriesData,
        color: 'var(--ph-brand-color)',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'var(--ph-color-chart-gradient-start)'],
            [1, 'var(--ph-color-chart-gradient-stop)']
          ]
        }
      }
    ],
    credits: { enabled: false }
  };

  // Create chart
  currentChart = Highcharts.chart(container, chartOptions);
  // Attach ResizeObserver
  currentResizeObserver = new ResizeObserver(() => {
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    if (width && height) {
      currentChart.setSize(width, height, false);
    }
  });
  currentResizeObserver.observe(container);
};

currentAbort = new AbortController();

const { signal } = currentAbort;

(async () => {
  // Initialize dashboard
  const pkgs = await fetchUserPackageDownloads(username, { signal });

  renderDownloadStats(pkgs, { signal });

  await renderMonthlyDownloadsChart(username, { signal });
})();

const reload = async (e) => {
  currentAbort?.abort();
  currentAbort = new AbortController();

  const signal = currentAbort.signal;
  const el = e.currentTarget;

  currentRole = el.checked ? 'maintainer' : 'author';
  clearUI();
  toggleLabelEl.textContent =
    currentRole === 'author' ? 'Author' : 'Maintainer';

  const pkgs = await fetchUserPackageDownloads(username, {
    signal
  });

  renderDownloadStats(pkgs, { signal });

  await renderMonthlyDownloadsChart(username, { signal });
};
const clearDashboardCache = () => {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(LS_PREFIX))
    .forEach((k) => localStorage.removeItem(k));
};
const clearCacheButtonElement = document.querySelector('#clear-cache');

clearCacheButtonElement.addEventListener('click', () => clearDashboardCache());

roleToggleEl?.addEventListener('change', reload);
