# Beacon sniffer

Test script for debug the beacons.

## Installation

You must to install node v9 for ARMv7 devices.  Follow [this](https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/) tutorial. Also, follow noble instruction for install [noble](https://github.com/noble/noble).
### install node v9
```
cd ~/

get https://nodejs.org/dist/latest-v9.x/node-v9.11.2-linux-armv7l.tar.xz

tar -xf node-v9.11.2-linux-armv7l.tar.xz

cd node-v9.11.2-linux-armv7l/
sudo cp -R * /usr/local/

node -v
npm -v

```
## How to run

For find beacon devices:

```console
pi@raspberrypi:~/beacons $ sudo node advertisement-discovery.js
```
The result is:

```bash
peripheral discovered (cd1244573708 with address <cd:12:44:57:37:08, random>, connectable false, RSSI -20:
	hello my local name is:
		undefined
	can I interest you in any of the following advertised services:
		["feaa"]
	here is my service data:
		"feaa": "00dcf7826da6bc5b71e0893e65666a6e4e64"

peripheral discovered (f40dc8467fc6 with address <f4:0d:c8:46:7f:c6, random>, connectable true, RSSI -44:
	hello my local name is:
		Kontakt
	can I interest you in any of the following advertised services:
		[]
	here is my service data:
		"fe6a": "0208010364f452737669485a"

peripheral discovered (e7dadf9ced70 with address <e7:da:df:9c:ed:70, random>, connectable false, RSSI -21:
	hello my local name is:
		undefined
	can I interest you in any of the following advertised services:
		[]
	here is my manufacturer data:
		"4c000215f7826da64fa24e988024bc5b71e0893ee92392f3b3"

```

For check the peripherals info:

```console
pi@raspberrypi:~/beacons $ sudo node peripheral-discover.js cd1244573708
```

```bash
peripheral with ID cd1244573708 found
  Service Data      = [
  {
    "uuid": "feaa",
    "data": {
      "type": "Buffer",
      "data": [
        16,
        220,
        2,
        107,
        110,
        116,
        107,
        46,
        105,
        111,
        47,
        101,
        100,
        100,
        121,
        115,
        116,
        111,
        110,
        101
      ]
    }
  }
]
  Service UUIDs     = feaa

services and characteristics:

Fase de escaneo BLE finalizada

PERIPHERAL Peripheral {
  _noble: 
   Noble {
     initialized: true,
     address: 'b8:27:eb:91:8b:c4',
     _state: 'poweredOn',
     _bindings: 
      NobleBindings {
        _state: 'poweredOn',
        _addresses: [Object],
        _addresseTypes: [Object],
        _connectable: [Object],
        _pendingConnectionUuid: null,
        _connectionQueue: [],
        _handles: {},
        _gatts: {},
        _aclStreams: {},
        _signalings: {},
        _hci: [Hci],
        _gap: [Gap],
        _events: [Object],
        _eventsCount: 21,
        onSigIntBinded: [Function: bound ],
        _scanServiceUuids: [] },
     _peripherals: { e7dadf9ced70: [Peripheral], cd1244573708: [Circular] },
     _services: { e7dadf9ced70: {}, cd1244573708: {} },
     _characteristics: { e7dadf9ced70: {}, cd1244573708: {} },
     _descriptors: { e7dadf9ced70: {}, cd1244573708: {} },
     _discoveredPeripheralUUids: [ 'e7dadf9ced70', 'cd1244573708' ],
     _events: 
      { warning: [Function: bound ],
        newListener: [Function: bound ],
        stateChange: [Function],
        discover: [Function] },
     _eventsCount: 4,
     _allowDuplicates: undefined },
  id: 'cd1244573708',
  uuid: 'cd1244573708',
  address: 'cd:12:44:57:37:08',
  addressType: 'random',
  connectable: false,
  advertisement: 
   { localName: undefined,
     txPowerLevel: undefined,
     manufacturerData: undefined,
     serviceData: [ [Object] ],
     serviceUuids: [ 'feaa' ],
     solicitationServiceUuids: [],
     serviceSolicitationUuids: [] },
  rssi: -47,
  services: null,
  state: 'disconnected' }

```
For check the traffic:

```console
pi@raspberrypi:~/beacons $ sudo node puck.js
```

The result for MAC cd:12:44:57:37:08 is
```bash

cd:12:44:57:37:08 -72 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 167, 215, 6, 28, 216, 90 ]
cd:12:44:57:37:08 -71 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 167, 230, 6, 28, 216, 100 ]
cd:12:44:57:37:08 -73 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 167, 245, 6, 28, 216, 120 ]
cd:12:44:57:37:08 -74 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 168, 7, 6, 28, 216, 130 ]
cd:12:44:57:37:08 -59 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 168, 22, 6, 28, 216, 140 ]
cd:12:44:57:37:08 -73 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 168, 88, 6, 28, 216, 200 ]
cd:12:44:57:37:08 -60 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 168, 136, 6, 28, 216, 240 ]
cd:12:44:57:37:08 -71 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 168, 154, 6, 28, 217, 4 ]
cd:12:44:57:37:08 -72 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 168, 169, 6, 28, 217, 14 ]
cd:12:44:57:37:08 -67 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 168, 184, 6, 28, 217, 34 ]
cd:12:44:57:37:08 -65 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 168, 202, 6, 28, 217, 44 ]
cd:12:44:57:37:08 -58 undefined undefined [ 32, 0, 11, 167, 30, 192, 6, 152, 168, 217, 6, 28, 217, 54 ]
cd:12:44:57:37:08 -72 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 168, 235, 6, 28, 217, 74 ]
cd:12:44:57:37:08 -73 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 169, 9, 6, 28, 217, 104 ]
cd:12:44:57:37:08 -60 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 169, 27, 6, 28, 217, 114 ]
cd:12:44:57:37:08 -26 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 169, 42, 6, 28, 217, 134 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 169, 60, 6, 28, 217, 144 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 169, 75, 6, 28, 217, 154 ]
cd:12:44:57:37:08 -41 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 169, 90, 6, 28, 217, 174 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 169, 108, 6, 28, 217, 184 ]
cd:12:44:57:37:08 -17 undefined undefined [ 32, 0, 11, 167, 31, 0, 6, 152, 169, 141, 6, 28, 217, 214 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 169, 156, 6, 28, 217, 224 ]
cd:12:44:57:37:08 -31 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 169, 174, 6, 28, 217, 244 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 169, 204, 6, 28, 218, 18 ]
cd:12:44:57:37:08 -40 undefined undefined [ 32, 0, 11, 167, 31, 192, 6, 152, 169, 222, 6, 28, 218, 28 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 31, 192, 6, 152, 169, 237, 6, 28, 218, 48 ]
cd:12:44:57:37:08 -19 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 169, 255, 6, 28, 218, 58 ]
cd:12:44:57:37:08 -28 undefined undefined [ 32, 0, 11, 167, 31, 64, 6, 152, 170, 29, 6, 28, 218, 88 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 31, 192, 6, 152, 170, 47, 6, 28, 218, 98 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 31, 192, 6, 152, 170, 62, 6, 28, 218, 118 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 170, 95, 6, 28, 218, 148 ]
cd:12:44:57:37:08 -40 undefined undefined [ 32, 0, 11, 167, 31, 192, 6, 152, 170, 110, 6, 28, 218, 158 ]
cd:12:44:57:37:08 -17 undefined undefined [ 32, 0, 11, 167, 32, 64, 6, 152, 170, 128, 6, 28, 218, 168 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 170, 143, 6, 28, 218, 188 ]
cd:12:44:57:37:08 -30 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 170, 161, 6, 28, 218, 198 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 170, 176, 6, 28, 218, 218 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 170, 194, 6, 28, 218, 228 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 170, 209, 6, 28, 218, 238 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 170, 242, 6, 28, 219, 12 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 64, 6, 152, 171, 1, 6, 28, 219, 32 ]
cd:12:44:57:37:08 -13 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 171, 34, 6, 28, 219, 62 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 64, 6, 152, 171, 49, 6, 28, 219, 72 ]
cd:12:44:57:37:08 -19 undefined undefined [ 32, 0, 11, 167, 32, 64, 6, 152, 171, 67, 6, 28, 219, 82 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 171, 82, 6, 28, 219, 102 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 32, 64, 6, 152, 171, 115, 6, 28, 219, 132 ]
cd:12:44:57:37:08 -34 undefined undefined [ 32, 0, 11, 167, 32, 0, 6, 152, 171, 163, 6, 28, 219, 172 ]
cd:12:44:57:37:08 -40 undefined undefined [ 32, 0, 11, 167, 32, 64, 6, 152, 171, 181, 6, 28, 219, 182 ]
cd:12:44:57:37:08 -45 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 171, 229, 6, 28, 219, 232 ]
cd:12:44:57:37:08 -19 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 171, 244, 6, 28, 219, 242 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 172, 6, 6, 28, 219, 252 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 172, 21, 6, 28, 220, 16 ]
cd:12:44:57:37:08 -40 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 172, 39, 6, 28, 220, 26 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 172, 54, 6, 28, 220, 46 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 172, 69, 6, 28, 220, 56 ]
cd:12:44:57:37:08 -17 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 172, 102, 6, 28, 220, 86 ]
cd:12:44:57:37:08 -40 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 172, 135, 6, 28, 220, 116 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 172, 150, 6, 28, 220, 126 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 172, 168, 6, 28, 220, 146 ]
cd:12:44:57:37:08 -43 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 172, 183, 6, 28, 220, 156 ]
cd:12:44:57:37:08 -30 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 172, 249, 6, 28, 220, 216 ]
cd:12:44:57:37:08 -13 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 173, 8, 6, 28, 220, 226 ]
cd:12:44:57:37:08 -17 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 173, 41, 6, 28, 221, 0 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 173, 74, 6, 28, 221, 30 ]
cd:12:44:57:37:08 -40 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 173, 107, 6, 28, 221, 60 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 173, 122, 6, 28, 221, 70 ]
cd:12:44:57:37:08 -17 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 173, 140, 6, 28, 221, 80 ]
cd:12:44:57:37:08 -30 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 173, 155, 6, 28, 221, 100 ]
cd:12:44:57:37:08 -28 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 173, 170, 6, 28, 221, 110 ]
cd:12:44:57:37:08 -12 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 173, 203, 6, 28, 221, 140 ]
cd:12:44:57:37:08 -46 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 173, 221, 6, 28, 221, 160 ]
cd:12:44:57:37:08 -40 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 13, 6, 28, 221, 200 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 46, 6, 28, 221, 230 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 174, 61, 6, 28, 221, 240 ]
cd:12:44:57:37:08 -38 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 174, 79, 6, 28, 222, 4 ]
cd:12:44:57:37:08 -53 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 94, 6, 28, 222, 14 ]
cd:12:44:57:37:08 -87 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 109, 6, 28, 222, 24 ]
cd:12:44:57:37:08 -68 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 127, 6, 28, 222, 44 ]
cd:12:44:57:37:08 -59 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 142, 6, 28, 222, 54 ]
cd:12:44:57:37:08 -71 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 160, 6, 28, 222, 74 ]
cd:12:44:57:37:08 -78 undefined undefined [ 32, 0, 11, 167, 32, 128, 6, 152, 174, 175, 6, 28, 222, 84 ]
cd:12:44:57:37:08 -62 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 174, 190, 6, 28, 222, 94 ]
cd:12:44:57:37:08 -69 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 208, 6, 28, 222, 114 ]
cd:12:44:57:37:08 -77 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 174, 223, 6, 28, 222, 124 ]
cd:12:44:57:37:08 -78 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 174, 241, 6, 28, 222, 144 ]
cd:12:44:57:37:08 -62 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 175, 0, 6, 28, 222, 154 ]
cd:12:44:57:37:08 -69 undefined undefined [ 32, 0, 11, 167, 33, 64, 6, 152, 175, 18, 6, 28, 222, 174 ]
cd:12:44:57:37:08 -68 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 33, 6, 28, 222, 184 ]
cd:12:44:57:37:08 -87 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 48, 6, 28, 222, 194 ]
cd:12:44:57:37:08 -82 undefined undefined [ 32, 0, 11, 167, 32, 192, 6, 152, 175, 81, 6, 28, 222, 224 ]
cd:12:44:57:37:08 -89 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 99, 6, 28, 222, 244 ]
cd:12:44:57:37:08 -74 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 114, 6, 28, 222, 254 ]
cd:12:44:57:37:08 -90 undefined undefined [ 32, 0, 11, 167, 33, 64, 6, 152, 175, 129, 6, 28, 223, 18 ]
cd:12:44:57:37:08 -66 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 147, 6, 28, 223, 28 ]
cd:12:44:57:37:08 -71 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 162, 6, 28, 223, 38 ]
cd:12:44:57:37:08 -63 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 180, 6, 28, 223, 58 ]
cd:12:44:57:37:08 -73 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 195, 6, 28, 223, 68 ]
cd:12:44:57:37:08 -66 undefined undefined [ 32, 0, 11, 167, 33, 64, 6, 152, 175, 228, 6, 28, 223, 98 ]
cd:12:44:57:37:08 -74 undefined undefined [ 32, 0, 11, 167, 33, 0, 6, 152, 175, 243, 6, 28, 223, 108 ]
cd:12:44:57:37:08 -92 undefined undefined [ 32, 0, 11, 167, 33, 64, 6, 152, 176, 5, 6, 28, 223, 128 ]
cd:12:44:57:37:08 -78 undefined undefined [ 32, 0, 11, 167, 33, 64, 6, 152, 176, 20, 6, 28, 223, 138 ]
cd:12:44:57:37:08 -59 undefined undefined [ 32, 0, 11, 167, 33, 64, 6, 152, 176, 38, 6, 28, 223, 158 ]
cd:12:44:57:37:08 -68 undefined undefined [ 32, 0, 11, 167, 33, 64, 6, 152, 176, 68, 6, 28, 223, 188 ]
cd:12:44:57:37:08 -70 undefined undefined [ 32, 0, 11, 167, 33, 64, 6, 152, 176, 86, 6, 28, 223, 198 ]
cd:12:44:57:37:08 -66 undefined undefined [ 32, 0, 11, 167, 33, 128, 6, 152, 176, 119, 6, 28, 223, 228 ]
cd:12:44:57:37:08 -72 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 176, 134, 6, 28, 223, 238 ]
cd:12:44:57:37:08 -72 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 176, 149, 6, 28, 224, 2 ]
cd:12:44:57:37:08 -85 undefined undefined [ 32, 0, 11, 167, 33, 128, 6, 152, 176, 167, 6, 28, 224, 12 ]
cd:12:44:57:37:08 -63 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 176, 182, 6, 28, 224, 32 ]
cd:12:44:57:37:08 -74 undefined undefined [ 32, 0, 11, 167, 33, 128, 6, 152, 176, 215, 6, 28, 224, 52 ]
cd:12:44:57:37:08 -79 undefined undefined [ 32, 0, 11, 167, 33, 128, 6, 152, 176, 233, 6, 28, 224, 72 ]
cd:12:44:57:37:08 -81 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 176, 248, 6, 28, 224, 82 ]
cd:12:44:57:37:08 -74 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 177, 7, 6, 28, 224, 102 ]
cd:12:44:57:37:08 -69 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 177, 25, 6, 28, 224, 112 ]
cd:12:44:57:37:08 -62 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 177, 40, 6, 28, 224, 132 ]
cd:12:44:57:37:08 -63 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 177, 73, 6, 28, 224, 152 ]
cd:12:44:57:37:08 -78 undefined undefined [ 32, 0, 11, 167, 33, 128, 6, 152, 177, 106, 6, 28, 224, 182 ]
cd:12:44:57:37:08 -57 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 177, 139, 6, 28, 224, 212 ]
cd:12:44:57:37:08 -15 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 177, 154, 6, 28, 224, 222 ]
cd:12:44:57:37:08 -16 undefined undefined [ 32, 0, 11, 167, 34, 64, 6, 152, 177, 172, 6, 28, 224, 242 ]
cd:12:44:57:37:08 -16 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 177, 187, 6, 28, 224, 252 ]
cd:12:44:57:37:08 -22 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 177, 202, 6, 28, 225, 16 ]
cd:12:44:57:37:08 -29 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 177, 235, 6, 28, 225, 46 ]
cd:12:44:57:37:08 -31 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 177, 253, 6, 28, 225, 56 ]
cd:12:44:57:37:08 -43 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 178, 27, 6, 28, 225, 86 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 178, 45, 6, 28, 225, 96 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 178, 60, 6, 28, 225, 116 ]
cd:12:44:57:37:08 -17 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 178, 78, 6, 28, 225, 126 ]
cd:12:44:57:37:08 -16 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 178, 93, 6, 28, 225, 146 ]
cd:12:44:57:37:08 -17 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 178, 108, 6, 28, 225, 156 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 178, 126, 6, 28, 225, 166 ]
cd:12:44:57:37:08 -43 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 178, 141, 6, 28, 225, 186 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 178, 159, 6, 28, 225, 196 ]
cd:12:44:57:37:08 -16 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 178, 174, 6, 28, 225, 216 ]
cd:12:44:57:37:08 -15 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 178, 192, 6, 28, 225, 226 ]
cd:12:44:57:37:08 -31 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 178, 222, 6, 28, 226, 0 ]
cd:12:44:57:37:08 -17 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 178, 240, 6, 28, 226, 10 ]
cd:12:44:57:37:08 -45 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 178, 255, 6, 28, 226, 30 ]
cd:12:44:57:37:08 -44 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 179, 17, 6, 28, 226, 40 ]
cd:12:44:57:37:08 -31 undefined undefined [ 32, 0, 11, 167, 34, 64, 6, 152, 179, 32, 6, 28, 226, 60 ]
cd:12:44:57:37:08 -46 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 179, 47, 6, 28, 226, 70 ]
cd:12:44:57:37:08 -45 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 179, 80, 6, 28, 226, 100 ]
cd:12:44:57:37:08 -45 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 179, 98, 6, 28, 226, 110 ]
cd:12:44:57:37:08 -16 undefined undefined [ 32, 0, 11, 167, 33, 192, 6, 152, 179, 131, 6, 28, 226, 140 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 179, 146, 6, 28, 226, 160 ]
cd:12:44:57:37:08 -18 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 179, 179, 6, 28, 226, 180 ]
cd:12:44:57:37:08 -30 undefined undefined [ 32, 0, 11, 167, 34, 0, 6, 152, 179, 194, 6, 28, 226, 200 ]

```

Uncomment the line 12 in [puck.js](./puck.js) for full log for all the aviable services from beacons.

```bash

pi@raspberrypi:~/beacons $ sudo node puck.js 
Starting scan...
Scanning started.
e7:da:df:9c:ed:70 -20 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -21 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -20 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,152,255,232,6,29,35,90]}}]
e7:da:df:9c:ed:70 -46 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -17 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -33 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
f4:0d:c8:46:7f:c6 -20 undefined undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
e7:da:df:9c:ed:70 -43 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -53 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,6,6,29,35,120]}}]
f4:0d:c8:46:7f:c6 -16 undefined undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
e7:da:df:9c:ed:70 -32 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -31 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
f4:0d:c8:46:7f:c6 -31 undefined undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -20 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,192,6,153,0,24,6,29,35,130]}}]
cd:12:44:57:37:08 -21 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
e7:da:df:9c:ed:70 -21 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
f4:0d:c8:46:7f:c6 -46 undefined undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
f4:0d:c8:46:7f:c6 -44 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -21 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -17 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,39,6,29,35,140]}}]
e7:da:df:9c:ed:70 -45 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -46 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
f4:0d:c8:46:7f:c6 -44 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -44 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,57,6,29,35,160]}}]
cd:12:44:57:37:08 -17 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
f4:0d:c8:46:7f:c6 -47 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -38 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -17 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
e7:da:df:9c:ed:70 -17 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -18 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -21 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,87,6,29,35,190]}}]
cd:12:44:57:37:08 -17 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
e7:da:df:9c:ed:70 -18 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -18 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
f4:0d:c8:46:7f:c6 -44 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -18 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,105,6,29,35,200]}}]
cd:12:44:57:37:08 -21 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
f4:0d:c8:46:7f:c6 -45 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -17 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -30 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,64,6,153,0,120,6,29,35,210]}}]
cd:12:44:57:37:08 -31 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
e7:da:df:9c:ed:70 -18 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -20 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -21 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,138,6,29,35,230]}}]
e7:da:df:9c:ed:70 -47 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
f4:0d:c8:46:7f:c6 -45 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -47 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -44 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,168,6,29,36,4]}}]
f4:0d:c8:46:7f:c6 -45 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -47 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
e7:da:df:9c:ed:70 -45 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -34 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,186,6,29,36,14]}}]
cd:12:44:57:37:08 -33 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
f4:0d:c8:46:7f:c6 -45 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
cd:12:44:57:37:08 -44 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
e7:da:df:9c:ed:70 -31 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -21 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -46 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,219,6,29,36,44]}}]
cd:12:44:57:37:08 -16 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
e7:da:df:9c:ed:70 -44 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -44 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -44 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[32,0,11,153,33,128,6,153,0,234,6,29,36,54]}}]
f4:0d:c8:46:7f:c6 -44 "Kontakt" undefined [{"uuid":"fe6a","data":{"type":"Buffer","data":[2,8,1,3,100,244,82,115,118,105,72,90]}}]
e7:da:df:9c:ed:70 -32 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -34 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]
cd:12:44:57:37:08 -30 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[0,220,247,130,109,166,188,91,113,224,137,62,101,102,106,110,78,100]}}]
e7:da:df:9c:ed:70 -30 undefined {"type":"Buffer","data":[76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179]} []
cd:12:44:57:37:08 -31 undefined undefined [{"uuid":"feaa","data":{"type":"Buffer","data":[16,220,2,107,110,116,107,46,105,111,47,101,100,100,121,115,116,111,110,101]}}]

```

## Conclusions
* It is possible to connect to beacons using noble.
* The beacons does not use a standar access point to sensor data.
* The beacons have a continious  buffer stream for the MAC addresses:
  - cd:12:44:57:37:08
  - e7:da:df:9c:ed:70
  - f4:0d:c8:46:7f:c6

  Where cd:12:44:57:37:08 seems to contain information about the inner clock and some other unknown informations related to maybe sensors in the array that starts with 32 [32,0,11,153,33,128,6,153,0,234,6,29,36,54], the position 10 in the array increases each second by 1 and runs up 256 increasing the value for the position 9 of the array by 1, other positions in the array seems to change randomly or when you  move physically the beacon.
* When you press the button in the beacon, it interacts with the MAC e7:da:df:9c:ed:70 and it just flips the value 35 to 36 in the array [76,0,2,21,247,130,109,166,79,162,78,152,128,36,188,91,113,224,137,62,233,35,146,243,179] for a period of 5 seconds.


## TODOS
* Calculate the distance to beacon and detect movement using the  rssi signal strength and some buffer data.
* Test python libraries

## References
* https://qiita.com/tinoue@github/items/17ca0046013f6ae76853
* https://github.com/noble/noble/issues/673
* [GOOD_GOOD_REFERENCE](https://www.espruino.com/Puck.js+Advertising)
* https://github.com/adafruit/Adafruit_Python_BluefruitLE
* https://github.com/noble/noble/issues/552#issuecomment-288995711
* https://github.com/noble/noble/issues/552
* https://github.com/noble/noble/issues/329
* [Cheat_Sheet](https://ukbaz.github.io/howto/beacon_scan_cmd_line.html)
* https://github.com/IanHarvey/bluepy
* https://github.com/sandeepmistry/node-bleacon
* https://www.switchdoc.com/2014/08/ibeacon-raspberry-pi-scanner-python/
* https://developer.kontakt.io/hardware/sensors/
* https://github.com/noble/noble/issues/685
* https://github.com/noble/noble/issues/690 
* https://github.com/noble/noble/issues/807
* https://github.com/noble/noble/issues/824
* https://github.com/noble/noble/issues/845
* https://github.com/noble/noble/issues/846
* https://github.com/noble/noble/issues/854
* https://scribles.net/running-ble-advertising-example-code-on-raspbian-stretch/
