const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });

  // This is the important part: it looks for the out/index.html file
  win.loadFile(path.join(__dirname, 'out/index.html'));
}

app.whenReady().then(createWindow);
