const ckbaj = document.getElementById('ckbaj');
const ckbdc = document.getElementById('ckbdc');
const visibleDiv = localStorage.getItem('visibleDiv') || 'jailbreak-page';
const savedaj = localStorage.getItem('autojbstate');
const savedc = localStorage.getItem('dbugc');
const menuBtns = document.querySelectorAll('.menu-btn');
const psBtns = document.querySelectorAll('.ps-btn');
const plsbtn = document.querySelectorAll('.button-container button');
const consoleDev = document.getElementById("console");

var ps4fw;

/* 🔹 إخفاء Floating Menu مباشرة */
window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.floating-menu');
  if (menu) menu.style.display = 'none';

  loadsettings();

  /* 🔹 Auto Jailbreak */
  setTimeout(() => {
    const jb = document.getElementById("jailbreak");
    if (jb) jb.click();
  }, 2000);
});

/* ========================= */
/* 🔹 شاشة سوداء بعد النجاح */
/* ========================= */
function showBlackScreen() {
  let screen = document.getElementById('black-screen');

  if (!screen) {
    screen = document.createElement('div');
    screen.id = 'black-screen';
    screen.innerHTML = "اضغط على زر PS للخروج";

    screen.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:black;
      color:white;
      font-size:28px;
      text-align:center;
      padding-top:20%;
      z-index:99999;
    `;

    document.body.appendChild(screen);
  }

  screen.style.display = "block";
}

/* ========================= */

document.getElementById('jailbreak').addEventListener('click', () => {
  jailbreak();
});

document.getElementById('binloader').addEventListener('click', () => {
  binloader();
});

document.querySelectorAll('button[data-func]').forEach(button => {
  button.addEventListener('click', () => {
    const payload = button.getAttribute('data-func');
    Loadpayloads(payload);
  });
});

document.getElementById('generate-cache-btn').addEventListener('click', () => {
  fetch('/generate_manifest', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      alert('Error: ' + error);
    });
});

document.getElementById('update-exploit').addEventListener('click', () => {
  fetch('/update_exploit', { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      document.getElementById('console').textContent =
        data.results.join('\n') + "\nUpdate cache recommended";
    })
    .catch(err => {
      alert('Error: ' + err);
    });
});

ckbaj.addEventListener('change', (e) => {
  localStorage.setItem('autojbstate', e.target.checked);
});

ckbdc.addEventListener('change', (e) => {
  localStorage.setItem('dbugc', e.target.checked);
});

/* ========================= */
/* 🔥 أهم تعديل هنا (Success Hook) */
/* ========================= */
async function jailbreak() {
  try {

    if (sessionStorage.getItem('jbsuccess')) {
      consoleDev.append(`Already jailbroken!\n`);
      return;
    }

    document.getElementById('jailbreak').style.display = 'none';

    const modules = await loadMultipleModules([
      '../payloads/Jailbreak.js',
      '../psfree/alert.mjs'
    ]);

    const JailbreakModule = modules[0];

    let success = false;

    if (localStorage.getItem('HEN')) {
      if (JailbreakModule?.HEN) {
        JailbreakModule.HEN();
        success = true;
      }
    } else {
      if (JailbreakModule?.GoldHEN) {
        JailbreakModule.GoldHEN();
        success = true;
      }
    }

    /* 🔹 عند نجاح الجيلبريك */
    if (success) {
      sessionStorage.setItem('jbsuccess', 1);

      setTimeout(() => {
        showBlackScreen();
      }, 2000);
    }

  } catch (e) {
    console.error("Jailbreak failed:", e);
  }
}

/* باقي الكود بدون تغيير (مختصر للحفاظ على نفس وظيفتك) */

async function loadMultipleModules(files) {
  try {
    return await Promise.all(files.map(file => import(file)));
  } catch (error) {
    console.error(error);
  }
}

function loadsettings() {
  CheckFW();
  checksettings();
}
