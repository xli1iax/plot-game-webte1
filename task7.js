
let generatedNumbers = [];
let firstLoad = true;
window.isHandIn = false
window.isTestEnded = false
window.isEnded = false
let userAnswers = [
    {task_id: 0, srcAnswer: null},
    {task_id: 1, srcAnswer: null},
    {task_id: 2, srcAnswer: null},
    {task_id: 3, srcAnswer: null}

]
let score = parseInt(localStorage.getItem('score')) || 0;

const tasks = [
    {task_id: 1, src:"plot/task-1.PNG"},
    {task_id: 2, src:"plot/task-2.PNG"},
    {task_id: 3, src:"plot/task-3.PNG"},
    {task_id: 4, src:"plot/task-4.PNG"},
    {task_id: 5, src:"plot/task-5.PNG"},
    {task_id: 6, src:"plot/task-6.PNG"}
]
const answers = [
    { task_id: 1, src: "plot/task-1-a.PNG" },
    { task_id: 1, src: "plot/task-1-b.PNG" },
    { task_id: 1, src: "plot/task-1-c.PNG" },
    { task_id: 2, src: "plot/task-2-a.PNG" },
    { task_id: 2, src: "plot/task-2-b.PNG" },
    { task_id: 2, src: "plot/task-2-c.PNG" },
    { task_id: 3, src: "plot/task-3-a.PNG" },
    { task_id: 3, src: "plot/task-3-b.PNG" },
    { task_id: 3, src: "plot/task-3-c.PNG" },
    { task_id: 4, src: "plot/task-4-a.PNG" },
    { task_id: 4, src: "plot/task-4-b.PNG" },
    { task_id: 4, src: "plot/task-4-c.PNG" },
    { task_id: 5, src: "plot/task-5-a.PNG" },
    { task_id: 5, src: "plot/task-5-b.PNG" },
    { task_id: 5, src: "plot/task-5-c.PNG" },
    { task_id: 6, src: "plot/task-6-a.PNG" },
    { task_id: 6, src: "plot/task-6-b.PNG" },
    { task_id: 6, src: "plot/task-6-c.PNG" }
];
function generateUniqueRandomNumbers() {
    if (generatedNumbers.length === 4) {
        console.log("Усі 4 числа вже були згенеровані.");
        return generatedNumbers;
    }

    while (generatedNumbers.length < 4) {
        let number = Math.floor(Math.random() * 6) + 1;

        if (!generatedNumbers.includes(number)) {
            generatedNumbers.push(number);
        }
    }

    return generatedNumbers;
}
generateUniqueRandomNumbers();

const cribs = [
    {question:"Z čoho sa skladá prechod v Petriho sieti?",
        answer:"Miest, hrán, značiek"},
    {question:"Zadaj masku siete ak adresa počítača s najnižšou adresou v siete je 192.168.82.129 a adresa počítača s najvyššou adresou je 192.168.82.254",
        answer:"/25"},
    {question:"Čo vypíše tento kód?\n" +
            "def f(s):\n" +
            "  if len(s) == 1:\n" +
            "    print(s)\n" +
            "  else: \n" +
            "    print(s[-1], end = ' ')\n" +
            "    f(s[:-1])\n" +
            "print(f[3,2,1,0,4,5])",
        answer:"[5,4,0,1,2,3]"},
    {question:"Hádžeme naraz 2 kockami (červená a modrá). Budeme pozorovať nasledujúcu udalosť:\n" +
            "na oboch kockách padne rovnaké číslo vypočítať pravdepodobnosť tejto udalosti?",
        answer:"1/6"},
    {question:"Aké formáty čísiel podporuje hardvérova nasobicka procesorov MSP430?",
        answer:"16x16, 16x8, 8x16, 8x8"},
    {question:"Koľko hráčov môže byť maximálne na ihrisku v zápase štvorhry?",
        answer:"4"}
]

function generateUniqueRandomCribs() {
    let generatedNumbers = [];
    while (generatedNumbers.length < score) {
        let number = Math.floor(Math.random() * cribs.length); // Генерація випадкового індексу
        if (!generatedNumbers.includes(number)) {
            generatedNumbers.push(number); // Додаємо число, якщо воно унікальне
        }
    }
    return generatedNumbers; // Повертаємо масив з унікальними індексами
}

