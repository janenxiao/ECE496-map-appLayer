const myport = 33333;
const myhost = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

// emits when any error occurs
server.on('error', (error) => {
    log("udp_server", "error", error)
    server.close()
})

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message);
});

server.bind(myport, myhost);