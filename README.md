# McLean - Ship Containers.

ATTENTION: This is a work in progress. It's not functional and shouldn't be used yet. Feel free to help out on the hacking though :)


## Install

```sh
npm install mclean
```


## Usage
## Vaporware (API play)

```sh


mclean server add staging joyent --account frozenridge --servername staging --flavor "Large 8GB"
mclean server add dev vagrant
mclean server ls
mclean server show staging

mclean pool create <poolname> <servername> <servername>

mclean provision staging                                    # Spin up staging server and install mclean dependencies.

mclean ship ./mycode staging ./manifest.json                # run mycode on staging. Manifest specifies port etc.
mclean ship . staging                                       # assuming package.json or manifest.json in .
mclean ship git@github.com:Me/Myproject.git staging         # ship a project from github to server
mclean ship . staging --name myservice-01                   # ship to staging and name container myservice-01

mclean container ls                                         # List all containers (Show routing information)
mclean container ls <server..>                              # List containers on server
mclean container ls <pool / datacenter / region..>          # List containers in a pool / datacenter / region
mclean container ls --running
mclean container show <server>/<container>


mclean run <server>/<container> -c "ls"                     # Run 'ls' in container on server and pipe results back to stdout
mclean run <server>/<container>                             # If container isn't running on server, run it
mclean stop <server>/<container>


mclean gc                                                   # Delete old images



mclean nodejs init                                          # Generate Dockerfile and manifest in package.json for best-practise node deployment
# Allowing:
mclean nodejs init && mclean ship . production

mclean topology show <datacenter>

```











## Documentation

### `mclean server`

```sh
mclean server add foo vagrant # Add a vagrant environment called foo
mclean server show foo
```

Add a server destination for shipped code. There are various types of provider - see [the hosting providers section](#Hosting_Providers) for details on each.



### `mclean ship`

The Ship command is used to deploy containers to a destination server. It can either take a container id from a container on the local machine, or
a path to a directory in which a Dockerfile specifies how to build a container with that code.

Ship takes a path to a manifest file, or can read one from stdin. The manifest file is simply a JSON file that specifies a name for the service and a port or subdomain to run it on on the server. Because it's just a json file, you can use a package.json for example. In fact, if you omit the manifest.json, we'll look for a package.json with the appropriate keys.






## Hosting providers

### Vagrant
McLean supports a local Vagrant environment for development.









## Strider Integration

McLean integrates seamlessly with StriderCD - for bit-for-bit deployment of tested code, use the strider-mclean plugin to deploy your containers. (VAPORWARE!)



## Technology

McLean is written with a polyglut of technologies. Node.js is the glue that ties together fabric, docker, puppet, go, shell scripts, vagrant, and a whole lot more. DevOps is messy business.


## Why "McLean"

Shipping Containers were invented in 1956 by Malcolm McLean. McLean ships containers.

See [wikipedia](http://en.wikipedia.org/wiki/Malcom_McLean) or read [The Box](http://www.amazon.com/gp/product/0691136408/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0691136408&linkCode=as2&tag=peterbradenco-20) for more on the fascinating history of shipping containers.
