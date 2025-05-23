#include <tunables/global>

profile vscode-secure {
  #include <abstractions/base>
  #include <abstractions/nameservice>
  #include <abstractions/user-tmp>
  #include <abstractions/bash>

  # Basic application functionality
  /bin/** mr,
  /usr/bin/** mr,
  /usr/local/bin/** mr,
  /sbin/** mr,
  /usr/sbin/** mr,

  # Allow reading system libraries and configuration
  /lib/** mr,
  /usr/lib/** mr,
  /etc/** r,

  # Allow specific directories for code-server
  /home/coder/** rw,
  /home/coder/.config/code-server/** rw,
  /home/coder/.local/share/code-server/** rw,
  /home/coder/workspace/** rw,
  /home/coder/sunny-sdk/** r,
  /home/coder/sunny-docs/** r,

  # Deny access to sensitive directories
  deny /etc/shadow r,
  deny /etc/gshadow r,
  deny /etc/passwd w,
  deny /etc/group w,
  deny /root/** rwlx,
  deny /var/log/** rwlx,

  # Restrict network access
  network tcp,
  network udp,

  # Deny capability changes
  deny capability sys_admin,
  deny capability dac_override,
  deny capability dac_read_search,
  
  # Deny mounting
  deny mount,
  deny umount,
  
  # Allow network connections to only specific domains (configurable)
  # Will be enforced by Kubernetes network policies

  # Allow reads to proc for basic process info
  /proc/*/stat r,
  /proc/*/status r,
  /proc/*/cmdline r,
}

