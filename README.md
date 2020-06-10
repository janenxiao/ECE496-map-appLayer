# ECE496 map appLayer

An application for our radar-based hand gesture recognition project
* takes identified gestures via UDP socket to update view of a map accordingly
* takes user’s hand location and plots onto menu page<br/>
(so they can make a selection by doing click gesture at a particular location)

### Built With
* [Electron](https://www.electronjs.org) - desktop app framework
* [Mapbox GL JS](https://www.mapbox.com) - render interactive maps
```
npm install
npm start   // app will listen for input on localhost:8080
```
