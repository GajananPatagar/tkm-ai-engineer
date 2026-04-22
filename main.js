const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "TKM AI Engineering Partner v2050",
    autoHideMenuBar: true, // Clean "2050" look
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Points to the folder Next.js will create
  const indexPath = path.join(__dirname, 'out', 'index.html');
  win.loadFile(indexPath);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
