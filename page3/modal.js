// modal.js

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalTag = document.getElementById("modal-tag");
const modalProgress = document.getElementById("modal-progress");
const modalDeadline = document.getElementById("modal-deadline");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.querySelector(".modal-close");

// 각 task의 화살표(>) 클릭 시 모달 열기
document.querySelectorAll(".task .arrow").forEach(arrow => {
  arrow.addEventListener("click", (e) => {
    const task = e.target.closest(".task"); // 가장 가까운 task 가져오기

    // 제목: task 안의 .task-title 텍스트 가져오기
    const taskTitle = task.querySelector(".task-title").textContent;

    // 데이터 세팅
    modalTitle.textContent = taskTitle;
    modalTag.textContent = task.dataset.tag || "-";
    modalProgress.textContent = task.dataset.progress || "-";
    modalDeadline.textContent = task.dataset.deadline || "-";
    modalDescription.textContent = task.dataset.description || "-";

    // 모달 보이기
    modal.style.display = "flex";
  });
});

// 모달 닫기 버튼 누르면 닫기
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// 모달 바깥 누르면 닫기
document.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});