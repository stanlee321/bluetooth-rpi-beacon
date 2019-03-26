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

}