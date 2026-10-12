import catalog from './data/instruments.json';
import './style.css';

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B', 'H'];
const baseRoots = ['C', 'D', 'E', 'F', 'G', 'A', 'H'];
const naturalPitchClasses = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, H: 11 };
const guitarStringOctaves = [2, 2, 3, 3, 3, 4];
const blackPitchClasses = new Set([1, 3, 6, 8, 10]);
const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Song Utils home">
        <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>song<span class="brand-light">utils</span></span>
      </a>
      <div class="topbar-right">
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
let selectedInstrument = instruments[0];
let activeBaseRoot = baseRoots[0];
let hasSharp = false;
let isMinor = false;

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

instrumentSelect.innerHTML = instruments.map((instrument) =>
  `<option value="${instrument.id}">${instrument.name}</option>`,
).join('');

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

function renderKeyboard(rootMidi, notes) {
  const highestNote = Math.max(...notes.map((note) => note.midi));
  const startMidi = 60;
  const endMidi = Math.max(rootMidi + 12, highestNote + 2);
  const whiteNotes = [];
  const blackNotes = [];
  let whiteIndex = 0;

  for (let midi = startMidi; midi <= endMidi; midi += 1) {
    const pitchClass = midi % 12;
    const note = { midi, pitchClass, name: noteNames[pitchClass], octave: Math.floor(midi / 12) - 1 };
    if (blackPitchClasses.has(pitchClass)) {
      const previousWhiteCount = whiteNotes.length;
      blackNotes.push({ ...note, left: previousWhiteCount * 42 - 13 });
    } else {
      whiteNotes.push({ ...note, left: whiteIndex * 42 });
      whiteIndex += 1;
    }
  }

  const playedMidi = new Set(notes.map((note) => note.midi));
  const whiteKeys = whiteNotes.map((note) => {
    const isActive = playedMidi.has(note.midi);
    const startsOctave = note.name === 'C';
    return `<span class="white-key${isActive ? ' is-played' : ''}" style="left:${note.left}px" aria-hidden="true">
      ${isActive ? `<span class="key-note-label">${note.name}</span>` : ''}
      ${startsOctave ? `<span class="key-octave-label">C${note.octave}</span>` : ''}
    </span>`;
  }).join('');
  const blackKeys = blackNotes.map((note) => {
    const isActive = playedMidi.has(note.midi);
    return `<span class="black-key${isActive ? ' is-played' : ''}" style="left:${note.left}px" aria-hidden="true">
      ${isActive ? `<span class="key-note-label">${note.name}</span>` : ''}
    </span>`;
  }).join('');

  const whiteWidth = whiteNotes.length * 42;
  const blackWidth = Math.max(0, ...blackNotes.map((note) => note.left + 26));
  const width = Math.max(whiteWidth, blackWidth);
  const startLabel = `${noteNames[startMidi % 12]}${Math.floor(startMidi / 12) - 1}`;
  const endLabel = `${noteNames[endMidi % 12]}${Math.floor(endMidi / 12) - 1}`;

  document.querySelector('#keyboard').innerHTML = `
    <div class="keyboard-keys" style="width:${width}px;height:166px">
      ${whiteKeys}${blackKeys}
    </div>
  `;
  document.querySelector('#keyboard').setAttribute('aria-label', `Piano keyboard showing ${notes.map((note) => `${note.name}${note.octave}`).join(', ')}`);
  document.querySelector('#octave-label').textContent = `${startLabel} — ${endLabel}`;
  document.querySelector('#range-note').textContent = `${startLabel} TO ${endLabel}`;
}

