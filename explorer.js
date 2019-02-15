var async = require('async');
var noble = require('noble');

var peripheralIdOrAddress = process.argv[2].toLowerCase();

noble.on('stateChange', function (state) {
	if (state === 'poweredOn') {
		noble.startScanning();
	} else {
		noble.stopScanning();
	}
});

noble.on('discover', function (peripheral) {
	console.log(peripheral);
	if (peripheral.id === peripheralIdOrAddress || peripheral.address === peripheralIdOrAddress) {
		noble.stopScanning();

		console.log('peripheral with ID ' + peripheral.id + ' found');
		var advertisement = peripheral.advertisement;

		var localName = advertisement.localName;
		var txPowerLevel = advertisement.txPowerLevel;
		var manufacturerData = advertisement.manufacturerData;
		var serviceData = advertisement.serviceData;
		var serviceUuids = advertisement.serviceUuids;

		if (localName) {
			console.log('  Local Name        = ' + localName);
		}

		if (txPowerLevel) {
			console.log('  TX Power Level    = ' + txPowerLevel);
		}

		if (manufacturerData) {
			console.log('  Manufacturer Data = ' + manufacturerData.toString('hex'));
		}

		if (serviceData) {
			console.log('  Service Data      = ' + JSON.stringify(serviceData, null, 2));
		}

		if (serviceUuids) {
			console.log('  Service UUIDs     = ' + serviceUuids);
		}

		console.log();

		explore(peripheral);
	}
});

function explore(peripheral) {
	console.log('services and characteristics:');

	//peripheral.on('disconnect', function () {
	//	console.log('DISCONNECTING????????????????')
		//process.exit(0);
	//});

	peripheral.connect(function (error) {
		peripheral.discoverServices([], function (error, services) {
			var serviceIndex = 0;

			async.whilst(
				function () {
					return (serviceIndex < services.length);
				},
				function (callback) {
					var service = services[serviceIndex];
					var serviceInfo = service.uuid;

					if (service.name) {
						serviceInfo += ' (' + service.name + ')';
					}
					console.log(serviceInfo);

					service.discoverCharacteristics([], function (error, characteristics) {
						var characteristicIndex = 0;

						async.whilst(
							function () {
								return (characteristicIndex < characteristics.length);
							},
							function (callback) {
								var characteristic = characteristics[characteristicIndex];
								var characteristicInfo = '  ' + characteristic.uuid;

								if (characteristic.name) {
									characteristicInfo += ' (' + characteristic.name + ')';
								}
								characteristic.on('data', function (data, isNotification) {
									console.log('service name', service.name)
									console.log('CHAR NAME', characteristic.name)
									console.log('IS NOT', isNotification)
									console.log('IS DATA>>>', JSON.stringify(data))
									
								});

								characteristic.once('notify', function(state) {
									console.log('NOTIFY', state)
								});


								async.series([
									function (callback) {
										characteristic.discoverDescriptors(function (error, descriptors) {
											async.detect(
												descriptors,
												function (descriptor, callback) {
													if (descriptor.uuid === '2901') {
														return callback(descriptor);
													} else {
														return callback();
													}
												},
												function (userDescriptionDescriptor) {
													if (userDescriptionDescriptor) {
														userDescriptionDescriptor.readValue(function (error, data) {
															if (data) {
																characteristicInfo += ' (' + data.toString() + ')';
																console.log('CHARRR IFNOO!!!!', characteristicInfo)
															}
															callback();
														});
													} else {
														callback();
													}
												}
											);
										});
									},
									function (callback) {
										characteristicInfo += '\n    properties  ' + characteristic.properties.join(', ');

										if (characteristic.properties.indexOf('read') !== -1) {
											characteristic.read(function (error, data) {
												if (data) {
													var string = data.toString('ascii');

													characteristicInfo += '\n    value       ' + data.toString('hex') + ' | \'' + string + '\'';
													console.log('CHARRR INFO 2222>>>', characteristicInfo)
												}
												callback();
											});
										} else {
											callback();
										}
									},
									function () {
										console.log(characteristicInfo);
										characteristicIndex++;
										callback();
									}
								]);
							},
							function (error) {
								serviceIndex++;
								callback();
							}
						);
					});
				},
				function (err) {
					peripheral.disconnect();
				}
			);
		});
	});
}

