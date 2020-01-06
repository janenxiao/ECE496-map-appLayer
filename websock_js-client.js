const WebSocket = require('ws');

let data = { result: 1, scale: 1 }

const mywebsocket = new WebSocket('ws://localhost:8080');

mywebsocket.on('open', function open() {
    mywebsocket.send(JSON.stringify(data));
});

// mywebsocket.on('message', function incoming(data) {
//     console.log(data);
// });