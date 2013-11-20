#!/usr/bin/env node

var parser = require("nomnom")


parser.command('destination')
   .callback(require('./destination'))

parser.command('provision')
   .callback(require('./provision'))

parser.command('ship')
  .callback(require('./ship'))

parser.parse()



