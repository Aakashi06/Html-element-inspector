// === Dictionary of HTML element definitions ===
const elementDefinitions = {
  div: "A container element used to group block elements.",
  span: "An inline container used to mark up part of a text.",
  a: "Defines a hyperlink.",
  p: "Defines a paragraph.",
  img: "Embeds an image into the document.",
  input: "Defines an input control.",
  button: "Defines a clickable button.",
  form: "Defines an HTML form for user input.",
  h1: "Defines a top-level heading.",
  ul: "Defines an unordered list.",
  li: "Defines a list item.",
  table: "Defines a table.",
  tr: "Defines a row in a table.",
  td: "Defines a cell in a table row.",
  section: "Defines a section in a document.",
  article: "Defines independent content.",
  header: "Defines a header for a document or section.",
  footer: "Defines a footer for a document or section.",
  nav: "Defines navigation links.",
  label: "Defines a label for an input element.",
  textarea: "Defines a multiline text input control."
};

let hoverBox, lastElement;

// === Create and style hover box ===
function createHoverBox() {
  hoverBox = document.createElement("div");
  hoverBox.style.position = "fixed";
  hoverBox.style.zIndex = "99999";
  hoverBox.style.background = "rgba(30, 30, 30, 0.95)";
  hoverBox.style.color = "#fff";
  hoverBox.style.padding = "14px";
  hoverBox.style.borderRadius = "14px";
  hoverBox.style.fontFamily = "Segoe UI, sans-serif";
  hoverBox.style.fontSize = "14px";
  hoverBox.style.maxWidth = "320px";
  hoverBox.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
  hoverBox.style.transition = "opacity 0.2s ease-in-out";
  hoverBox.style.pointerEvents = "auto";
  hoverBox.style.display = "none";
  hoverBox.style.cursor = "default";
  hoverBox.style.backdropFilter = "blur(12px)";
  document.body.appendChild(hoverBox);
}

// === Update and position hover box ===
function updateHoverBox(el, x, y) {
  const tagName = el.tagName.toLowerCase();
  const definition = elementDefinitions[tagName] || "No definition available.";
  const prompt = `Explain the purpose and usage of the <${tagName}> HTML tag with examples. Also, highlight common mistakes or best practices if applicable.`;

  hoverBox.innerHTML = `
    <strong style="color: #66ffcc; font-size: 16px;">&lt;${tagName}&gt;</strong><br/>
    <small style="color: #ccc;">${definition}</small><br/>
    <button id="askBtn" style="
      margin-top: 10px;
      padding: 7px 12px;
      border: none;
      border-radius: 8px;
      background: #66ffcc;
      color: #000;
      cursor: pointer;
      font-weight: bold;
    ">Ask ChatGPT</button>
    <button id="closeExtension" style="
      margin-top: 10px;
      margin-left: 10px;
      padding: 7px 12px;
      border: none;
      border-radius: 8px;
      background: #ff4d4f;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
    ">Exit Extension</button>
  `;

  hoverBox.style.left = x + 15 + "px";
  hoverBox.style.top = y + 15 + "px";
  hoverBox.style.display = "block";

  document.getElementById("askBtn").onclick = () => {
    window.open(`https://chat.openai.com/?q=${encodeURIComponent(prompt)}`, "_blank");
  };

  document.getElementById("closeExtension").onclick = () => {
    document.removeEventListener("mousemove", onHover);
    hoverBox.style.display = "none";
  };
}

// === Hover event handler ===
function onHover(e) {
  const el = document.elementFromPoint(e.clientX, e.clientY);

  if (!el || el === lastElement || el === hoverBox || hoverBox.contains(el)) return;

  lastElement = el;
  updateHoverBox(el, e.pageX, e.pageY);
}

// === Init extension ===
createHoverBox();
document.addEventListener("mousemove", onHover);
