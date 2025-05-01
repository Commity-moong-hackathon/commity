const projectNameInput = document.querySelector(".project-name");
const gitRepoInput = document.querySelector(".git-repo");
const projectDescInput = document.querySelector(".project-desc");
const uploadImageInput = document.getElementById("upload-image");
const addButton = document.querySelector(".add-project-btn");
const projectList = document.getElementById("project-list");
const otherLanguageCheckbox = document.getElementById("other-language");
const otherLanguageInput = document.querySelector(".other-language-input");
const languageCheckboxes = document.querySelectorAll(".language-checkbox");

// 기타 언어 입력 필드 보이기/숨기기
otherLanguageCheckbox.addEventListener("change", function () {
  if (this.checked) {
    otherLanguageInput.style.display = "block";
  } else {
    otherLanguageInput.style.display = "none";
  }
});

// 입력값 체크하여 버튼 활성화
function checkInputs() {
  if (projectNameInput.value.trim() && gitRepoInput.value.trim()) {
    addButton.disabled = false;
    addButton.classList.remove("disabled");
  } else {
    addButton.disabled = true;
    addButton.classList.add("disabled");
  }
}

// 프로젝트 카드 생성 함수
function createProjectCard(name, repoUrl, desc, imageSrc, languages) {
  const card = document.createElement("a");
  card.className = "project-card";
  card.href = repoUrl;
  card.target = "_blank";

  const languageHTML = languages
    .map((lang) => {
      const className = lang.toLowerCase().replace(/\s/g, "");
      return `<span class="tech ${className}">${lang}</span>`;
    })
    .join(" ");

  card.innerHTML = `
    <div class="project-logo">
      <img src="${imageSrc}" alt="${name}" />
    </div>
    <div class="project-info">
      <div class="project-header">
        <h3>${name}</h3>
        <span class="public-badge">Public</span>
      </div>
      <p class="forked-from">Forked from ${repoUrl}</p>
      <div class="tech-stack">
        ${languageHTML}
      </div>
    </div>
  `;
  return card;
}

// 이미지 파일을 base64로 변환하는 함수
function convertImageToBase64(file, callback) {
  const reader = new FileReader();
  reader.onloadend = function () {
    callback(reader.result); // base64 URL 반환
  };
  reader.readAsDataURL(file);
}

// 프로젝트 추가 함수
function handleAddProject() {
  const name = projectNameInput.value.trim();
  const repo = gitRepoInput.value.trim();
  const desc = projectDescInput.value.trim();

  if (!name || !repo) {
    alert("필수 항목을 입력해주세요!");
    return;
  }

  const selectedLanguages = Array.from(languageCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => {
      return checkbox.id === "other-language" && otherLanguageInput.value.trim()
        ? otherLanguageInput.value.trim()
        : checkbox.value;
    });

  // 기본 이미지 URL
  let imageSrc = "../img/default_project.png";

  // 이미지가 있을 경우 base64로 변환하여 저장
  if (uploadImageInput.files.length > 0) {
    const file = uploadImageInput.files[0];
    convertImageToBase64(file, (base64Image) => {
      imageSrc = base64Image;

      const newProject = {
        name,
        repo,
        desc,
        imageSrc,
        languages: selectedLanguages,
      };

      // 기존 프로젝트 목록 가져오기
      const projects = getProjectsFromStorage();
      // 새로운 프로젝트 추가
      projects.push(newProject);
      // 프로젝트 목록을 로컬 스토리지에 저장
      localStorage.setItem("projects", JSON.stringify(projects));

      // 새 프로젝트 카드 생성 및 추가
      const newCard = createProjectCard(
        name,
        repo,
        desc,
        imageSrc,
        selectedLanguages
      );
      projectList.appendChild(newCard);

      alert("프로젝트가 추가되었습니다!");

      // 입력값 초기화
      projectNameInput.value = "";
      gitRepoInput.value = "";
      projectDescInput.value = "";
      uploadImageInput.value = "";
      otherLanguageInput.value = "";
      otherLanguageInput.style.display = "none";
      languageCheckboxes.forEach((checkbox) => (checkbox.checked = false));

      checkInputs();
    });
  } else {
    const newProject = {
      name,
      repo,
      desc,
      imageSrc,
      languages: selectedLanguages,
    };

    // 기존 프로젝트 목록 가져오기
    const projects = getProjectsFromStorage();
    // 새로운 프로젝트 추가
    projects.push(newProject);
    // 프로젝트 목록을 로컬 스토리지에 저장
    localStorage.setItem("projects", JSON.stringify(projects));

    // 새 프로젝트 카드 생성 및 추가
    const newCard = createProjectCard(
      name,
      repo,
      desc,
      imageSrc,
      selectedLanguages
    );
    projectList.appendChild(newCard);

    alert("프로젝트가 추가되었습니다!");

    // 입력값 초기화
    projectNameInput.value = "";
    gitRepoInput.value = "";
    projectDescInput.value = "";
    uploadImageInput.value = "";
    otherLanguageInput.value = "";
    otherLanguageInput.style.display = "none";
    languageCheckboxes.forEach((checkbox) => (checkbox.checked = false));

    checkInputs();
  }
}

// 로컬 스토리지에서 프로젝트 목록 가져오기
function getProjectsFromStorage() {
  const storedProjects = localStorage.getItem("projects");
  return storedProjects ? JSON.parse(storedProjects) : [];
}

// 페이지 로드 시 저장된 프로젝트 불러오기
document.addEventListener("DOMContentLoaded", () => {
  const projects = getProjectsFromStorage();
  projects.forEach((project) => {
    const newCard = createProjectCard(
      project.name,
      project.repo,
      project.desc,
      project.imageSrc,
      project.languages
    );
    projectList.appendChild(newCard);
  });
});

projectNameInput.addEventListener("input", checkInputs);
gitRepoInput.addEventListener("input", checkInputs);
addButton.addEventListener("click", handleAddProject);

checkInputs();
