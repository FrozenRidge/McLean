var load = require('./dotfile').load
  , path = require('path')
  , fs = require('fs')

module.exports = function(opts){
  var usage = "usage: mclean ship [opts] <container id | path> <destination environment>"

  if (opts._.length < 3){
    console.error(usage)
    process.exit(1)
  }

  var target = opts._[1]
    , destination = load(opts._[2])

  if (!destination){
    console.error("No destination found for '", opts._[2], "'")
    process.exit(1)
  }

  var src = path.resolve(target)
    , handled = false

  try{
    if (fs.statSync(src).isDirectory()){
      handled = true
      shipSrc(src, opts._[2], destination)
    }
  } catch (e){
    // TODO - handle container
    console.log(e)
  }


  if (!handled){
    console.error(target, "is not a directory or a container ID - don't know how to ship...")
    process.exit(1)
  }
}


var shipSrc = function(source, destination, target){
  console.log("Shipping:" , source, " to ", destination, target)
  require('../lib/ship_code')(source, destination, target)
}
