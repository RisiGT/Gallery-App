const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { setMainMenu } = require('./menu.js');
const path = require('path');


const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    setMainMenu(mainWindow);
}


app.whenReady().then(createWindow);


ipcMain.handle('dialog:openDirectory', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    return result.filePaths[0]; // Retorna la ruta del directorio seleccionado
});


//buscar que hace esto***
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
