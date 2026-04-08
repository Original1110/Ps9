const consoleDev = document.getElementById("console");

let retryInterval;
let retryCount = 0;
let maxRetries = 5;
let jailbreakRunning = false;

// تحميل Jailbreak.js فقط
let JailbreakModule = null;

async function loadExploit() {
  try {
    const module = await import('../payloads/Jailbreak.js');
    JailbreakModule = module;

    consoleDev.append(`📦 Ready\n`);
    consoleDev.scrollTop = consoleDev.scrollHeight;

  } catch (e) {
    console.error("Load error:", e);
  }
}

// تشغيل الجيلبريك
function jailbreak() {

  if (jailbreakRunning) return;
  jailbreakRunning = true;

  document.getElementById('jailbreak').style.display = 'none';

  consoleDev.append(`⚡ Running exploit...\n`);
  consoleDev.scrollTop = consoleDev.scrollHeight;

  if (localStorage.getItem('HEN')) {
    JailbreakModule?.HEN?.();
  } else {
    JailbreakModule?.GoldHEN?.();
  }

  // بعد فترة نسمح بإعادة المحاولة
  setTimeout(() => {
    jailbreakRunning = false;
  }, 8000);
}

// Auto Jailbreak
function startAutoJailbreak() {

  consoleDev.append(`🚀 Auto jailbreak started...\n`);

  setTimeout(jailbreak, 3000);

  retryInterval = setInterval(() => {

    if (retryCount >= maxRetries) {
      clearInterval(retryInterval);
      return;
    }

    retryCount++;
    consoleDev.append(`🔁 Retry ${retryCount}\n`);
    consoleDev.scrollTop = consoleDev.scrollHeight;

    jailbreak();

  }, 10000);
}

// زر يدوي
document.getElementById('jailbreak').addEventListener('click', jailbreak);

// تشغيل
window.addEventListener('load', async function () {

  await loadExploit();

  startAutoJailbreak();

});
