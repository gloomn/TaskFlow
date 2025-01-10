//© 2025 LeeKiJoon all rights reserved
//Close window button event listener
closeWindowButton.addEventListener('click', () =>
{
    window.api.closeWindow();
});

//Minimize window button event listener
minimizeWindowButton.addEventListener('click', () => {
    window.api.minimizeWindow();
});

//Resize window button event listener
resizeWindowButton.addEventListener('click', () =>
{
    window.api.maximizeRestoreWindow();
});

//Change maximize/restore button with window status
function changeMaximizeRestoreButton(windowMaximized)
{
    if(windowMaximized)
    {
        windowMaximized = false;
        resizeWindowButton.title = 'Restore';
        resizeWindowButton.classList.remove('TitleBarRestoreButton');
        resizeWindowButton.classList.add('TitleBarMaximizeButton');
        window.api.restoreWindow();
    }
    else
    {
        windowMaximized = true;
        resizeWindowButton.title = 'Maximize';
        resizeWindowButton.classList.remove('TitleBarMaximizeButton');
        resizeWindowButton.classList.add('TitleBarRestoreButton');
        window.api.maximizeWindow();
    }
    
};

//Check maximize status => if maximize: restore button, if restored: maximize button
window.api.checkMaximizeStatus((isMaximized) => {
    changeMaximizeRestoreButton(isMaximized);
});