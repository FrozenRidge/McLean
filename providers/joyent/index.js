module.exports = require('../../lib/pkgcloud_provider').create(
  "joyent"
, [
    ["account", "Your Joyent username"]
  , ["keyId", "The ID of your Joyent Key"]
  , ["key", "The path to your Joyent Key"]
  , ["servername", "The name of the instance"]
  , ["flavor", "The Joyent image type / dataset (ie:"]
  ]
)

