const BeaconListener = require('./beacon_base.js')


module.exports = class BeaconModule extends BeaconListener{
    status(){
        console.log('ok')
    }
}

  
