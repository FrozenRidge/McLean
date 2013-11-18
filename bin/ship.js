var load = require('./dotfile').load

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

  console.log("!!", target, destination)

}
