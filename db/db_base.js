var sqlite3 = require('sqlite3').verbose();

module.exports = class DataBase {

    constructor(db_name){
        //var db = new sqlite3.Database(':memory:');

        this.sqldb = new sqlite3.Database(db_name, (err) => {
            if (err) { 
                console.log('Error when creating the database', err) 
            } else { 
                console.log('[INFO] Database created!') 
                /* Put code to create table(s) here */
                this.sqldb.run("CREATE TABLE IF NOT EXISTS beacon(id INTEGER PRIMARY KEY AUTOINCREMENT, x, y, z, time, temp, signal)", this.insertData);
            }
        })
    };
    
    status(){
        console.log('ok')
    };

    run(params = []) {
        return new Promise((resolve, reject) => {
          this.sqldb.run('INSERT INTO beacon (x,y,z,time,temp,signal) VALUES (?, ?, ?, ?, ?, ?)', params, function (err) {
            if (err) {
              console.log('Error running sql ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve({ id: this.lastID })
            }
          })
        })
    };

    insertData(my_data){
        console.log(this.sqldb)
        console.log("[INFO] Insert data")
        this.sqldb.run('INSERT INTO beacon (x,y,z,time,temp,signal) VALUES (?, ?, ?, ?, ?, ?)', my_data);
    }
}