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



## Update
Once the telemetry is activated in the beacon, we can access to the new peripheral.address ```c1:93:da:19:eb:cd```, this peripheral address emit 3 vector arrays types, from which we are just interested in the array with length of 22 .
* [3,9,2,16,0,2,62,255,255,224,12,6,1,185,135,108,92,100,3,5,255,27]


The example array has the properties for detect the beacon movements. We log this information into a my_db*.sqlite3 database. Here is the plot for the values of the array in a time series fashion, the most important arrays are the ones which are ploted below.

### Feature imporance

The feature importance was checked using a histrogram for the timeseries data. The feature importance is showed below:

### For Movement case
<div style="text-align:center"><img src ="./timeseries/plots/features_mov.png" /></div>

### For Static case
<div style="text-align:center"><img src ="./timeseries/plots/features.png" /></div>

There are 22 features, from which it seems that just 8 participate in the movement-sensors.

### For Movement case

For this scenario, the beacon was carried by a pedestrian by around 30 min, the movement of the pedestrian is displayed below.

With y-logaritmic scale
<div style="text-align:center"><img src ="./timeseries/plots/mydb_plot_log.png" /></div>

With normal scale:
<div style="text-align:center"><img src ="./timeseries/plots/mydb_plot.png" /></div>

### For the Static case

In this state the beacon was been left in a table for around 20 minutes.

With y-logaritmic scale

<div style="text-align:center"><img src ="./timeseries/plots/mydb_2_plot_log.png" /></div>

With normal scale
<div style="text-align:center"><img src ="./timeseries/plots/mydb_2_plot.png" /></div>


## TODOS
* Log rssi signal strength in the sqlite db.
* Refactor important functions in the code.
* Implement a timeseries plot in html and javascript.
* Implement algorithm for classify movement/no-movement from data
* Log this classification in other sqlite db.

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
