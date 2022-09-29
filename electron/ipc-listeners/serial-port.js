const { ipcMain } = require('electron')
const { SerialPort } = require('serialport')

ipcMain.handle('getDeviceList', async (event, args) => {
    return await SerialPort.list()
})

let connectedPort;
ipcMain.handle('connect', async (event, portPath) => {
    try {
        if (connectedPort?.isOpen) {
            await new Promise(resolve => connectedPort.close(resolve))
        }
        
        if (connectedPort) {
            connectedPort = undefined;
        }

        connectedPort = new SerialPort({
            baudRate: 9600,
            path: portPath
        })

        return await Promise.resolve(portPath)
    } catch (error) {
        const message = `Unable to connect to port ${portPath}, error: ${error}`
        console.log(message)
        return await Promise.reject(message)
    }
})

ipcMain.handle('disconnect', async (event, args) => {
    try {
        if (!connectedPort)
            return await Promise.resolve()

        if (connectedPort.isOpen)
            connectedPort.close()

        connectedPort = undefined;
        return await Promise.resolve()
    } catch (error) {
        const message = `Unable to disconnect from port ${connectedPort.path}, error: ${error}`;
        console.log(message)
        return await Promise.reject(message)
    }
})

ipcMain.handle('write', async (event, message) => {
    if (!connectedPort)
        await Promise.reject('Don\'t have any port connected, failed to write on serial');

    if (!connectedPort.isOpen)
        await Promise.reject(`Port ${connectedPort.path} is closed, failed to write on serial`);

    try {
        connectedPort.write(message)
        return await Promise.resolve()
    } catch (error) {
        const message = `Unable to write on port ${portPath}, error: ${error}`
        console.log(message)
        return await Promise.reject(message)
    }
})