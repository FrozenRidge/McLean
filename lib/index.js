var df = require('./dotfile')
  , fs = require('fs')
  , fab = require('./fabric')

var findProvider = function(provider, cb){
  try {
    var p = require('../providers/' + provider)
    return cb(null, p)
  } catch (e){
    var msg = "No provider for '" + provider + "' - available providers are: \n - "
    msg += fs.readdirSync('./providers').join('\n -')
    return cb(new Error(msg))
  }
}



module.exports = {

  destinationAdd: function(name, provider, opts, cb){
    findProvider(provider, function(err, p){
      if (err) return cb(err);
      p.add(opts, df.store(name, provider, cb));
    })
  }

, destinationShow: function(name, cb){
    df.show(name, cb)
  }

, provision: function(name, opts, cb){
    // 1. Load env.
    dest = df.load(name)
    // 2. If can't ssh, use provider api to provision
    // 3. Run puppet to init environment
    fab(dest.provider + " provision", cb)
  }

, ship: function(){}



}
