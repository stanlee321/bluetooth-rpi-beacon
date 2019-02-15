// Test script for grab beacons data

var noble = require('noble');

function onDiscovery(peripheral) {
  // peripheral.rssi                             - signal strength
  // peripheral.address                          - MAC address
  // peripheral.advertisement.localName          - device's name
  // peripheral.advertisement.manufacturerData   - manufacturer-specific data
  // peripheral.advertisement.serviceData        - normal advertisement service data
  // ignore devices with no manufacturer data
  //if (!peripheral.advertisement.manufacturerData) return;
  // output what we have
  console.log(
    peripheral.address,
    JSON.stringify(peripheral.rssi),
    JSON.stringify(peripheral.advertisement.localName),
    JSON.stringify(peripheral.advertisement.manufacturerData),
    JSON.stringify(peripheral.advertisement.serviceData)
  );
  /*
  if (peripheral.address === 'cd:12:44:57:37:08') {
    var dat =  JSON.parse(JSON.stringify(peripheral.advertisement.serviceData[0]["data"])).data
    if (dat[0] == 32){
      console.log(
        peripheral.address,
        JSON.stringify(peripheral.rssi),
        JSON.stringify(peripheral.advertisement.localName),
        JSON.stringify(peripheral.advertisement.manufacturerData),
        dat
      );
    }
  }
  */
}

noble.on('stateChange',  function(state) {
  if (state!="poweredOn") return;
  console.log("Starting scan...");
  noble.startScanning([], true);
});
noble.on('discover', onDiscovery);
noble.on('scanStart', function() { console.log("Scanning started."); });
noble.on('scanStop', function() { console.log("Scanning stopped.");});