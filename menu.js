const { app, Menu } = require('electron');

const setMainMenu = (mainWindow) => {
    const template = [
        {
            label: app.getName(),
            submenu: [
                {
                    label: 'Exit',
                    role: 'quit',
                },
                {
                    label: 'Reload',
                    role: 'reload',
                },
                {
                    label: 'Toggle Developer Tools',
                    role: 'toggleDevTools',
                },
            ],
        },
        {
            label: 'Create',
            submenu: [
                {
                    label: 'New File',
                    click: () => {
                        mainWindow.webContents.send('menu-create-file');
                    },
                },
                {
                    label: 'New Folder',
                    click: () => {
                        mainWindow.webContents.send('menu-create-folder');
                    },
                },
            ],
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

module.exports = { setMainMenu };