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