
/*
 * GET relays listing.
 */

var pin = 16;
//var gpio = require("pi-gpio");

var relays = [];

relays.push({ id: 1, name: 'Relay_1', status: 'on' });
relays.push({ id: 2, name: 'Relay_2', status: 'off' });
relays.push({ id: 3, name: 'Relay_3', status: 'on' });

exports.list = function (req, res) {
    
    if (req.query['id']) {
        res.send(JSON.stringify(getRelay(req.query['id'])));
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

exports.write = function (req, res) {

    gpio.open(pin, "output", function (err) {     // Open pin 16 for output 
        gpio.write(pin, 1, function () {          // Set pin 16 high (1) 
            gpio.close(pin);                     // Close pin 16 
        });
    });

};

exports.read = function (req, res) {
    
    gpio.read(pin, function (err, value) {
        if (err) throw err;
        console.log(value); // The current state of the pin 
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
    return relay;
}