# typescript-rollup-lib-template

Template for creating a JS library using Typescript and Rollup for bundling it to CJS and ESM modules

It handles the Typescript code and transpiles it to CJS and ESM modules, in order to provide both types of export. Moreover it also generates a type declaration file, to be used in Typescript projects.
The transpilation is performed using `rollup` as a bundler and `esbuild` for the actual transpilation.

This template is also configured to use `eslint` and `prettier` for linting and style rules, and `jest` for testing