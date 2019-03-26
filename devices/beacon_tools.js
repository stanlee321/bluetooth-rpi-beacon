var DataBase = require('../db/db_extends')
var dateTime = require('node-datetime');

myDB = new DataBase('./telemetry_data.sqlite3')

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
        let data_to_use = [my_data.telemetry.x,
                           my_data.telemetry.y, 
                           my_data.telemetry.z, 
                           my_data.telemetry.timeStamp, 
                           my_data.telemetry.temp,
                           my_data.rssiDB]
                           
        console.log(JSON.stringify(my_data,  null, '\t'))
        myDB.insertData(data_to_use)         
      }
    }
  }
}