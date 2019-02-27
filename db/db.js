var sqlite3 = require('sqlite3').verbose();

module.exports = class DataBase {
    constructor(db_name){
        //var db = new sqlite3.Database(':memory:');

        this.db = new sqlite3.Database(db_name, (err) => { 
        if (err) { 
            console.log('Error when creating the database', err) 
        } else { 
            console.log('Database created!') 
            /* Put code to create table(s) here */
            this.db.run("CREATE TABLE IF NOT EXISTS beacon(id INTEGER PRIMARY KEY AUTOINCREMENT, time STRING, _0 INTEGER, _1 INTEGER, _2 INTEGER, _3 INTEGER, _4 INTEGER, _5 INTEGER, _6 INTEGER, _7 INTEGER, _8 INTEGER, _9 INTEGER, _10 INTEGER, _11 INTEGER, _12 INTEGER, _13 INTEGER, _14 INTEGER, _15 INTEGER, _16 INTEGER, _17 INTEGER, _18 INTEGER, _19 INTEGER, _20 INTEGER, _21 INTEGER)", this.insertData);
        }
        })
    };
    
    insertData(my_data){
        console.log("Insert data")
        this.db.run('INSERT INTO beacon (time, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', my_data );
      }
      

}