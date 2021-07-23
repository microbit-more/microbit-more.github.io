# Detailed Usage

## Connecting via USB

Press the Connect button while holding down the "Shift" key to select the USB connection.
([microbit-mbit-more-v2-0_2.hex](https://github.com/yokobond/pxt-mbit-more-v2/releases/tag/0.2.2) or later)

Since it uses the [Web Serial API](https://wicg.github.io/serial/), it is currently only available for Chrome/Edge on Chromebooks/Mac/Windows.

***Caution***.
Communication is unstable in the current version.
Sensor values are available, but if you use blocks with commands such as analog level or LED display continuously, the communication will fail after about 10 minutes.