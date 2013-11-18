var fs = require('fs')
  , PATH = process.env.HOME + "/.mclean"


module.exports.store = function(name, typ){
  return function(err, serialised){
    if (err) throw err

    var dotfile = {}
    try {
      JSON.parse(fs.readFileSync(PATH, 'utf8'))
    } catch(e){
      console.error("Couldn't open ~/.mclean - creating a new file")
    }
    dotfile[name] = {provider: typ, opts: serialised}
    //console.log(dotfile)
    fs.writeFileSync(PATH, JSON.stringify(dotfile))
  }
}

module.exports.show = function(env){
  var df = JSON.parse(fs.readFileSync(PATH, 'utf8'))
  if (df[env]){
    console.log("Destination", env, "(" + df[env].provider + ") :", df[env].opts)
    return;
  } else {
    throw "No destination '" + env + "'"
  }
}


module.exports.load = function(dest){
  var df = JSON.parse(fs.readFileSync(PATH, 'utf8'))
  return df[dest]
}
