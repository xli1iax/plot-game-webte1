const background = document.querySelector("#background");
const hero = document.querySelector('#hero');
const keys = {};


function moveHero() {
    const currentTop = parseInt(window.getComputedStyle(hero).top, 10);
    const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

    if (keys['ArrowUp'] &&currentTop > 0 ) {
        hero.style.top = (currentTop - 25) + 'px';
    }
    if (keys['ArrowDown'] && currentTop < window.innerHeight){
        hero.style.top = (currentTop + 25) + 'px'
    }
    if (keys['ArrowLeft'] && currentLeft > 0  ) {
        hero.style.left = (currentLeft - 30) + 'px';
    }
    if (keys['ArrowRight'] && currentLeft < window.innerWidth) {
        hero.style.left = (currentLeft + 30) + 'px';
    }

    requestAnimationFrame(moveHero);
}
moveHero();
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
}) ;

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
        y = sensor.y * (60);
        z = sensor.z * (-50);


        if (screen.orientation.type === 'landscape-secondary') {
            x *= -1;
            y *= -1;
        }
        const currentTop = parseInt(window.getComputedStyle(hero).top, 10);
        const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

        const newTop = currentTop - y;
        const newLeft = currentLeft + x;


        if (newTop <= window.innerHeight) {
            hero.style.top = newTop + "px";
        }

        if (newLeft >= 0 && newLeft <= window.innerWidth) {
            hero.style.left = newLeft + "px";
        }
    };

    sensor.onerror = (event) => {
        console.log(event.error.name, event.error.message);
    };

}
else {
    moveHero();
}


const checkWinCondition = () => {
    const heroTopPosition = hero.getBoundingClientRect().top;
    const heroLeftPosition = hero.getBoundingClientRect().left;
    const heroRightPosition = hero.getBoundingClientRect().right;
    const BackHeightCenter = background.getBoundingClientRect().height/4;
    const BackWidthCenter = background.getBoundingClientRect().width/3;
    if (heroTopPosition < BackHeightCenter && heroLeftPosition>BackWidthCenter  && heroRightPosition < 2*BackWidthCenter) {
        window.isEnded = true;
    }
};

window.isEnded = false;

const tooltip = document.getElementById('tooltip');
const showTooltipBtn = document.querySelector('.show-tooltip-btn');
let mobile;
(function () {
    function isMobile() {
        return /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
    }
    mobile = isMobile();
    console.log("Is mobile:", mobile);
})();
showTooltipBtn.addEventListener('click', () => {
    if (mobile) {
        tooltip.innerText = 'The goal of the level is to get ISIC through the turnstile to get to the university!\n' +
            'Controls: up/down movement - tilt up/down, right/left movement - tilt right/left.';
    } else {
        tooltip.innerText = 'The goal of the level is to get ISIC through the turnstile to get to the university!\n' +
            'Controls: Up/down movement - up/down arrows, right/left movement - right/left arrows.';
    }

    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 5000);
});
const gameLoop = () => {
    checkWinCondition();
    requestAnimationFrame(gameLoop);
};

gameLoop();