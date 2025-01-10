//© 2025 LeeKiJoon all rights reserved
//Use strict mode
'use strict';
const 
{ 
    app, 
    ipcMain,
    BrowserWindow ,
    dialog
} = require('electron');
const fs = require('fs/promises');
const path = require('path');
let window;
let splashWindow;

//Create Main Window
const createWindow = () => 
{
    window = new BrowserWindow
    ({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        frame: false,
        webPreferences:
        {
            sandbox: true,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, '../assets/icons/win/ico/icon.ico')
    });


    //Maximize/Restore window
    ipcMain.on('maximize-restore-window', () =>
    {
        if(window.isMaximized())
        {
            window.restore();
            console.log('Window restored');
        }
        else
        {
            window.maximize();
            console.log('Window maximized');
        }
    });

    //Send maximized status to renderer.js
    window.on('maximize', () => 
    {
        window.webContents.send('isMaximized');
    });
    
    //Send unmaximized status to renderer.js
    window.on('unmaximize', () => 
    {
        window.webContents.send('isRestored');
    });

    //Minimize window
    ipcMain.on('minimize-window', () =>
    {
        window.minimize();
        console.log('Window minimized');
    });

    //Close window
    ipcMain.on('close-window', () => 
    {
        if(window)
        {
            window.close();
        }
    });

    ipcMain.on('transfer-to-dashboard', () =>
    {
        window.loadFile(path.join(__dirname, '../src/html/index.html'));
    });

    ipcMain.on('transfer-to-calendar', () =>
    {
        window.loadFile(path.join(__dirname, '../src/html/calendar.html'));
    });

    ipcMain.on('transfer-to-documents', () =>
    {
        window.loadFile(path.join(__dirname, '../src/html/documents.html'));
    });

    ipcMain.on('transfer-to-timetable', () =>
    {
        window.loadFile(path.join(__dirname, '../src/html/timetable.html'));
    });

    ipcMain.on('transfer-to-todolist', () =>
    {
        window.loadFile(path.join(__dirname, '../src/html/todolist.html'));
    });

    ipcMain.on('transfer-to-license', () =>
    {
        window.loadFile(path.join(__dirname, '../src/html/license.html'));
    });

    ipcMain.on('transfer-to-information', () =>
    {
        window.loadFile(path.join(__dirname, '../src/html/information.html'))
    });

    ipcMain.on('transfer-to-settings', () =>
    {
        window.loadFile(path.join(__dirname, '../src/html/settings.html'));
    });


    //Show splash window when loading main window
    window.once('ready-to-show', () =>
    {
            splashWindow.destroy();
            window.show();
    });

    window.loadFile(path.join(__dirname, '../src/html/index.html'));

}

//Create splash window
function createSplashWindow()
{
    splashWindow = new BrowserWindow
    ({
        width: 800,
        height: 450,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true
    })
    splashWindow.setIgnoreMouseEvents(true);
    splashWindow.loadFile(path.join(__dirname, '../assets/splashscreen/splashScreen.png'));
    splashWindow.show();
    setTimeout(() => {
        createWindow();
      }, 4000);
}



//App Ready
app.whenReady().then(() =>
{
    createSplashWindow();

    //Check file exist or not
    ipcMain.handle('check-file-exist', async (event, fileLocation) =>
    {
        try 
        {
            await fs.access(fileLocation, fs.constants.F_OK);
             return true;
        } 
        catch (error) 
        {
            if (error.code === 'ENOENT') 
            {
              return false;
            } 
            else 
            {
              throw error;
            }
        }
    });
});

//App close
app.on('window-all-closed', () => 
{
    if(process.platform !== 'darwin') 
    {
        app.quit();
    }
});

app.on('activate', () =>
{
    if(BrowserWindow.getAllWindows().length === 0)
    {
        createWindow();
    }
})
