from fabric.api import env, local, task, put, sudo, run, env, cd


if env.get('vagrant'):
    vagrant()

@task
def vagrant():
    ''' Use local vagrant environment '''
    exists = local('(cd providers/vagrant && vagrant status | grep "default .* not created" || exit 0)', capture=True)
    if len(exists) == 0:
        exists = local('(cd providers/vagrant && vagrant status | grep "default .* aborted" || exit 0)', capture=True)
    print len(exists)
    if len(exists) > 0:
        local("(cd providers/vagrant && vagrant up)")
    env.hosts = ['127.0.0.1:2222']
    env.user = 'vagrant'
    result = local('(cd providers/vagrant  && vagrant ssh-config | grep IdentityFile)', capture=True)
    env.key_filename = result.split()[1].strip('\"')


@task
def ship_source():
  ''' ship env.source_path code to specified hosts'''
  local('(cd ' + env.source_path + " && tar cfz /tmp/mclean-build.tar.gz *)")
  put('/tmp/mclean-build.tar.gz', '/tmp/mclean-build.tar.gz', use_sudo=True)
  sudo("rm -rf /tmp/mclean-build")
  sudo("mkdir /tmp/mclean-build ; tar xfz /tmp/mclean-build.tar.gz -C /tmp/mclean-build")
  sudo("ls /tmp/mclean-build")
  with cd("/tmp/mclean-build"):
    sudo("docker build -t mclean-build/unnamed .")
