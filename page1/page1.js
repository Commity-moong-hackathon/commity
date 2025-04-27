const projectNameInput = document.querySelector(".project-name");
const gitRepoInput = document.querySelector(".git-repo");
const projectDescInput = document.querySelector(".project-desc");
const uploadImageInput = document.getElementById("upload-image");
const addButton = document.querySelector(".add-project-btn");
const projectList = document.getElementById("project-list");
const otherLanguageCheckbox = document.getElementById("other-language");
const otherLanguageInput = document.querySelector(".other-language-input");
const languageCheckboxes = document.querySelectorAll(".language-checkbox");

otherLanguageCheckbox.addEventListener("change", function () {
  if (this.checked) {
    otherLanguageInput.style.display = "block";
  } else {
    otherLanguageInput.style.display = "none";
  }
});

function checkInputs() {
  if (projectNameInput.value.trim() && gitRepoInput.value.trim()) {
    addButton.disabled = false;
    addButton.classList.remove("disabled");
  } else {
    addButton.disabled = true;
    addButton.classList.add("disabled");
  }
}

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

  let imageSrc = "../img/default_project.png";
  if (uploadImageInput.files.length > 0) {
    const file = uploadImageInput.files[0];
    imageSrc = URL.createObjectURL(file);
  }

  const newCard = createProjectCard(
    name,
    repo,
    desc,
    imageSrc,
    selectedLanguages
  );
  projectList.appendChild(newCard);

  alert("프로젝트가 추가되었습니다!");

  projectNameInput.value = "";
  gitRepoInput.value = "";
  projectDescInput.value = "";
  uploadImageInput.value = "";
  otherLanguageInput.value = "";
  otherLanguageInput.style.display = "none";
  languageCheckboxes.forEach((checkbox) => (checkbox.checked = false));

  checkInputs();
}

projectNameInput.addEventListener("input", checkInputs);
gitRepoInput.addEventListener("input", checkInputs);
addButton.addEventListener("click", handleAddProject);

checkInputs();
