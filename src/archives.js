import catalog from './data/songs.json';
import './style.css';
import './archives.css';

const covers = import.meta.glob('../covers/*.svg', { eager: true, import: 'default', query: '?url' });
const songCharts = import.meta.glob('../songs/*.json', { eager: true, import: 'default' });
const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-shell archives-shell">
    <header class="topbar">
      <a class="brand" href="../" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
        <a class="home-link" href="../">HOME <span aria-hidden="true">↖</span></a>
        <a class="archive-chords-link" href="../chords/">CHORD ATLAS <span aria-hidden="true">↗</span></a>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode" aria-pressed="false">
          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>
    </header>

    <main class="archives-main">
      <section class="archives-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> SONG UTILS <span class="eyebrow-divider">/</span> ARCHIVES</p>
        <h1>Song <em>Archives.</em></h1>
        <p>Lyrics, chords, and measures together.</p>
      </section>

      <section class="archive-library" aria-labelledby="archive-title">
        <div class="archive-library-heading">
          <div>
            <p class="section-index">01 <span>LIBRARY</span></p>
            <h2 id="archive-title">Browse songs</h2>
          </div>
          <span class="archive-count" id="archive-count"></span>
        </div>
        <div class="archive-layout">
          <div class="archive-song-list" id="archive-song-list" aria-label="Songs"></div>
          <article class="archive-sheet" id="archive-sheet" aria-live="polite"></article>
        </div>
      </section>

      <footer class="page-footer archives-footer">
        <span>SONG UTILS <span class="footer-separator">/</span> SONG ARCHIVES</span>
        <span>LYRICS + CHORDS</span>
      </footer>
    </main>
  </div>
`;

const archiveSongList = document.querySelector('#archive-song-list');
const archiveSheet = document.querySelector('#archive-sheet');
const themeToggle = document.querySelector('#theme-toggle');

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} mode`;
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☼' : '☾';
}

setTheme(localStorage.getItem('song-utils-theme') === 'dark' ? 'dark' : 'light');
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('song-utils-theme', nextTheme);
  setTheme(nextTheme);
});

document.querySelector('#archive-count').textContent = `${String(catalog.songs.length).padStart(2, '0')} SONG${catalog.songs.length === 1 ? '' : 'S'}`;

function renderSongCards() {
  for (const song of catalog.songs) {
    const button = document.createElement('button');
    button.className = 'archive-song-card';
    button.type = 'button';
    button.dataset.songId = song.id;
    button.setAttribute('aria-pressed', 'false');

    const cover = document.createElement('img');
    cover.className = 'archive-cover';
    cover.src = covers[`../covers/${song.cover}`];
    cover.alt = `${song.title} cover`;

    const copy = document.createElement('span');
    copy.className = 'archive-card-copy';
    const title = document.createElement('strong');
    title.className = 'archive-card-title';
    title.textContent = song.title;
    const author = document.createElement('span');
    author.className = 'archive-card-author';
    author.textContent = song.author;
    const info = document.createElement('span');
    info.className = 'archive-card-info';
    info.textContent = song.info;
    copy.append(title, author, info);
    button.append(cover, copy);
    archiveSongList.append(button);
  }
}

function renderSong(song, chart) {
  archiveSheet.replaceChildren();
  archiveSheet.setAttribute('aria-label', `${song.title} song sheet`);

  const header = document.createElement('header');
  header.className = 'song-sheet-header';
  const titleBlock = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = song.title;
  const artist = document.createElement('p');
  artist.textContent = song.author;
  titleBlock.append(title, artist);

  const metadata = document.createElement('div');
  metadata.className = 'song-metadata';
  for (const [label, value] of [['KEY', chart.key], ['METER', chart.meter]]) {
    const item = document.createElement('span');
    item.className = 'song-meta-item';
    const metaLabel = document.createElement('span');
    metaLabel.textContent = label;
    const metaValue = document.createElement('strong');
    metaValue.textContent = value;
    item.append(metaLabel, metaValue);
    metadata.append(item);
  }
  header.append(titleBlock, metadata);
  archiveSheet.append(header);

  let tactNumber = 0;
  for (const sectionData of chart.sections) {
    const section = document.createElement('section');
    section.className = 'song-section';
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = sectionData.name;
    const tactGrid = document.createElement('div');
    tactGrid.className = 'tact-grid';

    for (const tactData of sectionData.tacts) {
      tactNumber += 1;
      const tact = document.createElement('div');
      tact.className = 'song-tact';
      const tactLabel = document.createElement('span');
      tactLabel.className = 'tact-number';
      tactLabel.textContent = `TACT ${String(tactNumber).padStart(2, '0')}`;
      const lyrics = document.createElement('div');
      lyrics.className = 'tact-lyrics';

      for (const part of tactData.parts) {
        const lyricPart = document.createElement('span');
        lyricPart.className = 'lyric-part';
        const chord = document.createElement('strong');
        chord.className = 'lyric-chord';
        chord.textContent = part.chord;
        const text = document.createElement('span');
        text.className = 'lyric-text';
        text.textContent = part.lyrics;
        lyricPart.append(chord, text);
        lyrics.append(lyricPart);
      }

      tact.append(tactLabel, lyrics);
      tactGrid.append(tact);
    }

    section.append(sectionTitle, tactGrid);
    archiveSheet.append(section);
  }
}

function selectSong(songId) {
  const song = catalog.songs.find((entry) => entry.id === songId);
  const chart = songCharts[`../songs/${songId}.json`];
  if (!song || !chart) return;
  archiveSongList.querySelectorAll('[data-song-id]').forEach((button) => {
    const selected = button.dataset.songId === songId;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  renderSong(song, chart);
}

archiveSongList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-song-id]');
  if (button) selectSong(button.dataset.songId);
});

renderSongCards();
if (catalog.songs.length > 0) {
  selectSong(catalog.songs[0].id);
} else {
  archiveSheet.textContent = 'No songs in the archive yet.';
}
