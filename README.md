# Song Utils

A chord explorer for piano and guitar. The instrument and chord-quality catalog lives in `src/data/instruments.json`; selected chords are shown on a piano keyboard or as a guitar fretboard grip.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Publish on GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes the site whenever you push to `main`. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. The deployed site will be available at the Pages URL shown in that settings page.

## Included chord types

Both instruments cover major and minor chords across all 12 chromatic roots. Note names use German notation: B is B-flat and H is B natural. Piano chords are shown in root position; guitar grips use common open C, D, E, G, and A shapes where available, with E- or A-form barre shapes for other roots.
