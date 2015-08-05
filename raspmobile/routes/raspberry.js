
/*
 * GET relays listing.
 */

var gpio = require('rpi-gpio');

var relays = [];

relays.push({ id: 1, name: 'Relay_1', status: 'on', readPin: 11, writePin: 12 });
relays.push({ id: 2, name: 'Relay_2', status: 'off', readPin: 13, writePin: 16 });
relays.push({ id: 3, name: 'Relay_3', status: 'on', readPin: 15, writePin: 18 });

for(var i = 0; i < relays.length; i++) {
	gpio.setup(relays[i].readPin, gpio.DIR_IN);
	gpio.setup(relays[i].writePin, gpio.DIR_OUT);
}

exports.list = function (req, res) {
    
    if (req.query['id']) {

		var relay =	getRelay(req.query['id']);
		gpio.read(relay.readPin, function(err, value) {
			relay.status = value ? 'on' : 'off';
			res.send(JSON.stringify(relay));		
		});


    } else {
        res.send(JSON.stringify(relays));
    } 
    
};

exports.on = function (req, res) {
    
    if (req.query['id']) {
        res.send(JSON.stringify(setStatus(req.query['id'], 'on')));
    } else {
        res.send('Relay non specificato');
    }
    
};

exports.off = function (req, res) {
    
    if (req.query['id']) {
        res.send(JSON.stringify(setStatus(req.query['id'], 'off')));
    } else {
        res.send('Relay non specificato');
    }    
};



exports.write_on = function (req, res) {	
	gpio.write(writePin, true);	
	res.send('OK');
};

exports.write_off = function (req, res) {
	gpio.write(writePin, false);	
	res.send('OK');
};

exports.read = function (req, res) {
	gpio.read(readPin, function(err, value) {
		res.send(value);		
	});
};

function getRelay(id){
    for (var i = 0; i < relays.length; i++) {

        if (relays[i].id == id) {
            return relays[i];
        }
    }
}

function setStatus(id, status){

    var relay = getRelay(id);
    relay.status = status;

	gpio.write(relay.writePin, status == 'on');

    return relay;
}
