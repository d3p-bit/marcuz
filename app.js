/**
 * ============================================================================
 * REGALO DI LAUREA - Finto Terminale Linux & Lettera Finale
 * Applicazione Web Single-Page (Vanilla HTML, CSS, JavaScript)
 * ============================================================================
 * 
 * ISTRUZIONI PER LA PERSONALIZZAZIONE:
 * Puoi modificare facilmente le costanti qui sotto per adattare il regalo:
 * - PASSWORD: la parola chiave per sbloccare la lettera finale (es. il cognome del professore)
 * - NOME_FESTEGGIATO: il nome del neo-dottore
 * - CORSO_LAUREA: il corso di laurea (es. Informatica)
 * - VOTO_LAUREA: il voto conseguito (es. 110 e Lode)
 * - TESTI DEI FILE: i contenuti di LEGGIMI.txt, indizio.txt e ricordi.log
 * ============================================================================
 */

// ============================================================================
// 1. COSTANTI DI CONFIGURAZIONE (Personalizzabili)
// ============================================================================
const CONFIG = {
  // Configurazione video verticale per la dedica (es. file in 'immagini/video_dedica.mp4'):
  VIDEO: {
    dedica: "immagini/video_dedica.mp4"
  },

  // Dati del festeggiato:
  NOME_FESTEGGIATO: "Dottore",
  CORSO_LAUREA: "Informatica",
  VOTO_LAUREA: "110 e Lode",
  ANNO_ACCADEMICO: "2023/2024",

  // Prompt del terminale Linux:
  USERNAME: "ospite",
  HOSTNAME: "server-laurea",

  // Chiavi di persistenza LocalStorage:
  STORAGE_KEY: "isUnlocked",

  // Percorsi delle immagini (puoi inserire i tuoi file in una cartella 'immagini/'):
  IMMAGINI: {
    foto1: "/immagini/foto_1.jpg",
    foto2: "/immagini/foto_2.jpg",
    meglioIlNero: "/immagini/MEGLIO_IL_NERO.png",
    laurea: "/immagini/laurea.jpg"
  }
};

// ============================================================================
// 2. STRUTTURA DEL VIRTUAL FILE SYSTEM (VFS)
// ============================================================================
const VFS = {
  "/": {
    type: "dir",
    children: {
      "LEGGIMI.txt": {
        type: "file",
        readable: true,
        content: "Accesso limitato. Per sbloccare la lettera esegui il file di sblocco con la password corretta. Trova l'inidizio tra i ricordi. Le foto possono essere utili. Qui però Gemini non può aiutarti..."
      },
      "guida_comandi.txt": {
        type: "file",
        readable: true,
        content:
`================================================================================
minchia 8 anni di informatica e non sai usare un terminale. malissimo....
================================================================================

ECCO IL MANUALE DI EMERGENZA DEI COMANDI PER CHI HA DIMENTICATO TUTTO:

1. ls (oppure ls -la)
   -> Serve per ELENCARE file e cartelle nella directory in cui ti trovi.
   -> Esempio: scrivi 'ls' e premi Invio.

2. cd [cartella] (oppure digita 'indietro' / premi [ indietro ⬅ ])
   -> Serve per CAMBIARE CARTELLA (Change Directory).
   -> Per entrare nei ricordi: cd memories
   -> Per tornare indietro alla cartella principale: cd .. oppure 'indietro' oppure 'cd /'

3. cat [nome_file.txt]
   -> Serve per LEGGERE E STAMPARE il testo di un file direttamente qui a schermo.
   -> Esempi:
      cat LEGGIMI.txt
      cat memories/indizio.txt
      cat memories/ricordi.log

4. view [nome_file.jpg] (oppure open)
   -> Serve per APRIRE E VISUALIZZARE un'immagine nel visualizzatore grafico a schermo intero.
   -> Esempi:
      cd memories
      view foto_1.jpg
      view foto_2.jpg
      view MEGLIO_IL_NERO.png

5. ./sblocca_dedica.sh [password]
   -> È lo SCRIPT ESEGUIBILE FINALE.
   -> Sblocca la vera lettera di laurea!
   -> Esempio: ./sblocca_dedica.sh

6. clear
   -> Pulisce tutto lo schermo del terminale se si riempie di roba.

7. pwd
   -> Mostra il percorso esatto della cartella in cui ti trovi adesso (Print Working Directory).

Ora che hai letto il manuale, vedi di non farci fare altre figuracce da ingegnere. Dai sblocca sta dedica!`
      },
      "sblocca_dedica.sh": {
        type: "executable",
        readable: false, // non leggibile con cat
        content: null
      },
      "memories": {
        type: "dir",
        children: {
          "indizio.txt": {
            type: "file",
            readable: true,
            isLockedByQuiz: true,
            content: "complimenti per aver completato il test. sfortunatamente non siamo bravi programmatori, quindi non ci sono indizi e non ci sono blocchi, è tutto aperto!"
          },
          "ricordi.log": {
            type: "file",
            readable: true,
            content: 
`================ REGISTRO EVENTI & RICORDI UNIVERSITARI ================
[2023-11-14 15:42:09] [TASK_MANAGEMENT] giochi di carte imparati invece che studiare sbloccati. achivment (non so come si scrive in inglese) sbloccato [STATUS: 200 OK]
[2024-04-19 11:18:33] [DATABASE_SHARDING] macchinette del caffè svuotate durante la sessione estiva [STATUS: 200 OK]
[2025-02-08 07:59:58] [CRON_JOB_LATENCY] treni presi all'ultimo minuto perché sia mai arrivare li 5 minuti in anticipo [WARNING: HIGH_BUFFER_UNDERRUN]
[2026-09-25 10:30:00] [SYSTEM_DEPLOYMENT] 25 settembre: obiettivo laurea sbloccato boy, finalmente possiamo chiamarti dottore [SUCCESS: ALL_BRANCHES_MERGED]
========================================================================`
          },
          "foto_1.jpg": {
            type: "image",
            path: CONFIG.IMMAGINI.foto1,
            caption: ""
          },
          "foto_2.jpg": {
            type: "image",
            path: CONFIG.IMMAGINI.foto2,
            caption: ""
          },
          "MEGLIO_IL_NERO.png": {
            type: "image",
            path: CONFIG.IMMAGINI.meglioIlNero,
            caption: ""
          },
          // FILE TRAPPOLA RANSOMWARE HACKER VIRUS
          "vacanza.png": {
            type: "trap_ransomware",
            filename: "vacanza.png",
            caption: "Foto Vacanza Estiva Riservata"
          },
          "famiglia.png": {
            type: "trap_ransomware",
            filename: "famiglia.png",
            caption: "Archivio Foto Famiglia"
          },
          "moglie.jpg": {
            type: "trap_ransomware",
            filename: "moglie.jpg",
            caption: "Foto Segreta Personale"
          }
        }
      }
    }
  }
};

// ============================================================================
// 3. STATO DELL'APPLICAZIONE
// ============================================================================
const STATE = {
  currentPath: "/", // "/" oppure "/memories"
  commandHistory: [],
  historyIndex: -1,
  isBootComplete: false,
  isMatrixRunning: false,
  isQuizCompleted: false, // Diventa true quando il quiz informatico viene superato
  quizShotsCount: 0       // Contatore di minishot dovuti a risposte errate
};

// ============================================================================
// 4. INIZIALIZZAZIONE & CONTROLLO BYPASS (LocalStorage & ?skip=1)
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const skipParam = urlParams.get("skip");
  const isPreviouslyUnlocked = localStorage.getItem(CONFIG.STORAGE_KEY) === "true";

  // Se già sbloccato in passato o presente ?skip=1 nell'URL, mostra subito la lettera!
  if (isPreviouslyUnlocked || skipParam === "1") {
    mostraLetteraImmediata();
    return;
  }

  // Altrimenti avvia la fase 1: Boot Linux con stile Matrix
  avviaMatrixBootCanvas();
  avviaBootLinux();
  inizializzaMatrixTerminalBg();
  inizializzaTerminale();
  inizializzaMobileBar();
  inizializzaLightbox();
  inizializzaRansomware();
  inizializzaQuizInformatica();
  inizializzaVideoSlot();
});

