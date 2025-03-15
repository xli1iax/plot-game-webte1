const hero = document.querySelector('#hero');
let leftPosition = 0;
const keys = {};
const background = document.getElementById('background');
let backgroundPosition = 0;
let backgroundSpeed = 2;
let isMovingRight = false;
let runAnimationInterval = null;
const runningImages = ["plot/run1.PNG", "plot/static.PNG", "plot/run2.PNG"];
const standingImage = "plot/static.PNG";
let currentRunningImage = 0;
const onePercentHeight = window.innerHeight / 100;
const minX = onePercentHeight*43;
const maxX = onePercentHeight*88;
window.isEnded = false
const toggleRunningImage = () => {
    if (!isMovingRight) return;
    currentRunningImage = (currentRunningImage + 1) % runningImages.length;
    hero.src = runningImages[currentRunningImage];
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        if (!keys[event.key]) {
            keys[event.key] = true;
            if (!isMovingRight) {
                isMovingRight = true;
                moving = true;
                isStanding = false;
                if (!runAnimationInterval) {
                    runAnimationInterval = setInterval(toggleRunningImage, 200);
                }
            }
        }
    }
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight') {
        isMovingRight = false;
        clearInterval(runAnimationInterval);
        runAnimationInterval = null;
        moving = false;
        if (!isMovingRight) {
            hero.src = standingImage;
            isStanding = true;
        }
    }

    delete keys[event.key];
});

let moving = false;
const moveBackground = () => {
    if (moving) {
        backgroundPosition -= backgroundSpeed;
    }
    background.style.transform = `translateX(${backgroundPosition}px)`;
};

let moveSpeed;
const moveHero = () => {
    moveSpeed = 5;
    if (keys['ArrowRight'] || isMovingRight) {
        leftPosition += moveSpeed;
        hero.style.left = `${leftPosition}px`;
    }

    const currentRect = hero.getBoundingClientRect();
    const currentTop = currentRect.top;
    const currentBottom = window.innerHeight - currentRect.bottom;

    const onePercentHeight = window.innerHeight / 100;

    if (keys['ArrowUp'] && currentBottom < onePercentHeight * 43) {
        hero.style.top = (currentTop - 10) + 'px';
    }

    if (keys['ArrowDown'] && currentBottom >4*onePercentHeight) {
        hero.style.top = (currentTop + 10) + 'px';
    }
    adjustObstacleZIndex();
};

setInterval(() => {
    moveHero();
    moveBackground();
}, 50);

const healthBar = document.querySelector('.health');
let health = 100;
let collisionCount = 0;

const obstacles = [];
const staticObstacles = [
    { startX: '26%', speed: 3, src: "plot/ghost1.PNG", type: "static" },
    { startX: '54%', speed: 2, src: "plot/ghost2.PNG", type: "movable" },
    { startX: '32%', speed: 3, src: "plot/ghost3.PNG", type:"static" },
    { startX: '78%', speed: 1, src: "plot/ghost4.PNG", type: "movable" },
    { startX: '60%', speed: 3, src: "plot/ghost5.PNG", type:"static" },
    { startX: '85%', speed: 3, src: "plot/ghost6.PNG", type:"static" },
    { startX: '13%', speed: 3, src: "plot/ghost4.PNG", type:"static" },
    { startX: '75%', speed: 1, src: "plot/ghost1.PNG", type:"movable" },
    { startX: '50%', speed: 3, src: "plot/ghost3.PNG", type:"static" },
    { startX: '35%', speed: 3, src: "plot/ghost5.PNG", type:"static" }


];

