//© 2025 LeeKiJoon all rights reserved
'use strict';
// 언어 데이터 로드 함수
function loadLanguage(language) {
    fetch(`../../assets/languages/${language}.json`)  // 언어별 JSON 파일을 불러옴
      .then(response => response.json())
      .then(data => {
        // 각 요소의 ID에 맞는 텍스트를 변경
        for (const key in data) {
          const element = document.getElementById(key);
          if (element) {
            element.innerText = data[key];
          }
        }
      })
      .catch(err => {
        console.error('Error loading language file:', err);
      });
  }
  
  // 페이지 로드 시 언어 적용
  function applySavedLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'en'; // 기본 언어는 영어
    loadLanguage(savedLanguage); // 저장된 언어로 페이지 로드
  }
  
  // 언어 선택 변경 시 처리
  function handleLanguageChange() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = localStorage.getItem('language') || 'en';  // 저장된 언어값을 select에 설정
      languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        localStorage.setItem('language', selectedLanguage);  // 선택한 언어를 localStorage에 저장
        loadLanguage(selectedLanguage);  // 언어 변경
      });
    }
  }
  
  // 페이지 로드 시 언어 적용
  if (document.getElementById('languageSelect')) {
    applySavedLanguage();  // 언어 로드
    handleLanguageChange(); // 언어 선택 처리
  } else {
    applySavedLanguage(); // 다른 페이지에서 언어 적용
  }
  
  
  
  
  //document.getElementById('dashboardText').innerText = data.dashboardText;
  //document.getElementById('calendarText').innerText = data.calendarText;
  //document.getElementById('timetableText').innerText = data.timetableText;
  //document.getElementById('documentsText').innerText = data.documentsText;
  //document.getElementById('todolistText').innerText = data.todolistText;
  //document.getElementById('informationText').innerText = data.informationText;
  //document.getElementById('licenseText').innerText = data.licenseText;
  //document.getElementById('settingsText').innerText = data.settingsText;
  //document.getElementById('settingsTitleText').innerText = data.settingsTitleText;
  //document.getElementById('settingsThemeText').innerText = data.settingsThemeText;
  //document.getElementById('settingsLanguageText').innerText = data.settingsLanguageText;
  //document.getElementById('settingsLanguageEnglishText').innerText = data.settingsLanguageEnglishText;
  //document.getElementById('settingsLanguageKoreanText').innerText = data.settingsLanguageKoreanText;
  //document.getElementById('licenseContentText').innerText = data.licenseContentText;
  //document.getElementById('informationTitleText').innerText = data.informationTitleText;
  //document.getElementById('informationContextText').innerText = data.informationContextText;

