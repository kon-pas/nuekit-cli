#!/usr/bin/env node

import path from 'node:path'

export function cwd(...segments) {
  return path.join(process.cwd(), ...segments)
}
