const hero = document.querySelector('#hero');
const keys = {};

let heroWidth = hero.offsetWidth;
let screenWidth = window.innerWidth;
let heroHeight = hero.offsetHeight;
let screenHeight = window.innerHeight;

window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
});

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});
const checkWinCollision = () => {
    const hero = document.querySelector('#hero');
    if (!hero) {
        console.warn('Елемент hero не знайдено!');
        return;
    }

    const seat = document.querySelector('#seat');
    if (!seat) {
        console.warn('Елемент seat не знайдено!');
        return;
    }

    const heroRect = hero.getBoundingClientRect();
    const seatRect = seat.getBoundingClientRect();

    console.log('Hero:', heroRect);
    console.log('Seat:', seatRect);

    if (
        heroRect.right > seatRect.left + seatRect.width / 2 &&
        heroRect.left < seatRect.right &&
        heroRect.bottom > seatRect.top &&
        heroRect.top < seatRect.bottom
    ) {
        isGameActive = false;
        console.log('Зіткнення виявлено!');
        console.log('Hero:', heroRect);
        console.log('Seat:', seatRect);
        window.isEnded = true;
    }
};
let isGameActive = true;
function moveHero() {
    if (!isGameActive) return;
    const currentTop = parseInt(window.getComputedStyle(hero).top, 10);
    const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

    if (keys['ArrowUp'] && currentTop >screenHeight/10 ) {
        hero.style.top = (currentTop - 10) + 'px';
    }
    if (keys['ArrowDown'] && currentTop + heroHeight < -screenHeight/3.5 + screenHeight) {
        hero.style.top = (currentTop + 15) + 'px';
    }
    if (keys['ArrowLeft'] && currentLeft > screenWidth/10) {
        hero.style.left = (currentLeft - 15) + 'px';
    }
    if (keys['ArrowRight'] && currentLeft + heroWidth < screenWidth - screenWidth/12) {
        hero.style.left = (currentLeft + 15) + 'px';
    }
    checkWinCollision();
    requestAnimationFrame(moveHero);
}

