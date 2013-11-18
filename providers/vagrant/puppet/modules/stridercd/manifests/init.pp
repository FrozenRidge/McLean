class stridercd {

  vcsrepo { "/srv/stridercd":
    owner => root,
    group => root,
    ensure => latest,
    revision => "master",
    provider => git,
    require => Package["git"],
    source => "ssh://git@github.com/FrozenRidge/stridercd.com.git",
    identity => '/etc/ssh/id_rsa',
  }

  file { "/etc/ssh/id_rsa":
    mode => 600,
    owner => "root",
    group => "root",
    content => template("stridercd/id_rsa"),
  }

  file { "/etc/ssh/id_rsa.pub":
    mode => 644,
    owner => "root",
    group => "root",
    content => template("stridercd/id_rsa.pub"),
  }
  
  file { "/root/.ssh/id_rsa":
    mode => 600,
    owner => "root",
    group => "root",
    content => template("stridercd/id_rsa"),
  }

  file { "/root/.ssh/id_rsa.pub":
    mode => 644,
    owner => "root",
    group => "root",
    content => template("stridercd/id_rsa.pub"),
  }

  file { "/etc/init.d/frozenridge":
    mode => 755,
    owner => "root",
    group => "root",
    content => template("stridercd/bootscript.sh"),
  }

  exec { "bootscript":
    command => "/usr/sbin/update-rc.d frozenridge defaults",
    require => File["/etc/init.d/frozenridge"],
    unless => "/usr/bin/test -f /etc/rc5.d/S20frozenridge"
  }

}
