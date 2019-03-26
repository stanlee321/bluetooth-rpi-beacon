var DataBase = require('../db/db.js')
var dateTime = require('node-datetime');

my_db = new DataBase('./mydb.sqlite3')

module.exports = {
  
  onDiscovery: function (peripheral) {
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
      var dt = dateTime.create();
      var formatted = dt.format('Y-m-d H:M:S');

      // Just filter the 22 lenght array

      if (my_values.length === 22) {
        my_values.unshift(formatted)

        let my_data = {
          addrs: peripheral.address,
          rssiDB: peripheral.rssi,
          manufacturer: peripheral.advertisement.localName,
          uuid: peripheral.advertisement.serviceData[0].uuid,
          telemetry: {
            timeStamp: my_values[0],
            x: my_values[5],
            y: my_values[6],
            z: my_values[7],
            temp: my_values[22]
          }
        };
        let data_to_use = [telemetry.x, telemetry.y, telemetry.z, telemetry.timeStamp, telemetry.temp]
        console.log(JSON.stringify(my_data,  null, '\t'))
        my_db.insertData(data_to_use)         
      }
    }
  }
}