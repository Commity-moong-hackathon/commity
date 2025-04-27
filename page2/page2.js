const branchDropdown = document.getElementById("branch-dropdown");
const graphBox = document.querySelector(".graph-box");
const graphImage = document.querySelector(".graph-img");
const commitList = document.querySelector(".commit-list");

const branchCommits = {
  main: {
    showGraph: true,
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
    showGraph: false,
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
  "feature/login": {
    showGraph: false,
    commits: [
      { color: "blue", text: "feat: implement login with Google" },
      { color: "blue", text: "feat: add remember-me functionality" },
      { color: "green", text: "fix: broken redirect after login" },
      { color: "green", text: "fix: prevent login with empty fields" },
      { color: "blue", text: "feat: auto-logout after inactivity" },
      { color: "yellow", text: "refactor: organize login error handling" },
    ],
  },
  "hotfix/error": {
    showGraph: false,
    commits: [
      { color: "green", text: "fix: crash on logout" },
      { color: "red", text: "docs: update hotfix deployment guide" },
      { color: "green", text: "fix: incorrect 404 page redirection" },
      { color: "green", text: "fix: null pointer issue on user fetch" },
      { color: "yellow", text: "refactor: tighten input validation" },
    ],
  },
};

// 드롭다운 변경시 이벤트
branchDropdown.addEventListener("change", (e) => {
  const selectedBranch = e.target.value;
  const branchData = branchCommits[selectedBranch];

  if (branchData.showGraph) {
    graphImage.style.display = "block";
  } else {
    graphImage.style.display = "none";
  }

  commitList.innerHTML = branchData.commits
    .map(
      (commit) =>
        `<li><span class="dot ${commit.color}"></span> ${commit.text}</li>`
    )
    .join("");
});
