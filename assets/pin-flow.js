// レンダリング済みのMarkdown(HTML)の中から、指定キーワードを含む見出しセクションを
// 探し出し、そのセクションだけをヘッダーのすぐ下に固定表示するための共通処理。
function pinFlowSection(containerEl, keyword, stickyTopPx) {
  const headings = Array.from(containerEl.querySelectorAll("h1,h2,h3,h4"));
  const flowHeading = headings.find(h => h.textContent.includes(keyword));
  if (!flowHeading) return;

  const level = parseInt(flowHeading.tagName[1], 10);
  const collected = [flowHeading];
  let node = flowHeading.nextElementSibling;
  while (node) {
    const m = node.tagName && node.tagName.match(/^H([1-6])$/);
    if (m && parseInt(m[1], 10) <= level) break;
    const next = node.nextElementSibling;
    collected.push(node);
    node = next;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "pinned-flow";
  wrapper.style.top = stickyTopPx + "px";
  collected.forEach(el => wrapper.appendChild(el));
  containerEl.insertBefore(wrapper, containerEl.firstChild);
}

function pinCookingFlowIn(containerEl) {
  const header = document.querySelector(".header");
  const topOffset = (header ? header.offsetHeight : 0) + 10;
  pinFlowSection(containerEl, "調理の流れ", topOffset);
}
