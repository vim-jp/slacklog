# Error handling
fail() {
  notify_host Archlinux/VM/Install/Failed
}

notify_host() {
  curl 192.168.11.4:8000/$1 >& /dev/null
  :
}

set -e
trap fail ERR

# Enable multilib (for wine-32)
sed -ie '/\[multilib\]/,+1s/#//g' /etc/pacman.conf

# Format and mount partition
if ! sfdisk -l | grep sda1 > /devnull; then
  echo , | sfdisk /dev/sda
fi
if ! mount | grep /mnt > /dev/null; then
  mkfs.xfs -f /dev/sda1
  mount /dev/sda1 /mnt
fi
# Mount host cache
mkdir -p /mnt/var/cache/pacman/pkg
if ! mount | grep /mnt/var > /dev/null; then
  echo arch | sshfs -o password_stdin,StrictHostKeyChecking=no arch@192.168.11.4:/hd/arch/cache /mnt/var/cache/pacman/pkg
fi
echo 'Server = http://ftp.tsukuba.wide.ad.jp/Linux/archlinux/$repo/os/$arch' > /etc/pacman.d/mirrorlist
# Exec pacstrap
if [ ! -d /mnt/bin ]; then
  pacstrap /mnt base base-devel dhcpcd grub sshfs
fi
# Generate fstab
if ! grep / /mnt/etc/fstab > /dev/null; then
  genfstab -U /mnt | sed -e "/sshfs/d" >> /mnt/etc/fstab
fi
# Chroot
curl 192.168.11.4:1234/arch2.sh > /mnt/setup.sh 2> /dev/null
chmod +x /mnt/setup.sh
arch-chroot /mnt /setup.sh
rm /mnt/setup.sh
# Notification to host
notify_host Archlinux/VM/Installed

# Shutdown (Must not use `halt -fp`, grub can't recognize journaling file)
shutdown -h now