// Modules to control application life and create native browser window
const { app, BrowserWindow, net } = require('electron')
const path = require('path')
const WebSocket = require('ws');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // periodicRequest();
  openWebSocket();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Periodically make request to analyzer server to get gesture info
// data format: {'result': int, 'nounce': int} -- a new nounce value indicates new data
function periodicRequest() {
  let prevNounce = -1;
  let timeleft = 25;
  var timeDiff;
  let downloadTimer = setInterval(function () {
    // returns a ClientRequest object
    // const request = net.request('http://149.248.4.73:5000/result/'); // url of analyzer server
    const request = net.request('http://127.0.0.1:5000');
    startTime = new Date();
    request.on('response', (response) => {
      let json = '';
      timeDiff = new Date() - startTime;  // in ms
      console.log(`timeDiff 1: ${timeDiff} ms`)
      console.log(`STATUS: ${response.statusCode}`)
      response.on('data', (chunk) => {
        json += chunk
      })
      response.on('end', () => {  // no more data to arrive
        timeDiff = new Date() - startTime;
        console.log(`timeDiff 2: ${timeDiff} ms`)
        console.log(`BODY: ${json}`)
        const data = JSON.parse(json);
        if (data.nounce !== prevNounce) {
          mainWindow.webContents.send('gesture', data.result);
          prevNounce = data.nounce;
        }
      })
    })
    request.end()

    timeleft -= 1;
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
    }
  }, 1500);  // minimum 300 to avoid tcp buffering
}

// Open a websock server to receive gesture info from a local python analyzer program as client
// data format: {'result': int, 'scale': int}
function openWebSocket() {
  const wsocketserver = new WebSocket.Server({ port: 8080 });

  wsocketserver.on('listening', function () {
    console.log('socket server listening');
  });
  wsocketserver.on('connection', function connection(wsocket, request) {
    console.log('size:', mainWindow.getSize());
    console.log('bounds:', mainWindow.getBounds());
    startTime = new Date();
    wsocket.on('message', function incoming(message) {
      console.log('received: %s', message);
      console.log(`timeDiff: ${new Date() - startTime} ms`)
      // wsocket.send('Hello, who are you');

      const data = JSON.parse(message);
      console.log(data);
      if (request.url === '/gesture') {
        mainWindow.webContents.send('gesture', data);
      }
      // else if (request.url === '/carpoint') {
      //   mainWindow.webContents.send('carpoint', data);
      // }

    });
  });
}