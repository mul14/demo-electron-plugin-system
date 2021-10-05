const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs/promises')

let mainWindow

app.whenReady().then(() => {

  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('./index.html');

  mainWindow.show()
})

ipcMain.handle('loadPlugins', (event, args) => {
  return loadPlugins()
})

async function loadPlugins() {
  // const pluginPath = path.join(app.getPath('userData'), 'plugins')
  const pluginPath = path.join(__dirname, 'plugins')

  const availablePlugins = [];

  const files = await fs.readdir(pluginPath)

  for (plugin of files) {
    const manifestFile = path.join(pluginPath, plugin, 'plugin.json')

    if (await fs.stat(manifestFile)) {
      const manifest = require(manifestFile)
      availablePlugins.push(manifest)
    }
  }

  return availablePlugins;
}
