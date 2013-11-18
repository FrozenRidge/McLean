// DESTINATION
var fs = require('fs')
  , PATH = process.env.HOME + "/.mclean"


var store = function(name, typ){
  return function(err, serialised){
    if (err) throw err

    var dotfile = {}
    try {
      JSON.parse(fs.readFileSync(PATH, 'utf8'))
    } catch(e){
      console.error("Couldn't open ~/.mclean - creating a new file")
    }
    dotfile[name] = {provider: typ, opts: serialised}
    //console.log(dotfile)
    fs.writeFileSync(PATH, JSON.stringify(dotfile))
  }
}


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
    var df = JSON.parse(fs.readFileSync(PATH, 'utf8'))
      , env = opts._[2]
    if (df[env]){
      console.log("Destination", env, "(" + df[env].provider + ") :", df[env].opts)
      return;
    } else {
      console.error("No destination '", env, "'")
    }
  }


  console.log(USAGE)
  process.exit(1)

 }
