const WebSocket = require('ws');

const wsocketserver = new WebSocket.Server({ port: 8080 });

wsocketserver.on('listening', function () {
    console.log('socket server listening');
});

wsocketserver.on('connection', function connection(wsocket, request) {
    console.log('path: %s', request.url);
    // wsocket.send('Hello, who are you');
    startTime = new Date();

    wsocket.on('message', function incoming(message) {
        console.log('received: %s', message);
        timeDiff = new Date() - startTime;
        console.log(`timeDiff: ${timeDiff} ms`)
        //wsocket.send(message);
    });

    // setTimeout(function () {
    //     wsocket.send('Hello, who are you');
    // }, 100);
});