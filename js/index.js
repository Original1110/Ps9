const ckbaj = document.getElementById('ckbaj');
const ckbdc = document.getElementById('ckbdc');
const consoleDev = document.getElementById("console");

let retryInterval;
let retryCount = 0;
let maxRetries = 5;
let jailbreakRunning = false;

// ✅ نجاح الجيلبريك
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
    document.getElementById('overlay-success').style.display = 'block';
  }, 3000);

  clearInterval(retryInterval);
}

// 🔁 Auto Jailbreak
function startAutoJailbreak() {

  if (sessionStorage.getItem('jbsuccess')) return;

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

// 🚀 الجيلبريك
async function jailbreak() {
  try {

    if (sessionStorage.getItem('jbsuccess')) {
      consoleDev.append(`Already jailbroken!\n`);
      return;
    }

    if (jailbreakRunning) return;
    jailbreakRunning = true;

    document.getElementById('jailbreak').style.display = 'none';

    const modules = await Promise.all([
      import('../payloads/Jailbreak.js'),
      import('../psfree/alert.mjs')
    ]);

    const JailbreakModule = modules[0];

    consoleDev.append(`⚡ Running exploit...\n`);
    consoleDev.scrollTop = consoleDev.scrollHeight;

    if (localStorage.getItem('HEN')) {
      JailbreakModule?.HEN?.();
    } else {
      JailbreakModule?.GoldHEN?.();
    }

    setTimeout(() => {

      if (sessionStorage.getItem('jbsuccess')) {
        onJailbreakSuccess();
      } else {
        jailbreakRunning = false;
        consoleDev.append(`❌ Failed... retrying\n`);
        consoleDev.scrollTop = consoleDev.scrollHeight;
      }

    }, 8000);

  } catch (e) {
    jailbreakRunning = false;
    console.error("Failed to jailbreak:", e);
  }
}

// ⚙️ تحميل الصفحة
window.addEventListener('load', function () {
  startAutoJailbreak();
});