const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalWorker = document.getElementById("modal-worker");
const modalTag = document.getElementById("modal-tag");
const modalProgress = document.getElementById("modal-progress");
const modalDeadline = document.getElementById("modal-deadline");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.querySelector(".modal-close");

// 각 task 클릭 시 모달 열기
document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("click", () => {
    const taskTitle = task.querySelector(".task-title").textContent;
    modalTitle.textContent = taskTitle;

    // 👉 이 부분이 핵심: worker 출력 처리
    const workerData = task.dataset.worker || "-";

    if (workerData.includes(",")) {
      const workers = workerData.split(",").map(w => w.trim());
      modalWorker.innerHTML = workers.map(name =>
        `<span class="tag-pill3">${name}</span>`
      ).join(" ");
    } else {
      modalWorker.innerHTML = `<span class="tag-pill3">${workerData}</span>`;
    }

    // 나머지 필드
    modalTag.textContent = task.dataset.tag || "-";
    modalProgress.textContent = task.dataset.progress || "-";
    modalDeadline.textContent = task.dataset.deadline || "-";
    modalDescription.textContent = task.dataset.description || "-";

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