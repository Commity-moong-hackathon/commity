const projectNameInput = document.querySelector(".project-name");
const gitRepoInput = document.querySelector(".git-repo");
const projectDescInput = document.querySelector(".project-desc");
const addButton = document.querySelector(".add-project-btn");
const projectList = document.getElementById("project-list");

function checkInputs() {
  if (projectNameInput.value.trim() && gitRepoInput.value.trim()) {
    addButton.disabled = false;
    addButton.classList.remove("disabled");
  } else {
    addButton.disabled = true;
    addButton.classList.add("disabled");
  }
}

function createProjectCard(name, repoUrl, desc) {
  const card = document.createElement("a");
  card.className = "project-card";
  card.href = repoUrl;
  card.target = "_blank";
  card.innerHTML = `
    <div class="project-logo">
      <img src="../img/default_project.png" alt="${name}" />
    </div>
    <div class="project-info">
      <div class="project-header">
        <h3>${name}</h3>
        <span class="public-badge">Public</span>
      </div>
      <p class="forked-from">등록된 프로젝트</p>
      <div class="tech-stack">
        <span class="tech javascript">JavaScript</span>
      </div>
    </div>
  `;
  return card;
}

function handleAddProject() {
  const name = projectNameInput.value.trim();
  const repo = gitRepoInput.value.trim();
  const desc = projectDescInput.value.trim();

  if (!name || !repo) {
    alert("필수 항목을 입력해주세요!");
    return;
  }

  const newCard = createProjectCard(name, repo, desc);
  projectList.appendChild(newCard);

  alert("프로젝트가 추가되었습니다!");
  projectNameInput.value = "";
  gitRepoInput.value = "";
  projectDescInput.value = "";
  checkInputs();
}

// 이벤트 리스너
projectNameInput.addEventListener("input", checkInputs);
gitRepoInput.addEventListener("input", checkInputs);
addButton.addEventListener("click", handleAddProject);

// 최초 실행
checkInputs();
