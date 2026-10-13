import catalog from './data/instruments.json';
import './style.css';
import './chords.css';

const app = document.querySelector('#app');

function previewFor(instrument) {
  if (instrument.id === 'piano') {
    return `
      <div class="choice-piano" aria-hidden="true">
        <i class="choice-white active"></i><i class="choice-white"></i><i class="choice-white active"></i><i class="choice-white"></i><i class="choice-white active"></i><i class="choice-white"></i><i class="choice-white"></i>
        <i class="choice-black black-a"></i><i class="choice-black black-b"></i><i class="choice-black black-d"></i><i class="choice-black black-e"></i><i class="choice-black black-f"></i>
      </div>
    `;
  }

  return `
    <div class="choice-guitar" aria-hidden="true">
      <i class="choice-string"></i><i class="choice-string"></i><i class="choice-string"></i><i class="choice-string"></i><i class="choice-string"></i><i class="choice-string"></i>
      <i class="choice-fret"></i><i class="choice-fret"></i><i class="choice-fret"></i><i class="choice-fret"></i>
      <i class="choice-dot dot-a"></i><i class="choice-dot dot-b"></i><i class="choice-dot dot-c"></i>
    </div>
  `;
}

app.innerHTML = `
  <div class="app-shell instrument-page-shell">
    <header class="topbar">
      <a class="brand" href="../" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
        <a class="home-link" href="../">HOME <span aria-hidden="true">↖</span></a>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode" aria-pressed="false">
          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>
    </header>

    <main class="instrument-page-main">
      <section class="instrument-page-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> SONG UTILS <span class="eyebrow-divider">/</span> CHORDS</p>
        <h1>Pick your <em>instrument.</em></h1>
        <p>Choose the view that matches what you play.</p>
      </section>

      <section class="instrument-choice-section" aria-labelledby="instrument-choice-title">
        <div class="instrument-choice-heading">
          <div>
            <p class="section-index">01 <span>CHORD ATLAS</span></p>
            <h2 id="instrument-choice-title">Select an instrument</h2>
          </div>
          <span class="choice-count">${String(catalog.instruments.length).padStart(2, '0')}</span>
        </div>
        <div class="instrument-choice-grid">
          ${catalog.instruments.map((instrument, index) => `
            <a class="instrument-choice" href="./atlas/?instrument=${instrument.id}">
              <div class="choice-topline"><span>${String(index + 1).padStart(2, '0')} / ${instrument.id === 'piano' ? 'KEYS' : 'STRINGS'}</span><span class="choice-arrow" aria-hidden="true">↗</span></div>
              ${previewFor(instrument)}
              <div class="choice-copy">
                <h3>${instrument.name}</h3>
                <p>${instrument.id === 'piano' ? 'Chord notes highlighted on the keyboard.' : 'Open chord shapes and movable barre grips.'}</p>
              </div>
              <span class="choice-action">OPEN ${instrument.name.toUpperCase()} ATLAS <span aria-hidden="true">→</span></span>
            </a>
          `).join('')}
        </div>
      </section>

      <footer class="page-footer instrument-page-footer">
        <span>SONG UTILS <span class="footer-separator">/</span> CHORD ATLAS</span>
        <span>12 ROOTS · MAJOR + MINOR</span>
      </footer>
    </main>
  </div>
`;

const themeToggle = document.querySelector('#theme-toggle');

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} mode`;
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☼' : '☾';
}

setTheme(localStorage.getItem('song-utils-theme-v2') ?? 'dark');
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('song-utils-theme-v2', nextTheme);
  setTheme(nextTheme);
});