// Функція для відображення вибраних шпаргалок у попапі
function showSelectedCribs() {
    const popupCrib = document.getElementById("popup-crib");
    const selectedIndices = generateUniqueRandomCribs();

    // Очистити попап перед додаванням нових шпаргалок
    popupCrib.innerHTML = "";

    // Якщо немає вибраних шпаргалок, відобразити повідомлення
    if (selectedIndices.length === 0) {
        popupCrib.innerHTML = "<p>Немає доступних шпаргалок для показу.</p>";
        return;
    }

    // Додавання вибраних шпаргалок до попапу
    selectedIndices.forEach(index => {
        const crib = cribs[index];
        const cribElement = document.createElement("div");
        cribElement.classList.add("crib");
        cribElement.innerHTML = `
            <p><strong>Question:</strong> ${crib.question}</p>
            <p><strong>Answer:</strong> ${crib.answer}</p>
        `;
        popupCrib.appendChild(cribElement);
    });


}
showSelectedCribs()


document.getElementById("show-crib").addEventListener("click", function(event) {
    event.preventDefault();
    const popupCrib = document.querySelector(".popup");

    console.log("fdbdfg")
    popupCrib.classList.toggle("hidden");
    console.log("fdbdfg")
});
let keys = {}


let currentIndex = 0;
let answersAtTask = document.querySelectorAll('.answer');



function displayTask(index) {
    const taskDisplay = document.getElementById("task-display");

    if (generatedNumbers.length > 0) {
        const taskIndex = generatedNumbers[index] - 1;
        const task = tasks[generatedNumbers[index] - 1];

        if (task) {
            let htmlContent = `
                <img id="task-display-img" src="${task.src}" alt="Task ${task.task_id}">
            `;

            const taskAnswers = answers.filter(a => a.task_id === task.task_id);

            if (taskAnswers.length > 0) {
                taskAnswers.forEach(answer => {
                    htmlContent += `
                        <img class="answer" src="${answer.src}" alt="Answer ${answer.task_id}">
                    `;
                });
            } else {
                htmlContent += "<p>Answer not available</p>";
            }

            taskDisplay.innerHTML = htmlContent;

            answersAtTask = document.querySelectorAll('.answer');

        } else {
            taskDisplay.innerHTML = "<p>Task not available</p>";
        }
    }
}
function updateMiniSheet() {
    const answersList = document.getElementById('answers-list');
    answersList.innerHTML = '';

    userAnswers.forEach(answer => {
        if (answer.srcAnswer) {
            const answerItem = document.createElement('div');
            answerItem.classList.add('answer-item');
            answerItem.textContent = `Task ${answer.task_id + 1}: ${answer.srcAnswer}`;

            if (answer.srcAnswer) {
                answerItem.classList.add('selected');
            }

            answersList.appendChild(answerItem);
        }
    });
}


function getAnswerLetter(src) {

    const parts = src.split('-');
    const answerLetter = parts[parts.length - 1].charAt(0);
    return answerLetter.toUpperCase();
}

function updateUserAnswer(taskId, answerSrc) {
    const answerLetter = getAnswerLetter(answerSrc);
    if (answerLetter) {
        const existingAnswer = userAnswers.find(answer => answer.task_id === taskId);
        if (existingAnswer) {
            existingAnswer.srcAnswer = answerLetter;
        } else {
            userAnswers.push({ task_id: taskId, srcAnswer: answerLetter });
        }

        updateMiniSheet();
    }
}

function handleSelectedAnswer(taskId, selectedElement) {
    if (selectedElement.classList.contains('answer')) {
        const answerSrc = selectedElement.getAttribute('src');
        updateUserAnswer(taskId, answerSrc);
        selectedElement.classList.add('selected');
    }
}

document.querySelectorAll('.answer').forEach(answerElement => {
    answerElement.addEventListener('click', function() {
        const taskId = generatedNumbers[currentTaskIndex];
        handleSelectedAnswer(taskId, this);
    });
});

updateMiniSheet();

