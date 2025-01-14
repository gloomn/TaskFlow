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

  document.querySelectorAll('.event-delete-button').forEach(button => {
    button.addEventListener('click', function() {
        // 버튼을 클릭한 부모 요소인 .single-event를 삭제
        const eventItem = this.closest('.single-event'); // 클릭한 버튼의 가장 가까운 .single-event를 찾음
        eventItem.remove(); // 해당 요소 제거
    });
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
    window.api.showWarningDialog('Warning [Add Class]', 'Start time cannot be late than end time.');
    return;
  }

  // classData 객체 생성
  const classData = {
    className: className,
    classRoom: classRoom,
    day: day,
    startTime: startTime,
    endTime: endTime,
  };

  console.log(classData);
  
  window.api.saveToJSONFile(classData)
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch(err => {
      console.error("Error saving data:", err);
    });
});