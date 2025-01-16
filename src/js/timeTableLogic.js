//© 2025 LeeKiJoon all rights reserved
'use strict';

const openModalButton = document.getElementById('addClassButton');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('closeModal');

openModalButton.addEventListener('click', () => {
    modal.style.visibility = 'visible';
});

closeModalButton.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
});

modal.addEventListener('click', (event) => {
    if (!event.target.closest('.modal-content')) {
        modal.style.visibility = 'hidden';
    }
});

document.getElementById("saveClassButton").addEventListener("click", function () {
    const className = document.getElementById("className").value;
    const classRoom = document.getElementById("classRoom").value;
    const day = document.getElementById("day").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (!className || !classRoom || !startTime || !endTime) {
        window.api.showWarningDialog('Warning [Add Class]', 'Please fill in the blank!');
        return;
    }

    if (startTime >= endTime) {
        window.api.showWarningDialog('Warning [Add Class]', 'Start time cannot be later than end time.');
        return;
    }

    const classData = {
        className,
        classRoom,
        day,
        startTime,
        endTime
    };

    window.api.saveToJSONFile(classData);
    modal.style.visibility = 'hidden';
    addEventToDay(classData);
});

function addEventToDay(classData) {
  const { className, classRoom, day, startTime, endTime } = classData;

  const daySpan = Array.from(document.querySelectorAll('.events-group span'))
      .find(span => span.textContent.toLowerCase() === day.toLowerCase());

  if (!daySpan) {
      console.error(`No span found for day: ${day}`);
      return;
  }

  const dayList = daySpan.parentNode.nextElementSibling;

  if (!dayList) {
      console.error(`No ul found for day: ${day}`);
      return;
  }

  // ul의 실제 높이를 가져옴 (padding, margin을 포함한 높이)
  const ulHeight = dayList.clientHeight;
  const dayStartTime = 6;
  const dayEndTime = 20;
  const totalMinutesInDay = (dayEndTime - dayStartTime) * 60;
  const startInMinutes = parseTimeToMinutes(startTime);
  const endInMinutes = parseTimeToMinutes(endTime);
  const eventStartInDay = startInMinutes - (dayStartTime * 60);
  const eventEndInDay = endInMinutes - (dayStartTime * 60);
  const eventHeight = ((eventEndInDay - eventStartInDay) / totalMinutesInDay) * ulHeight;
  const eventTop = (eventStartInDay / totalMinutesInDay) * ulHeight;

  const eventItem = document.createElement('li');
  eventItem.classList.add('single-event');
  eventItem.dataset.start = startTime;
  eventItem.dataset.end = endTime;
  eventItem.dataset.room = classRoom;
  eventItem.dataset.content = className;
  eventItem.dataset.event = `${className} - ${classRoom}`;

  eventItem.innerHTML = `
      <div class="event-button-box">
          <button class="event-delete-button">✕</button>
      </div>
      <p class="event-name">${className}</p>
      <p class="event-info">${classRoom} ${startTime}~${endTime}</p>
  `;

  // 선 간격 비율 (background-size에서 정의된 값)
  const backgroundLineHeightRatio = 6.666666666666666; // 선 간격 비율

  // 비율 보정된 높이 계산
  const eventHeightPercentage = (eventHeight / ulHeight) * 100; // 이벤트 높이의 비율을 100%로 계산
  const eventTopPercentage = (eventTop / ulHeight) * 100; // 이벤트 시작 위치의 비율을 100%로 계산

  // 선 간격을 고려하여 최종 높이 비율 보정 (배경의 선 간격을 고려한 조정)
  const adjustedEventHeight = Math.floor(eventHeightPercentage); // 소수점 이하 제거하여 정확한 높이 보정

  // 이벤트 항목 스타일 설정
  Object.assign(eventItem.style, {
      position: 'absolute',
      width: '100%',                  // 부모 ul의 너비에 맞춤
      top: `${eventTopPercentage}%`,   // 계산된 위치 비율로 설정
      height: `${adjustedEventHeight}%`, // 보정된 비율로 이벤트 높이 설정
      left: '0px'                     // ul의 왼쪽에 맞춤
  });

  eventItem.querySelector('.event-delete-button').addEventListener('click', () => {
      eventItem.remove();
  });

  dayList.appendChild(eventItem);
}




function parseTimeToMinutes(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
}


