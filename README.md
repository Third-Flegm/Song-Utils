# Song Utils

A small chord explorer for piano. The instrument and chord-quality catalog lives in `src/data/instruments.json`; the app builds the 12-root chord library from that data and highlights the notes on a keyboard.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.

## Publish on GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes the site whenever you push to `main`. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. The deployed site will be available at the Pages URL shown in that settings page.

## Included chord types

The piano catalog covers major and minor chords across all 12 chromatic roots. Note names use German notation: B is B-flat and H is B natural. Chords are shown in root position.
