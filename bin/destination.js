// DESTINATION
var add = require('../lib').destinationAdd
  , show = require('../lib').destinationShow


module.exports = function(opts){
  //console.log(">", opts._.join(' '))
  var USAGE = "Usage: mclean destination <add | show> <name> <provider>"

  if (opts._.length < 3){
    console.log(USAGE)
    process.exit(1)
  }

  if (opts._[1] == 'add' && opts._.length >= 4) {

    add(opts._[2], opts._[3], opts, function(err){
      if (err){
        console.error(err.msg || err);
        console.error(USAGE)
        process.exit(1)
      }
      process.exit(0)
    })
  }
  else if (opts._[1] == 'show'){
    var env = opts._[2]
    try{ 
      return show(env)
    } catch (e){
      console.log(e)
    }
  }
  else {

    console.log(USAGE)
    console.log(opts._)
    process.exit(1)
  }

 }
