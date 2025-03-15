const hero = document.querySelector('#hero');
let leftPosition = 0;
const keys = {};
const background = document.getElementById('background');
let backgroundPosition = 0;
let backgroundSpeed = 2;
let isMovingRight = false;
let runAnimationInterval = null;
let isJumping = false;
let isStanding = true;
const runningImages = ["plot/run1.PNG", "plot/static.PNG", "plot/run2.PNG"];
const jumpingImage = "plot/jump.PNG";
const standingImage = "plot/static.PNG";
let currentRunningImage = 0;

console.log("I'm here");


const obstacles = [];

const staticObstacles = [
    { type: 'small-puddle', startX: 500, speed: 3 },
    { type: 'big-puddle', startX: 900, speed: 3 },
    { type: 'small-puddle', startX: 1600, speed: 3 },
    { type: 'big-puddle', startX: 2000, speed: 3 },
    { type: 'small-puddle', startX: 2300, speed: 3 },
    { type: 'small-puddle', startX: 2800, speed: 3 },
    { type: 'big-puddle', startX: 3200, speed: 3 },
    { type: 'small-puddle', startX: 3900, speed: 3 },
    { type: 'big-puddle', startX: 4300, speed: 3 },
    { type: 'small-puddle', startX: 4800, speed: 3 }
];

const createStaticObstacles = () => {
    staticObstacles.forEach(obstacleData => {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle', obstacleData.type);

        if (obstacleData.type === 'small-puddle') {
            obstacle.style.width = '20%';
            obstacle.style.height = '15%';
            obstacle.style.bottom = '4%';
        } else if (obstacleData.type === 'big-puddle') {
            obstacle.style.width = '45%';
            obstacle.style.height = '25%';
            obstacle.style.bottom = '1%';
        }

        obstacle.style.left = `${obstacleData.startX}px`;
        obstacle.dataset.speed = obstacleData.speed;

        document.querySelector('.game').appendChild(obstacle);
        obstacles.push(obstacle);
    });
};

createStaticObstacles();

const moveObstacles = () => {
    obstacles.forEach(obstacle => {
        const speed = parseFloat(obstacle.dataset.speed);
        const currentX = parseFloat(obstacle.style.left);
        obstacle.style.left = `${currentX - speed}px`;

        if (currentX < -200) {
            obstacle.remove();
        }
    });
};
const singleJump = () => {
    if(!hero.classList.contains("jump")) {
        hero.classList.add("jump");
    }
    isJumping = true
    hero.src = jumpingImage;
    setTimeout(() => {
        hero.classList.remove("jump");
        isJumping = false;

        if (!isMovingRight) {
            hero.src = standingImage;
        }

    }, 500);
};

const doubleJump = () => {
    if(!hero.classList.contains("jump2D")) {
        hero.classList.add("jump2D");
    }
    isJumping = true
    hero.src = jumpingImage;
    setTimeout(() => {
        hero.classList.remove("jump2D");
        isJumping = false;

        if (!isMovingRight) {
            hero.src = standingImage;
        }

    }, 700);
};

const toggleRunningImage = () => {
    if (isJumping || !isMovingRight) return;
    currentRunningImage = (currentRunningImage + 1) % runningImages.length;
    hero.src = runningImages[currentRunningImage];
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'z' && !isJumping && !keys['x']) {
        singleJump();
    } else if (event.key === 'x' && !isJumping && !keys['z']) {
        doubleJump();
    } else if (event.key === 'ArrowRight') {
        if (!keys[event.key]) {
            keys[event.key] = true;
            if (!isMovingRight) {
                isMovingRight = true;
                moving = true;
                isStanding = false;
                if (!isJumping) {
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
        if (!isJumping) {
            hero.src = standingImage;
            isStanding = true;
        }
    }
    if (event.key === 'z' && !keys['ArrowRight']) {
        isJumping = false;
        hero.src = standingImage;
    } else if (event.key === 'x' && !keys['ArrowRight']) {
        isJumping = false;
        hero.src = standingImage;
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
        if (hero.classList.contains('jump2D')) {
            moveSpeed = 15
        } else if (hero.classList.contains('jump')) {
            moveSpeed = 10;
        }
        leftPosition += moveSpeed;
        hero.style.left = `${leftPosition}px`;
    }

};

setInterval(() => {
    moveHero();
    moveBackground();
}, 50);

const healthBar = document.querySelector('.health');
let health = 100;
let collisionCount = 0;

const reduceHealth = () => {
    health -= 20;
    if (health < 0) health = 0;
    healthBar.style.width = `${health}%`;
};

const checkCollision = () => {
    const heroRect = hero.getBoundingClientRect();

    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();

        const isOverlapping = !(
            heroRect.right < obstacleRect.left + 50 ||
            heroRect.left > obstacleRect.right - 100 ||
            heroRect.bottom < obstacleRect.top +50 ||
            heroRect.top > obstacleRect.bottom
        );

        if (isOverlapping && !obstacle.dataset.collided) {
            collisionCount++;
            reduceHealth();

            if (collisionCount >= 5) {
                alert("Game Over! You've hit 5 obstacles.");
                location.reload();
            }

            obstacle.dataset.collided = true;
        }
    });
};
window.isEnded = false;

const checkWinCondition = () => {
    const heroLeftPosition = hero.getBoundingClientRect().left;
    const screenWidth = window.innerWidth;

    if (heroLeftPosition > screenWidth) {
        window.isEnded = true;;
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
        y = sensor.y * 60;
        z = sensor.z * -50;

        if (screen.orientation.type === 'landscape-secondary') {
            x *= -1;
            y *= -1;
        }
        if (x > 15) {
            isMovingRight = true;
            if (!isJumping) {
                runAnimationInterval = setInterval(toggleRunningImage, 200);
            }
            moveHero();
        } else if (x < -15) {
            isMovingRight = false;
            clearInterval(runAnimationInterval);
            moving = false;
            hero.src = standingImage;
        }

        if (y > 20 && !isJumping && !keys['x']) {
            singleJump();
        }

        if (y < -20 && !isJumping && !keys['z']) {
            doubleJump();
        }

        const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);
        const newLeft = currentLeft + x;

        if (newLeft >= window.innerWidth / 3 && newLeft <= window.innerWidth - window.innerWidth / 3 - hero.offsetWidth) {
            hero.style.left = newLeft + "px";
        }
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
        tooltip.innerText = 'The goal of the level is to run forward to the bus stop without hitting any obstacles! \n' +
            'Controls: move forward - tilt to the right, jump - tilt up, double jump - tilt down';
    } else {
        tooltip.innerText = 'The goal of the level is to run forward to the bus stop without hitting any obstacles! \n' +
            'Controls: move forward - right arrow, jump - Z button, double jump - X button.';
    }

    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 3000);
});
const gameLoop = () => {
    moveObstacles();
    checkWinCondition();
    checkCollision();
    requestAnimationFrame(gameLoop);
};

gameLoop();