/**
 * Salta il terminale e visualizza direttamente la lettera finale
 */
function mostraLetteraImmediata() {
  const bootScreen = document.getElementById("boot-screen");
  const termContainer = document.getElementById("terminal-container");
  const letterPage = document.getElementById("letter-page");

  if (bootScreen) bootScreen.style.display = "none";
  if (termContainer) termContainer.style.display = "none";
  if (letterPage) {
    letterPage.style.display = "block";
    letterPage.classList.add("active");
  }
  inizializzaAzioniLettera();
}

/**
 * Pioggia Matrix sullo sfondo del boot screen iniziale
 */
let bootMatrixAnimationId = null;
function avviaMatrixBootCanvas() {
  const canvas = document.getElementById("boot-matrix-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const characters = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&*+-=<>{}[]/\\";
  const fontSize = 15;
  const columns = Math.floor(canvas.width / fontSize) || 40;
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(2, 5, 2, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#22c55e";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = characters.charAt(Math.floor(Math.random() * characters.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillStyle = drops[i] % 5 === 0 ? "#ffffff" : "#22c55e";
      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.97) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    bootMatrixAnimationId = requestAnimationFrame(draw);
  }
  draw();
}

/**
 * Pioggia Matrix continua e discreta nello sfondo del terminale
 */
function inizializzaMatrixTerminalBg() {
  const canvas = document.getElementById("terminal-matrix-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const characters = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&*+-=<>{}[]/\\";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize) || 50;
  const drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));

  function draw() {
    ctx.fillStyle = "rgba(2, 7, 4, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#10b981";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      if (drops[i] > 0) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "#34d399";
        ctx.fillText(char, x, y);
      }

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// ============================================================================
// 5. FASE 1: AVVIO SIMULATO LINUX (Boot Animation ~3s)
// ============================================================================
function avviaBootLinux() {
  const bootOutput = document.getElementById("boot-log");
  const bootScreen = document.getElementById("boot-screen");
  const skipBtn = document.getElementById("boot-skip-btn");

  const bootLogs = [
    { text: "[    0.000000] Matrix-Kernel 6.8.0-laurea-matrix (x86_64 gcc 13.2)", delay: 60 },
    { text: "[    0.042180] Command line: BOOT_IMAGE=/vmlinuz-matrix root=UUID=73-31-c0-d3 cipher=aes-4096-xts", delay: 120 },
    { text: "[    0.125430] Matrix Core Subsystem: Quantum Memory Allocation initialized", delay: 190 },
    { text: "[    0.389201] ACPI: DSDT tables loaded, verifying graduation credentials", delay: 280 },
    { text: "[    0.781290] Checking RAM integrity (16GB DDR4 Matrix Nodes)... [ OK ]", delay: 420, ok: true },
    { text: "[    1.150492] Mounting encrypted filesystem /dev/sda1 (cipher: 4096-bit)... [ OK ]", delay: 620, ok: true },
    { text: "[    1.420110] Initializing Virtual File System (VFS: /memories)... [ OK ]", delay: 820, ok: true },
    { text: "[    1.820300] Loading university memories, exams & caffeine telemetry... [ OK ]", delay: 1100, ok: true },
    { text: "[    2.150490] Security daemon: sblocca_dedica.sh locked with supervisor key", delay: 1400 },
    { text: "[    2.540112] Launching systemd-matrix defense protocols... [ OK ]", delay: 1750, ok: true },
    { text: "[    2.890120] Establishing secure terminal session for user 'ospite'... [ OK ]", delay: 2150, ok: true },
    { text: "[    3.100000] Matrix Shell Ready. Digita 'help' per la lista dei comandi.", delay: 2450, highlight: true }
  ];

  let completed = false;

  const concludiBoot = () => {
    if (completed) return;
    completed = true;
    STATE.isBootComplete = true;

    if (bootMatrixAnimationId) {
      cancelAnimationFrame(bootMatrixAnimationId);
    }

    bootScreen.style.opacity = "0";
    setTimeout(() => {
      bootScreen.classList.add("hidden");
      const cmdInput = document.getElementById("command-input");
      if (cmdInput) {
        cmdInput.focus();
      }
    }, 400);
  };

  if (skipBtn) {
    skipBtn.addEventListener("click", concludiBoot);
  }

  // Stampa progressiva delle righe del kernel
  bootLogs.forEach((log) => {
    setTimeout(() => {
      if (completed) return;
      const lineDiv = document.createElement("div");
      lineDiv.className = "boot-line";
      
      let html = log.text;
      if (log.ok) {
        html = html.replace("[ OK ]", '<span class="boot-ok">[ OK ]</span>');
      }
      if (log.highlight) {
        html = `<span class="boot-highlight">${html}</span>`;
      }
      lineDiv.innerHTML = html;
      bootOutput.appendChild(lineDiv);
      bootScreen.scrollTop = bootScreen.scrollHeight;
    }, log.delay);
  });

  // Dopo circa 3 secondi conclude automaticamente il boot
  setTimeout(concludiBoot, 3100);
}

