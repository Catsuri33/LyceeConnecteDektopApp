const { app, BrowserWindow } = require("electron");

function createWindow () {

    const win = new BrowserWindow({

        width: 800,
        height: 600,
        title: "Lycée Connecté",
        autoHideMenuBar: true,
        icon: __dirname + "/resources/images/icon64.ico"
    
    });

    win.webContents.setWindowOpenHandler(({ url }) => {

        win.loadURL(url);
        return { action: "deny" };
    
    });
  
    win.loadURL("https://lyceeconnecte.fr/");
    win.maximize();

}

app.whenReady().then(() => {

    createWindow();

    app.on('activate', function () {

        if (BrowserWindow.getAllWindows().length === 0) createWindow();

    });

});

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') app.quit();

});