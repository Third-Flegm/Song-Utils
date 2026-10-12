const stringOctaves = [2, 2, 3, 3, 3, 4];

export function renderGuitarPage({ instrument, rootPitch, type, symbol, noteNames }) {
  const grip = getGuitarGrip(instrument, rootPitch, type, noteNames);
  renderFretboard(grip, symbol);
  return grip.notes;
}

function getGuitarGrip(instrument, rootPitch, type, noteNames) {
  const tuning = instrument.tuning.split('').map((note, index) => ({
    note,
    midi: (stringOctaves[index] + 1) * 12 + noteNames.indexOf(note),
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
    isOpenPosition: frets.includes(0),
  };
}

function renderFretboard(grip, symbol) {
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
