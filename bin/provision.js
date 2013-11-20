module.exports = function(opts){
  console.log(opts._)
  if (opts._.length < 2)
    console.error("Not enough arguments for provision")

  require('../lib').provision(opts._[1], opts, console.log)
}