function getGuitarGrip(rootPitch, type) {
  const tuning = selectedInstrument.tuning.split('').map((note, index) => ({
    note,
    midi: (guitarStringOctaves[index] + 1) * 12 + noteNames.indexOf(note),
  }));
  const openShapes = {
    '0:major': { frets: [null, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
    '2:major': { frets: [null, null, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
    '4:major': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
    '7:major': { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
    '9:major': { frets: [null, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0] },
    '2:minor': { frets: [null, null, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
    '4:minor': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
    '9:minor': { frets: [null, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
  };
  const openShape = openShapes[`${rootPitch}:${type.id}`];
  let frets;
  let fingers;
  let barres = [];

  if (openShape) {
    ({ frets, fingers } = openShape);
  } else {
    const isMinorChord = type.id === 'minor';
    const eFormFret = (rootPitch - (tuning[0].midi % 12) + 12) % 12;
    const aFormFret = (rootPitch - (tuning[1].midi % 12) + 12) % 12;
    const useAForm = aFormFret > 0 && (eFormFret === 0 || aFormFret < eFormFret);
    const rootFret = useAForm ? aFormFret : eFormFret;

    if (useAForm) {
      frets = isMinorChord
        ? [null, rootFret, rootFret + 2, rootFret + 2, rootFret + 1, rootFret]
        : [null, rootFret, rootFret + 2, rootFret + 2, rootFret + 2, rootFret];
      fingers = isMinorChord ? [0, 1, 3, 3, 2, 1] : [0, 1, 3, 3, 3, 1];
      barres = [{ fret: rootFret, firstString: 1, lastString: 5, finger: 1 }];
    } else {
      frets = isMinorChord
        ? [rootFret, rootFret + 2, rootFret + 2, rootFret, rootFret, rootFret]
        : [rootFret, rootFret + 2, rootFret + 2, rootFret + 1, rootFret, rootFret];
      fingers = isMinorChord ? [1, 3, 4, 1, 1, 1] : [1, 3, 4, 2, 1, 1];
      barres = [{ fret: rootFret, firstString: 0, lastString: 5, finger: 1 }];
    }
  }

  const notes = tuning.flatMap((string, index) => {
    if (frets[index] === null) return [];
    const midi = string.midi + frets[index];
    const pitchClass = midi % 12;
    return [{ midi, name: noteNames[pitchClass], octave: Math.floor(midi / 12) - 1, isRoot: pitchClass === rootPitch }];
  });
  const playedFrets = frets.filter((fret) => fret !== null && fret > 0);

  return {
    tuning,
    frets,
    fingers,
    barres,
    notes,
    firstFret: playedFrets.length ? Math.min(...playedFrets) : 1,
    rootFret: playedFrets.length ? Math.min(...playedFrets) : 0,
    isOpenPosition: frets.includes(0),
  };
}

function renderGuitarFretboard(grip, symbol) {
  const fretCount = 5;
  const firstFret = grip.firstFret;
  const fretLabels = Array.from({ length: fretCount }, (_, index) => firstFret + index);
  const stringLabels = grip.tuning.map((string) =>
    `<span>${string.note}${Math.floor(string.midi / 12) - 1}</span>`,
  ).join('');
  const openMarkers = grip.frets.map((fret) => {
    const marker = fret === null
      ? '<span class="guitar-muted-marker">×</span>'
      : fret === 0 ? '<span class="guitar-open-marker">0</span>' : '';
    return `<span>${marker}</span>`;
  }).join('');
  const fretMarkers = grip.tuning.map((string, index) => {
    const fret = grip.frets[index];
    if (fret === null || fret === 0) return '';
    if (grip.barres.some((barre) => barre.fret === fret && index >= barre.firstString && index <= barre.lastString)) return '';
    const row = fret - firstFret + 1;
    const isRoot = grip.notes.some((note) => note.isRoot && note.midi === string.midi + fret);
    return `<span class="guitar-finger${isRoot ? ' is-root' : ''}" style="grid-column:${index + 1};grid-row:${row}">${grip.fingers[index]}</span>`;
  }).join('');
  const barreMarkers = grip.barres.map((barre) => {
    const row = barre.fret - firstFret + 1;
    return `<span class="guitar-barre" style="grid-column:${barre.firstString + 1}/${barre.lastString + 2};grid-row:${row}">${barre.finger}</span>`;
  }).join('');
  const stringWires = grip.tuning.map((string, index) =>
    `<span class="guitar-string-wire" style="grid-column:${index + 1};grid-row:1/${fretCount + 1}"></span>`,
  ).join('');
  const fretRows = fretLabels.map((fret, index) =>
    `<span class="guitar-fret-row${index === 0 && grip.isOpenPosition ? ' is-nut' : ''}" style="grid-column:1/-1;grid-row:${index + 1}"></span>`,
  ).join('');
  const firstFretLabel = grip.isOpenPosition ? 'OPEN POSITION' : `FRET ${firstFret}–${firstFret + fretCount - 1}`;
  const positionType = grip.barres.length ? 'BARRE SHAPE' : 'OPEN SHAPE';

  document.querySelector('#keyboard').innerHTML = `
    <div class="guitar-diagram">
      <div class="guitar-string-labels"><span class="guitar-axis-label">TUNING</span>${stringLabels}</div>
      <div class="guitar-open-row"><span class="guitar-axis-label">OPEN</span>${openMarkers}</div>
      <div class="guitar-neck-grid">
        <div class="guitar-fret-labels">${fretLabels.map((fret) => `<span>${fret}</span>`).join('')}</div>
        <div class="guitar-grid${grip.isOpenPosition ? ' is-open-position' : ''}">
          ${fretRows}${stringWires}${barreMarkers}${fretMarkers}
        </div>
      </div>
    </div>
  `;
  document.querySelector('#keyboard').setAttribute('aria-label', `Guitar fretboard showing ${symbol} chord grip`);
  document.querySelector('#grip-display').setAttribute('aria-label', `Scrollable guitar fretboard showing ${symbol}`);
  document.querySelector('#keyboard-legend').classList.add('is-guitar');
  document.querySelector('#grip-title').textContent = 'FRETBOARD VIEW';
  document.querySelector('#grip-hint').textContent = '× is muted, 0 is open; numbers show fingers.';
  document.querySelector('#grip-legend').textContent = 'FINGER POSITIONS';
  document.querySelector('#grip-caption').textContent = positionType;
  document.querySelector('#grip-tip').textContent = 'Follow each string from its tuning label to the marked fret.';
  document.querySelector('#octave-label').textContent = 'STANDARD TUNING';
  document.querySelector('#range-note').textContent = firstFretLabel;
}

function renderSelectedChord() {
  const activeRoot = getActiveRoot();
  const activeChordId = isMinor ? 'minor' : 'major';
  const type = catalog.chordTypes.find((entry) => entry.id === activeChordId)
    ?? catalog.chordTypes[0];
  const rootPitch = catalog.roots.indexOf(activeRoot);
  const rootMidi = 60 + rootPitch;
  const symbol = chordName(activeRoot, type);
  const notes = type.intervals.map((interval) => {
    const midi = rootMidi + interval;
    const pitchClass = midi % 12;
    return { midi, name: noteNames[pitchClass], octave: Math.floor(midi / 12) - 1 };
  });

  document.querySelector('#chord-title').textContent = symbol;
  document.querySelector('#chord-subtitle').textContent = `${activeRoot} ${type.name.toLowerCase()} chord`;
  document.querySelector('#chord-symbol').textContent = symbol;
  let displayNotes = notes;
  if (selectedInstrument.id === 'guitar') {
    const grip = getGuitarGrip(rootPitch, type);
    displayNotes = grip.notes;
    renderGuitarFretboard(grip, symbol);
  } else {
    document.querySelector('#keyboard-legend').classList.remove('is-guitar');
    document.querySelector('#keyboard').setAttribute('role', 'img');
    document.querySelector('#grip-display').setAttribute('aria-label', 'Scrollable piano keyboard');
    document.querySelector('#grip-title').textContent = 'KEYBOARD VIEW';
    document.querySelector('#grip-hint').textContent = 'Highlighted keys are played together';
    document.querySelector('#grip-legend').textContent = 'PLAY THIS NOTE';
    document.querySelector('#grip-tip').textContent = 'Start with the lowest highlighted key.';
    document.querySelector('#grip-caption').textContent = `${notes.length} NOTES · ROOT POSITION`;
    renderKeyboard(rootMidi, notes);
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
  render();
});

render();
