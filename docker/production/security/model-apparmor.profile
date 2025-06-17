# Profile for isolated model containers
#include <tunables/global>

profile model-isolation flags=(attach_disconnected,mediate_deleted) {
  #include <abstractions/base>
  #include <abstractions/python>

  # Capabilities
  deny capability sys_admin,
  deny capability net_admin,
  deny capability sys_ptrace,
  deny capability sys_module,
  deny capability sys_rawio,

  # File rules
  /app/** r,
  /app/models/** r,
  /app/data/** rw,
  /tmp/** rw,
  
  # Python environment
  /usr/bin/python3.9 rix,
  /usr/local/lib/python3.9/** r,
  
  # Deny everything else
  deny /** w,
  deny /etc/passwd r,
  deny /etc/group r,
  deny /proc/** r,
  deny /sys/** r,
  
  # Network rules
  network tcp,
  
  # Explicitly deny raw sockets
  deny network raw,
  deny network packet,
}
