var pkgcloud = require('pkgcloud')
  , readline = require('readline')
  , async = require('async')
  , fs = require('fs')


var createClient = function(provider, opts, cb){
  var client = pkgcloud.compute.createClient({
    provider: provider
  , account: opts.account
  , keyId: opts.keyId
  , key: fs.readFileSync(opts.key, 'ascii')
  })
  cb(null, client)
}



var createOptTask = function(key, help, opts, res, rl, cb){
  if (opts[key]){
    res[key] = opts[key]
    cb(null)
  } else {
    rl.question("[--" + key + "] " + help + "\n> ", function(answer){ 
      res[key] = answer
      cb(null)
    })
  }
}


var createPkgCloudProvider = function(provider, addParams){
  return {


    add: function (opts, done){
      var out = {}, tasks = [];
      var rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
      });

      addParams.forEach(function(a){
        tasks.push(function(cb){
          createOptTask(a[0], a[1], opts, out, rl, cb);
        })
      })

      async.series(tasks, function(err){
        console.log(out)
        rl.close()
        done(err, out);
      })
    }
  
  , provision: function(dest, opts, done){
    // 2. If can't ssh, use provider api to provision
      createClient(provider, dest.opts, function(err, client){
        client.createServer({name : dest.opts.name}, function(err, server){
          if (err) return done(err);
          console.log("Created server...")
          server.setWait({ status: server.STATUS.running }, 5000, function (err) {
            if (err) {
              console.dir(err);
              return done(err);
            }
            console.log(">>>", server.name, server.id)

          })

        })
      
      })
    }

  }
}


module.exports = {
  create: createPkgCloudProvider
}

