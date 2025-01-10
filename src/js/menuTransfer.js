//© 2025 LeeKiJoon all rights reserved

dashboardButton.addEventListener('click', () =>
{
    window.api.transferToDashboardPage();
});

calendarButton.addEventListener('click', () => 
{
    window.api.transferToCalendarPage();
});

timetableButton.addEventListener('click', () => 
{
    window.api.transferToTimetablePage();
});

documentsButton.addEventListener('click', () => 
{
    window.api.transferToDocumentsPage();
});

todolistButton.addEventListener('click', () => 
{
    window.api.transferToTodolistPage();
});

informationButton.addEventListener('click', () => 
{
    window.api.transferToInformationPage();
});

licenseButton.addEventListener('click', () =>
{
    window.api.transferToLicensePage();
});

settingsButton.addEventListener('click', () => 
{
    window.api.transferToSettingsPage();
});