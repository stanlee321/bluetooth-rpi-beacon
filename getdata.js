var noble = require('noble');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    console.log();
    console.log('Comienzo fase de escaneo BLE');
    console.log();
    noble.startScanning();
  } else if (state === "unknown"){
    console.log('UNINGIN:::')
  }else {
    process.exit();
  }
});

noble.on('discover', function(peripheral) {
    // cd:12:44:57:37:08
    // e7:da:df:9c:ed:70
    // f4:0d:c8:46:7f:c6
    // cd1244573708: [Peripheral],
    // e7dadf9ced70: [Peripheral],
    //f40dc8467fc6: [Circular] },

  if(peripheral.address==='cd:12:44:57:37:08'){
    obtenerInfoPulsera(peripheral);
  }

});
function obtenerInfoPulsera(peripheral){
    noble.stopScanning();
    console.log();
    console.log('Fase de escaneo BLE finalizada');
    console.log();
  
    peripheral.connect(function(error){
      console.log('Conectado a '+peripheral.advertisement.localName);
      console.log();
      
      peripheral.discoverServices([], function(error, services){ 
        var servicio = services[0];
        servicio.discoverCharacteristics([], function(error, characteristics){
          var currentTime = characteristics[0]; //caracteristica de hora y fecha
          var battery = characteristics[8]; //caracteristica de bateria
          var podometro = characteristics[9]; //caracteristica del podometro
          
          currentTime.read(function(error, data){
            console.log('Fecha y hora: '+data.toString('hex'));
          });
  
          battery.read(function(error, data){
            //A continuacion parseamos el nivel de bateria de hexadecimal a decimal
            var bateria = data.toString('hex').substr(2,2);
            bateria = parseInt(bateria, 16);
            console.log('Nivel de bateria: '+bateria+'%');
          });
  
          podometro.read(function(error, data){
            console.log('Podometro: '+data.toString('hex'));
          });
  
          /*podometro.on('data', function(data, isNotification){
            console.log('Data: '+data+' Notification: '+isNotification);
          });
  
          podometro.subscribe(function(error){
            console.log('Error: '+error);
          });*/
  
        });
      }); 
    });
  }