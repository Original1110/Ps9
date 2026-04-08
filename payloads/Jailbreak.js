export function GoldHEN() {
    window.payload_path = './payloads/GoldHEN/GoldHEN.bin';

    // ⏱️ انتظر تحميل البايلود ثم اعتبره نجاح
    setTimeout(() => {
        sessionStorage.setItem('jbsuccess', '1');
    }, 5000);
}

export function HEN() {
    window.payload_path = './payloads/HEN/HEN.bin';

    setTimeout(() => {
        sessionStorage.setItem('jbsuccess', '1');
    }, 5000);
}