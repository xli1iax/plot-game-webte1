const hero = document.querySelector('#hero');
const minX = window.innerWidth / 3;
const maxX = window.innerWidth - window.innerWidth/3;
const background = document.querySelector('#background');
const keys = {};

let movingForward = false;
let movingBack = false;
let backgroundPosition = 0;

let scaleFactor = 1;
const zoomSpeed = 0.00004;
const maxScale = 2;
const minScale = 1;
const firstLoad = true
if (!localStorage.getItem('score') || firstLoad) {
    localStorage.setItem('score', 0);
}

let score = parseInt(localStorage.getItem('score')) || 0;
console.log(score);

let lastTimestamp = 0;
let isMobile = false;

function moveHero() {
    const currentTop = parseInt(window.getComputedStyle(hero).top, 10);
    const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

    if (keys['ArrowUp'] ) {
        hero.style.top = (currentTop - 15) + 'px';
        movingForward = true;
    }else {
        movingForward = false;
    }
    if (keys['ArrowDown'] && currentTop < window.innerHeight - hero.offsetHeight  ){
        hero.style.top = (currentTop + 15) + 'px'
        movingBack = true;
    }
    if (keys['ArrowLeft'] && currentLeft > window.innerWidth/3  ) {
        hero.style.left = (currentLeft - 20) + 'px';
    }
    if (keys['ArrowRight'] && currentLeft < (window.innerWidth - window.innerWidth/3)) {
        hero.style.left = (currentLeft + 20) + 'px';
    }

    requestAnimationFrame(moveHero);
}

moveHero();
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
    if (event.key === 'ArrowUp') {
        movingForward = false;
    }
    if (event.key === 'ArrowDown') {
        movingBack = false;
    }
}) ;

if (window.matchMedia("(pointer: coarse)").matches) {
    isMobile = true;
    if ('Gyroscope' in window) {
        let sensor = new Gyroscope();
        let x, y, z;
        navigator.permissions.query({ name: "gyroscope" }).then(function(permissionStatus) {
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


            if (newTop <= window.innerHeight - hero.offsetHeight) {
                hero.style.top = newTop + "px";
            }

            if (newLeft >= window.innerWidth/3 && newLeft <= window.innerWidth - window.innerWidth/3 - hero.offsetWidth) {
                hero.style.left = newLeft + "px";
            }

        };
        sensor.onerror = errorHandler;
        function errorHandler(event) {
            console.log(event.error.name, event.error.message);
        }
    }else {
        console.log("Gyroscope not supported on this device.");
    }
} else {
    moveHero();
}

let speedObst;
let speedRailing;


const obstacles = [];

const staticObstacles = [
    { startY: '-200px', speed: 2, src: "plot/crib.PNG" },
    { startY: '-12px', speed: 3, src: "plot/crib.PNG" },
    { startY: '-75px', speed: 3, src: "plot/crib.PNG" },
    { startY: '-350px', speed: 1, src: "plot/crib.PNG" },
    { startY: '-300px', speed: 2, src: "plot/crib.PNG" },
    { startY: '-124px', speed: 3, src: "plot/crib.PNG" },
    { startY: '-213px', speed: 1, src: "plot/crib.PNG" },
    { startY: '-432px', speed: 2, src: "plot/crib.PNG" }
];

const createStaticObstacles = () => {
    staticObstacles.forEach(obstacleData => {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');

        const randomStartX = Math.random() * (maxX - minX) + minX;

        obstacle.style.width = '6%';
        obstacle.style.height = '10%';

        obstacle.style.left = `${randomStartX}px`;
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

const moveObstacles = () => {
    obstacles.forEach(obstacle => {
        const speed = parseFloat(obstacle.dataset.speed);
        const currentY = parseFloat(obstacle.style.top);
        obstacle.style.top = `${currentY + speed}px`;
    });
};
const railings = [];
const staticRailings = [
    { startY: -window.innerHeight/2 ,  src: "plot/railing.PNG" },
    { startY: 0, src: "plot/railing.PNG" },
    { startY: -window.innerHeight-window.innerHeight/2 ,src: "plot/railing.PNG" },
    { startY: -2*window.innerHeight , src: "plot/railing.PNG" },
    { startY: -window.innerHeight, src: "plot/railing.PNG" }
];



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
            score++;
            obstacle.dataset.collided = true;
            updateScore();
        }
    });
};


const updateBackgroundTransform = () => {
    background.style.transform = `translateY(${backgroundPosition}px) scale(${scaleFactor})`;
    background.style.willChange = 'transform';
};

const animate = (timestamp) => {
    const backgroundRect = background.getBoundingClientRect();
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (movingForward && backgroundRect.top <= -50 ){
        scaleFactor = Math.min(maxScale, scaleFactor + zoomSpeed * deltaTime);
        backgroundPosition += 0.1 * deltaTime;
    } else if (movingBack && backgroundRect.bottom > window.innerHeight) {
        scaleFactor = Math.max(minScale, scaleFactor - zoomSpeed * deltaTime);
        backgroundPosition -= 0.1 * deltaTime;
    }
    updateBackgroundTransform();
    requestAnimationFrame(animate);
};

let screenWidth = window.innerWidth;
let heroHeight = hero.offsetHeight;
let screenHeight = window.innerHeight;
window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
});



const checkWinCondition = () => {
    const heroTopPosition = hero.getBoundingClientRect().top;
console.log(heroTopPosition);
    if (heroTopPosition < 0) {
        localStorage.setItem('score', score);
        window.isEnded = true;

    }
};
window.isEnded = false;


const tooltip = document.getElementById('tooltip');
const showTooltipBtn = document.querySelector('.show-tooltip-btn');



showTooltipBtn.addEventListener('click', () => {
    if (isMobile) {
        tooltip.innerText = 'The goal of the level is to collect as many cribs as possible on the way to the university!\n' +
            'Controls: move forward - tilt up, move right/left - tilt right/left.';
    } else {
        tooltip.innerText = 'The goal of the level is to collect as many cribs as possible on the way to the university!\n' +
            'Controls: move forward - up arrow, move right/left - right/left arrows.';
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
        requestAnimationFrame(animate);
    };

    gameLoop();



const updateScore = () => {
    const scoreElement = document.getElementById('crib-counter');
    if (scoreElement) {
        scoreElement.innerHTML = score;
    }
};

