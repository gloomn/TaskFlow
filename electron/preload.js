//© 2023 LeeKiJoon all rights reserved
const { contextBridge, ipcRenderer } = require('electron');

const WINDOW_API = {
    //Close window
    closeWindow: () => 
    {
        ipcRenderer.send('close-window');
    },

    //Minimize window
    minimizeWindow: () => 
    {
        ipcRenderer.send('minimize-window');
    },

    //Maximize/Restore window
    checkMaximizeStatus: (callback) => 
    {
        ipcRenderer.on('isMaximized', () => 
        {
            callback(false);
        });
        ipcRenderer.on('isRestored', () => 
        {
            callback(true);
        });
    },

    maximizeRestoreWindow: () =>
    {
        ipcRenderer.send('maximize-restore-window');
    },
    log: (args) => console.log(args),


}

contextBridge.exposeInMainWorld('api', WINDOW_API);