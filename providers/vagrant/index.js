var fab = require('../../lib/fabric')

module.exports = {
  add : require('./add')
, provision : function(dest, opts, cb){
    // 3. Run puppet to init environment
    fab("vagrant provision", cb)
  }
}
