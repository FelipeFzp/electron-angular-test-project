// preload with contextIsolation enabled
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('usb', require('usb'))