// ============================================================================
// 6. TERMINALE INTERATTIVO: COMANDI E PARSER
// ============================================================================
function inizializzaTerminale() {
  const cmdInput = document.getElementById("command-input");
  const termBody = document.getElementById("terminal-body");

  // Mantieni il focus sull'input cliccando ovunque nella finestra del terminale
  termBody.addEventListener("click", () => {
    cmdInput.focus();
  });

  // Gestione tastiera (Invio, Frecce Su/Giù per cronologia, Tab per completamento)
  cmdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawCmd = cmdInput.value.trim();
      cmdInput.value = "";
      if (rawCmd.length > 0) {
        STATE.commandHistory.push(rawCmd);
        STATE.historyIndex = STATE.commandHistory.length;
      }
      eseguiComando(rawCmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (STATE.historyIndex > 0) {
        STATE.historyIndex--;
        cmdInput.value = STATE.commandHistory[STATE.historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (STATE.historyIndex < STATE.commandHistory.length - 1) {
        STATE.historyIndex++;
        cmdInput.value = STATE.commandHistory[STATE.historyIndex] || "";
      } else {
        STATE.historyIndex = STATE.commandHistory.length;
        cmdInput.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      eseguiAutocompletamento(cmdInput);
    }
  });

  aggiornaPrompt();
}

/**
 * Aggiorna il percorso visualizzato nel prompt (es. ~ oppure ~/memories)
 */
function aggiornaPrompt() {
  const promptPathElem = document.getElementById("prompt-path");
  if (promptPathElem) {
    if (STATE.currentPath === "/") {
      promptPathElem.textContent = "~";
    } else {
      promptPathElem.textContent = "~" + STATE.currentPath;
    }
  }
}

/**
 * Stampa una riga o blocco HTML nell'output del terminale
 */
function scriviNelTerminale(htmlContent, type = "info") {
  const termOutput = document.getElementById("terminal-output");
  const lineDiv = document.createElement("div");
  lineDiv.className = `term-output-line ${type}`;
  lineDiv.innerHTML = htmlContent;
  termOutput.appendChild(lineDiv);

  // Auto-scroll in fondo
  const termBody = document.getElementById("terminal-body");
  termBody.scrollTop = termBody.scrollHeight;
}

/**
 * Autocompletamento premendo il tasto Tab
 */
function eseguiAutocompletamento(inputElem) {
  const val = inputElem.value;
  const parts = val.split(" ");
  const lastWord = parts[parts.length - 1];

  const currentDirObj = getDirectoryByPath(STATE.currentPath);
  if (!currentDirObj) return;

  const entries = Object.keys(currentDirObj.children);
  const matches = entries.filter(name => name.toLowerCase().startsWith(lastWord.toLowerCase()));

  if (matches.length === 1) {
    parts[parts.length - 1] = matches[0];
    inputElem.value = parts.join(" ");
  } else if (matches.length > 1) {
    scriviNelTerminale(`<span style="color:#8b949e;">${matches.join("    ")}</span>`);
  }
}

/**
 * Restituisce l'oggetto del nodo VFS corrispondente al percorso dato
 */
function getDirectoryByPath(pathStr) {
  if (pathStr === "/" || pathStr === "") {
    return VFS["/"];
  }
  if (pathStr === "/memories" || pathStr === "memories") {
    return VFS["/"].children["memories"];
  }
  return null;
}

/**
 * Parser ed esecutore dei comandi digitati dall'utente
 */
function eseguiComando(cmdLine) {
  const currentDirLabel = STATE.currentPath === "/" ? "~" : "~" + STATE.currentPath;
  
  // Stampa il comando digitato nel log del terminale
  scriviNelTerminale(
    `<span class="prompt-prefix">${CONFIG.USERNAME}@${CONFIG.HOSTNAME}:<span class="prompt-path">${currentDirLabel}</span>$</span> <span style="color:#ffffff;">${escapeHTML(cmdLine)}</span>`
  );

  if (!cmdLine || cmdLine.trim() === "") {
    return;
  }

  const tokens = cmdLine.trim().split(/\s+/);
  const command = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  // 1. HELP
  if (command === "help") {
    mostraHelp();
  }
  // 2. CLEAR
  else if (command === "clear") {
    const termOutput = document.getElementById("terminal-output");
    termOutput.innerHTML = "";
  }
  // 3. LS
  else if (command === "ls") {
    eseguiLs(args);
  }
  // 4. CD oppure INDIETRO/BACK
  else if (command === "cd") {
    eseguiCd(args[0]);
  }
  else if (command === "indietro" || command === "back") {
    eseguiCd("..");
  }
  // 5. CAT
  else if (command === "cat") {
    eseguiCat(args[0]);
  }
  // 6. VIEW oppure OPEN
  else if (command === "view" || command === "open") {
    eseguiView(args[0]);
  }
  // 7. SBLOCCA SCRIPT: ./sblocca_dedica.sh oppure varianti sh/bash
  else if (
    command === "./sblocca_dedica.sh" ||
    command === "sblocca_dedica.sh" ||
    (command === "sh" && args[0] === "sblocca_dedica.sh") ||
    (command === "bash" && args[0] === "sblocca_dedica.sh") ||
    command === "./sblocca" ||
    command === "sblocca"
  ) {
    let passwordInserita = "";
    if (command === "sh" || command === "bash") {
      passwordInserita = args[1] || "";
    } else {
      passwordInserita = args[0] || "";
    }
    eseguiSblocco(passwordInserita);
  }
  // 8. COMANDI UTILI EXTRA LINUX
  else if (command === "pwd") {
    scriviNelTerminale(STATE.currentPath === "/" ? "/home/ospite" : "/home/ospite" + STATE.currentPath);
  }
  else if (command === "whoami") {
    scriviNelTerminale(`${CONFIG.USERNAME} (Neo-Laureato in ${CONFIG.CORSO_LAUREA})`);
  }
  else if (command === "date") {
    scriviNelTerminale(new Date().toString());
  }
  else if (command === "echo") {
    scriviNelTerminale(escapeHTML(args.join(" ")));
  }
  else if (command === "sudo") {
    scriviNelTerminale(`[sudo] password for ${CONFIG.USERNAME}: <br><span class="error">Spiacente, i poteri di root sono riservati al neo-dottore dopo la decrittazione!</span>`);
  }
  // COMANDO NON RICONOSCIUTO
  else {
    scriviNelTerminale(`bash: ${escapeHTML(command)}: comando non trovato. Digita <span style="color:#58a6ff;font-weight:bold;">help</span> per la lista dei comandi.`, "error");
  }

  aggiornaPrompt();
}

/**
 * Comando: help
 */
function mostraHelp() {
  const output = `
<div style="color: #facc15; font-weight: bold; margin-bottom: 8px; font-size: 1.05em; border-left: 3px solid #facc15; padding-left: 8px;">
  minchia 8 anni di informatica e non sai usare un terminale. malissimo....
</div>
<div style="color: #4ade80; font-weight: bold; margin-bottom: 6px;">COMANDI DISPONIBILI NEL TERMINALE:</div>
  <span style="color:#00ff66; font-weight:bold;">cat guida_comandi.txt</span> - Legge il manuale di emergenza completo se hai dimenticato tutto!
  <span style="color:#58a6ff; font-weight:bold;">ls</span>                  - Elenca i file e le cartelle nella directory corrente
  <span style="color:#58a6ff; font-weight:bold;">cd [cartella]</span>       - Entra in una cartella (es. <span style="color:#f1e05a;">cd memories</span>)
  <span style="color:#388bfd; font-weight:bold;">indietro</span> (o <span style="color:#388bfd; font-weight:bold;">cd ..</span>)  - Torna indietro alla cartella principale (oppure usa il tasto rapido <span style="color:#79c0ff;">[ indietro ⬅ ]</span>)
  <span style="color:#58a6ff; font-weight:bold;">cat [file.txt]</span>      - Legge e stampa il contenuto di un file di testo (es. <span style="color:#f1e05a;">cat LEGGIMI.txt</span>)
  <span style="color:#58a6ff; font-weight:bold;">view [foto.jpg]</span>     - Mostra l'immagine nel visualizzatore (Lightbox)
  <span style="color:#38ef7d; font-weight:bold;">./sblocca_dedica.sh [password]</span> - Esegue lo sblocco con la password corretta
  <span style="color:#58a6ff; font-weight:bold;">clear</span>               - Pulisce lo schermo della console
  <span style="color:#58a6ff; font-weight:bold;">pwd</span>                 - Mostra il percorso della directory corrente
  <span style="color:#58a6ff; font-weight:bold;">help</span>                - Mostra questa guida comandi
`;
  scriviNelTerminale(output);
}

/**
 * Comando: ls
 */
function eseguiLs(args) {
  let targetDir = STATE.currentPath;

  if (args && args.length > 0 && !args[0].startsWith("-")) {
    if (args[0] === "memories" && STATE.currentPath === "/") {
      targetDir = "/memories";
    } else if (args[0] === ".." && STATE.currentPath === "/memories") {
      targetDir = "/";
    }
  }

  const dirObj = getDirectoryByPath(targetDir);
  if (!dirObj) {
    scriviNelTerminale(`ls: impossibile accedere a '${args[0]}': File o directory non esistente`, "error");
    return;
  }

  const isDetailed = args.some(a => a.includes("-l"));
  const entries = Object.keys(dirObj.children);

  if (isDetailed) {
    let lines = [`totale ${entries.length * 4}`];
    entries.forEach(name => {
      const item = dirObj.children[name];
      if (item.type === "dir") {
        lines.push(`drwxr-xr-x 2 ${CONFIG.USERNAME} staff 4096 Sep 22 10:00 <span class="file-dir">${name}/</span>`);
      } else if (item.type === "executable") {
        lines.push(`-rwxr-xr-x 1 ${CONFIG.USERNAME} staff  832 Sep 22 10:00 <span class="file-exec">${name}*</span>`);
      } else if (item.type === "image" || item.type === "trap_ransomware") {
        lines.push(`-rw-r--r-- 1 ${CONFIG.USERNAME} staff 65420 Sep 22 10:00 <span class="file-img">${name}</span>`);
      } else {
        lines.push(`-rw-r--r-- 1 ${CONFIG.USERNAME} staff  1024 Sep 22 10:00 <span class="file-text">${name}</span>`);
      }
    });
    scriviNelTerminale(lines.join("<br>"));
  } else {
    const formatted = entries.map(name => {
      const item = dirObj.children[name];
      if (item.type === "dir") return `<span class="file-dir">${name}/</span>`;
      if (item.type === "executable") return `<span class="file-exec">${name}*</span>`;
      if (item.type === "image" || item.type === "trap_ransomware") return `<span class="file-img">${name}</span>`;
      if (name.endsWith(".log")) return `<span class="file-log">${name}</span>`;
      return `<span class="file-text">${name}</span>`;
    });
    scriviNelTerminale(formatted.join("&nbsp;&nbsp;&nbsp;&nbsp;"));
  }
}

/**
 * Comando: cd
 */
function eseguiCd(target) {
  if (!target || target === "~" || target === "/") {
    STATE.currentPath = "/";
    return;
  }

  if (target === ".") {
    return;
  }

  if (target === "..") {
    STATE.currentPath = "/";
    return;
  }

  if (target === "memories" || target === "./memories" || target === "/memories") {
    if (STATE.currentPath === "/") {
      STATE.currentPath = "/memories";
    } else {
      scriviNelTerminale(`bash: cd: ${escapeHTML(target)}: File o directory non esistente`, "error");
    }
    return;
  }

  const currentDir = getDirectoryByPath(STATE.currentPath);
  if (currentDir && currentDir.children[target]) {
    if (currentDir.children[target].type !== "dir") {
      scriviNelTerminale(`bash: cd: ${escapeHTML(target)}: Non è una directory`, "error");
      return;
    }
  }

  scriviNelTerminale(`bash: cd: ${escapeHTML(target)}: File o directory non esistente`, "error");
}

/**
 * Comando: cat
 */
function eseguiCat(filename) {
  if (!filename) {
    scriviNelTerminale("cat: specifica il nome del file da leggere (es. <span style=\"color:#f1e05a;\">cat guida_comandi.txt</span>)", "warning");
    return;
  }

  // Risoluzione percorsi relativi semplici
  let targetDir = STATE.currentPath;
  let targetFile = filename;

  if (filename.startsWith("memories/")) {
    targetDir = "/memories";
    targetFile = filename.replace("memories/", "");
  }

  // Alias di retrocompatibilità se viene ancora digitato figuracce.log
  if (targetFile === "figuracce.log") {
    targetFile = "ricordi.log";
  }

  const dirObj = getDirectoryByPath(targetDir);
  if (!dirObj || !dirObj.children[targetFile]) {
    scriviNelTerminale(`cat: ${escapeHTML(filename)}: File o directory non esistente`, "error");
    return;
  }

  const item = dirObj.children[targetFile];

  // Se l'utente tenta di leggere con cat un file trappola ransomware!
  if (item.type === "trap_ransomware") {
    scriviNelTerminale(`[ALERT] Inizializzazione decodifica binaria di ${escapeHTML(targetFile)}... ATTENZIONE RANSOMWARE!`, "error");
    attivaRansomwareVirus(targetFile);
    return;
  }

  // Se l'utente tenta di leggere indizio.txt ed è ancora bloccato dal quiz!
  if (targetFile === "indizio.txt" && item.isLockedByQuiz && !STATE.isQuizCompleted) {
    scriviNelTerminale(
      `<span style="color:#38bdf8; font-weight:bold;">[SECURITY CHALLENGE REQUIRED]</span><br>` +
      `Il file <span style="color:#f1e05a;">indizio.txt</span> è cifrato con protocollo di accreditamento accademico!<br>` +
      `Per sbloccare l'indizio devi prima superare il <span style="color:#22c55e; font-weight:bold;">Quiz di Informatica</span> (6 domande su S.O., Reti, Algoritmi e Linguaggi).<br>` +
      `<span style="color:#ef4444; font-weight:bold;">⚠️ REGOLA FERREA: per ogni errore c'è la penitenza: 1 MINISHOT DA BERE! 🥃</span><br>` +
      `Apertura del modulo d'esame in corso...`,
      "warning"
    );
    apriQuizInformatica();
    return;
  }

  if (item.type === "dir") {
    scriviNelTerminale(`cat: ${escapeHTML(filename)}: È una directory`, "error");
  } else if (item.type === "executable") {
    scriviNelTerminale(
      `cat: ${escapeHTML(filename)}: Permesso negato (file binario eseguibile protetto).<br>` +
      `Suggerimento: Eseguilo digitando <span style="color:#22c55e; font-weight:bold;">./sblocca_dedica.sh &lt;password&gt;</span>`,
      "warning"
    );
  } else if (item.type === "image") {
    scriviNelTerminale(
      `cat: ${escapeHTML(filename)}: Dati binari immagine JPEG.<br>` +
      `Suggerimento: Visualizza l'immagine digitando <span style="color:#f1e05a; font-weight:bold;">view ${escapeHTML(filename)}</span>`,
      "warning"
    );
  } else {
    // Stampa del testo
    scriviNelTerminale(escapeHTML(item.content));
  }
}

/**
 * Comando: view [nome_file.jpg] (o open)
 */
function eseguiView(filename) {
  if (!filename) {
    scriviNelTerminale("view: specifica il file immagine da aprire (es. <span style=\"color:#f1e05a;\">view foto_1.jpg</span>)", "warning");
    return;
  }

  let targetDir = STATE.currentPath;
  let targetFile = filename;

  if (filename.startsWith("memories/")) {
    targetDir = "/memories";
    targetFile = filename.replace("memories/", "");
  }

  const dirObj = getDirectoryByPath(targetDir);
  if (!dirObj || !dirObj.children[targetFile]) {
    scriviNelTerminale(`view: ${escapeHTML(filename)}: File immagine non trovato`, "error");
    return;
  }

  const item = dirObj.children[targetFile];

  // SE È UN FILE TRAPPOLA RANSOMWARE (vacanza.png, famiglia.png, moglie.jpg)
  if (item.type === "trap_ransomware") {
    scriviNelTerminale(`[ALERT] Accesso a ${escapeHTML(targetFile)} non autorizzato. RILEVATO MALWARE!`, "error");
    attivaRansomwareVirus(targetFile);
    return;
  }

  if (item.type !== "image") {
    scriviNelTerminale(`view: ${escapeHTML(filename)}: Il file non è un'immagine supportata`, "error");
    return;
  }

  // Stampa l'immagine direttamente nella pagina (nel flusso del terminale)
  scriviNelTerminale(
    `<div class="term-image-preview-card">` +
      `<div class="term-image-preview-header">🖼️ <strong>${escapeHTML(targetFile)}</strong> (clicca sull'immagine per ingrandire a schermo intero)</div>` +
      `<img src="${escapeHTML(item.path)}" alt="${escapeHTML(targetFile)}" class="term-inline-img" onclick="window.apriLightbox('${escapeHTML(item.path)}', '${escapeHTML(item.caption || '')}')" />` +
    `</div>`,
    "info"
  );

  // E contemporaneamente aprila a tutto schermo per vederla per intero
  apriLightbox(item.path, item.caption || "");
}

/**
 * Comando: ./sblocca_dedica.sh [password]
 */
function eseguiSblocco(password) {
  scriviNelTerminale("complimenti per aver completato il test. sfortunatamente non siamo bravi programmatori, quindi non ci sono indizi e non ci sono blocchi, è tutto aperto!", "success");
  scriviNelTerminale("Accesso Consentito. Apertura della dedica di laurea in corso...", "success");
  
  // Salva nel localStorage per le sessioni future
  try {
    localStorage.setItem(CONFIG.STORAGE_KEY, "true");
  } catch (e) {
    console.warn("Impossibile salvare in localStorage:", e);
  }

  // Disabilita ulteriori comandi
  const cmdInput = document.getElementById("command-input");
  if (cmdInput) cmdInput.disabled = true;

  // FASE 2: Animazione Matrix di 3 secondi
  setTimeout(() => {
    avviaTransizioneMatrix();
  }, 400);
}

// ============================================================================
// 7. FASE 2: TRANSIZIONE MATRIX (Canvas Rain per 3 secondi)
// ============================================================================
function avviaTransizioneMatrix() {
  const canvas = document.getElementById("matrix-canvas");
  const overlayText = document.getElementById("matrix-text");
  const termContainer = document.getElementById("terminal-container");
  
  if (!canvas) return;

  canvas.classList.add("active");
  if (overlayText) overlayText.classList.add("active");

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&*+-=<>{}[]/\\";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  let animationFrameId;

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#22c55e";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = characters.charAt(Math.floor(Math.random() * characters.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Carattere di testa più luminoso
      ctx.fillStyle = "#ffffff";
      ctx.fillText(char, x, y);

      ctx.fillStyle = "#22c55e";
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    animationFrameId = requestAnimationFrame(drawMatrix);
  }

  drawMatrix();

  // Dopo 3 secondi, dissolvenza e passaggio alla lettera finale
  setTimeout(() => {
    cancelAnimationFrame(animationFrameId);
    
    if (termContainer) {
      termContainer.classList.add("fade-out");
    }

    canvas.style.transition = "opacity 0.8s ease";
    canvas.style.opacity = "0";

    if (overlayText) {
      overlayText.style.transition = "opacity 0.8s ease";
      overlayText.style.opacity = "0";
    }

    setTimeout(() => {
      canvas.classList.remove("active");
      if (overlayText) overlayText.classList.remove("active");
      if (termContainer) termContainer.style.display = "none";

      const letterPage = document.getElementById("letter-page");
      if (letterPage) {
        letterPage.style.display = "block";
        // Trigger reflow per animazione fluida
        void letterPage.offsetWidth;
        letterPage.classList.add("active");
        inizializzaAzioniLettera();
      }
    }, 800);

  }, 3000);
}

