import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { showNotification } from './controllers/notifications';



if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.on('message', (event, message) => event.sender.send('message', message));
};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

