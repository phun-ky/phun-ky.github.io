import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import styles from '@ironkinoko/rollup-plugin-styles';

import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: ['src/main.js'],
    external: (id) => {
      if (id.includes('history')) return true;

      return false;
    },
    output: {
      format: 'es',
      sourcemap: true,
      exports: 'named',
      dir: 'dist',
      assetFileNames: '[name][extname]'
    },

    plugins: [
      styles({
        mode: ['extract', './css/ph.css'],
        url: false,
        minimize: true
      }),
      json(),
      nodeResolve(),
      commonjs(),
      terser()
    ]
  }
];
