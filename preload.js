const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  async loadPlugins() {
    const plugins = await ipcRenderer.invoke('loadPlugins')

    return plugins
  }
})


