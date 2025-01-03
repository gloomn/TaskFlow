//© 2023 LeeKiJoon all rights reserved
closeWindowButton.addEventListener('click', () =>
{
    window.api.closeWindow();
});

minimizeWindowButton.addEventListener('click', () => {
    window.api.minimizeWindow();
});

resizeWindowButton.addEventListener('click', () =>
{
    window.api.maximizeRestoreWindow();
});

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

window.api.checkMaximizeStatus((isMaximized) => {
    changeMaximizeRestoreButton(isMaximized);
});