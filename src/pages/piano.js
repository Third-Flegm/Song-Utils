const blackPitchClasses = new Set([1, 3, 6, 8, 10]);

export function renderPianoPage({ rootMidi, notes, noteNames }) {
  const highestNote = Math.max(...notes.map((note) => note.midi));
  const startMidi = 60;
  const endMidi = Math.max(rootMidi + 12, highestNote + 2);
  const whiteNotes = [];
  const blackNotes = [];
  let whiteIndex = 0;

  for (let midi = startMidi; midi <= endMidi; midi += 1) {
    const pitchClass = midi % 12;
    const note = { midi, name: noteNames[pitchClass], octave: Math.floor(midi / 12) - 1 };
    if (blackPitchClasses.has(pitchClass)) {
      blackNotes.push({ ...note, left: whiteNotes.length * 42 - 13 });
    } else {
      whiteNotes.push({ ...note, left: whiteIndex * 42 });
      whiteIndex += 1;
    }
  }

  const playedMidi = new Set(notes.map((note) => note.midi));
  const whiteKeys = whiteNotes.map((note) => {
    const isActive = playedMidi.has(note.midi);
    return `<span class="white-key${isActive ? ' is-played' : ''}" style="left:${note.left}px" aria-hidden="true">
      ${isActive ? `<span class="key-note-label">${note.name}</span>` : ''}
      ${note.name === 'C' ? `<span class="key-octave-label">C${note.octave}</span>` : ''}
    </span>`;
  }).join('');
  const blackKeys = blackNotes.map((note) => {
    const isActive = playedMidi.has(note.midi);
    return `<span class="black-key${isActive ? ' is-played' : ''}" style="left:${note.left}px" aria-hidden="true">
      ${isActive ? `<span class="key-note-label">${note.name}</span>` : ''}
    </span>`;
  }).join('');

  const width = Math.max(whiteNotes.length * 42, ...blackNotes.map((note) => note.left + 26));
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
