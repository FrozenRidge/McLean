var df = require('./dotfile')
  , fs = require('fs')


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

, provision: function(){}

, ship: function(){}



}
