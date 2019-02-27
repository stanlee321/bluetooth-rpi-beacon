// Test script for grab beacons data

var noble = require('noble');

var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
var dateTime = require('node-datetime');

let db = new sqlite3.Database("./mydb_2.sqlite3", (err) => { 
  if (err) { 
      console.log('Error when creating the database', err) 
  } else { 
      console.log('Database created!') 
      /* Put code to create table(s) here */
      createTable()
  } 
})

const createTable = () => {
  console.log("create database table contacts");
  db.run("CREATE TABLE IF NOT EXISTS beacon(id INTEGER PRIMARY KEY AUTOINCREMENT, time STRING, _0 INTEGER, _1 INTEGER, _2 INTEGER, _3 INTEGER, _4 INTEGER, _5 INTEGER, _6 INTEGER, _7 INTEGER, _8 INTEGER, _9 INTEGER, _10 INTEGER, _11 INTEGER, _12 INTEGER, _13 INTEGER, _14 INTEGER, _15 INTEGER, _16 INTEGER, _17 INTEGER, _18 INTEGER, _19 INTEGER, _20 INTEGER, _21 INTEGER)",  insertData);
}


function insertData (my_data){
  console.log("Insert data")
  db.run('INSERT INTO beacon (time, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', my_data );
}

function onDiscovery(peripheral) {
  // peripheral.rssi                             - signal strength
  // peripheral.address                          - MAC address
  // peripheral.advertisement.localName          - device's name
  // peripheral.advertisement.manufacturerData   - manufacturer-specific data
  // peripheral.advertisement.serviceData        - normal advertisement service data
  // ignore devices with no manufacturer data
  //if (!peripheral.advertisement.manufacturerData) return;
  // output what we have
  let array = peripheral.advertisement.serviceData[0]
  if (array) {
    let data = JSON.parse(JSON.stringify(array))
    let my_values = data.data.data
    if (my_values.length === 22){
      console.log(
        peripheral.address,
        JSON.stringify(peripheral.rssi),
        JSON.stringify(peripheral.advertisement.localName),
        JSON.stringify(peripheral.advertisement.manufacturerData),
        JSON.stringify(peripheral.advertisement.serviceData[0].uuid),
        //JSON.stringify(data),
        JSON.stringify(my_values)
      );
      var dt = dateTime.create();
      var formatted = dt.format('Y-m-d H:M:S');
      my_values.unshift(formatted)
      insertData(my_values)  
    }
  }else{
    console.log('corruption...')
  }

  /*

  // f7:af:35:99:f2:84 
  // cd:12:44:57:37:08
  // d1:17:07:37:40:ba  // sensor
  // c1:93:da:19:eb:cd
  if (peripheral.address === "c1:93:da:19:eb:cd") {
    var dat =  JSON.stringify(peripheral.advertisement.serviceData[0])
    console.log(
      peripheral.address,
      JSON.stringify(peripheral.rssi),
      JSON.stringify(peripheral.advertisement.localName),
      JSON.stringify(peripheral.advertisement.manufacturerData),
      dat
    );
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