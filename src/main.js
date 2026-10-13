import catalog from './data/instruments.json';
import './style.css';
import { renderGuitarPage } from './pages/guitar.js';
import { renderPianoPage } from './pages/piano.js';

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B', 'H'];
const baseRoots = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];
const naturalPitchClasses = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, H: 11 };
const guitarStringOctaves = [2, 2, 3, 3, 3, 4];
const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="../../" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
        <a class="home-link" href="../../">HOME <span aria-hidden="true">↖</span></a>
        <a class="home-link" href="../">INSTRUMENTS <span aria-hidden="true">↗</span></a>
        <span class="edition-label">THE MUSICIAN'S TOOLKIT</span>
        <label class="instrument-control" for="instrument-select">
          <span class="instrument-icon" aria-hidden="true">♫</span>
          <select id="instrument-select" aria-label="Select instrument"></select>
          <span class="select-chevron" aria-hidden="true">⌄</span>
        </label>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode" aria-pressed="false">
          <span class="theme-icon" aria-hidden="true">☾</span>
        </button>
      </div>
    </header>

    <main>
      <section class="intro-row" aria-labelledby="page-title">
        <div>
          <p class="eyebrow"><span class="eyebrow-dot"></span> CHORD ATLAS <span class="eyebrow-divider">/</span> <span id="instrument-name">PIANO</span></p>
          <h1 id="page-title">Find your <em>next</em> sound.</h1>
          <p class="intro-copy">Pick a root. Add a sharp or minor and see the keys change.</p>
        </div>
        <div class="instrument-stamp" aria-hidden="true">
          <span class="stamp-note">♪</span>
          <span class="stamp-caption">PLAY<br />BY FEEL</span>
        </div>
      </section>

      <section class="workspace" id="workspace" aria-label="Piano chord explorer">
        <aside class="catalog-panel">
          <div class="panel-heading">
            <div>
              <p class="section-index">01 <span>LIBRARY</span></p>
              <h2>Choose a chord</h2>
            </div>
            <span class="chord-count" id="chord-count"></span>
          </div>

          <div class="modifier-label">BASE NOTE</div>
          <div class="root-picker" id="root-picker" role="group" aria-label="Choose a base note">
            ${baseRoots.map((root) => `<button class="root-option${root === 'C' ? ' is-active' : ''}" type="button" data-base-root="${root}" aria-pressed="${root === 'C'}">${root}</button>`).join('')}
          </div>

          <div class="modifier-label modifier-heading">ADD MODIFIERS</div>
          <div class="modifier-row" role="group" aria-label="Chord modifiers">
            <button class="modifier-button" id="sharp-toggle" type="button" aria-pressed="false"><span class="modifier-symbol">#</span><span>Sharp</span></button>
            <button class="modifier-button" id="minor-toggle" type="button" aria-pressed="false"><span class="modifier-symbol">m</span><span>Minor</span></button>
          </div>
          <p class="catalog-footnote"><span class="footnote-dot"></span> <span id="catalog-summary"></span></p>
        </aside>

        <section class="detail-panel" aria-live="polite" aria-label="Selected chord">
          <div class="detail-topline">
            <p class="section-index">02 <span>YOUR CHORD</span></p>
            <span class="voicing-badge"><span class="live-dot"></span> ROOT POSITION</span>
          </div>
          <div class="chord-heading">
            <div>
              <h2 id="chord-title">C</h2>
              <p id="chord-subtitle">C major triad</p>
            </div>
            <span class="chord-symbol" id="chord-symbol">C</span>
          </div>

          <div class="notes-strip">
            <div class="notes-label"><span class="notes-icon" aria-hidden="true">⌁</span> NOTES IN THIS CHORD</div>
            <div class="note-chips" id="note-chips"></div>
          </div>

          <div class="keyboard-header">
            <div>
              <p class="keyboard-title" id="grip-title">KEYBOARD VIEW</p>
              <p class="keyboard-hint" id="grip-hint">Highlighted keys are played together</p>
            </div>
            <div class="octave-label" id="octave-label"></div>
          </div>
          <div class="keyboard-scroll" id="grip-display" tabindex="0" aria-label="Scrollable piano keyboard">
            <div class="keyboard" id="keyboard" role="img" aria-label="Piano keyboard with chord notes highlighted"></div>
          </div>
          <div class="keyboard-legend" id="keyboard-legend"><span class="legend-key"></span> <span id="grip-legend">PLAY THIS NOTE</span> <span class="legend-rule"></span> <span id="grip-caption">3 NOTES · ROOT POSITION</span></div>
          <div class="detail-bottom">
            <span class="detail-tip"><span aria-hidden="true">✳</span> <span id="grip-tip">Start with the lowest highlighted key.</span></span>
            <span class="range-note" id="range-note"></span>
          </div>
        </section>
      </section>

      <footer class="page-footer">
        <span>SONG UTILS <span class="footer-separator">/</span> CHORD ATLAS</span>
        <span>GOOD MUSIC STARTS WITH A NOTE.</span>
      </footer>
    </main>
  </div>
