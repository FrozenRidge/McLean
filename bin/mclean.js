#!/usr/bin/env node

var parser = require("nomnom")


parser.command('destination')
   .callback(require('./destination'))


parser.command('ship')
  .callback(require('./ship'))

parser.parse()



