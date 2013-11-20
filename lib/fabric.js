var spawn = require('child_process').spawn

module.exports = function(command, cb){
  var d = require('domain').create();

  d.on('error', function(err){
    console.log(err)
    return cb(err);
  })

  d.run(function(){
    var fab = spawn('fab', command.split(' '))

    fab.stdout.pipe(process.stdout)
    fab.stderr.pipe(process.stderr)

    fab.on('close', function(code){
      console.log("[FAB: ", command, " : Exited with code", code) 
      cb(code)
    })
  })

}
