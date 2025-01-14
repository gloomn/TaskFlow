//© 2025 LeeKiJoon all rights reserved
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

    //Log
    log: (args) => console.log(args),

    transferToDashboardPage: () =>
    {
        ipcRenderer.send('transfer-to-dashboard')
    },

    transferToCalendarPage: () =>
    {
        ipcRenderer.send('transfer-to-calendar')
    },

    transferToDocumentsPage: () =>
    {
        ipcRenderer.send('transfer-to-documents')
    },

    transferToTimetablePage: () =>
    {
        ipcRenderer.send('transfer-to-timetable')
    },

    transferToTodolistPage: () =>
    {
        ipcRenderer.send('transfer-to-todolist')
    },

    transferToInformationPage: () =>
    {
        ipcRenderer.send('transfer-to-information')
    },

    transferToLicensePage: () =>
    {
        ipcRenderer.send('transfer-to-license')
    },

    transferToSettingsPage: () =>
    {
        ipcRenderer.send('transfer-to-settings')
    },

    saveToJSONFile: (data) =>
    {
        ipcRenderer.invoke('save-to-json', data)
    },

    showWarningDialog : (title, message) =>
    {
        ipcRenderer.invoke('show-warning-dialog', title, message)
    }


}

contextBridge.exposeInMainWorld('api', WINDOW_API);