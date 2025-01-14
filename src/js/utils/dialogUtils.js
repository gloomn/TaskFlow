//© 2025 LeeKiJoon all rights reserved
'use strict';

const { dialog } = require('electron');

function showWarningDialog(win, title, message)
{
    return dialog.showMessageBox(win,
        {
            type: 'warning',
            buttons: ['OK'],
            title: title,
            message: message
        }
    );
}

function showErrorDialog(win, title, message)
{
    return dialog.showMessageBox(win,
        {
            type: 'error',
            buttons: ['OK'],
            title: title,
            message: message
        }
    );
}


module.exports = 
{
    showWarningDialog,
    showErrorDialog
}