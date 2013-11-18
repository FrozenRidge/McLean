from fabric.api import env, local


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
