#!/usr/bin/env node

const DEFAULT_OPTS = {
  port: 8080
}

export default async function cli(script, opts = {}) {
  opts = { ...DEFAULT_OPTS, ...opts }

  try {
    await (await import(`./scripts/${script}.js`)).default(opts)
  } catch (e) {
    console.error(e.message)
  }
}
