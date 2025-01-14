//© 2025 LeeKiJoon all rights reserved
'use strict';
const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');
const { title } = require('process');

function saveToJSONFile(data) {
  const filePath = path.join(__dirname, "../../../timetable/timetable.json");
  let jsonData = [];

  // 파일이 존재하는지 확인
  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf8');

    // 파일 내용이 비어있지 않으면 파싱 시도
    if (rawData.trim()) {
      try {
        jsonData = JSON.parse(rawData);  // 기존 데이터 파싱
      } catch (error) {
        console.error('기존 데이터 파싱 오류:', error);
      }
    }
  }

  // 추가하려는 데이터의 day에 해당하는 기존 수업들
  const dayClasses = jsonData.filter(item => item.day === data.day);

  // 시간 겹침 확인
  for (const existingClass of dayClasses) {
    const existingStart = existingClass.startTime;
    const existingEnd = existingClass.endTime;
    const newStart = data.startTime;
    const newEnd = data.endTime;

    // 시간이 겹치는지 확인
    if (newStart < existingEnd && newEnd > existingStart) {
      dialog.showMessageBox(
        {
          type: 'warning',
          title: 'Warning!',
          message: 'Class time overlaps with an existing class!'
        }
      );
      return;  // 시간이 겹치면 추가하지 않음
    }
  }

  // 새로운 classData를 기존 데이터 배열에 추가
  jsonData.push(data);

  // classData를 JSON 파일에 저장
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));  // 예쁘게 포맷하여 저장
  console.log('Class data has been saved!');
}



module.exports = { saveToJSONFile };