const background = document.querySelector("#background");
const hero = document.querySelector('#hero');
const minX = window.innerWidth / 3;
const maxX = window.innerWidth - window.innerWidth/3;
let lastTimestamp = 0;
let scaleFactor = 1;
const zoomSpeed = 0.00002;
const maxScale = 2;
let backgroundPosition = 0;
let backgroundPositionX = 0;
let isMobile = false;
const keys = {};

let score = parseInt(localStorage.getItem('score')) || 0;
function moveHero() {
    const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

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
    isMobile = true;

    let sensor = new Gyroscope();
    let x, z;
    navigator.permissions.query({ name: 'gyroscope' }).then(function(permissionStatus) {
        if (permissionStatus.state === 'granted') {
            sensor.start();
        } else {
            console.log("Permission denied");
        }
    });
    sensor.onreading = () => {
        x = sensor.x * (90);
        z = sensor.z * (-50);
        if (screen.orientation.type === 'landscape-secondary') {
            x *= -1;
        }
        const currentLeft = parseInt(window.getComputedStyle(hero).left, 10);

        const newLeft = currentLeft + x;

        if (newLeft >= window.innerWidth/3 && newLeft <= window.innerWidth - window.innerWidth/3 - hero.offsetWidth) {
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

const updateBackgroundTransform = () => {
    background.style.transform = `translate(${backgroundPositionX}px, ${backgroundPosition}px) scale(${scaleFactor})`;
    background.style.willChange = 'transform';
};

// const animate = (timestamp) => {
//     const deltaTime = timestamp - lastTimestamp;
//     lastTimestamp = timestamp;
//
//     scaleFactor = Math.min(maxScale, scaleFactor + zoomSpeed * deltaTime);
//     backgroundPosition += 0.003 * deltaTime;
//
//     backgroundPositionX += 0.002 * deltaTime;
//
//
//     updateBackgroundTransform();
//
//     requestAnimationFrame(animate);
// };
const obstacles = [];
const staticObstacles = [
    { startY: 20, src: "plot/corridor-obstacle1.PNG",moveSpeed: 3 , zoomSpeed: 0.0002, moveDirection: "right", horizontalSpeed: 0.2 },
    { startY: 0, src: "plot/corridor-obstacle2.PNG",moveSpeed: 2 , zoomSpeed: 0.0003, moveDirection: "left", horizontalSpeed: 0.4 },
    { startY: 30, src: "plot/corridor-obstacle3.PNG",moveSpeed: 3 , zoomSpeed: 0.0001, moveDirection: "right", horizontalSpeed: 0.5 },
    { startY: 40, src: "plot/corridor-obstacle4.PNG",moveSpeed: 4 , zoomSpeed: 0.0029, moveDirection: "left", horizontalSpeed:1 },
    { startY: 10, src: "plot/corridor-obstacle5.PNG",moveSpeed: 1 , zoomSpeed: 0.00015, moveDirection: "right", horizontalSpeed: 2 }
    // { startY: -10, src: "plot/corridor-obstacle-group1.PNG",moveSpeed: 1 , zoomSpeed: 0.00015, moveDirection: "right", horizontalSpeed: 0.00025 }
];

const createStaticObstacles = () => {
    staticObstacles.forEach(obstacleData => {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');

        const randomStartX = Math.random() * (maxX - minX) + minX;

        obstacle.style.width = '10%';
        obstacle.style.height = '18%';

        obstacle.style.left = `${randomStartX}px`;
        obstacle.style.top = `${obstacleData.startY}px`;

        obstacle.dataset.zoomSpeed = obstacleData.zoomSpeed;
        obstacle.dataset.horizontalSpeed = obstacleData.horizontalSpeed;
        obstacle.dataset.moveDirection = obstacleData.moveDirection;
        obstacle.dataset.moveSpeed = obstacleData.moveSpeed;
        obstacle.style.backgroundImage = `url("${obstacleData.src}")`;
        obstacle.style.backgroundSize = 'contain';
        obstacle.style.backgroundRepeat = 'no-repeat';
        obstacle.style.backgroundPosition = 'center';

        document.querySelector('.game').appendChild(obstacle);
        obstacles.push(obstacle);
    });
};

const moveObstacles = () => {
    obstacles.forEach(obstacle => {
        const speed = parseFloat(obstacle.dataset.moveSpeed) || 10;

        // Рух вниз
        const currentY = parseFloat(obstacle.style.top);
        obstacle.style.top = `${currentY + speed}px`;

        // Рух горизонтально
        const currentX = parseFloat(obstacle.style.left);
        const horizontalSpeed = parseFloat(obstacle.dataset.horizontalSpeed) || 0;
        let moveDirection = obstacle.dataset.moveDirection;

        let newX = currentX;

        if (moveDirection === "right") {
            newX += horizontalSpeed; // Рух праворуч
            if (newX >= maxX) {
                // Досягнуто правої межі
                moveDirection = "left"; // Змінюємо напрямок
                newX = maxX; // Не виходимо за межу
            }
        } else if (moveDirection === "left") {
            newX -= horizontalSpeed; // Рух ліворуч
            if (newX <= minX) {
                // Досягнуто лівої межі
                moveDirection = "right"; // Змінюємо напрямок
                newX = minX; // Не виходимо за межу
            }
        }

        obstacle.style.left = `${newX}px`;
        obstacle.dataset.moveDirection = moveDirection;

        // Масштабування (для ілюзії перспективи)
        const currentScale = parseFloat(obstacle.dataset.scale || 1);
        const zoomSpeed = parseFloat(obstacle.dataset.zoomSpeed) || 0;
        const newScale = currentScale + zoomSpeed;
        obstacle.style.transform = `scale(${newScale})`;
        obstacle.dataset.scale = newScale;

        // Видалення перешкоди, якщо вона виходить за межі екрана
        if (currentY > window.innerHeight) {
            obstacle.remove();
            const index = obstacles.indexOf(obstacle);
            if (index > -1) {
                obstacles.splice(index, 1);
            }
        }
    });
};


createStaticObstacles();

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
            score--;
            obstacle.dataset.collided = true;
            updateScore();
        }
    });
};


const updateScore = () => {
    const scoreCounter = document.querySelector('#crib-counter');
    scoreCounter.innerHTML= `${score}`;
};
updateScore();
const checkWinCondition = () => {
    if (obstacles.length === 0) {
        localStorage.setItem('score', score);
        showWinPopup();
    }
};

window.isEnded = false;
const showWinPopup = () => {
    // const popup = document.getElementById('win-popup');
    // popup.classList.remove('hidden');
    window.isEnded = true;
};
const tooltip = document.getElementById('tooltip');
const showTooltipBtn = document.querySelector('.show-tooltip-btn');

function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

showTooltipBtn.addEventListener('click', () => {
    if (isMobile()) {
        tooltip.innerText = 'The goal of the level is to avoid students who are obstacles on the way to the classroom!\n' +
            'Controls: move forward - tilt up, move left/right - tilt right/left.';
    } else {
        tooltip.innerText = 'The goal of the level is to avoid students who are obstacles on the way to the classroom!\n' +
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
    // requestAnimationFrame(animate);
};

gameLoop();