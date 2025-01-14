//© 2025 LeeKiJoon all rights reserved
'use strict';
const openModalButton = document.getElementById('addClassButton');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('closeModal');

openModalButton.addEventListener('click', () =>
{
    modal.style.visibility = 'visible'
});

closeModalButton.addEventListener('click', () =>
{
    modal.style.visibility = 'hidden'
});

modal.addEventListener('click', (event) => {
    // 클릭한 곳이 모달 콘텐츠가 아니라면
    if (!event.target.closest('.modal-content')) {
      modal.style.visibility = 'hidden'; // 모달 숨기기
    }
  });


document.getElementById("saveClassButton").addEventListener("click", function () {
  const className = document.getElementById("className").value;
  const classRoom = document.getElementById("classRoom").value;
  const day = document.getElementById("day").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  // 입력값 검증
  if (!className || !classRoom || !startTime || !endTime) {
    window.api.showWarningDialog('Warning [Add Class]', 'Please fill in the blank!');
    return;
  }

  // 시간 검증: startTime이 endTime보다 같거나 커서는 안 됨
  if (startTime >= endTime) {
    window.api.showWarningDialog('Warning [Add Class]', 'Start time cannot be later than end time.');
    return;
  }

  // classData 객체 생성
  const classData = {
    className: className,
    classRoom: classRoom,
    day: day,
    startTime: startTime,
    endTime: endTime
  };

  // JSON 파일에 데이터 저장
  window.api.saveToJSONFile(classData);

  // 모달 숨기기
  modal.style.visibility = 'hidden';

  // 새 이벤트 추가
  addEventToDay(classData);
});

function addEventToDay(classData) {
  const { className, classRoom, day, startTime, endTime } = classData;
  
  // 요일별 span을 찾아
  const daySpan = Array.from(document.querySelectorAll('.events-group span'))
    .find(span => span.textContent.toLowerCase() === day.toLowerCase());

  if (!daySpan) {
    console.error(`No span found for day: ${day}`);
    return;
  }

  // daySpan의 부모 요소인 .events-group에서 그 다음 형제 요소인 ul을 찾음
  const dayList = daySpan.parentNode.nextElementSibling;

  if (!dayList) {
    console.error(`No ul found for day: ${day}`);
    return;
  }

  const ulHeight = dayList.offsetHeight; // ul의 전체 높이 (단위: px)
  const dayStartTime = 6; // 시작 시간: 06:00
  const dayEndTime = 20; // 종료 시간: 20:00

  // 시간 단위 계산 (예: 06:00부터 20:00까지 = 14시간)
  const startInMinutes = parseTimeToMinutes(startTime); // 시작 시간 (분 단위로 변환)
  const endInMinutes = parseTimeToMinutes(endTime); // 종료 시간 (분 단위로 변환)

  // 시간의 비율을 계산하여 ul 내에서 비례하는 위치 및 높이를 계산
  const totalMinutesInDay = (dayEndTime - dayStartTime) * 60; // 06:00 ~ 20:00의 총 분 (840분)
  const eventStartInDay = startInMinutes - (dayStartTime * 60); // 06:00부터 시작 시간까지의 분
  const eventEndInDay = endInMinutes - (dayStartTime * 60); // 06:00부터 종료 시간까지의 분

  // 이벤트의 높이 계산
  const eventHeight = ((eventEndInDay - eventStartInDay) / totalMinutesInDay) * ulHeight;

  // 이벤트의 위치 계산 (startTime에 따라)
  const eventTop = (eventStartInDay / totalMinutesInDay) * ulHeight;

  // 새로운 이벤트 항목 생성
  const eventItem = document.createElement('li');
  eventItem.classList.add('single-event');
  eventItem.setAttribute('data-start', startTime);
  eventItem.setAttribute('data-end', endTime);
  eventItem.setAttribute('data-room', classRoom);
  eventItem.setAttribute('data-content', className);
  eventItem.setAttribute('data-event', `${className} - ${classRoom}`);

  // 이벤트 항목 내용 추가
  eventItem.innerHTML = `
    <div class="event-button-box">
      <button class="event-delete-button">✕</button>
    </div>
    <p class="event-name">${className}</p>
    <p class="event-info">${classRoom} ${startTime}~${endTime}</p>
  `;

  // 이벤트 스타일 설정
  eventItem.style.position = 'flex';
  eventItem.style.width = '100%';
  eventItem.style.top = `${eventTop}px`; // 위에서 계산한 위치
  eventItem.style.height = `${eventHeight}px`; // 비례적으로 계산된 높이

  document.querySelectorAll('.event-delete-button').forEach(button => {
    button.addEventListener('click', function() {
        // 버튼을 클릭한 부모 요소인 .single-event를 삭제
        const eventItem = this.closest('.single-event'); // 클릭한 버튼의 가장 가까운 .single-event를 찾음
        eventItem.remove(); // 해당 요소 제거
    });
  });

  // 해당 요일에 이벤트 추가
  dayList.appendChild(eventItem);
}

function parseTimeToMinutes(time) {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}