`;

const instrumentSelect = document.querySelector('#instrument-select');
const themeToggle = document.querySelector('#theme-toggle');
const rootPicker = document.querySelector('#root-picker');
const chordCount = document.querySelector('#chord-count');
const catalogSummary = document.querySelector('#catalog-summary');
const instruments = catalog.instruments;
const requestedInstrument = new URLSearchParams(window.location.search).get('instrument');
let selectedInstrument = instruments.find((instrument) => instrument.id === requestedInstrument) ?? instruments[0];
let activeBaseRoot = baseRoots[0];
let hasSharp = false;
let isMinor = false;

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  themeToggle.title = `Switch to ${isDark ? 'light' : 'dark'} mode`;
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☼' : '☾';
}

setTheme(localStorage.getItem('song-utils-theme') ?? 'dark');
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('song-utils-theme', nextTheme);
  setTheme(nextTheme);
});

instrumentSelect.innerHTML = instruments.map((instrument) =>
  `<option value="${instrument.id}">${instrument.name}</option>`,
).join('');
instrumentSelect.value = selectedInstrument.id;

function chordName(root, type) {
  return `${root}${type.suffix}`;
}

function getActiveRoot() {
  const pitchClass = (naturalPitchClasses[activeBaseRoot] + Number(hasSharp)) % noteNames.length;
  return noteNames[pitchClass];
}

function renderControls() {
  rootPicker.querySelectorAll('[data-base-root]').forEach((button) => {
    const selected = button.dataset.baseRoot === activeBaseRoot;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelector('#sharp-toggle').setAttribute('aria-pressed', String(hasSharp));
  document.querySelector('#minor-toggle').setAttribute('aria-pressed', String(isMinor));
  document.querySelector('#instrument-name').textContent = selectedInstrument.name.toUpperCase();
  document.querySelector('#workspace').setAttribute('aria-label', `${selectedInstrument.name} chord explorer`);
  chordCount.textContent = String(baseRoots.length).padStart(2, '0');
  catalogSummary.textContent = selectedInstrument.id === 'guitar'
    ? `STANDARD TUNING · ${selectedInstrument.tuning.split('').join(' ')}`
    : `${catalog.roots.length} notes · major and minor`;
}

function renderSelectedChord() {
  const activeRoot = getActiveRoot();
  const activeChordId = isMinor ? 'minor' : 'major';
  const type = catalog.chordTypes.find((entry) => entry.id === activeChordId)
    ?? catalog.chordTypes[0];
  const rootPitch = catalog.roots.indexOf(activeRoot);
  const rootMidi = 60 + rootPitch;
  const symbol = chordName(activeRoot, type);
  const notes = catalog.chords[activeRoot][type.id].map((name) => {
    const pitchClass = noteNames.indexOf(name);
    const interval = (pitchClass - rootPitch + noteNames.length) % noteNames.length;
    const midi = rootMidi + interval;
    return { midi, name, octave: Math.floor(midi / 12) - 1 };
  });

  document.querySelector('#chord-title').textContent = symbol;
  document.querySelector('#chord-subtitle').textContent = `${activeRoot} ${type.name.toLowerCase()} chord`;
  document.querySelector('#chord-symbol').textContent = symbol;
  let displayNotes = notes;
  if (selectedInstrument.id === 'guitar') {
    const guitarNotes = renderGuitarPage({ instrument: selectedInstrument, rootPitch, type, symbol, noteNames });
    const chordSpelling = new Map(notes.map((note) => [note.midi % noteNames.length, note.name]));
    displayNotes = guitarNotes.map((note) => ({
      ...note,
      name: chordSpelling.get(note.midi % noteNames.length) ?? note.name,
    }));
  } else {
    document.querySelector('#keyboard-legend').classList.remove('is-guitar');
    document.querySelector('#keyboard').setAttribute('role', 'img');
    document.querySelector('#grip-display').setAttribute('aria-label', 'Scrollable piano keyboard');
    document.querySelector('#grip-title').textContent = 'KEYBOARD VIEW';
    document.querySelector('#grip-hint').textContent = 'Highlighted keys are played together';
    document.querySelector('#grip-legend').textContent = 'PLAY THIS NOTE';
    document.querySelector('#grip-tip').textContent = 'Start with the lowest highlighted key.';
    document.querySelector('#grip-caption').textContent = `${notes.length} NOTES · ROOT POSITION`;
    renderPianoPage({ rootMidi, notes, noteNames });
  }
  document.querySelector('#note-chips').innerHTML = displayNotes.map((note, index) => `
    <span class="note-chip"><span class="note-chip-index">${String(index + 1).padStart(2, '0')}</span>${note.name}<sup>${note.octave}</sup></span>
  `).join('');
}

function render() {
  renderControls();
  renderSelectedChord();
}

rootPicker.addEventListener('click', (event) => {
  const button = event.target.closest('[data-base-root]');
  if (!button) return;
  activeBaseRoot = button.dataset.baseRoot;
  render();
});

document.querySelector('#sharp-toggle').addEventListener('click', () => {
  hasSharp = !hasSharp;
  render();
});

document.querySelector('#minor-toggle').addEventListener('click', () => {
  isMinor = !isMinor;
  render();
});

instrumentSelect.addEventListener('change', () => {
  selectedInstrument = instruments.find((entry) => entry.id === instrumentSelect.value) ?? instruments[0];
  activeBaseRoot = baseRoots[0];
  hasSharp = false;
  isMinor = false;
  const pageUrl = new URL(window.location.href);
  pageUrl.searchParams.set('instrument', selectedInstrument.id);
  window.history.replaceState(null, '', pageUrl);
  render();
});

render();
