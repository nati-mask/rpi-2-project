# Raspberry2 Project - Arch Linux
Highly opinionated personal project.
## Main Installation
### Make the SD card + connect + Init pacman:
Follow [Arch linux installation for RPI2](https://archlinuxarm.org/platforms/armv7/broadcom/raspberry-pi-2)  
In addition, check the latest Arch Linux Arm [images available](http://os.archlinuxarm.org/os) (You'll be redirected to mirror)

NOTE: You can't connect via SSH using the `root` user. Use `alarm` user and then `su`

### Update + Utils:
```
# pacman -Syu sudo tmux wget
```
```
# visudo
```
Uncomment `%wheel ALL=(ALL) ALL` to allow wheel group to `sudo`.
### Network, Static IP:
```
$ sudo nano /etc/systemd/network/eth0.network
```
Make the file something like this (more details: [Systemd Networkd](https://wiki.archlinux.org/index.php/Systemd-networkd)):
```ini
[Match]
Name=eth0

[Network]
Address=192.168.2.9/24
Gateway=192.168.2.1
DNS=8.8.8.8
DNS=8.8.4.4
DNSSEC=no
```
```
reboot
```
### Needed configurations:
- **Locale** is set to: `ANSI_X3.4-1968`, this is old, so:
  ```
  $ sudo nano /etc/locale.gen
  ```
  Uncomment: `en_US.UTF-8 UTF-8`, `en_US ISO-8859-1` and more... Save the file.
  ```
  $ sudo locale-gen
  ```
  ```
  $ sudo nano /etc/locale.conf
  ```
  Update to:
  ```
  LANG=en_US.UTF-8
  ```
  Save and reboot.  

- **Local Time**:
  ```
  $ sudo ln -sf /usr/share/zoneinfo/Asia/Jerusalem /etc/localtime
  ```  

- For **TMUX**:  
  Create: `~/.tmux.conf` with:
  ```
  set -g default-terminal "tmux-256color"
  ```  

- **Prompt**:  
  Add the following to `~/.bashrc`:
  ```bash
  COLPATH="\[\e[38;5;146m\]"
  COLBOLDANOTHER="\[\e[1;38;5;111m\]"
  COLBOLDPATH="\[\e[1;38;5;146m\]"
  P_RESET="\[\e[0m\]"

  PS1="${COLPATH}[${P_RESET}${COLBOLDANOTHER}\u${P_RESET}@${COLPATH}\h${P_RESET} ${COLBOLDPATH}\w${P_RESET}${COLPATH}]\$ ${P_RESET}"
  ```

## Jellyfin
### Develop tools and other dependencies:
```
$ sudo pacman -S --needed base-devel
```
Install all.
```
$ sudo pacman -S git python python2 sqlite
```
### FFMpeg:
```
$ sudo pacman -Syu ffmpeg
```
Choose: `libbluray` from `alarm` repo, `libgl` from `extra` repo (you don't have `imx` in Raspberry PI 2)
### Dotnet:
In some `build` dir (better do it with tmux, so you could detach and come back later, you can use `tmux attach -r` too, it's awesome :)
```
$ wget https://aur.archlinux.org/cgit/aur.git/snapshot/dotnet-core-3.1.tar.gz
$ tar -xvzf dotnet-core-3.1.tar.gz
$ cd dotnet-core-3.1
$ makepkg -sic
```
Take your time.