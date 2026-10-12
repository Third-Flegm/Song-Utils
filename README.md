# Song Utils

A chord explorer for piano and guitar. The instrument and chord-quality catalog lives in `src/data/instruments.json`; selected chords are shown on a piano keyboard or as a guitar fretboard grip.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Pages

- `/` is the home page with a single Chords entry and Song Archives.
- `/chords/` is the instrument chooser for Piano and Guitar.
- `/chords/atlas/?instrument=piano` opens the piano keyboard atlas; `?instrument=guitar` opens the guitar fretboard atlas.
- `/archives/` is Song Archives, where cover cards select songs and show their charts by section and tact.

## Source layout

- `index.html` and `src/home.js` render the home page.
- `chords/index.html` and `src/chords.js` render the instrument chooser.
- `chords/atlas/index.html` and `src/main.js` render the chord atlas.
- `archives/index.html` and `src/archives.js` render Song Archives.
- `src/pages/piano.js` renders the piano keyboard view.
- `src/pages/guitar.js` selects and renders guitar chord grips.
- `src/data/instruments.json` defines instruments and chord notes.
- `src/data/songs.json` contains archive-card metadata: title, author, info, and cover filename.
- `songs/<songname>.json` contains a song's key, meter, sections, tacts, lyrics, and chords.
- `covers/` contains the title-picture assets referenced by the song metadata.
- `src/style.css` contains shared and instrument-view styles.

## Publish on GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes the site whenever you push to `main`. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. The deployed site will be available at the Pages URL shown in that settings page.

## Included chord types

Both instruments cover major and minor chords across all 12 chromatic roots. Note names use German notation: B is B-flat and H is B natural. Piano chords are shown in root position; guitar grips use common open C, D, E, G, and A shapes where available, with E- or A-form barre shapes for other roots.
