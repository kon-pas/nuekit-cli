#!/usr/bin/env node

/*
  Generates a sample HTML page using Nue server-side rendering

  https://nuejs.org/docs/nuejs/server-components.html
*/

import { parse, render } from 'nuejs-core'
import fs from 'node:fs/promises'
import yaml from 'js-yaml'

import { cwd } from '../utils.js'

export default async function (opts) {
  // read() function for reading assets
  const read = async (...p) => await fs.readFile(cwd(...p), 'utf-8')
  
  // read primary CSS
  const primary_css = await read('www', 'css', 'primary.css')
  
  // read dependencies (server-side components)
  const lib  = parse(await read('src', 'components.nue'))
  
  // read website data: title, description, etc.
  const data = yaml.load(await read('src', 'content.data'))
  
  // read page layout
  const page = await read('src', 'layout.nue')
  
  // set extra, dynamic properties to data
  data.primary_css = primary_css.replace(/\s+/g, ' ')
  data.timestamp = new Date()
  
  // generate HTML with the render() method
  const html = '<!DOCTYPE html>\n\n' + render(page, data, lib)
  
  // write index.html
  await fs.writeFile(cwd('www', 'index.html'), html)
  
  console.log('wrote', 'www/index.html')
}