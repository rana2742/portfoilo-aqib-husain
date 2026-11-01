/* Aqib Builder Lab — portfolio interactions. No dependencies, no build step. */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  /* ---------- Navigation ---------- */
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");

  const closeMenu = () => {
    mainNav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Hidden-secret tracker ---------- */
  const SECRET_LABELS = {
    note: "the personal note",
    hire: "sudo hire aqib",
    wipe: "the rm -rf failsafe",
    neon: "neon mode"
  };
  const SECRET_TOTAL = Object.keys(SECRET_LABELS).length;
  const found = new Set();
  const statusEl = $("#secretStatus");
  const terminalEl = $(".terminal");
  const output = $("#terminalOutput");
  const form = $("#terminalForm");
  const input = $("#terminalInput");

  function renderStatus() {
    if (statusEl) statusEl.textContent = `SECRETS ${found.size}/${SECRET_TOTAL}`;
  }

  function addLine(value, className = "") {
    if (!output) return;
    const line = document.createElement("p");
    if (className) line.className = className;
    line.textContent = value; // text only: never interpreted as HTML
    output.appendChild(line);
    while (output.childElementCount > 300) output.firstElementChild?.remove();
    output.scrollTop = output.scrollHeight;
  }

  function unlockSecret(id) {
    if (found.has(id)) return;
    found.add(id);
    renderStatus();
    addLine(`✓ Secret ${found.size}/${SECRET_TOTAL} found: ${SECRET_LABELS[id]}`, "terminal-ok");
    if (found.size === SECRET_TOTAL) {
      terminalEl?.classList.add("all-secrets");
      addLine(
        "★ ALL SECRETS FOUND ★\nYou explore like an engineer. Say hello — I would enjoy hearing from you.",
        "terminal-ok"
      );
    }
  }

  /* ---------- Theme switcher ---------- */
  const THEMES = ["paper", "dark", "neon", "pastel"];
  const THEME_COLORS = { paper: "#f4f1e9", dark: "#0e1117", neon: "#07060f", pastel: "#fdf6f0" };
  const themeToggle = $("#themeToggle");
  const themeName = $("#themeName");
  let currentTheme = "paper";

  function applyTheme(name, fromUser = false) {
    if (!THEMES.includes(name)) return false;
    currentTheme = name;
    document.documentElement.setAttribute("data-theme", name);
    if (themeName) themeName.textContent = name;
    $('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[name]);
    try { localStorage.setItem("aqib-theme", name); } catch (error) { /* storage unavailable */ }
    if (fromUser && name === "neon") unlockSecret("neon");
    return true;
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem("aqib-theme"); } catch (error) { /* ignore */ }
  applyTheme(THEMES.includes(savedTheme) ? savedTheme : "paper");

  themeToggle?.addEventListener("click", () => {
    applyTheme(THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length], true);
  });

  /* ---------- Terminal content ---------- */
  const PROMPT = "aqib@builder-lab ~ $";

  const TEXT = {
    help: `COMMANDS
  about           who I am
  skills          my technical workbench
  projects        selected builds and live demos
  achievements    community and learning milestones
  contact         where to find me
  aws             how this site is built and shipped on AWS
  deploy          watch this site ship through a CI/CD pipeline
  theme <name>    paper | dark | neon | pastel
  goto <section>  jump the page: about, stack, work, journey, contact
  ls / cat <file> browse files (tip: ls -a)
  whoami, date, history, clear
  secret          a small personal note

4 secrets are hidden in this terminal. Keys: Up/Down = history, Tab = autocomplete, Ctrl+L = clear.`,

    about: `WHOAMI
Aqib Hussain — Computer Engineering student at Bahauddin Zakariya University, based in Multan, Pakistan.
Currently focused on cloud infrastructure, Linux, containers, automation and DevOps.`,

    skills: `WORKBENCH
Cloud: AWS EC2, S3, CloudFront, IAM, Amplify
Systems: Linux, Ubuntu, Bash, networking
Containers: Docker, Kubernetes, Minikube
Delivery: Git, GitHub Actions, Jenkins
Infrastructure: Nginx, Terraform fundamentals`,

    projects: `SELECTED BUILDS
01  ERP System — erp.solutionnex.com
02  School Management System — sms.solutionnex.com
03  Business Management System — bms.solutionnex.com
04  Khan Mobile Shop — khanmobiles.store
05  AI Personal Finance Assistant — Python, AI
06  Wanderlust Deployment — Docker, Kubernetes, Minikube
Type "goto work" to jump to the project cards with live demos.`,

    achievements: `MILESTONES
• Technical Team Leader — AWS Student Builder Group, BZU
• Technical Instructor — Bitops Technologies Community
• Winning participant — AWS GameDay
• Computer Engineering — BZU
Keep learning. Keep building. Keep sharing.`,

    contact: `LET'S CONNECT
LinkedIn: linkedin.com/in/aqib-hussain-29474b292
GitHub:   github.com/rana2742
Tip: type "goto contact" to jump to the contact section.`,

    aws: `HOW THIS SITE RUNS ON AWS
Source      GitHub repository (static HTML, CSS, JavaScript)
Build/CI    AWS Amplify Hosting — every push to the main branch redeploys
Delivery    Amplify serves the site through Amazon CloudFront, a global CDN
Security    HTTPS by default + security headers (customHttp.yml)
Backend     None, by design: a static site needs no servers to patch.
Type "deploy" to watch the pipeline.`,

    whoami: `uid=1000(builder) gid=1000(cloud) groups=aws,linux,docker,kubernetes,community
shell=curiosity   status=always learning`,

    secret: `SECRET UNLOCKED ✓

“I am an engineer; I want peace in life.”

Build with curiosity. Work with purpose. Keep life peaceful.`,

    hire: `[sudo] password for recruiter: ********
Permission granted ✓
Aqib is open to connecting with builders, students and teams working on cloud, DevOps and practical engineering.
→ linkedin.com/in/aqib-hussain-29474b292`,

    wipe: `rm: it is dangerous to operate recursively on '/'
rm: use --no-preserve-root to override this failsafe
Nice try. A good DevOps engineer keeps everything in Git — this site is safe and redeployable in minutes.`
  };

  const FILES = {
    "about.txt": "about",
    "skills.txt": "skills",
    "projects.txt": "projects",
    "achievements.txt": "achievements",
    "contact.txt": "contact"
  };
  const EXTRA_FILES = {
    "motto.txt": "Learn. Build. Share.",
    ".hidden": "Some things are only found by looking where nobody looks.\nTry: sudo hire aqib   |   rm -rf /   |   theme neon"
  };

  const SECTIONS = {
    home: "home", about: "about", stack: "stack", skills: "stack",
    work: "work", projects: "work", journey: "journey", lab: "lab", contact: "contact"
  };

  const DEPLOY_STEPS = [
    ["$ git push origin main", "terminal-muted"],
    ["→ GitHub: push received, webhook sent to AWS Amplify", ""],
    ["→ Amplify: build container provisioned", ""],
    ["→ Build: static site, no compile step, 0 dependencies", ""],
    ["→ Deploy: artifacts published to the global CloudFront CDN", ""],
    ["→ HTTPS enabled, security headers applied", ""],
    ["✓ Deployed. This page you are reading shipped through exactly this pipeline.", "terminal-ok"]
  ];

  const COMMAND_NAMES = [
    "help", "about", "skills", "projects", "achievements", "contact", "aws", "deploy",
    "secret", "whoami", "date", "history", "clear", "ls", "ls -a", "theme",
    ...THEMES.map(t => `theme ${t}`),
    ...Object.keys(FILES).map(f => `cat ${f}`), "cat motto.txt", "cat .hidden",
    ...["about", "stack", "work", "journey", "contact"].map(s => `goto ${s}`)
  ];

  /* ---------- Terminal engine ---------- */
  const history = [];
  let historyIndex = 0;
  let busy = false;

  async function runDeploy() {
    busy = true;
    try {
      for (const [text, cls] of DEPLOY_STEPS) {
        addLine(text, cls || "terminal-result");
        if (!reduceMotion) await sleep(520);
      }
    } finally {
      busy = false;
    }
  }

  function goTo(target) {
    const id = SECTIONS[target];
    const el = id ? document.getElementById(id) : null;
    if (!el) {
      addLine(`goto: unknown section "${target}". Try: about, stack, work, journey, contact.`, "terminal-error");
      return;
    }
    addLine(`Jumping to ${id}…`, "terminal-result");
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  async function runCommand(raw) {
    const clean = raw.trim().replace(/\s+/g, " ");
    if (!clean) return;
    const cmd = clean.toLowerCase();

    history.push(clean);
    historyIndex = history.length;
    addLine(`${PROMPT} ${clean}`, "terminal-muted");

    if (busy) {
      addLine("Pipeline still running… one moment.", "terminal-muted");
      return;
    }

    if (cmd === "clear") {
      output?.replaceChildren();
      return;
    }
    if (cmd === "sudo hire aqib" || cmd === "sudo hire me") {
      addLine(TEXT.hire, "terminal-result");
      unlockSecret("hire");
      return;
    }
    if (cmd === "rm -rf /" || cmd === "sudo rm -rf /" || cmd === "rm -rf /*") {
      addLine(TEXT.wipe, "terminal-result");
      unlockSecret("wipe");
      return;
    }

    const [name, ...args] = cmd.split(" ");

    switch (name) {
      case "secret":
        addLine(TEXT.secret, "terminal-result");
        unlockSecret("note");
        return;
      case "deploy":
        await runDeploy();
        return;
      case "theme":
        if (!args[0]) {
          addLine(`Themes: ${THEMES.join(" | ")}  (current: ${currentTheme})\nUsage: theme <name>`, "terminal-result");
        } else if (THEMES.includes(args[0])) {
          addLine(`Theme set to ${args[0]} ✓`, "terminal-result");
          applyTheme(args[0], true);
        } else {
          addLine(`theme: unknown theme "${args[0]}". Try: ${THEMES.join(", ")}.`, "terminal-error");
        }
        return;
      case "goto":
        if (!args[0]) addLine("Usage: goto <about|stack|work|journey|contact>", "terminal-error");
        else goTo(args[0]);
        return;
      case "ls":
        if (args.includes("-a") || args.includes("-la") || args.includes("-al")) {
          addLine(".hidden  about.txt  achievements.txt  contact.txt  motto.txt  projects.txt  skills.txt", "terminal-result");
        } else {
          addLine("about.txt  achievements.txt  contact.txt  motto.txt  projects.txt  skills.txt\n(tip: some files hide — try ls -a)", "terminal-result");
        }
        return;
      case "cat": {
        const file = args[0];
        if (!file) addLine("Usage: cat <file>  (see ls)", "terminal-error");
        else if (FILES[file]) addLine(TEXT[FILES[file]], "terminal-result");
        else if (EXTRA_FILES[file]) addLine(EXTRA_FILES[file], "terminal-result");
        else addLine(`cat: ${file}: No such file or directory`, "terminal-error");
        return;
      }
      case "date":
        addLine(new Date().toString(), "terminal-result");
        return;
      case "history":
        addLine(history.map((h, i) => `${String(i + 1).padStart(3, " ")}  ${h}`).join("\n"), "terminal-result");
        return;
      default:
        break;
    }

    if (Object.prototype.hasOwnProperty.call(TEXT, cmd) && !["hire", "wipe", "secret"].includes(cmd)) {
      addLine(TEXT[cmd], "terminal-result");
      return;
    }

    addLine(`Command not found: ${cmd}. Type "help" to see available commands.`, "terminal-error");
  }

  /* ---------- Input handling ---------- */
  function commonPrefix(items) {
    return items.reduce((prefix, item) => {
      let i = 0;
      while (i < prefix.length && i < item.length && prefix[i] === item[i]) i++;
      return prefix.slice(0, i);
    });
  }

  function autocomplete() {
    if (!input) return;
    const value = input.value.trimStart().toLowerCase();
    if (!value) return;
    const matches = COMMAND_NAMES.filter(name => name.startsWith(value));
    if (matches.length === 1) {
      input.value = matches[0];
    } else if (matches.length > 1) {
      input.value = commonPrefix(matches);
      addLine(matches.join("   "), "terminal-muted");
    }
  }

  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!input) return;
    const value = input.value;
    input.value = "";
    runCommand(value);
    input.focus({ preventScroll: true });
  });

  input?.addEventListener("keydown", event => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndex > 0) historyIndex--;
      input.value = history[historyIndex] ?? "";
      requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex < history.length) historyIndex++;
      input.value = history[historyIndex] ?? "";
    } else if (event.key === "Tab") {
      event.preventDefault();
      autocomplete();
    } else if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      output?.replaceChildren();
    }
  });

  document.querySelectorAll("[data-command]").forEach(button => {
    button.addEventListener("click", () => {
      runCommand(button.dataset.command || "");
      input?.focus({ preventScroll: true });
    });
  });

  renderStatus();
})();
