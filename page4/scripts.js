document.addEventListener("DOMContentLoaded", () => {
    const sectionButtons = document.querySelectorAll(".section-item");
    const editor = document.getElementById("editor-area");
    const preview = document.querySelector(".preview-box");
  
    const templates = {
        "프로젝트 제목": `# 프로젝트 제목\n## 여기에 프로젝트 이름을 입력하세요.\n\n---`,
        "프로젝트 특징": `## ✨ 프로젝트 특징\n- 핵심 기능 1\n- 핵심 기능 2\n\n---`,
        "이미지": `## 🖼️ 이미지\n![이미지 설명](https://example.com/image.png)\n\n---`,
        "설치 방법": `## 🛠️ 설치 방법\n\`\`\`bash\nnpm install\nnpm start\n\`\`\`\n\n---`,
        "기술 스택": `## ⚙️ 기술 스택\n- React\n- Node.js\n- MySQL\n\n---`,
        "테스트 실행": `## ✅ 테스트 실행\n\`\`\`bash\nnpm test\n\`\`\`\n\n---`,
        "테이블": `## 📋 테이블 예시\n| 기능 | 설명 |\n|------|------|\n| 로그인 | 유저 인증 처리 |\n\n---`,
        "링크": `## 🔗 관련 링크\n[프로젝트 주소](https://github.com/your-repo)\n\n---`,
        "뱃지": `## 🏅 뱃지\n![badge](https://img.shields.io/badge/status-active-brightgreen)\n\n---`,
        "코드 작성": `## 💻 코드 예시\n\`\`\`js\nconsole.log("Hello, world!");\n\`\`\`\n\n---`,
        "줄 띄움": `<br>`            
    };
  
    sectionButtons.forEach(button => {
      button.addEventListener("click", () => {
        const title = button.textContent.trim();
        const content = templates[title] || `# ${title}\n내용을 입력하세요.\n\n\n---`;
        editor.value += `\n\n${content}`;
        renderPreview();
      });
    });
  
    editor.addEventListener("input", renderPreview);
  
    function renderPreview() {
      preview.innerHTML = marked.parse(editor.value);
    }
  
    renderPreview(); // 초기 렌더링
  });