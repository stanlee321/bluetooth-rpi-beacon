const BeaconListener = require('./beacon_base.js')


module.exports = class BeaconModule extends BeaconListener{
    status(){
        console.log('ok')
    };
    
    insertData(my_data){
        console.log("Insert data")
        this.db.run('INSERT INTO beacon (x,y,z,time,temp,signal) VALUES (?, ?, ?, ?, ?, ?)', my_data);
      }
      
}

  
