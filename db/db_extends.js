const DataBase = require('./db.js');


module.exports = class DBModule extends DataBase {
    /*
    Extends the DataBase method with status and insterData
    */
    constructor(db_name){
        super(db_name);
    }
    status(){
        console.log('ok')
    };
    
    insertData(my_data){
        console.log(this.sqldb)
        console.log("[INFO] Insert data")
        this.sqldb.run('INSERT INTO beacon (x,y,z,time,temp,signal) VALUES (?, ?, ?, ?, ?, ?)', my_data);
    }
      
}

  
