module.exports = function(source, destination, params, target){
  var d = require('domain').create();

  d.on('error', function(err){
    console.log(err)
  })

  d.run(function(){
    // TODO - Check for Dockerfile
    var fab = require('child_process').spawn('fab', [params.provider, 'ship_source', '--set', 'source_path=' + source + ',target=' + target])

    fab.stdout.pipe(process.stdout)
    fab.stderr.pipe(process.stderr)

    fab.on('close', function(code){
      console.log(code, "!!!") 
    })
  })
}
