#!/usr/bin/env node

// a super minimal web server to serve files on the current working directory
import path from 'node:path'
import http from 'node:http'
import fs from 'node:fs'

import { cwd } from '../utils.js'

export default async function (opts) {
  const TYPES = {
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    png: 'image/png',
    jpg: 'image/jpg',
    css: 'text/css'
  }

  const PORT = opts.port

  http
    .createServer(async (req, res) => {
      const url = req.url.slice(1)
      const filePath = cwd('www', url == '' ? 'index.html' : url)
      const head = { 'Content-Type': TYPES[path.extname(filePath).slice(1)] }

      try {
        res.writeHead(200, head)
        fs.createReadStream(filePath).pipe(res)
      } catch {
        res.writeHead(404, head)
        res.end('')
      }
    })
    .listen(PORT)

  console.log(process.isBun ? 'Bun' : 'Node', `HTTP server at http://127.0.0.1:${PORT}/`)
}
