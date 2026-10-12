import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default {
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectRoot, 'index.html'),
        chords: resolve(projectRoot, 'chords/index.html'),
      },
    },
  },
};