// ============================================================================
// 8. MOBILE ACTION BAR & POPUP RAPIDO
// ============================================================================
function inizializzaMobileBar() {
  const btnLs = document.getElementById("m-btn-ls");
  const btnCd = document.getElementById("m-btn-cd");
  const btnBack = document.getElementById("m-btn-back");
  const btnCat = document.getElementById("m-btn-cat");
  const btnView = document.getElementById("m-btn-view");
  const btnSblocca = document.getElementById("m-btn-sblocca");
  const btnHelp = document.getElementById("m-btn-help");
  const btnClear = document.getElementById("m-btn-clear");

  const cmdInput = document.getElementById("command-input");

  if (btnLs) {
    btnLs.addEventListener("click", () => {
      cmdInput.value = "ls";
      eseguiComando("ls");
      cmdInput.value = "";
    });
  }

  if (btnBack) {
    btnBack.addEventListener("click", () => {
      if (STATE.currentPath === "/") {
        scriviNelTerminale("Sei già nella cartella principale (/)", "warning");
      } else {
        cmdInput.value = "cd ..";
        eseguiComando("cd ..");
        cmdInput.value = "";
      }
    });
  }

  if (btnHelp) {
    btnHelp.addEventListener("click", () => {
      eseguiComando("help");
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", () => {
      eseguiComando("clear");
    });
  }

  if (btnCd) {
    btnCd.addEventListener("click", () => {
      if (STATE.currentPath === "/") {
        mostraPickerOpzioni("Quale cartella vuoi aprire?", [
          { label: "memories (Cartella Ricordi)", value: "cd memories" }
        ]);
      } else {
        mostraPickerOpzioni("Dove vuoi andare?", [
          { label: ".. (Torna alla radice /)", value: "cd .." }
        ]);
      }
    });
  }

  if (btnCat) {
    btnCat.addEventListener("click", () => {
      if (STATE.currentPath === "/") {
        mostraPickerOpzioni("Quale file vuoi leggere?", [
          { label: "guida_comandi.txt (Manuale comandi)", value: "cat guida_comandi.txt" },
          { label: "LEGGIMI.txt", value: "cat LEGGIMI.txt" }
        ]);
      } else {
        mostraPickerOpzioni("Quale file vuoi leggere?", [
          { label: STATE.isQuizCompleted ? "indizio.txt (Indizio sbloccato! 🔓)" : "indizio.txt (🔒 Prova quiz informatica + Penitenza Shot)", value: "cat indizio.txt" },
          { label: "ricordi.log (Registro ricordi ed eventi)", value: "cat ricordi.log" }
        ]);
      }
    });
  }

  if (btnView) {
    btnView.addEventListener("click", () => {
      if (STATE.currentPath === "/") {
        mostraPickerOpzioni("Le foto sono nella cartella memories:", [
          { label: "Vai in memories (cd memories)", value: "cd memories" }
        ]);
      } else {
        mostraPickerOpzioni("Quale immagine vuoi aprire?", [
          { label: "foto_1.jpg", value: "view foto_1.jpg" },
          { label: "foto_2.jpg", value: "view foto_2.jpg" },
          { label: "MEGLIO_IL_NERO.png", value: "view MEGLIO_IL_NERO.png" },
          { label: "vacanza.png (Foto vacanza)", value: "view vacanza.png" },
          { label: "famiglia.png (Foto famiglia)", value: "view famiglia.png" },
          { label: "moglie.jpg (Foto personale)", value: "view moglie.jpg" }
        ]);
      }
    });
  }

  if (btnSblocca) {
    btnSblocca.addEventListener("click", () => {
      cmdInput.value = `./sblocca_dedica.sh`;
      eseguiComando(`./sblocca_dedica.sh`);
      cmdInput.value = "";
    });
  }
}

