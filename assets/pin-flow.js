// レンダリング済みのMarkdown(HTML)の中から、指定キーワードを含む見出しセクションを
// 探し出し、そのセクションだけをヘッダーのすぐ下に「折りたたみ式」で固定表示するための共通処理。
// 普段は見出し1行だけを表示し、タップで展開する（内容が長くても本文を隠さないようにするため）。
function pinFlowSection(containerEl, keyword, stickyTopPx) {
  const headings = Array.from(containerEl.querySelectorAll("h1,h2,h3,h4"));
  const flowHeading = headings.find(h => h.textContent.includes(keyword));
  if (!flowHeading) return;

  const level = parseInt(flowHeading.tagName[1], 10);
  const collected = [];
  let node = flowHeading.nextElementSibling;
  while (node) {
    const m = node.tagName && node.tagName.match(/^H([1-6])$/);
    if (m && parseInt(m[1], 10) <= level) break;
    const next = node.nextElementSibling;
    collected.push(node);
    node = next;
  }

  const details = document.createElement("details");
  details.className = "pinned-flow";
  details.style.top = stickyTopPx + "px";

  const summary = document.createElement("summary");
  summary.textContent = flowHeading.textContent;
  details.appendChild(summary);

  const bodyWrap = document.createElement("div");
  bodyWrap.className = "pinned-flow-body";
  collected.forEach(el => bodyWrap.appendChild(el));
  details.appendChild(bodyWrap);

  flowHeading.remove();
  containerEl.insertBefore(details, containerEl.firstChild);
}

function pinCookingFlowIn(containerEl) {
  const header = document.querySelector(".header");
  const topOffset = (header ? header.offsetHeight : 0) + 10;
  pinFlowSection(containerEl, "調理の流れ", topOffset);
}
