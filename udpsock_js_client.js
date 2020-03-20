var PORT = 33333;
var HOST = '127.0.0.1';

const dgram = require('dgram')
// creating a client socket
const client = dgram.createSocket('udp4')
//buffer msg
const data = Buffer.from('yooooooo')
//sending msg
client.send(data, PORT, HOST, error => {
    client.close()
})