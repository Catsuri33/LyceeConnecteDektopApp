const { app, BrowserWindow } = require("electron");

const extensionsAllowed = ["pdf", "png", "jpg", "jpeg"];

function createWindow () {

    const win = new BrowserWindow({

        width: 800,
        height: 600,
        title: "Lycée Connecté",
        autoHideMenuBar: true,
        icon: __dirname + "/resources/images/icon64.ico"
    
    });

    win.webContents.setWindowOpenHandler(({ url }) => {

        var extension = url.split(/[#?]/)[0].split('.').pop().trim();

        if(extensionsAllowed.includes(extension)){

            return { action: "allow" };

        } else {

            win.loadURL(url);
            return { action: "deny" };

        }
    
    });

    win.webContents.on('did-create-window', (childWindow) => {

        childWindow.setSize(800, 600);
        childWindow.setIcon(__dirname + "/resources/images/icon64.ico");
        childWindow.menuBarVisible = false;
        childWindow.isMenuBarAutoHide(true);
        childWindow.maximize();

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