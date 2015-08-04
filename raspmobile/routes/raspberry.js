
/*
 * GET relays listing.
 */

var relays = [];

relays.push({ name: 'Relay_1', status: 'on' });
relays.push({ name: 'Relay_2', status: 'off' });
relays.push({ name: 'Relay_3', status: 'on' });

exports.list = function (req, res) {
    res.send(JSON.stringify(relays));
};