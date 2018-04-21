const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1600,
    height: 1200,
  });

  win.loadURL(url.format({
    pathname: path.resolve(__dirname, './index.html'),
    protocol: 'file',
    slashes: true,
  }));

  win.on('closed', () => {
    win = null;
  });

  const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => {
      console.log(`Added Extension:  ${name}`); // eslint-disable-line no-console
    })
    .catch((err) => {
      console.log('An error occurred: ', err); // eslint-disable-line no-console
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => app.quit());

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

module.exports = { app };