moveHero();

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
}) ;
const obstacles = [];
const staticObstacles = [
    { startX: '26%', startY: '26%', speed: 3, src: "plot/obstacle-person-1.PNG"},
    { startX: '54%', startY: '27%', speed: 3, src: "plot/obstacle-person-2.PNG" },
    { startX: '32%', startY: '28%', speed: 3, src: "plot/obstacle-person-3.PNG" },
    { startX: '32%', startY: '63%', speed: 3, src: "plot/obstacle-person-4.PNG" },
    { startX: '60%', startY: '63%', speed: 3, src: "plot/obstacle-person-5.PNG" },

    { startX: '85%', startY: '32%', speed: 3, src: "plot/obstacle-person-7.PNG" },
    { startX: '85%', startY: '19%', speed: 3, src: "plot/obstacle-person-3.PNG" },
    { startX: '78%', startY: '31%', speed: 3, src: "plot/obstacle-person-5.PNG" },
    { startX: '78%', startY: '19%', speed: 3, src: "plot/obstacle-person-3.PNG" },
    { startX: '71%', startY: '31%', speed: 3, src: "plot/obstacle-person-2.PNG" },
    { startX: '71%', startY: '19%', speed: 3, src: "plot/obstacle-person-7.PNG" },

    { startX: '78%', startY: '31%', speed: 3, src: "plot/obstacle-person-6.PNG" },
    { startX: '78%', startY: '19%', speed: 3, src: "plot/obstacle-person-4.PNG" },
    { startX: '78%', startY: '58%', speed: 3, src: "plot/obstacle-person-5.PNG" },
    { startX: '85%', startY: '58%', speed: 3, src: "plot/obstacle-person-6.PNG" },
    { startX: '85%', startY: '71%', speed: 3, src: "plot/obstacle-person-1.PNG" },

    { startX: '26%', startY: '63%', speed: 3, src: "plot/obstacle-person-6.PNG" },
    { startX: '65.5%', startY: '63%', speed: 3, src: "plot/obstacle-person-7.PNG" },
    { startX: '48.5%', startY: '26%', speed: 3, src: "plot/obstacle-person-1.PNG" },
    { startX: '71%', startY: '63%', speed: 3, src: "plot/obstacle-person-3.PNG" },



    { startX: '36%', startY: '72%', speed: 3, src: "plot/obstacle-person-4.PNG" },
    { startX: '37%', startY: '20%', speed: 3, src: "plot/obstacle-person-1.PNG" },

    { startX: '45%', startY: '72%', speed: 3, src: "plot/obstacle-person-6.PNG" },
    { startX: '43%', startY: '30%', speed: 3, src: "plot/obstacle-person-7.PNG" },
    { startX: '55%', startY: '72%', speed: 3, src: "plot/obstacle-person-5.PNG" },
    { startX: '53%', startY: '55%', speed: 3, src: "plot/obstacle-person-4.PNG" },
    { startX: '55%', startY: '63%', speed: 3, src: "plot/obstacle-person-3.PNG" },

    { startX: '59%', startY: '18%', speed: 3, src: "plot/obstacle-person-1.PNG" },
    { startX: '60%', startY: '28%', speed: 3, src: "plot/obstacle-person-5.PNG" },


    { startX: '33%', startY: '35%', speed: 3, src: "plot/obstacle-person-7.PNG" },

    { startX: '50%', startY: '61%', speed: 3, src: "plot/obstacle-person-7.PNG" },

    { startX: '68%', startY: '55%', speed: 3, src: "plot/obstacle-person-1.PNG" },
    { startX: '73%', startY: '50%', speed: 3, src: "plot/obstacle-person-1.PNG" },

    { startX: '50%', startY: '35%', speed: 3, src: "plot/obstacle-person-3.PNG" }
];
const createStaticObstacles = () => {
    staticObstacles.forEach(obstacleData => {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');

        obstacle.style.width = '6%';
        obstacle.style.height = '10%';

        obstacle.style.left = obstacleData.startX;
        obstacle.style.top = obstacleData.startY;
        obstacle.dataset.speed = obstacleData.speed;
        obstacle.style.backgroundImage = `url("${obstacleData.src}")`;
        obstacle.style.backgroundSize = 'contain';
        obstacle.style.backgroundRepeat = 'no-repeat';
        obstacle.style.backgroundPosition = 'center';
        document.querySelector('.game').appendChild(obstacle);
        obstacles.push(obstacle);
    });
};

createStaticObstacles();

window.isGameOver = false
let collisionCount = 0;
const checkCollision = () => {
    const heroRect = hero.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();

        const isOverlapping = !(
            heroRect.right < obstacleRect.left ||
            heroRect.left > obstacleRect.right  ||
            heroRect.bottom < obstacleRect.top ||
            heroRect.top > obstacleRect.bottom
        );
        if (isOverlapping && !obstacle.dataset.collided) {
            collisionCount++;
            reduceHealth();
            if (collisionCount >= 5) {
                reduceHealth();
                window.isGameOver = true

            }

            obstacle.dataset.collided = true;
        }
    });
};
const healthBar = document.querySelector('.health');
let health = 100;

const reduceHealth = () => {
    health -= 20;
    if (health < 0) health = 0;
    healthBar.style.width = `${health}%`;
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
        tooltip.innerText = 'The goal of the level is to take a free seat on the bus without hitting any passengers! ' +
            'Controls: Forward movement - tilt to the right, left/right movement - tilt down/up.';
    } else {
        tooltip.innerText = 'The goal of the level is to take a seat on the bus without hitting any passengers!\n' +
            'Controls: move forward - right arrow, move right/left - down/up arrows.';
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
        x = sensor.x * (120);
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


        if (newTop >screenHeight/10 && newTop + heroHeight < -screenHeight/3.5 + screenHeight) {
            hero.style.top = newTop + "px";
        }

        if (newLeft >  screenWidth/10 && newLeft + heroWidth < screenWidth - screenWidth/12) {
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

const gameLoop = () => {
    checkCollision();

    requestAnimationFrame(gameLoop);
};

gameLoop();