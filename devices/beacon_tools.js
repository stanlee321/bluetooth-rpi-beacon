const DBExtends = require('../db/db_extends')
const DBBase = require('../db/db_base')
const dateTime = require('node-datetime');

// Isnstace of DB
const sqldb = new DBBase('./telemetry_data.sqlite3')
const sql_createtable = new DBExtends.CreateDB(sqldb)

sql_createtable.createTable()
      .then( r => {
            console.log(`TABLE CREATED with response: ${r}`)
      }).catch( e => {console.log('Error while creating Table')
})

const sql_insertdata = new DBExtends.InsertDB(sqldb)


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
        sql_insertdata.insertData(data_to_use).then(r => {
          console.log(`Data INSERTED with log ${r}`)
        }).catch( e => {
          `CANNOT INSERT DATA because ${e}`
        })
      }
    }
  }
}