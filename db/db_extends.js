const DataBase = require('./db')


module.exports = class DBModule extends DataBase{
    /*
    Extends the DataBase method with status and insterData
    */
   
    status(){
        console.log('ok')
    };
    
    insertData(my_data){
        console.log("Insert data")
        this.db.run('INSERT INTO beacon (x,y,z,time,temp,signal) VALUES (?, ?, ?, ?, ?, ?)', my_data);
      }
      
}

  
