const { app, BrowserWindow } = require('electron')
const Electron = require('electron');

function createWindow () {
  var win = new BrowserWindow({
    width: 800,
    height: 600,
    //frame: false,
    icon: __dirname + "./img/face.ico",
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
}

app.on('ready', function(){
  createWindow()
})