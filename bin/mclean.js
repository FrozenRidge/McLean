#!/usr/bin/env node

var nomnom = require("nomnom")


if (process.argv.indexOf("destination add") >=0){
  require('./destination.js')
else {
  console.log(USAGE)
}



