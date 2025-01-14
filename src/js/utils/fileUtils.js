//© 2025 LeeKiJoon all rights reserved
'use strict';
const fs = require('fs');
const path = require('path');

function saveToJSONFile(data) {
    const filePath = path.join(__dirname, "../../../timetable/timetable.json");
    let fileData = [];

    // 파일이 존재하면 기존 데이터를 읽어옴
    if (fs.existsSync(filePath)) {
        const existingData = fs.readFileSync(filePath, "utf-8");
        fileData = existingData ? JSON.parse(existingData) : [];
    }

    // 해당 요일에 데이터가 이미 있는지 확인
    const dayData = fileData.find(item => item.day === data.day);
    
    if (dayData) {
        // 해당 요일에 데이터가 이미 존재하면 해당 시간대에 데이터가 비어있는지 확인
        const isTimeSlotOccupied = dayData.some(item => 
            (item.startTime <= data.startTime && item.endTime > data.startTime) ||
            (item.startTime < data.endTime && item.endTime >= data.endTime)
        );

        if (isTimeSlotOccupied) {
            console.log("해당 시간대에 이미 수업이 있습니다.");
            return;
        }
    }

    // 요일별로 새 데이터를 추가
    fileData.push(data);

    // 파일에 저장
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf-8");
    console.log("Class data saved successfully!");
}

module.exports = { saveToJSONFile };