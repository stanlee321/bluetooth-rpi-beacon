const BeaconListener = require('./beacon_base.js')


module.exports = class BeaconModule extends BeaconListener{
    status(){
        console.log('ok')
    };
    
    insertData(my_data){
        console.log("Insert data")
        this.db.run('INSERT INTO beacon (time, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', my_data );
      }
      
}

  
