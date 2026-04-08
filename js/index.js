const consoleDev = document.getElementById("console");

let retryInterval;
let retryCount = 0;
let maxRetries = 5;
let jailbreakRunning = false;

let JailbreakModule = null;

// ✅ نجاح
function onJailbreakSuccess() {

  if (sessionStorage.getItem('jbsuccess')) return;

  sessionStorage.setItem('jbsuccess', '1');

  consoleDev.append(`✅ Jailbreak Success!\n`);
  consoleDev.scrollTop = consoleDev.scrollHeight;

  let msg = document.getElementById('success-msg');
  if (msg) msg.style.display = 'block';

  let title = document.getElementById('header-title');
  if (title) title.innerText = "✅ Jailbreak Done";

  setTimeout(() => {
    let overlay = document.getElementById('overlay-success');
    if (overlay) overlay.style.display = 'block';
  }, 3000);

  clearInterval(retryInterval);
}

// 🚀 تحميل مرة واحدة (بدون alert.mjs)
let exploitLoaded = false;

async function loadExploit() {
  try {

    if (exploitLoaded) return;

    await import('../psfree/alert.mjs'); // ✅ رجعناه
    const module = await import('../payloads/Jailbreak.js');

    JailbreakModule = module;

    exploitLoaded = true;

    consoleDev.append(`📦 Exploit Loaded\n`);
    consoleDev.scrollTop = consoleDev.scrollHeight;

  } catch (e) {
    console.error("Exploit load error:", e);
  }
}

// ▶️ تشغيل
function runExploit() {

  if (!JailbreakModule) {
    consoleDev.append(`❌ Exploit not loaded\n`);
    return;
  }

  consoleDev.append(`⚡ Running exploit...\n`);
  consoleDev.scrollTop = consoleDev.scrollHeight;

  if (localStorage.getItem('HEN')) {
    JailbreakModule?.HEN?.();
  } else {
    JailbreakModule?.GoldHEN?.();
  }
}

// 🔁 الجيلبريك
function jailbreak() {

  if (sessionStorage.getItem('jbsuccess')) return;

  if (jailbreakRunning) return;
  jailbreakRunning = true;

  document.getElementById('jailbreak').style.display = 'none';

  runExploit();

  setTimeout(() => {

    if (window.payload_path) {
      onJailbreakSuccess();
    } else {
      jailbreakRunning = false;
      consoleDev.append(`❌ Failed... retrying\n`);
      consoleDev.scrollTop = consoleDev.scrollHeight;
    }

  }, 8000);
}

// 🔁 Auto
function startAutoJailbreak() {

  consoleDev.append(`🚀 Auto jailbreak started...\n`);

  setTimeout(() => {
    jailbreak();
  }, 3000);

  retryInterval = setInterval(() => {

    if (sessionStorage.getItem('jbsuccess') || retryCount >= maxRetries) {
      clearInterval(retryInterval);
      return;
    }

    retryCount++;
    consoleDev.append(`🔁 Retry ${retryCount}\n`);
    consoleDev.scrollTop = consoleDev.scrollHeight;

    jailbreak();

  }, 10000);
}

// زر
document.getElementById('jailbreak').addEventListener('click', jailbreak);

// تشغيل
window.addEventListener('load', async function () {

  await loadExploit(); // 🔥 مهم

  startAutoJailbreak();

});
