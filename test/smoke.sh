alias mclean="node bin/mclean"

mclean destination add foo vagrant
mclean destination show foo
mclean provision foo
#mclean ship . foo manifest.json

#mclean destination add bar ec2 --i auth.pem

#mclean destination add baz joyent

#mclean region add all foo,bar,baz

