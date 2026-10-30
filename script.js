const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const output = document.getElementById("terminalOutput");
const form = document.getElementById("terminalForm");
const input = document.getElementById("terminalInput");

const commands = {
  help: "COMMANDS AVAILABLE\\n  about         A short introduction\\n  skills        Explore my technical workbench\\n  projects      See selected builds\\n  achievements  Community and learning milestones\\n  contact       Open my professional profiles\\n  secret        Reveal a small personal note\\n  clear         Clear this session",
  about: "WHOAMI\\nAqib Hussain — Computer Engineering student at Bahauddin Zakariya University, based in Multan, Pakistan.\\nCurrently focused on cloud infrastructure, Linux, containers, automation and DevOps.",
  skills: "WORKBENCH\\nCloud: AWS EC2, S3, CloudFront, IAM, Amplify\\nSystems: Linux, Ubuntu, Bash, networking\\nContainers: Docker, Kubernetes, Minikube\\nDelivery: Git, GitHub Actions, Jenkins\\nInfrastructure: Nginx, Terraform fundamentals",
  projects: "SELECTED BUILDS\\n01  X-ray Fracture Analysis — Python, TensorFlow, Grad-CAM\\n02  Wanderlust Deployment — Docker, Kubernetes, Minikube\\n03  Real-Time Chat App — containers and networking\\n04  Engineering Experiments — C, DSA, embedded concepts\\nScroll to Selected Builds for descriptions and repository links.",
  achievements: "MILESTONES\\n• Technical Team Leader — AWS Student Builder Group, BZU\\n• Technical Instructor — Bitops Technologies Community\\n• Winning participant — AWS GameDay\\n• Computer Engineering — BZU\\nKeep learning. Keep building. Keep sharing.",
  contact: "LET'S CONNECT\\nLinkedIn: linkedin.com/in/aqib-hussain-29474b292\\nGitHub: github.com/rana2742\\nUse the contact links at the bottom of this page.",
  secret: "SECRET UNLOCKED ✓\\n\\n“I am an engineer; I want peace in life.”\\n\\nBuild with curiosity. Work with purpose. Keep life peaceful.",
  clear: "__CLEAR__"
};

function addLine(value, className = "") {
  const line = document.createElement("p");
  line.className = className;
  line.textContent = value;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}
function runCommand(raw) {
  const command = raw.trim().toLowerCase();
  if (!command) return;
  addLine(`aqib@builder-lab ~ $ ${raw}`, "terminal-muted");
  if (command === "clear") {
    output.replaceChildren();
    return;
  }
  if (Object.prototype.hasOwnProperty.call(commands, command)) {
    addLine(commands[command], "terminal-result");
  } else {
    addLine(`Command not found: ${command}. Type "help" to see available commands.`, "terminal-error");
  }
}
form?.addEventListener("submit", event => {
  event.preventDefault();
  runCommand(input.value);
  input.value = "";
  input.focus();
});
document.querySelectorAll("[data-command]").forEach(button => {
  button.addEventListener("click", () => {
    runCommand(button.dataset.command);
    input?.focus();
  });
});
// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );

  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "LIGHT MODE" : "DARK MODE";

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  themeToggle.setAttribute("aria-pressed", String(isDark));
}

// Restore the saved preference, or use light mode by default.
const savedTheme = localStorage.getItem("aqib-portfolio-theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";

  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  localStorage.setItem("aqib-portfolio-theme", nextTheme);
});