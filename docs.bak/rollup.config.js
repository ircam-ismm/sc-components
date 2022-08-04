import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import nodeBuiltins from 'rollup-plugin-node-builtins';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'build.js',
        format: 'iife',
        sourcemap: 'inline',
        name: 'app',
      },
    ],
    plugins: [
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      nodeResolve(),
      nodeBuiltins(),
    ],
    watch: {
      clearScreen: false
    },
  },
];
