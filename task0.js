const hero = document.getElementById('hero');
const keys = {};

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
let heroWidth;
let heroHeight;
if (hero) {
    heroWidth = hero.offsetWidth;
    heroHeight = hero.offsetHeight;
    console.log(heroWidth);
} else {
    console.log('Елемент не знайдений');
}

window.isEnded = false;
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;

    const currentTop = parseInt(window.getComputedStyle(hero).top, 10);
    const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

    switch (event.key) {
        case 'ArrowUp':
            if (currentTop > 0) {
                hero.style.top = (currentTop - 15) + 'px';
            }
            break;
        case 'ArrowRight':
            if (currentLeft + heroWidth < screenWidth) {
                hero.style.left = (currentLeft + 15) + 'px';
            }
            break;
        case 'ArrowLeft':
            if (currentLeft > 0) {
                hero.style.left = (currentLeft - 15) + 'px';
            }
            break;
        case 'ArrowDown':
            if (currentTop + heroHeight < screenHeight) {
                hero.style.top = (currentTop + 15) + 'px';
            }
            break;
        default:
            break;
    }
});

setInterval(() => {
    const currentTop = parseInt(window.getComputedStyle(hero).top, 10);
    const windowHeight = window.innerHeight;

    if(10 > currentTop) {
        window.isTop = true;

    }
}, 50)


document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

const tooltip = document.getElementById('tooltip');
const showTooltipBtn = document.querySelector('.show-tooltip-btn');

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

showTooltipBtn.addEventListener('click', () => {
    if (isMobile()) {
        tooltip.innerText = 'Let\'s get to grips with the controls! Moving left/right is done by tilting the device to' +
            ' the right/left respectively. ' +
            'Moving forward/backward is done by tilting the device up/down respectively. ' +
            'In order to complete the level, you need to climb the stairs!';
    } else {
        tooltip.innerText = 'Let\'s try to understand the controls a little bit!' +
            ' Moving left/right is done by pressing the right/left arrows on the keyboard respectively. ' +
            'You can move forward/backward by pressing the up/down arrows on the keyboard respectively. ' +
            'To complete the level, you need to climb the stairs!';
    }

    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 5000);
});

navigator.permissions.query({ name: "gyroscope" }).then(function(permissionStatus) {
    if (permissionStatus.state === 'granted') {
        console.log("Доступ до гіроскопа надано.");
    } else if (permissionStatus.state === 'denied') {
        console.log("Доступ до гіроскопа відхилено.");
    } else {
        console.log("Доступ до гіроскопа очікується.");
    }
});

if (window.matchMedia("(pointer: coarse)").matches) {
    let sensor = new Gyroscope();
    let x,y, z;

    navigator.permissions.query({ name: 'gyroscope' }).then(function(permissionStatus) {
        if (permissionStatus.state === 'granted') {
            sensor.start();
        } else {
            console.log("Permission denied");
        }
    });

    sensor.onreading = () => {
        x = sensor.x * (90);
        y = sensor.y * (80);
        z = sensor.z * (-50);


        if (screen.orientation.type === 'landscape-secondary') {
            x *= -1;
            y *= -1;
        }
        const currentTop = parseInt(window.getComputedStyle(hero).top, 10);
        const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

        const newTop = currentTop - y;
        const newLeft = currentLeft + x;


        if (newTop <= window.innerHeight - hero.offsetHeight ) {
            hero.style.top = newTop + "px";
        }

        if (newLeft >= window.innerWidth/3 && newLeft <= window.innerWidth - window.innerWidth/3 - hero.offsetWidth) {
            hero.style.left = newLeft + "px";
        }

    };

    sensor.onerror = (event) => {
        console.log(event.error.name, event.error.message);
    };

}

