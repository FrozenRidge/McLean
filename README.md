# McLean - Ship Containers.

ATTENTION: This is a work in progress. It's not functional and shouldn't be used yet. Feel free to help out on the hacking though :)


## Install

```sh
npm install mclean
```


## Usage

```sh

mclean destination add production vagrant # Add a deployment environment

mclean ship ./mycode staging foo # Upload mycode, build container from Dockerfile, deploy to foo.mydomain.com

# TODO mclean ship 717d8a7d5593 production # Ship container 717d8a7d5593 to production

```

### `mclean destination`

```sh
mclean destination add foo vagrant # Add a vagrant environment called foo

#TODO mclean destination add --port 80 --subdomain foo production ec2 # Add a vagrant environment that defaults to deploying foo at port 80
```

Add a destination for shipped code. There are various types of destination provider - see [the hosting providers section](#Hosting_Providers) for details on each.



### `mclean ship`

The Ship command is used to deploy containers to a destination environment. It can either take a container id from a container on the local machine, or
a path to a directory in which a Dockerfile specifies how to build a container with that code.







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
