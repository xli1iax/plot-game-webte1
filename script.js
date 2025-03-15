
window.isEnded = false;
fetch('tasks.json')
    .then(response => response.json())
    .then(data => {

        let selectFirstTask = false;
        let selectSecondTask = false;
        let selectVideo = false
        let selectSecondVideo=false
        const tasks = data.tasks;
        let currentTaskIndex = 0;

        function clearPreviousTaskResources() {
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => script.remove());

            const styles = document.querySelectorAll('style');
            styles.forEach(style => style.remove());

            const taskContainer = document.querySelector('#task-container');
            taskContainer.innerHTML = '';
        }

        function loadTask(taskName) {
            const task = tasks.find(t => t.task_id === taskName);

            if (task) {
                // Перевірка на завдання з варіантами (1_1, 1_2, 2_1, 2_2)
                // if (task.task_id === '1_1' || task.task_id === '2_1') {
                //     const randomTask = Math.random() > 0.5 ? `${task.task_id.split('_')[0]}_1` : `${task.task_id.split('_')[0]}_2`;
                //     // Завантажуємо випадковий варіант завдання
                //     loadTask(randomTask);
                //     return;  // Зупиняємо виконання поточної функції
                // }
                //
                // // Якщо завдання 1_2 або 2_2, пропускаємо їх
                // if (task.task_id === '1_2' || task.task_id === '2_2') return;

                clearPreviousTaskResources();

                fetch(task.file_name)
                    .then(response => response.text())
                    .then(htmlContent => {
                        document.querySelector('#task-container').innerHTML = htmlContent;
                        console.log("Starting fetch request for CSS file");
                        fetch(task.css)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`Failed to fetch CSS: ${response.statusText}`);
                                }
                                return response.text();
                            })
                            .then(cssContent => {
                                const styleTag = document.createElement('style');
                                styleTag.textContent = cssContent;
                                document.head.appendChild(styleTag);
                                console.log("installed css");
                            })
                            .catch(error => {
                                console.error("Error loading CSS:", error);
                            });

                        console.log("Ended fetch request for CSS file");
                        fetch(task.script)
                            .then(response => response.text())
                            .then(jsContent => {
                                const scriptTag = document.createElement('script');
                                scriptTag.type = 'text/javascript';
                                scriptTag.textContent = `(function() { ${jsContent} })();`;
                                document.body.appendChild(scriptTag);
                            });
                    })
                    .catch(error => console.error('Error loading HTML file', error));
            }
        }

        document.getElementById('play-button').addEventListener('click', function() {
            this.style.display = 'none';
            document.querySelector("#main-screen").style.display = "none"
            loadTask(tasks[currentTaskIndex].task_id);


            let taskInterval = setInterval(function() {
                if(window.isGameOver) {
                    window.isGameOver = false
                    clearPreviousTaskResources();
                    console.log("there")
                    loadTask(tasks[currentTaskIndex].task_id);
                }
                if (window.isEnded||window.isTaken ||window.isTop || window.isHandIn||window.isTestEnded) {
                    window.isTop = false
                    window.isTaken = false
                    window.isHandIn = false
                    window.isTestEnded = false
                    window.isEnded = false
                    currentTaskIndex++;
                    if (currentTaskIndex === 2 && !selectFirstTask) {
                        selectFirstTask = true;
                        currentTaskIndex = Math.random() > 0.5 ? 2 : 3;
                    } else if (currentTaskIndex === 3 && selectFirstTask) {
                        currentTaskIndex++;
                    }
                    if (currentTaskIndex === 4 && !selectVideo) {
                        selectVideo = true;
                        currentTaskIndex = Math.random() > 0.5 ? 4 : 5;
                        if(currentTaskIndex === 4) selectSecondVideo = true
                    } else if (currentTaskIndex === 5 && selectVideo) {
                        currentTaskIndex++;
                    }

                    if (currentTaskIndex === 6 && !selectSecondVideo) {
                        currentTaskIndex++;
                    }
                    // if (currentTaskIndex === 6  && selectVideo) {
                    //     currentTaskIndex+=2;
                    // }
                    // Перевірка, чи є ще завдання

                    if (currentTaskIndex < tasks.length ) {
                        clearPreviousTaskResources();
                        loadTask(tasks[currentTaskIndex].task_id);
                    } else {
                        clearInterval(taskInterval);
                        console.log('Всі завдання завершено!');
                    }
                }
            }, 2000);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));




const infoBtn = document.querySelector('.info-btn');
const storyBtn = document.querySelector('.story-btn');
const infoPopup = document.getElementById('info-popup');
const storyPopup = document.getElementById('story-popup');

function openPopup(popup) {
    popup.style.display = 'flex';
}

function closePopup(popup) {
    popup.style.display = 'none';
}

infoBtn.addEventListener('click', () => openPopup(infoPopup));
storyBtn.addEventListener('click', () => openPopup(storyPopup));

document.querySelectorAll('.close-btn').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        const popupId = e.target.getAttribute('data-close');
        const popup = document.getElementById(popupId);
        if (popup) closePopup(popup);
    });
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup(popup);
    });
});