const createStaticObstacles = () => {
    staticObstacles.forEach(obstacleData => {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');

        obstacle.style.width = '6%';
        obstacle.style.height = '10%';
        const randomStartY = Math.random() * (maxX - minX) + minX;

        obstacle.style.left = obstacleData.startX;
        obstacle.style.top = `${randomStartY}px`;
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

const reduceHealth = () => {
    health -= 20;
    if (health < 0) health = 0;
    healthBar.style.width = `${health}%`;
};
function moveMovableObstacles() {
    const movableObstacles = staticObstacles.filter(obstacle => obstacle.type === "movable");

    const minBoundary = 43;
    const maxBoundary = 85;
    const buffer = 1;

    movableObstacles.forEach(obstacle => {
        const obstacleElement = obstacles.find(
            el => el.style.backgroundImage.includes(obstacle.src)
        );

        if (!obstacleElement) return;

        let currentY = parseFloat(window.getComputedStyle(obstacleElement).top);
        let currentYPercent = (currentY / window.innerHeight) * 100;

        if (currentYPercent <= minBoundary + buffer) {
            obstacle.speed = Math.abs(obstacle.speed);
        } else if (currentYPercent >= maxBoundary - buffer) {
            obstacle.speed = -Math.abs(obstacle.speed);
        }

        currentYPercent += obstacle.speed;
        obstacleElement.style.top = `${currentYPercent}%`;
    });
}


const checkCollision = () => {
    const heroRect = hero.getBoundingClientRect();
    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const isOverlapping = !(
            heroRect.right < obstacleRect.left ||
            heroRect.left > obstacleRect.right
        ) && (
            heroRect.top === obstacleRect.top ||
            Math.abs(heroRect.bottom - obstacleRect.bottom) <= 7

        );


        if (isOverlapping && !obstacle.dataset.collided) {
            collisionCount++;
            reduceHealth();

            if (collisionCount >= 5) {

            }

            obstacle.dataset.collided = true;
        }
    });
};
const adjustObstacleZIndex = () => {
    const heroRect = hero.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();


        if (obstacleRect.bottom < heroRect.bottom) {
            obstacle.style.zIndex = 1;
        } else {
            obstacle.style.zIndex = 3;
        }
    });
};

const checkWinCondition = () => {
    const heroLeftPosition = hero.getBoundingClientRect().left;
    const screenWidth = window.innerWidth;

    if (heroLeftPosition > screenWidth) {
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
    isMobile = true;
    let sensor = new Gyroscope();
    let x, y, z;
    navigator.permissions.query({ name: 'gyroscope' }).then(function(permissionStatus) {
        if (permissionStatus.state === 'granted') {
            sensor.start();
        } else {
            console.log("Permission denied");
        }
    });

    sensor.onreading = () => {
        x = sensor.x * 90;
        y = sensor.y * 120;
        z = sensor.z * -50;

        if (screen.orientation.type === 'landscape-secondary') {
            x *= -1;
            y *= -1;
        }

        if (x > 15) {
            isMovingRight = true;
            if (!runAnimationInterval) {
                runAnimationInterval = setInterval(toggleRunningImage, 200);
            }
            moveHero();
        } else if (x < -15) {
            isMovingRight = false;
            clearInterval(runAnimationInterval);
            runAnimationInterval = null;
            hero.src = standingImage;
        }

        const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);
        const newLeft = currentLeft + x;
        const currentBottom = parseInt(window.getComputedStyle(hero).bottom, 10);
        const newBottom = currentBottom + y;
        if(newBottom < onePercentHeight * 43  && newBottom >4*onePercentHeight) hero.style.bottom = newBottom + 'px'
        hero.style.left = newLeft + "px";

    };

    sensor.onerror = errorHandler;

    function errorHandler(event) {
        console.log(event.error.name, event.error.message);
    }
} else {
    moveHero();
}

const tooltip = document.getElementById('tooltip');
const showTooltipBtn = document.querySelector('.show-tooltip-btn');


showTooltipBtn.addEventListener('click', () => {
    if (isMobile) {
        tooltip.innerText = 'The goal of the level is to avoid ghosts on the way to the university! ' +
            'Controls: Move forward - tilt right, move up/down - tilt right/left.';
    } else {
        tooltip.innerText = 'The goal of the level is to avoid ghosts on the way to the university! ' +
            'Controls: Move forward - right arrow, move up/down - right/left arrows.';
    }

    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 5000);
});
const gameLoop = () => {
    checkWinCondition();
    checkCollision();
    moveMovableObstacles();

    requestAnimationFrame(gameLoop);
};

gameLoop();