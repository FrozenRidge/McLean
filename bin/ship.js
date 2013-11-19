var load = require('./dotfile').load
  , path = require('path')
  , fs = require('fs')

module.exports = function(opts){
  var usage = "usage: mclean ship [opts] <container id | path> <destination environment> <subdomain>"

  if (opts._.length < 4){
    console.error(usage)
    process.exit(1)
  }

  var source = opts._[1]
    , destination = load(opts._[2])
    , target = opts._[3] 

  if (!destination){
    console.error("No destination found for '", opts._[2], "'")
    process.exit(1)
  }

  var src = path.resolve(source)
    , handled = false

  try{
    if (fs.statSync(src).isDirectory()){
      handled = true
      shipSrc(src, opts._[2], destination, target)
    }
  } catch (e){
    // TODO - handle container
    console.log(e)
  }


  if (!handled){
    console.error(source, "is not a directory or a container ID - don't know how to ship...")
    process.exit(1)
  }
}


var shipSrc = function(source, destination, params, target){
  console.log("Shipping:" , source, " to ", destination, params, target)
  require('../lib/ship_code')(source, destination, params, target)
}