/**
 * Mostra un picker modale elegante per i pulsanti rapidi (touch friendly)
 */
function mostraPickerOpzioni(titolo, opzioni) {
  const existingPicker = document.querySelector(".quick-picker-overlay");
  if (existingPicker) existingPicker.remove();

  const overlay = document.createElement("div");
  overlay.className = "quick-picker-overlay";

  const box = document.createElement("div");
  box.className = "quick-picker-box";

  const titleElem = document.createElement("div");
  titleElem.className = "quick-picker-title";
  titleElem.textContent = titolo;
  box.appendChild(titleElem);

  const optsContainer = document.createElement("div");
  optsContainer.className = "quick-picker-options";

  opzioni.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "quick-picker-option";
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      overlay.remove();
      eseguiComando(opt.value);
    });
    optsContainer.appendChild(btn);
  });
  box.appendChild(optsContainer);

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "quick-picker-cancel";
  cancelBtn.textContent = "Annulla";
  cancelBtn.addEventListener("click", () => overlay.remove());
  box.appendChild(cancelBtn);

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Chiudi cliccando fuori
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// ============================================================================
// 9. LIGHTBOX MODAL PER IMMAGINI
// ============================================================================
function inizializzaLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close");

  if (!modal) return;

  const chiudi = () => {
    modal.classList.remove("active");
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", chiudi);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      chiudi();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      chiudi();
    }
  });
}

