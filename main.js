const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 1280,
        // width: 640,
        height: 720,
        // height: 480,
        skipTaskbar: false,
        center: true,
        frame: false,
        fullscreenable: true,
        maximizable: false,
        minimizable: true,
        resizable: false,
        nodeIntegration: true,
        title: "Easy Player",
        transparent: true,
        webPreferences: {
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
