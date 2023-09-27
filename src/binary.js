#!/usr/bin/env node

/*
  This file is an entry point for calling the CLI via shell.

  - Internally or if installed globally:
  `$ nue <script> <options>`

  - If installed locally:
  `$ npx nue <script> <options>`
*/

import cli from './cli.js'

const argv = process.isBun ? Bun.argv : process.argv
const script = argv[2]
const opts = {} // TODO: Implement parsing opts

await cli(script, opts)
