#!/usr/bin/env node

import cli from '../cli.js'

export default async function (opts) {
  await cli('render', opts)
  await cli('compile', opts)
  await cli('serve', opts)
}