function apriLightbox(imgSrc, captionText) {
  const modal = document.getElementById("lightbox-modal");
  const imgElem = document.getElementById("lightbox-img");
  const captionElem = document.getElementById("lightbox-caption");

  if (!modal || !imgElem) return;

  imgElem.onerror = () => {
    // Prova con / davanti se era relativo
    if (!imgSrc.startsWith("/") && !imgSrc.startsWith("http")) {
      imgElem.onerror = null;
      imgElem.src = "/" + imgSrc;
    }
  };

  imgElem.src = imgSrc;
  if (captionElem) {
    if (captionText && captionText.trim()) {
      captionElem.textContent = captionText;
      captionElem.style.display = "inline";
    } else {
      captionElem.textContent = "";
      captionElem.style.display = "none";
    }
  }

  modal.classList.add("active");
}
window.apriLightbox = apriLightbox;

// ============================================================================
// 9.5 RANSOMWARE VIRUS PRANK (Allarme Rosso, Schermo Glitch & Shot)
// ============================================================================
let ransomwareAudioCtx = null;
let ransomwareIntervalId = null;
let ransomwareTimerRafId = null;
let ransomwareEndTime = 0;
const RANSOMWARE_DURATION_MS = 5 * 60 * 1000; // 5 minuti

function inizializzaRansomware() {
  const shotBtn = document.getElementById("ransomware-shot-btn");
  if (shotBtn) {
    shotBtn.addEventListener("click", () => {
      chiudiRansomware("shot");
    });
  }
}

/**
 * Avvia la simulazione ransomware/virus con audio allarme sintetizzato
 */
function attivaRansomwareVirus(trapFilename) {
  const modal = document.getElementById("ransomware-modal");
  const fileAlertSpan = document.getElementById("ransomware-target-file");
  const termContainer = document.getElementById("terminal-container");

  if (fileAlertSpan) {
    fileAlertSpan.textContent = trapFilename;
  }

  // Aggiungi scuotimento/crash al terminale
  if (termContainer) {
    termContainer.classList.add("screen-destroyed");
  }

  if (modal) {
    modal.classList.add("active");
  }

  // Avvia pioggia di codice malware rosso nel canvas
  avviaRansomwareMatrixCanvas();

  // Avvia timer reale di 5 minuti che mostra anche i millisecondi
  avviaRansomwareCountdown();

  // Riproduci suono di allarme / buzzer sintetizzato con Web Audio API
  riproduciAllarmeHacker();
}

/**
 * Gestione timer reale di 5 minuti (300.000 ms) con millisecondi (mm:ss.mmm)
 */
