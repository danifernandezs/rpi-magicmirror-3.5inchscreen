# Magic Mirror<sup>2</sup> on Raspberry Pi OS using Docker server

## Materials
- 1x  Raspberry Pi 3 Model B (Revision Code: a02082)
- 1x  3.5 inch Touch Screen (Kuman model)
- 1x  16Gb SD Card

## How to check the Raspberry Model

Check the **cpuinfo**
````bash
cap /proc/cpuinfo
````

As example:
````bash
Hardware    : BCM2835
Revision    : a02082
Serial      : 0000..........25
Model       : Raspberry Pi 3 Model B Rev 1.2
````

## Software
- Operating System: Raspberry Pi OS (32-bit) with desktop (Version Jan 2021 - Revision 2021-01-11)
  - [Official Link](https://www.raspberrypi.org/software/operating-systems/#raspberry-pi-os-32-bit)
- LCD show drivers and screen calibrations
  - [Official Repo](https://github.com/goodtft/LCD-show.git)
- MagicMirror server, as docker container

## Steps
1. Operating System to the SD Card
  ````bash
  dd bs=4M if=2020-02-13-raspios-buster.img of=/dev/sdX conv=fsync
  ````
2. Disabling the Bluetooth<br>
  2.1. _File:_ /boot/config.txt
  ````bash
  dtoverlay=pi3-disable-bt
  ````
3. Create empty file to enable the SSH
````bash
touch /boot/ssh
````
4. Configuring WiFi<br>
  4.1. _File:_ /boot/wpa_supplicant.conf<br>
_Example Content_
  ````bash
      country=ES
      ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
      update_config=1

      network={
          ssid="NETWORK-NAME"
          psk="NETWORK-PASSWORD"
          }
  ````
5. **raspi-config** adaptations <br>(Beware, you need the hostname as raspberrypi)

6. Install docker and Chromium Browser
````
apt-get update
apt-get install -yqq docker.io chromium-browser
````

7. Install screen drivers<br>
[Reference](https://github.com/goodtft/LCD-show)<br>
A copy of the original repo are under the LCD-show folder<br>
  7.1.
````bash
sudo rm -rf LCD-show
git clone https://github.com/goodtft/LCD-show.git
chmod -R 755 LCD-show
cd LCD-show/
sudo ./LCD35-show
````



docker pull bastilimbach/docker-magicmirror:v2.11.0




8. Starting server from Docker<br>
  8.1. Modules folder
  ````
  sudo mkdir -p /opt/magic_mirror/modules
  ````
  8.2. Desired modules
  ````
  cd /opt/magic_mirror/modules
  sudo git clone https://github.com/AlexDespain01/mm-hide-all.git
  sudo git clone https://github.com/edward-shen/MMM-page-indicator.git
  sudo git clone https://github.com/edward-shen/MMM-pages.git
  sudo git clone https://github.com/Veldrovive/MMM-Page-Selector.git
  ````
  8.3. [Official Docker MagicMirror Repo](https://github.com/bastilimbach/docker-MagicMirror)<br>
  8.4. The server config file (an example under config folder)
  ````
  sudo mkdir -p /opt/magic_mirror/config
  sudo touch /opt/magic_mirror/configconfig.js
  ````
  8.5. Run the container
  ````
  docker run  -d \
    --publish 80:8080 \
    --restart always \
    -e TZ="Europe/Madrid" \
    --volume ~/magic_mirror/config:/opt/magic_mirror/config \
    --volume ~/magic_mirror/modules:/opt/magic_mirror/modules \
    --volume /etc/localtime:/etc/localtime:ro \
    --name magic_mirror \
    bastilimbach/docker-magicmirror:v2.11.0
  ````

## Chromium as Kiosk mode and autorun
mkdir -p /etc/xdg/lxsession/LXDE-pi/
nano /etc/xdg/lxsession/LXDE-pi/autostart
echo "chromium-browser --kiosk http://127.0.0.1" >> /etc/xdg/lxsession/LXDE-pi/autostart

## License

<img src="./img/by-sa.png">

This work is under [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

Please read the LICENSE files for more details.
