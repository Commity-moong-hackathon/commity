const branchDropdown = document.getElementById("branch-dropdown");
const graphBox = document.querySelector(".graph-box");
const graphImage = document.getElementById("graph-img");
const commitList = document.querySelector(".commit-list");

const branchCommits = {
  main: {
    showGraph: true,
    image: "../img/new_branch.png",
    diffImage: "../img/diff_file_1.png",
    diffFeature: {
      color: "blue",
      text: "feat: add user authentication feature",
    },
    commits: [
      { color: "blue", text: "feat: add user authentication feature" },
      { color: "green", text: "fix: resolve crash issue on login screen" },
      { color: "red", text: "docs: update README with new setup instructions" },
      { color: "blue", text: "feat: reformat codebase using Prettier" },
      { color: "yellow", text: "refactor: simplify API request handling" },
      {
        color: "blue",
        text: "feat: add unit tests for authentication service",
      },
      { color: "red", text: "docs: remove unused dependencies" },
      { color: "blue", text: "feat: implement dark mode toggle" },
      { color: "blue", text: "feat: correct typo in error message" },
      { color: "green", text: "fix: add API documentation for user endpoints" },
      { color: "blue", text: "style: fix indentation issues in CSS" },
      { color: "purple", text: "chore: optimize image loading performance" },
      {
        color: "blue",
        text: "test: improve test coverage for user profile component",
      },
      {
        color: "green",
        text: "fix: update CI configuration for faster builds",
      },
      { color: "purple", text: "chore: add search functionality to navbar" },
      {
        color: "yellow",
        text: "refactor: address memory leak in data processing module",
      },
      {
        color: "blue",
        text: "feat: create contribution guide for new developers",
      },
      {
        color: "yellow",
        text: "refactor: update button styles to match design system",
      },
    ],
  },
  develop: {
    showGraph: true,
    image: "../img/new_branch_2.png",
    diffImage: "../img/diff_file_2.png",
    diffFeature: {
      color: "blue",
      text: "feat: add dashboard analytics",
    },
    commits: [
      { color: "blue", text: "feat: add dashboard analytics" },
      { color: "blue", text: "feat: integrate real-time notifications" },
      { color: "yellow", text: "refactor: modularize Redux store" },
      { color: "yellow", text: "refactor: split auth service functions" },
      { color: "green", text: "fix: incorrect user role assignment" },
      { color: "green", text: "fix: crash on profile update page" },
      { color: "blue", text: "feat: apply OAuth2 for social login" },
      { color: "yellow", text: "refactor: optimize database query" },
    ],
  },
  "feature/OAuth": {
    showGraph: true,
    image: "../img/new_branch_3.png",
    diffImage: "../img/diff_file_3.png",
    diffFeature: {
      color: "blue",
      text: "feat: implement OAuth login with Google",
    },
    commits: [
      { color: "blue", text: "feat: implement OAuth login with Google" },
      { color: "blue", text: "feat: add remember-me functionality" },
      { color: "green", text: "fix: broken redirect after OAuth login" },
      { color: "green", text: "fix: prevent OAuth login with empty fields" },
      { color: "blue", text: "feat: auto-logout after inactivity" },
      { color: "yellow", text: "refactor: organize login error handling" },
    ],
  },
  "hotfix/error": {
    showGraph: true,
    image: "../img/new_branch_4.png",
    diffImage: "../img/diff_file_4.png",
    diffFeature: {
      color: "blue",
      text: "feat: crash on logout",
    },
    commits: [
      { color: "blue", text: "feat: crash on logout" },
      { color: "green", text: "fix: update hotfix deployment guide" },
      { color: "red", text: "error: incorrect 404 page redirection" },
      { color: "purple", text: "refactor: null pointer issue on user fetch" },
      { color: "purple", text: "refactor: tighten input validation" },
    ],
  },
};

function renderCommitList(branchKey) {
  const branch = branchCommits[branchKey];
  if (!branch) return;

  // 왼쪽 브랜치 이미지 변경
  if (branch.image) {
    graphImage.src = branch.image + `?t=${Date.now()}`; // 캐시 방지
  }
  graphImage.style.display = branch.showGraph ? "block" : "none";

  // ✅ 우측 diff 이미지도 변경
  const diffImage = document.getElementById("diff-img");
  if (branch.diffImage && diffImage) {
    diffImage.src = branch.diffImage + `?t=${Date.now()}`; // 캐시 방지
  }

  // ✅ 우측 diff-feature 변경 (dot 색상 + 텍스트)
  const diffFeatureDot = document.getElementById("diff-feature-dot");
  const diffFeatureText = document.getElementById("diff-feature-text");

  if (branch.diffFeature && diffFeatureDot && diffFeatureText) {
    // 기존 색상 class 제거 (dot class 유지)
    diffFeatureDot.className = "dot " + branch.diffFeature.color;
    diffFeatureText.textContent = branch.diffFeature.text;
  }

  // 커밋 리스트 갱신
  commitList.innerHTML = branch.commits
    .map(
      ({ color, text }) => `<li><span class="dot ${color}"></span> ${text}</li>`
    )
    .join("");
}

// 이벤트 리스너 등록
branchDropdown.addEventListener("change", (e) => {
  renderCommitList(e.target.value);
});

// 초기 렌더링
renderCommitList(branchDropdown.value);
