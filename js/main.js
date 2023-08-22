var lastpos = 0;
document.addEventListener('scroll', function () {
    let pos = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = document.documentElement.clientHeight || window.innerHeight;
    let sHeight = document.documentElement.scrollHeight;
    let pWidth = ((pos / (sHeight - windowHeight)) * 100);

    let header = document.getElementById('header');

    if (pos > header.clientHeight && (pos >= sHeight - windowHeight - 100 || lastpos <= pos)) {
        header.style.top = (-header.clientHeight) + 'px';
        header.style.opacity = 0;
    } else {
        header.style.top = 0;
        header.style.opacity = 1;
    }
    lastpos = pos;
}, true);

let dialog = document.getElementById('dialog-whatsapp');
let button = document.getElementById('dialog-whatsapp-button');
let isActive = false;

function showWhatsapp() {
    if (!isActive) {
        disable();
        dialog.style.visibility = 'visible';
        isActive = isActive ? false : true;
        dialog.style.display = 'block';
        dialog.style.transform = 'translateY(0)';
        button.style.backgroundImage = 'url(/assets/icons/close.svg)';
        button.style.transform = 'rotate(180deg)';
        dialog.style.opacity = 1;
        return;
    }
    hideWhatsapp();
}

function hideWhatsapp() {
    if (isActive) {
        dialog.style.transform = 'translateY(10%)';
        dialog.style.visibility = 'hidden';

        isActive = isActive ? false : true;
        button.style.backgroundImage = 'url(/assets/icons/whatsapp-white.svg)';
        button.style.transform = 'rotate(0)';

        dialog.style.opacity = 0;
        disable();
        return;
    }
    showWhatsapp();
}

function disable() {
    document.getElementById("dialog-whatsapp-button").disabled = true;

    setTimeout(function () {
        // dialog.style.display = 'none';
        document.getElementById("dialog-whatsapp-button").disabled = false;
    }, 300);
}

const options = {
    root: null,
    threshold: 0
};
const callback = function (entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            isActive ? hideWhatsapp() : '';
            document.getElementById("dialog-whatsapp-button").style.transform = 'translateX(300%)';
            document.getElementById("dialog-whatsapp-button").style.opacity = 0;
        } else {
            document.getElementById("dialog-whatsapp-button").style.transform = 'translateX(0)';
            document.getElementById("dialog-whatsapp-button").style.opacity = 1;
        }
    });
}
let observer = new IntersectionObserver(callback, options);

const target1 = document.getElementById("contact");
observer.observe(target1);