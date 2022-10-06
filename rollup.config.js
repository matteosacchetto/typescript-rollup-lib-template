// rollup.config.js
import json from '@rollup/plugin-json';
import eslint from '@rollup/plugin-eslint';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

// Import dependencies
import { builtinModules } from 'module';
import { dependencies } from './package.json';

const usePreferConst = true; // Use "const" instead of "var"
const usePreserveModules = true; // `true` -> keep modules structure, `false` -> combine everything into a single file
const useStrict = true; // Use "strict"
const useThrowOnError = true; // On error throw and exception
const useSourceMap = true; // Generate source map files
const useEsbuild = true; // `true` -> use esbuild, `false` use tsc

// Node dependencies are treated as external dependencies and are not bundled
const nodeDependencies = builtinModules
  .filter((el) => !el.startsWith('_'))
  .flatMap((el) => [el, `node:${el}`]);

export default [
  {
    // .d.ts build
    external: dependencies
      ? [...Object.keys(dependencies), ...nodeDependencies]
      : nodeDependencies,
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [
      eslint({
        throwOnError: useThrowOnError,
      }),
      json({
        preferConst: usePreferConst,
      }),
      typescriptPaths({
        preserveExtensions: true,
      }),
      dts(),
    ],
  },
  {
    // CJS build
    external: dependencies
      ? [...Object.keys(dependencies), ...nodeDependencies]
      : nodeDependencies,
    input: 'src/index.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preferConst: usePreferConst,
      preserveModules: usePreserveModules,
      strict: useStrict,
      entryFileNames: '[name].cjs',
      sourcemap: useSourceMap,
    },
    plugins: [
      eslint({
        throwOnError: useThrowOnError,
      }),
      json({
        preferConst: usePreferConst,
      }),
      useEsbuild
        ? typescriptPaths({
            preserveExtensions: true,
          })
        : undefined,
      useEsbuild
        ? esbuild()
        : typescript({
            noEmitOnError: useThrowOnError,
          }),
    ],
  },
  {
    // ESM build
    external: dependencies
      ? [...Object.keys(dependencies), ...nodeDependencies]
      : nodeDependencies,
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'es',
      preferConst: usePreferConst,
      preserveModules: usePreserveModules,
      strict: useStrict,
      entryFileNames: '[name].mjs',
      sourcemap: useSourceMap,
    },
    plugins: [
      eslint({
        throwOnError: useThrowOnError,
      }),
      json({
        preferConst: usePreferConst,
      }),
      useEsbuild
        ? typescriptPaths({
            preserveExtensions: true,
          })
        : undefined,
      useEsbuild
        ? esbuild()
        : typescript({
            noEmitOnError: useThrowOnError,
          }),
    ],
  },
];
