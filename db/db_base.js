var sqlite3 = require('sqlite3').verbose();

module.exports = class DataBase {

    constructor(db_name){
        //var db = new sqlite3.Database(':memory:');

        this.sqldb = new sqlite3.Database(db_name, (err) => {
            if (err) {
                console.log('Error when creating the database', err) 
            }else { 
                console.log('[INFO] Database created!') 
            }
        })
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
}