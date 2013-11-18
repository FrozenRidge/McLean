class dotfiles {
  package {'dotfiles':
    ensure => present,
  }

  file {"/home/ubuntu/.profile":
    notify => Service["dotfiles"]
    mode => 644,
    owner => "root",
    group => "root",
    require => Package["dotfiles"],
    content => template("dotfiles/profile"),
  }
  
}
