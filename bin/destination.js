// DESTINATION
var fs = require('fs')
  , store = require('./dotfile').store
  , show = require('./dotfile').show

var add = function(name, opts){
  var provider;
  try {
    provider = require('../providers/' + opts._[3] + '/add')
  } catch (e){
    process.stderr.write("No provider for '" + opts._[3] + "' - available destinations are: \n - ")
    process.stderr.write(fs.readdirSync('./providers').join('\n -'))
    process.exit(1)
  }

  provider(opts, store(name, opts._[3])) 
}

module.exports = function(opts){
  //console.log(">", opts._.join(' '))
  var USAGE = "Usage: mclean destination <add | show> <name> <provider>"

  if (opts._.length < 3){
    console.log(USAGE)
    process.exit(1)
  }

  if (opts._[1] == 'add' && opts._.length < 4) {
    return add(opts._[2], opts)
  }

  if (opts._[1] == 'show'){
    var env = opts._[2]
    try{ 
      return show(env)
    } catch (e){
      console.log(e)
    }
  }


  console.log(USAGE)
  process.exit(1)

 }
