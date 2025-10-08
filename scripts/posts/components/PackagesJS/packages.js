'use strict';

/* global Highcharts */

const roleToggleEl = document.getElementById('role-toggle');

let currentRole = 'author';

const normalizeRepoUrl = (rawUrl) => {
  if (!rawUrl) return null;

  // Remove prefix like "git+", and protocol variants
  let url = rawUrl.replace(/^git\+/, '');

  // Convert git@github.com:user/repo.git → https://github.com/user/repo
  if (url.startsWith('git@github.com:')) {
    url = url.replace('git@github.com:', 'https://github.com/');
  }

  // Convert git:// or ssh:// or git+https:// → https://
  url = url.replace(/^git:\/\/|^ssh:\/\/git@|^git@/, 'https://');
  url = url.replace('github.com/', 'github.com/');
  // Remove trailing `.git`
  url = url.replace(/\.git$/, '');

  return url;
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
const contentElement = document.querySelector('.ph.content');
const paneElement = document.querySelector('.ph.pane');
const fetchPackageDeprecationStatus = async (pkgName) => {
  var _a;

  const url = `https://registry.npmjs.org/${pkgName}`;

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed for ${pkgName}`);

    const data = await res.json();
    const latestVersion = data['dist-tags'].latest;
    const deprecated =
      ((_a = data.versions[latestVersion]) === null || _a === void 0
        ? void 0
        : _a.deprecated) || null;

    return { name: pkgName, deprecated };
  } catch (err) {
    console.warn(`Deprecation check failed for ${pkgName}:`, err);

    return { name: pkgName, deprecated: null };
  }
};
const fetchAllDeprecationStatuses = async (packageNames, concurrency = 5) => {
  const results = {};

  let index = 0;

  const worker = async () => {
    while (index < packageNames.length) {
      const currentIndex = index++;
      const pkg = packageNames[currentIndex];
      const result = await fetchPackageDeprecationStatus(pkg);

      results[result.name] = result.deprecated;
    }
  };

  // Run N workers in parallel
  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  return results;
};
/**
 * Fetches time series download data for a specific npm package.
 */
const fetchPackageTimeSeries = async (pkgName) => {
  const url = `https://api.npmjs.org/downloads/range/last-month/${pkgName}`;

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to fetch time series for ${pkgName}`);

    return await res.json();
  } catch (err) {
    console.warn(err);

    return null;
  }
};
/**
 * Maps a value between min and max to a RGB color scale.
 */
const getColorForValue = (value, min, max) => {
  if (min === max) return '#000000';

  const normalized = (value - min) / (max - min);

  let r = 0;
  let g = 0;
  let b = 0;

  if (normalized < 0.5) {
    const t = normalized * 2;

    r = 255 * (1 - t);
    b = 255 * t;
  } else {
    const t = (normalized - 0.5) * 2;

    g = 255 * t;
    b = 255 * (1 - t);
  }

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};
/**
 * Fetch all npm packages by a user and their monthly download counts.
 */
const fetchUserPackageDownloads = async (username) => {
  const searchUrl = `https://registry.npmjs.org/-/v1/search?text=${currentRole}:${username}&size=250`;
  const res = await fetch(searchUrl);
  const data = await res.json();
  const packages = await Promise.all(
    data.objects.map(async (pkg) => {
      var _a;

      const name = pkg.package.name;

      let maintainers = [];

      try {
        const detailRes = await fetch(`https://registry.npmjs.org/${name}`);
        const detailData = await detailRes.json();

        maintainers = detailData.maintainers || [];
      } catch (err) {
        console.warn(`Failed to fetch maintainers for ${name}:`, err);
      }

      return {
        package: Object.assign(Object.assign({}, pkg.package), {
          updated: pkg.updated,
          maintainers,
        }),
        downloads: {
          monthly:
            parseInt(
              (_a = pkg.downloads) === null || _a === void 0
                ? void 0
                : _a.monthly
            ) || 0,
        },
      };
    })
  );
  const names = packages.map((pkg) => pkg.package.name);
  const deprecationStatuses = await fetchAllDeprecationStatuses(names);

  console.log('deprecationStatuses', deprecationStatuses);

  const totalDownloads = packages.reduce(
    (sum, pkg) => sum + pkg.downloads.monthly,
    0
  );

  if (totalEl) {
    totalEl.textContent = new Intl.NumberFormat(navigator.language, {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(totalDownloads);
  }

  return packages;
};
/**
 * Render download statistics in the DOM.
 */
const renderDownloadStats = (packages) => {
  if (!downloadsElement) return;

  const sortedByDownloads = [...packages].sort(
    (a, b) => b.downloads.monthly - a.downloads.monthly
  );
  const maxPackage = sortedByDownloads[0];

  console.log(packages);

  const newestPackage = packages.reduce((latest, current) =>
    new Date(current.package.date).getTime() >
    new Date(latest.package.date).getTime()
      ? current
      : latest
  );

  if (popularEl) popularEl.textContent = maxPackage.package.name;

  if (newestEl) newestEl.textContent = newestPackage.package.name;

  sortedByDownloads.forEach((pkg, index) => {
    const { name, links, maintainers = [], updated, version } = pkg.package;
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

    const monthlyDownloads = new Intl.NumberFormat(navigator.language).format(
      pkg.downloads.monthly
    );

    dd.textContent = monthlyDownloads;

    const packageCardEl = document.createElement('div');

    packageCardEl.classList.add('ph', 'card');

    const title = document.createElement('a');

    title.setAttribute('href', links.npm);
    title.setAttribute('target', '_blank');
    title.classList.add('ph', 'title');
    title.textContent = name;

    const downloads = document.createElement('span');

    downloads.classList.add('ph', 'package-card-downloads');
    downloads.textContent = new Intl.NumberFormat(navigator.language).format(
      pkg.downloads.monthly
    );
    dl.append(dt, dd);
    downloadsElement.appendChild(dl);

    // Maintainers section
    const maintainersContainer = document.createElement('div');

    maintainersContainer.classList.add('ph', 'maintainers');
    maintainers.forEach(({ name }) => {
      const avatar = document.createElement('img');

      avatar.src = `https://avatars.githubusercontent.com/${name}`;
      avatar.alt = name;
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

    const githubLinkEl = document.createElement('a');

    githubLinkEl.classList.add('ph', 'github-link');
    githubLinkEl.setAttribute('target', '_blank');
    githubLinkEl.setAttribute('href', normalizeRepoUrl(links.repository));
    githubLinkEl.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96"><path fill="currentColor" fill-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" clip-rule="evenodd"/></svg>';
    packageCardEl.append(
      title,
      githubLinkEl,
      downloads,
      maintainersContainer,
      chartEl
    );
    packageCardEl.addEventListener('click', (e) => {
      paneElement.classList.toggle('is-open');
    });
    packageCardsEl.append(packageCardEl);
    renderSinglePackageChart(name, chartEl.id);
  });
};
const renderSinglePackageChart = async (pkgName, containerId) => {
  const url = `https://api.npmjs.org/downloads/range/last-year/${encodeURIComponent(
    pkgName
  )}`;

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Fetch failed for ${pkgName}`);

    const data = await res.json();
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
        backgroundColor: 'rgba(255,255,255,0)',
      },
      title: { text: undefined },
      xAxis: {
        gridLineColor: 'rgba(255,255,255,0.05)',
        gridLineWidth: 0,
        margin: 0,
        maxPadding: 0,
        type: 'datetime',
      },
      yAxis: {
        title: { text: undefined },
        margin: 0,
        gridLineWidth: 0,
        maxPadding: 0,
        gridLineColor: 'rgba(255,255,255,0.05)',
      },
      tooltip: {
        xDateFormat: '%Y-%m', // show month
        shared: true,
      },
      legend: { enabled: false },
      plotOptions: {
        areaspline: {
          fillOpacity: 1,
          marker: { enabled: false },
        },
      },
      series: [
        {
          name: 'Downloads',
          data: seriesData,
          color: '#6ca7f9',
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, 'rgba(108, 167, 249, 0.2)'],
              [1, 'rgba(108, 167, 249, 0.0)'],
            ],
          },
        },
      ],
      credits: { enabled: false },
    };

    Highcharts.chart(containerId, chartOptions);
  } catch (err) {
    console.warn(`Chart error for ${pkgName}:`, err);
  }
};
/**
 * Fetch total monthly downloads across all packages by user,
 * excluding the current (incomplete) month.
 */
const fetchAllPackagesMonthlyDownloads = async (username) => {
  const url = `https://registry.npmjs.org/-/v1/search?text=maintainer:${username}&size=250`;
  const res = await fetch(url);
  const data = await res.json();
  const downloadsPerMonth = {};
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM" in UTC

  for (const item of data.objects || []) {
    const name = item.package.name;
    const historyUrl = `https://api.npmjs.org/downloads/range/last-year/${encodeURIComponent(
      name
    )}`;

    try {
      const histRes = await fetch(historyUrl);

      if (!histRes.ok) continue;

      const { downloads } = await histRes.json();

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

const renderMonthlyDownloadsChart = async (username) => {
  const data = await fetchAllPackagesMonthlyDownloads(username);
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
      backgroundColor: 'rgba(255,255,255,0)',
    },
    title: { text: undefined },
    xAxis: {
      type: 'datetime',
      margin: 0,
      maxPadding: 0,
      gridLineColor: 'rgba(255,255,255,0.05)',
      labels: {
        format: '{value:%b}',
        style: { color: 'var(--ph-color-text, #9fa8ad)', fontSize: '1rem' },
      },
    },
    yAxis: {
      title: { text: undefined },
      margin: 0,
      maxPadding: 0,
      gridLineColor: 'rgba(255,255,255,0.05)',
    },
    tooltip: {
      xDateFormat: '%Y-%m-%d',
      shared: true,
    },
    legend: { enabled: false },
    plotOptions: {
      areaspline: {
        fillOpacity: 1,
        marker: { enabled: false },
      },
    },
    series: [
      {
        name: 'Downloads',
        data: seriesData,
        color: '#6ca7f9',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(108, 167, 249, 0.2)'],
            [1, 'rgba(108, 167, 249, 0.0)'],
          ],
        },
      },
    ],
    credits: { enabled: false },
  };

  // Create chart
  currentChart = Highcharts.chart(container, chartOptions);
  // Attach ResizeObserver
  currentResizeObserver = new ResizeObserver(() => {
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    if (width && height) {
      currentChart === null || currentChart === void 0
        ? void 0
        : currentChart.destroy();
      currentChart = Highcharts.chart(
        container,
        Object.assign(Object.assign({}, chartOptions), {
          chart: Object.assign(Object.assign({}, chartOptions.chart), {
            width,
            height,
          }),
        })
      );
    }
  });
  currentResizeObserver.observe(container);
};

// Initialize dashboard
fetchUserPackageDownloads('phun-ky').then(renderDownloadStats);
renderMonthlyDownloadsChart('phun-ky');
roleToggleEl === null || roleToggleEl === void 0
  ? void 0
  : roleToggleEl.addEventListener('change', async () => {
      currentRole = roleToggleEl.checked ? 'maintainer' : 'author';
      clearUI();

      if (currentRole === 'author') {
        toggleLabelEl.innerHTML = 'Author';

        const pkgs = await fetchUserPackageDownloads('phun-ky');

        renderDownloadStats(pkgs);
        renderMonthlyDownloadsChart('phun-ky');
      } else {
        toggleLabelEl.innerHTML = 'Maintainer';

        const pkgs = await fetchUserPackageDownloads('phun-ky');

        renderDownloadStats(pkgs);
        renderMonthlyDownloadsChart('phun-ky');
      }
    });
