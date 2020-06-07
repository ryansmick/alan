#!/usr/bin/env node

import * as fs from 'fs'

import commander = require('commander')

import ammtoaga = require('./ammtoaga')
import ammtoagc = require('./ammtoagc')
import ammtojs = require('./ammtojs')
import lntoaga = require('./lntoaga')
import lntoagc = require('./lntoagc')
import lntoamm = require('./lntoamm')
import lntojs = require('./lntojs')

const getFormat = (filename: string) => filename.replace(/^.+\.([A-Za-z0-9]{2,3})$/g, "$1")

const convert = {
  ln: {
    aga: lntoaga,
    agc: lntoagc,
    amm: lntoamm,
    js: lntojs,
  },
  amm: {
    aga: ammtoaga,
    agc: ammtoagc,
    js: ammtojs,
  }
}

let inputfile: string, outputfile: string
commander
  .name('alan-compile')
  .version('0.1.0')
  .arguments('<input> <output>')
  .action((input: string, output:string ) => {
    inputfile = input
    outputfile = output
  })
  .description('Compile the specified source file to the specified output file')
  .parse(process.argv)

if (convert[getFormat(inputfile)] && convert[getFormat(inputfile)][getFormat(outputfile)]) {
  const output = convert[getFormat(inputfile)][getFormat(outputfile)](inputfile)
  fs.writeFileSync(outputfile, output, { encoding: 'utf8', })
  console.log('Done!')
} else {
  console.error(`${getFormat(inputfile)} to ${getFormat(outputfile)} not implemented!`)
  process.exit(1)
}

