const hero = document.querySelector('#hero');
const keys = {};

let heroWidth = hero.offsetWidth;
let screenWidth = window.innerWidth;
let heroHeight = hero.offsetHeight;
let screenHeight = window.innerHeight;
console.log("I'm here");
window.isGameOver = false
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

function moveHero() {
    const currentTop = parseInt(window.getComputedStyle(hero).top, 10);
    const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

    if (keys['ArrowUp'] ) {
        hero.style.top = (currentTop - 1) + 'px';
    }
    if (keys['ArrowDown'] && currentTop + heroHeight < screenHeight) {
        hero.style.top = (currentTop + 1) + 'px';
    }
    if (keys['ArrowLeft'] && currentLeft > 0) {
        hero.style.left = (currentLeft - 3) + 'px';
    }
    if (keys['ArrowRight'] && currentLeft + heroWidth < screenWidth) {
        hero.style.left = (currentLeft + 3) + 'px';
    }

    requestAnimationFrame(moveHero);
}

moveHero();

const obstacles = [];
const staticObstacles = [
    { type: 'small-puddle', startX: '10%', startY: '-200px', speed: 3 },
    { type: 'big-puddle', startX: '80%', startY: '-400px', speed: 3 },
    { type: 'small-puddle', startX: '20%', startY: '-300px', speed: 3 },
    { type: 'ine-puddle', startX: '70%', startY: '-500px', speed: 3 },
    { type: 'big-puddle', startX: '50%', startY: '-100px', speed: 3 },

    { type: 'small-puddle', startX: '10%', startY: '-700px', speed: 3 },
    { type: 'big-puddle', startX: '80%', startY: '-700px', speed: 3 },
    { type: 'small-puddle', startX: '20%', startY: '-900px', speed: 3 },
    { type: 'ine-puddle', startX: '70%', startY: '-800px', speed: 3 },
    { type: 'big-puddle', startX: '50%', startY: '-1200px', speed: 3 },

    { type: 'small-puddle', startX: '5%', startY: '-1400px', speed: 3 },
    { type: 'ine-puddle', startX: '75%', startY: '-1600px', speed: 3 },
    { type: 'small-puddle', startX: '15%', startY: '-1500px', speed: 3 },
    { type: 'ine-puddle', startX: '65%', startY: '-1700px', speed: 3 },
    { type: 'big-puddle', startX: '45%', startY: '-1300px', speed: 3 },

    { type: 'small-puddle', startX: '7%', startY: '-1900px', speed: 3 },
    { type: 'ine-puddle', startX: '77%', startY: '-2100px', speed: 3 },
    { type: 'small-puddle', startX: '17%', startY: '-2200px', speed: 3 },
    { type: 'ine-puddle', startX: '67%', startY: '-2000px', speed: 3 },
    { type: 'big-puddle', startX: '47%', startY: '-2300px', speed: 3 }
];

const createStaticObstacles = () => {
    staticObstacles.forEach(obstacleData => {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle', obstacleData.type);

        if (obstacleData.type === 'small-puddle') {
            obstacle.style.width = '20%';
            obstacle.style.height = '10%';
        } else if (obstacleData.type === 'big-puddle') {
            obstacle.style.width = '40%';
            obstacle.style.height = '20%';
        } else if (obstacleData.type === 'ine-puddle') {
            obstacle.style.width = '30%';
            obstacle.style.height = '15%';
        }

        obstacle.style.left = obstacleData.startX;
        obstacle.style.top = obstacleData.startY;
        obstacle.dataset.speed = obstacleData.speed;

        document.querySelector('.game').appendChild(obstacle);
        obstacles.push(obstacle);
    });
};

createStaticObstacles();

const moveObstacles = () => {
    obstacles.forEach(obstacle => {
        const speed = parseFloat(obstacle.dataset.speed);
        const currentY = parseFloat(obstacle.style.top);
        obstacle.style.top = `${currentY + speed}px`;

        if (currentY > window.innerHeight) {
            obstacle.remove();
        }
    });
};
let collisionCount = 0;
const checkCollision = () => {
    const heroRect = hero.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();

        const isOverlapping = !(
            heroRect.right < obstacleRect.left + 50 ||
            heroRect.left > obstacleRect.right - 100 ||
            heroRect.bottom < obstacleRect.top ||
            heroRect.top > obstacleRect.bottom - 175
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
const checkWinCondition = () => {
    const heroTopPosition = hero.getBoundingClientRect().top;

    if (heroTopPosition < -150) {
        window.isEnded = true;
    }
};


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
else {
    moveHero();
}

const tooltip = document.getElementById('tooltip');
const showTooltipBtn = document.querySelector('.show-tooltip-btn');
function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

showTooltipBtn.addEventListener('click', () => {
    if (isMobile()) {
        tooltip.innerText = 'The goal of the level is to run forward to the bus stop without hitting any obstacles!\n' +
            'Controls: move forward - tilt forward, move right/left - tilt right/left.';
    } else {
        tooltip.innerText = 'The goal of the level is to run forward to the bus stop without hitting any obstacles!\n' +
            'Controls: Forward movement - up arrow, left/right movement - right/left arrow.';
    }

    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 5000);
});
const gameLoop = () => {
    moveObstacles();
    checkCollision();
    checkWinCondition();
    requestAnimationFrame(gameLoop);
};
gameLoop();