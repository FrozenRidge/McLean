#!/usr/bin/env node

// Perform a zero-downtime update of a container:
//
// 1) start new container (same repo + tag)
// 2) update hipache to point to new container's dynamic port
// 3) stop old container

var async  = require('async')
var argv   = require('optimist').argv
var docker = require('docker.io')({ socketPath: '/var/run/docker.sock' })
var redis  = require('redis').createClient()

function usage() {
  console.log("Usage: update_container <repository to upgrade> [<repository to upgrade to>]")
  process.exit(0)
}

function inspectedContainers(err, res) {
  var found = []

  res.forEach(function(c) {
    if (!c.State || !c.State.Running) return
    if (c.Config.Image !== fromimage) return
    found.push(c)
  })

  if (found.length === 0) {
    console.log("no running images found matching %s. not started?", fromimage)
    console.log("starting from scratch")
  }

  if (found.length > 1) {
    console.log("found more than one running image matching %s. i don't know what to do so i'm exiting.", image)
    process.exit(1)
  }

  function inspected(err, res) {
    if (err) {
      console.log("error inspecting image: %s", err)
      process.exit(1)
    }
    console.log("creating container from image data")
    docker.containers.create({
      Image: toimage,
      Cmd: res.config.Cmd,
      PortSpecs: res.config.PortSpecs,
      AttachStdin: false,
      AttachStdout: false,
      AttachStderr: false,
    }, created)
  }

  function created(err, res) {
    if (err) {
      console.log("error creating image: %s", err)
      process.exit(1)
    }
    console.dir(res)
    console.log("container created")
    docker.containers.start(res.Id, function(err) {
      started(err, res.Id)
    })
  }

  function started(err, id) {
    if (err) {
      console.log("error: %s", err)
      return cb(err)
    }
    docker.containers.inspect(id, gotInfo)
  }

  // Info about the just-started container
  function gotInfo(err, res) {
    // We look for port 80, 8080 and 3000 to forward. We assume these are HTTP.
    var port = null
    var pm = res.NetworkSettings.PortMapping.Tcp
    if      (pm['8080'] !== undefined) port = pm['8080']
    else if (pm['3000'] !== undefined) port = pm['3000']
    else if (pm['80']   !== undefined) port = pm['80']

    if (!port) {
      console.log("error: couldn't find valid public http port for container %s", toimage)
      process.exit(1)
    }
    var s = toimage.split('/')
    if (s.length !== 2) return
    s = s[1]
    s = s.split(':')[0]
    console.log("updating hipache: %s -> http://127.0.0.1:%s", s + '.stridercd.com', port)
    var k = 'frontend:' + s + '.stridercd.com'
    var backend = 'http://127.0.0.1:' + port
    redis.multi()
      .del(k)
      .rpush(k, s + '.stridercd.com')
      .rpush(k, backend)
      .exec(function(err) { redirected(err, s, backend) })
  }

  function redirected(err, s, backend) {
    if (err) {
      console.log("error: could not update hipache mapping in redis: %s", err)
      process.exit(1)
    }
    console.log("mapped %s to %s", s+'.stridercd.com', backend)
    if (found.length > 0){
      console.log("stopping old container %s", found[0].ID)
      docker.containers.stop(found[0].ID, stopped)
    } else {
      stopped()
    }
  }

  function stopped(err) {
    console.log("zero-downtime update complete!")
    redis.quit()
  }

  docker.images.inspect(toimage, inspected)
}

function containerList(err, res) {
  if (err) {
    console.log("error: cannot fetch container list. perhaps docker isn't running? are you running this as root?")
    process.exit(1)
  }

  // Container list output does not have enough detail.
  // We need to make an API call per container to get the detailed info.
  var toInspect = []
  res.forEach(function(c) {
    toInspect.push(function(done) {
      console.log("inspecting: %s", c.Id)
      docker.containers.inspect(c.Id, done)
    })
  })

  console.log("inspecting each container ...")
  async.parallel(toInspect, inspectedContainers)
}

if (argv._.length < 1) {
  usage()
}
var fromimage = argv._[0]
if (fromimage.indexOf(':') === -1) {
  fromimage += ':latest'
  console.log("> no tag specified - assuming you want to upgrade FROM %s", fromimage)
}

var toimage = argv._[1]
if (!toimage) {
  toimage = fromimage
  if (toimage.indexOf(':latest') === -1) {
    toimage = toimage.slice(0, toimage.indexOf(':')) + ':latest'
  }
  console.log("> no target repo supplied, assuming you want to upgrade TO %s", toimage)
}

docker.containers.list(containerList)
