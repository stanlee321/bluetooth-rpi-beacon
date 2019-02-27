// Test script for grab beacons data
var noble = require('noble');
var beacon_tools = require('./beacon_tools')

module.exports = class Beacon {
    constructor(){
        
    noble.on('stateChange',  function(state) {
        if (state!="poweredOn") return;
        console.log("Starting scan...");
        noble.startScanning([], true);
        });
    noble.on('discover', beacon_tools.onDiscovery);
    }

    startScan(){
        noble.on('scanStart', function() { console.log("Scanning started."); });
    };

    stopScan(){
        noble.on('scanStop', function() { console.log("Scanning stopped.");});
    }


}