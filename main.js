const {app, screen, Menu, Tray, BrowserWindow} = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');

let config;
let mainWindow;

loadConfig();

function loadConfig() {
  let homedir = os.homedir();
  let configFolderPath = path.join(homedir, '.signpost');
  if (!fs.existsSync(configFolderPath)) {
    fs.mkdirSync(configFolderPath);
  }

  let configFilePath = path.join(configFolderPath, 'config.json');
  if (!fs.existsSync(configFilePath)) {
    fs.copyFileSync(path.join(__dirname, 'config.json'), configFilePath);
  }

  let customCssPath = path.join(configFolderPath, 'custom.css');
  if (!fs.existsSync(customCssPath)) {
    fs.copyFileSync(path.join(__dirname, 'custom.css'), customCssPath);
  }

  config = require(configFilePath);
}

function createWindow () {
  let displays = screen.getAllDisplays();
  if (displays.length > 1) {
    displays.sort((a, b) => {
      return Math.abs(a.bounds.x) - Math.abs(b.bounds.x) + Math.abs(a.bounds.y) - Math.abs(b.bounds.y);
    });
  }
  let display = displays[config.display || 0] || displays[0];
  mainWindow = new BrowserWindow({
    x: display.bounds.x,
    y: display.bounds.y,
    focusable: false,
    alwaysOnTop: true,
    fullscreen: true,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.setIgnoreMouseEvents(true);

  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', () => {
  tray = new Tray(path.join(__dirname, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Exit',
      type: 'normal',
      click: () => {
        mainWindow.close();
      }
    }
  ]);
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
  createWindow();
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
