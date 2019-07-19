const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 1280,
        minWidth: 840,
        // width: 640,
        height: 720,
        minHeight: 400,
        // height: 480,
        skipTaskbar: false,
        useContentSize: true,
        center: true,
        frame: false,
        fullscreenable: true,
        maximizable: false,
        minimizable: true,
        resizable: false,
        title: "Easy Player",
        transparent: false,
        nodeIntegration: true,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });

    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadFile('app/index.html');

    // mainWindow.loadURL('http://localhost:3000/');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {

    if (mainWindow === null) {
        createWindow()
    }
});
