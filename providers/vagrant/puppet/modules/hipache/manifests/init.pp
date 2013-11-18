class hipache {

  include nodejs
  include redis

  package { 'git':
    ensure => present
  }

  package { 'hipache':
    ensure   => present,
    provider => 'npm',
    require => Package['git']
  }

 service { "hipache":
    ensure => "running",
    enable => "true",
    require => Package["hipache"],
    status => "ps aux | grep hipache | awk '{ print $2 }'",
  }

 file { "/etc/hipache.conf":
    notify => Service["hipache"],
    mode => 644,
    owner => "root",
    group => "root",
    require => Package["hipache"],
    content => template("hipache/hipache-conf.json"),
  }

 file { "/etc/init/hipache.conf":
    notify => Service["hipache"],
    mode => 644,
    owner => "root",
    group => "root",
    require => Package["hipache"],
    content => template("hipache/hipache.upstart"),
  }


 file { "/etc/ssl/private/myserver.key":
    notify => Service["hipache"],
    mode => 644,
    owner => "root",
    group => "root",
    require => Package["hipache"],
    content => template("hipache/myserver.key"),
  }

 file { "/etc/ssl/certs/ssl-bundle.crt":
    notify => Service["hipache"],
    mode => 644,
    owner => "root",
    group => "root",
    require => Package["hipache"],
    content => template("hipache/ssl-bundle.crt"),
  }
}
