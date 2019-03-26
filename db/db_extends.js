"use strict";
var DataBase = require('./db_base.js/index.js');

class CreateDB {
    constructor(sqldb){
        this.sqldb = sqldb
    }
    createTable(){
        const sql = `
        CREATE TABLE 
        IF NOT EXISTS 
        beacon(id INTEGER PRIMARY KEY AUTOINCREMENT, x, y, z, time, temp, signal)
        `
        return this.sqldb.run(sql);
    }
}

class InsertDB {
    constructor(sqldb){
        this.sqldb = sqldb
    }

    insertData(my_data){
        console.log("[INFO] Inserting data")

        const sql = `
        INSERT INTO
        beacon (x,y,z,time,temp,signal) VALUES (?, ?, ?, ?, ?, ?)
        `
        this.sqldb.run(sql, my_data);
    }
}

module.exports = {
    CreateDB: CreateDB,
    InsertDB: InsertDB
}
  
