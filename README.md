# Magic Mirror2 on Raspberry Pi OS using Docker server

## Materials
- 1x Raspberry Pi 3 Model B (Revision Code: a02082)
- 1x 3.5 inch Touch Screen (Kuman model)
- 1x 16Gb SD Card

## Software
- Operating System: Raspberry Pi OS (32-bit) with desktop (Version May 2020 - Revision 2020-05-27)
  - [Official Link](https://www.raspberrypi.org/downloads/raspbian/)

## Steps
1. Operating System to the SD Card<br>
  1.1. ````
  dd bs=4M if=2020-02-13-raspios-buster.img of=/dev/sdX conv=fsync
  ````
2. Disabling the Bluetooth<br>
  2.1. File: ````/boot/config.txt````<br>
  2.2. Add: ````dtoverlay=pi3-disable-bt````
3. Create file: ````/boot/ssh```` To enable the SSH
4. Configuring WiFi<br>
  4.1. Create File: ````wpa_supplicant.conf````<br>
  4.2. Content example: <br>
  ````bash
      country=ES
      ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
      update_config=1

      network={
          ssid="NETWORK-NAME"
          psk="NETWORK-PASSWORD"
          }
  ````


## License

<img src="./img/by-sa.png">

This work is under [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

Please read the LICENSE files for more details.