function highlightSavedAnswers() {
    const savedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || [];

    if (savedAnswers.length > 0) {
        const answersAtTask = document.querySelectorAll('.answer');

        answersAtTask.forEach(answer => {
            const answerSrc = answer.getAttribute('src');

            if (savedAnswers.includes(answerSrc)) {
                answer.classList.add('selected');
            }
        });
    }
}

function addAnswer(taskId, answerSrc) {
    const existingAnswer = userAnswers.find(answer => answer.taskId === taskId);

    if (existingAnswer) {
        existingAnswer.answerSrc = answerSrc;
    } else {
        userAnswers.push({
            taskId: taskId,
            answerSrc: answerSrc
        });
    }

    console.log(userAnswers);
}

console.log(generatedNumbers);
let currentTaskIndex = 0
displayTask(currentTaskIndex);
document.getElementById("prev-task").addEventListener("click", () => {

    const selectedElement = document.querySelector('.answer.selected');
    if (selectedElement) {
        handleSelectedAnswer(currentTaskIndex, selectedElement);
    }
    if (currentTaskIndex > 0) {
        currentTaskIndex--;
        displayTask(currentTaskIndex);
    }


});

document.getElementById("prev-task").addEventListener("click", () => {
    if (currentTaskIndex > 0) {
        currentTaskIndex--;
        displayTask(currentTaskIndex);
    }
});

document.getElementById("next-task").addEventListener("click", () => {
    const selectedElement = document.querySelector('.answer.selected');
    if (selectedElement) {
        handleSelectedAnswer(currentTaskIndex, selectedElement);
    }
    if (currentTaskIndex < generatedNumbers.length - 1) {
        currentTaskIndex++;
        displayTask(currentTaskIndex);
    }
});

document.querySelectorAll('.answer').forEach(answerElement => {
    answerElement.addEventListener('click', function() {
        const taskId = generatedNumbers[currentTaskIndex];
        handleSelectedAnswer(taskId, this);
    });
});

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    if(event.key === 'ArrowRight') {
        if (currentIndex <2) {
            if (answersAtTask[currentIndex]) {
                answersAtTask[currentIndex].classList.remove('selected');
            }
            currentIndex++;
            if (answersAtTask[currentIndex]) {
                answersAtTask[currentIndex].classList.add('selected');
            }
        }

    }

    if (event.key ==='ArrowLeft') {
        if (currentIndex > 0) {
            if (answersAtTask[currentIndex]) {
                answersAtTask[currentIndex].classList.remove('selected');
            }
            currentIndex--;
            if (answersAtTask[currentIndex]) {

                answersAtTask[currentIndex].classList.add('selected');
            }
        }
    }

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
    letlastX = 0;
    sensor.addEventListener('reading', () => {
        const x = sensor.x * 90;

        if (x - lastX > 20) {
            if (currentIndex < answersAtTask.length - 1) {
                answersAtTask[currentIndex].classList.remove('selected');
                currentIndex++;
                answersAtTask[currentIndex].classList.add('selected');
            }
            lastX = x;
        } else if (x - lastX < -20) {
            if (currentIndex > 0) {
                answersAtTask[currentIndex].classList.remove('selected');
                currentIndex--;
                answersAtTask[currentIndex].classList.add('selected');
            }
            lastX = x;
        }
    });
    sensor.onerror = errorHandler;
    function errorHandler(event) {
        console.log(event.error.name, event.error.message);
    }
} else {
    moveHero();
}


const tooltip = document.getElementById('tooltip');
const showTooltipBtn = document.querySelector('.show-tooltip-btn');
const showTaskTooltipBtn = document.querySelector('.show-task-tooltip-btn');

showTaskTooltipBtn.addEventListener('click', () => {
    window.isEnded = true;
})


showTooltipBtn.addEventListener('click', () => {
    if (isMobile) {
        tooltip.innerText = 'The goal of the level is to write a good exam by choosing the right answers!\n' +
            'Controls: hand in your test - button on the screen, move right/left the rows - tilt right/left.';
    } else {
        tooltip.innerText = 'The goal of the level is to write a good exam by choosing the right answers!\n' +
            'Controls: hand in your test - button on the screen, move right/left the rows - right/left arrows.';
    }

    tooltip.style.display = 'block';

    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 5000);
});