function avviaRansomwareCountdown() {
  const timerElem = document.getElementById("ransomware-timer");
  if (!timerElem) return;

  if (ransomwareTimerRafId) {
    cancelAnimationFrame(ransomwareTimerRafId);
    ransomwareTimerRafId = null;
  }

  ransomwareEndTime = performance.now() + RANSOMWARE_DURATION_MS;

  function updateTimer() {
    const now = performance.now();
    const remaining = Math.max(0, ransomwareEndTime - now);

    const totalSeconds = Math.floor(remaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(remaining % 1000);

    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    const mmm = String(milliseconds).padStart(3, "0");

    timerElem.textContent = `${mm}:${ss}.${mmm}`;

    if (remaining <= 0) {
      // Tempo scaduto: torna comunque alla pagina principale del terminale
      chiudiRansomware("timeout");
      return;
    }

    ransomwareTimerRafId = requestAnimationFrame(updateTimer);
  }

  ransomwareTimerRafId = requestAnimationFrame(updateTimer);
}

/**
 * Chiude il ransomware e ripristina il sistema normale
 * @param {"shot"|"back"|"timeout"} motivazione
 */
function chiudiRansomware(motivazione = "shot") {
  const modal = document.getElementById("ransomware-modal");
  const termContainer = document.getElementById("terminal-container");

  if (modal) {
    modal.classList.remove("active");
  }

  if (termContainer) {
    termContainer.classList.remove("screen-destroyed");
  }

  if (ransomwareIntervalId) {
    clearInterval(ransomwareIntervalId);
    ransomwareIntervalId = null;
  }

  if (ransomwareTimerRafId) {
    cancelAnimationFrame(ransomwareTimerRafId);
    ransomwareTimerRafId = null;
  }

  // Notifica nel terminale in base all'azione intrapresa
  if (motivazione === "shot") {
    scriviNelTerminale(
      `<span style="color:#00ff66; font-weight:bold;">[RIPRISTINO COMPLETATO]</span> Shot registrato nei sensori epatici! Decrittazione d'emergenza avvenuta con successo. Il sistema è tornato stabile. Bravo!`
    );
  } else if (motivazione === "back") {
    scriviNelTerminale(
      `<span style="color:#facc15; font-weight:bold;">[USCITA EMERGENZA]</span> Sei scappato in tempo dal file infetto! Terminale ripristinato, ma fai attenzione a cosa apri.`
    );
  } else if (motivazione === "timeout") {
    scriviNelTerminale(
      `<span style="color:#f87171; font-weight:bold;">[TIMER SCADUTO]</span> Il malware ha terminato la sua scansione ed è andato in timeout. Sistema ripristinato automaticamente.`
    );
  }

  const cmdInput = document.getElementById("command-input");
  if (cmdInput) {
    cmdInput.focus();
  }
}

/**
 * Pioggia Matrix Rossa sul canvas del ransomware
 */
function avviaRansomwareMatrixCanvas() {
  const canvas = document.getElementById("ransomware-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "☠☣ERROR_0xDEADBEEF_SYSTEM_LOCKED_CORRUPTED_VIRUS_INFECTED_SHOT_REQUIRED_1010101";
  const fontSize = 16;
  const cols = Math.floor(canvas.width / fontSize) || 40;
  const drops = Array(cols).fill(1);

  if (ransomwareIntervalId) clearInterval(ransomwareIntervalId);

  ransomwareIntervalId = setInterval(() => {
    ctx.fillStyle = "rgba(10, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff0033";
    ctx.font = `bold ${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const txt = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(txt, x, y);

      if (y > canvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 35);
}

/**
 * Sintetizzatore Web Audio API per suono di allarme hacker / glitch
 */
function riproduciAllarmeHacker() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!ransomwareAudioCtx) {
      ransomwareAudioCtx = new AudioContext();
    }
    if (ransomwareAudioCtx.state === "suspended") {
      ransomwareAudioCtx.resume();
    }

    const playBeep = (freq, duration, delay) => {
      setTimeout(() => {
        try {
          const osc = ransomwareAudioCtx.createOscillator();
          const gain = ransomwareAudioCtx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, ransomwareAudioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, ransomwareAudioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ransomwareAudioCtx.currentTime + duration);
          osc.connect(gain);
          gain.connect(ransomwareAudioCtx.destination);
          osc.start();
          osc.stop(ransomwareAudioCtx.currentTime + duration);
        } catch (e) {
          // Ignora se audio bloccato
        }
      }, delay);
    };

    // Sequenza allarme bi-tonale hacker
    playBeep(880, 0.15, 0);
    playBeep(440, 0.2, 180);
    playBeep(880, 0.15, 380);
    playBeep(350, 0.25, 580);
  } catch (err) {
    // Web audio policy fallback
  }
}

// ============================================================================
// 9.8 QUIZ INFORMATICA PER SBLOCCARE L'INDIZIO (6 Domande + Penitenza Minishot)
// ============================================================================
const QUIZ_DOMANDE = [
  {
    category: "SISTEMI OPERATIVI",
    question: "Che cos'è una condizione di 'Deadlock' (stallo) e quale tra queste NON è una delle 4 condizioni di Coffman necessarie affinché si verifichi?",
    options: [
      "Mutua esclusione (Mutual exclusion)",
      "Possesso e attesa (Hold and wait)",
      "Prelazione forzata delle risorse da parte del kernel (Preemption)",
      "Attesa circolare (Circular wait)"
    ],
    correctIndex: 2,
    explanation: "La preemption (prelazione) evita lo stallo! La condizione di Coffman è 'No-preemption' (le risorse non possono essere sottratte a forza al processo prima del termine)."
  },
  {
    category: "RETI & PROTOCOLLI",
    question: "Durante l'handshake a 3 vie (Three-Way Handshake) di una connessione TCP, quali flag vengono scambiati nell'ordine corretto dal client e dal server?",
    options: [
      "SYN ➔ SYN-ACK ➔ ACK",
      "ACK ➔ SYN ➔ FIN",
      "SYN ➔ ACK ➔ PUSH",
      "CONNECT ➔ ACCEPT ➔ ACK"
    ],
    correctIndex: 0,
    explanation: "L'handshake TCP classico è: 1. Client invia SYN; 2. Server risponde SYN-ACK; 3. Client conferma con ACK."
  },
  {
    category: "LINGUAGGI & GESTIONE MEMORIA",
    question: "In C/C++, che cosa accade esattamente quando si verifica un 'Segmentation Fault' (SIGSEGV)?",
    options: [
      "Il processore va in surriscaldamento termico per un ciclo infinito",
      "Il programma tenta di accedere a una zona di memoria non mappata o per cui non ha permessi di lettura/scrittura",
      "La memoria RAM fisica del computer è completamente esaurita",
      "Il compilatore GCC non trova la libreria stdio.h al momento del linking"
    ],
    correctIndex: 1,
    explanation: "SIGSEGV viene sollevato dalla MMU/OS quando un puntatore deferenzia un indirizzo non valido (es. NULL o memoria protetta)."
  },
  {
    category: "ALGORITMI & STRUTTURE DATI",
    question: "Qual è la complessità computazionale asintotica nel caso pessimo (Worst Case) dell'algoritmo QuickSort standard?",
    options: [
      "O(n log n)",
      "O(n)",
      "O(n²)",
      "O(log n)"
    ],
    correctIndex: 2,
    explanation: "Se il pivot scelto è sistematicamente il minimo o il massimo (es. array già ordinato con pivot all'estremità), QuickSort degrada a O(n²)."
  },
  {
    category: "ARCHITETTURA & LINUX",
    question: "Quale segnale POSIX invia di default il comando 'kill <PID>' in Linux se non viene specificato alcun parametro numerico?",
    options: [
      "SIGKILL (segnale 9, terminazione immediata non intercettabile)",
      "SIGTERM (segnale 15, richiesta di terminazione pulita e intercettabile)",
      "SIGINT (segnale 2, equivalente a CTRL+C)",
      "SIGHUP (segnale 1, disconnessione del terminale)"
    ],
    correctIndex: 1,
    explanation: "Il comando 'kill' invia di default SIGTERM (15), dando al processo la possibilità di salvare lo stato e chiudersi ordinatamente."
  },
  {
    category: "PROGRAMMAZIONE CONCORRENTE",
    question: "Qual è la differenza fondamentale tra un 'Mutex' e un 'Semaforo binario'?",
    options: [
      "Il Mutex può essere rilasciato solo dal thread che ne ha acquisito il lock (ownership), mentre un semaforo può essere segnalato da qualsiasi thread",
      "I semafori esistono solo a livello hardware, i mutex solo nel software",
      "Il Mutex non supporta le sezioni critiche su CPU multicore",
      "Non c'è nessuna differenza, sono esattamente la stessa struttura con nomi diversi"
    ],
    correctIndex: 0,
    explanation: "Il Mutex prevede il concetto di 'ownership' (chiusura e sblocco dallo stesso thread). I semafori sono meccanismi di segnalazione libera."
  }
];

let quizCurrentIndex = 0;
let quizPendingNextIndex = 0;

function inizializzaQuizInformatica() {
  const btnShotTaken = document.getElementById("btn-quiz-shot-taken");
  const btnQuizClose = document.getElementById("btn-quiz-close");
  const btnQuizCancel = document.getElementById("btn-quiz-cancel");

  if (btnShotTaken) {
    btnShotTaken.addEventListener("click", () => {
      const penaltyOverlay = document.getElementById("quiz-shot-penalty");
      if (penaltyOverlay) {
        penaltyOverlay.style.display = "none";
      }
      // Passa alla domanda successiva
      quizCurrentIndex = quizPendingNextIndex;
      if (quizCurrentIndex < QUIZ_DOMANDE.length) {
        caricaDomandaQuiz(quizCurrentIndex);
      } else {
        completaQuizConSuccesso();
      }
    });
  }

  if (btnQuizClose) {
    btnQuizClose.addEventListener("click", () => {
      chiudiQuizInformatica();
      scriviNelTerminale(
        `<span style="color:#22c55e; font-weight:bold;">[TEST COMPLETATO - SISTEMA APERTO]</span><br>` +
        `complimenti per aver completato il test. sfortunatamente non siamo bravi programmatori, quindi non ci sono indizi e non ci sono blocchi, è tutto aperto!<br>` +
        `Apertura della dedica in corso...`,
        "success"
      );
      try {
        localStorage.setItem(CONFIG.STORAGE_KEY, "true");
      } catch (e) {
        console.warn("Storage save error:", e);
      }
      setTimeout(() => {
        avviaTransizioneMatrix();
      }, 400);
    });
  }

  if (btnQuizCancel) {
    btnQuizCancel.addEventListener("click", () => {
      chiudiQuizInformatica();
      scriviNelTerminale("Quiz interrotto. Digita nuovamente <span style=\"color:#f1e05a;\">cat indizio.txt</span> quando ti senti pronto a sfidare le domande e i minishot!", "warning");
    });
  }
}

/**
 * Apre la modale del quiz informatico
 */
function apriQuizInformatica() {
  const modal = document.getElementById("quiz-modal");
  const successView = document.getElementById("quiz-success-view");
  const quizBody = document.getElementById("quiz-body");
  const penaltyOverlay = document.getElementById("quiz-shot-penalty");

  if (!modal) return;

  quizCurrentIndex = 0;
  if (successView) successView.style.display = "none";
  if (quizBody) quizBody.style.display = "block";
  if (penaltyOverlay) penaltyOverlay.style.display = "none";

  aggiornaShotCounterUI();
  caricaDomandaQuiz(0);
  modal.classList.add("active");
}

function chiudiQuizInformatica() {
  const modal = document.getElementById("quiz-modal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function aggiornaShotCounterUI() {
  const numElem = document.getElementById("quiz-shots-num");
  if (numElem) {
    numElem.textContent = STATE.quizShotsCount;
  }
}

function caricaDomandaQuiz(index) {
  const qData = QUIZ_DOMANDE[index];
  if (!qData) return;

  const catElem = document.getElementById("quiz-category");
  const textElem = document.getElementById("quiz-question-text");
  const optsContainer = document.getElementById("quiz-options-list");
  const progressText = document.getElementById("quiz-progress-text");
  const progressFill = document.getElementById("quiz-progress-fill");

  if (catElem) catElem.textContent = qData.category;
  if (textElem) textElem.textContent = qData.question;
  if (progressText) progressText.textContent = `Domanda ${index + 1} di ${QUIZ_DOMANDE.length}`;
  if (progressFill) {
    const pct = ((index + 1) / QUIZ_DOMANDE.length) * 100;
    progressFill.style.width = `${pct}%`;
  }

  if (optsContainer) {
    optsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    qData.options.forEach((optText, optIdx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-opt-btn";
      btn.innerHTML = `<span class="quiz-opt-letter">${letters[optIdx]}</span> <span>${escapeHTML(optText)}</span>`;
      btn.addEventListener("click", () => {
        gestisciRispostaQuiz(index, optIdx);
      });
      optsContainer.appendChild(btn);
    });
  }
}

function gestisciRispostaQuiz(questionIndex, chosenIndex) {
  const qData = QUIZ_DOMANDE[questionIndex];
  if (!qData) return;

  if (chosenIndex === qData.correctIndex) {
    // Risposta corretta!
    riproduciSuonoSuccessoQuiz();
    const nextIdx = questionIndex + 1;
    if (nextIdx < QUIZ_DOMANDE.length) {
      quizCurrentIndex = nextIdx;
      caricaDomandaQuiz(nextIdx);
    } else {
      completaQuizConSuccesso();
    }
  } else {
    // Risposta errata -> PENITENZA MINISHOT!
    STATE.quizShotsCount++;
    aggiornaShotCounterUI();
    riproduciAllarmeHacker();

    quizPendingNextIndex = questionIndex + 1;
    const penaltyOverlay = document.getElementById("quiz-shot-penalty");
    const explanationElem = document.getElementById("quiz-penalty-explanation");

    if (explanationElem) {
      explanationElem.innerHTML = 
        `<strong>Spiegazione:</strong> ${escapeHTML(qData.explanation)}<br><br>` +
        `<strong>Totale shot accumulati finora:</strong> ${STATE.quizShotsCount} 🥃`;
    }

    if (penaltyOverlay) {
      penaltyOverlay.style.display = "flex";
    }
  }
}

function completaQuizConSuccesso() {
  STATE.isQuizCompleted = true;

  // Sblocca il file nel VFS
  const indizioObj = VFS["/"].children["memories"].children["indizio.txt"];
  if (indizioObj) {
    indizioObj.isLockedByQuiz = false;
    indizioObj.content = "complimenti per aver completato il test. sfortunatamente non siamo bravi programmatori, quindi non ci sono indizi e non ci sono blocchi, è tutto aperto!";
  }

  const quizBody = document.getElementById("quiz-body");
  const successView = document.getElementById("quiz-success-view");
  const summaryElem = document.getElementById("quiz-success-summary");
  const hintTextElem = document.getElementById("quiz-unlocked-hint-text");

  if (quizBody) quizBody.style.display = "none";
  if (successView) {
    successView.style.display = "block";
  }

  let commentoShot = "";
  if (STATE.quizShotsCount === 0) {
    commentoShot = "Prestazione da vero 110 e Lode: 0 errori, fegato salvo!";
  } else if (STATE.quizShotsCount === 1) {
    commentoShot = "Solo 1 errore (1 minishot bevuto)! Ottima prestazione accademica.";
  } else {
    commentoShot = `Complimenti per aver resistito a ${STATE.quizShotsCount} minishot di penitenza! La laurea è ufficialmente meritata!`;
  }

  if (summaryElem) {
    summaryElem.innerHTML = 
      `Hai risposto a tutte le 6 domande su Sistemi Operativi, Reti, Algoritmi e Concorrenza.<br>` +
      `<strong style="color: #fca5a5;">${commentoShot}</strong>`;
  }

  if (hintTextElem) {
    hintTextElem.innerHTML = `<strong>complimenti per aver completato il test. sfortunatamente non siamo bravi programmatori, quindi non ci sono indizi e non ci sono blocchi, è tutto aperto!</strong>`;
  }
}

function riproduciSuonoSuccessoQuiz() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // audio fallback
  }
}

// ============================================================================
// 10. AZIONI LETTERA FINALE E DEDICA SPECIALE (Stampa PDF, Navigazione & Riavvio)
// ============================================================================
function inizializzaAzioniLettera() {
  const printBtn = document.getElementById("btn-print-pdf");
  const printSpecialBtn = document.getElementById("btn-print-special-pdf");
  const restartBtn = document.getElementById("btn-restart-term");
  
  const btnOpenSpecialWarning = document.getElementById("btn-open-special-warning");
  const warningModal = document.getElementById("special-warning-modal");
  const btnProceedSpecial = document.getElementById("btn-proceed-special");
  const btnCancelSpecial = document.getElementById("btn-cancel-special");
  
  const letterPage = document.getElementById("letter-page");
  const specialPage = document.getElementById("special-dedication-page");
  const btnBackToLetter = document.getElementById("btn-back-to-letter");

  // Funzione sicura di stampa / salvataggio PDF
  const eseguiStampaPDF = () => {
    const originalTitle = document.title;
    const isSpecial = specialPage && specialPage.classList.contains("active");
    document.title = isSpecial ? "Dedica Speciale di Laurea" : "Dedica di Laurea - Dottore in Informatica";

    const ripristinaTitolo = () => {
      document.title = originalTitle;
      window.removeEventListener("afterprint", ripristinaTitolo);
    };
    window.addEventListener("afterprint", ripristinaTitolo);

    try {
      window.focus();
      window.print();
    } catch (e) {
      console.warn("Chiamata window.print() diretta fallita, tento su top window:", e);
      try {
        if (window.top && window.top !== window) {
          window.top.print();
        }
      } catch (err2) {
        alert("Per salvare in PDF: premi CTRL + P (oppure CMD + P su Mac) e seleziona 'Salva come PDF'.");
      }
    }
  };

  if (printBtn) {
    printBtn.addEventListener("click", eseguiStampaPDF);
  }

  if (printSpecialBtn) {
    printSpecialBtn.addEventListener("click", eseguiStampaPDF);
  }

  // Apertura popup avviso: "LEGGI QUANDO SEI DA SOLO"
  if (btnOpenSpecialWarning && warningModal) {
    btnOpenSpecialWarning.addEventListener("click", () => {
      warningModal.classList.add("active");
    });
  }

  // Pulsante 'Torna indietro' nel popup di avviso
  if (btnCancelSpecial && warningModal) {
    btnCancelSpecial.addEventListener("click", () => {
      warningModal.classList.remove("active");
    });
  }

  // Chiusura modal cliccando sullo sfondo
  if (warningModal) {
    warningModal.addEventListener("click", (e) => {
      if (e.target === warningModal) {
        warningModal.classList.remove("active");
      }
    });
  }

  // Pulsante 'Procedi ➔' nel popup: apre la dedica speciale di Riccardo
  if (btnProceedSpecial && warningModal && specialPage && letterPage) {
    btnProceedSpecial.addEventListener("click", () => {
      warningModal.classList.remove("active");
      letterPage.style.display = "none";
      letterPage.classList.remove("active");

      specialPage.style.display = "block";
      void specialPage.offsetWidth; // Reflow
      specialPage.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Pulsante per tornare dalla dedica speciale alla lettera principale
  if (btnBackToLetter && specialPage && letterPage) {
    btnBackToLetter.addEventListener("click", () => {
      specialPage.style.display = "none";
      specialPage.classList.remove("active");

      letterPage.style.display = "block";
      void letterPage.offsetWidth; // Reflow
      letterPage.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      if (confirm("Vuoi riavviare il terminale per rivivere l'esperienza o testarla di nuovo?")) {
        try {
          localStorage.removeItem(CONFIG.STORAGE_KEY);
        } catch (e) {
          console.warn("Storage cleanup failed:", e);
        }
        // Rimuove anche l'eventuale parametro ?skip=1 dall'URL
        window.location.href = window.location.pathname;
      }
    });
  }

  // Inizializza o aggiorna lo slot del video verticale
  inizializzaVideoSlot();
}

/**
 * Inizializza lo slot per il video verticale nella pagina della dedica
 */
function inizializzaVideoSlot() {
  const videoElem = document.getElementById("letter-video");
  const videoSourceElem = document.getElementById("letter-video-source");

  if (!videoElem) return;

  if (CONFIG.VIDEO && CONFIG.VIDEO.dedica) {
    const videoPath = CONFIG.VIDEO.dedica;
    if (videoSourceElem && videoSourceElem.getAttribute("src") !== videoPath) {
      videoSourceElem.src = videoPath;
    }
  }
}

// Utility per evitare XSS nei messaggi stampati
function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
