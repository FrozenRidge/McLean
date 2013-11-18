#!/usr/bin/env node

var USAGE = "McLean"

if (process.argv.indexOf("destination add") >=0){
  require('./destination.js')
else {
  console.log(USAGE)
}



