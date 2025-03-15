// window.addEventListener('load', async () => {
//     if (navigator.serviceWorker) {
//         try {
//             // Перевіряємо, чи вже зареєстрований Service Worker
//             const reg = await navigator.serviceWorker.ready;
//             if (!reg) {
//                 // Якщо не зареєстрований, реєструємо Service Worker
//                 const registration = await navigator.serviceWorker.register('sw.js');
//                 console.log('ServiceWorker registered', registration);
//             }
//         } catch (e) {
//             console.log('Service Worker registration failed', e);
//         }
//     }
// });


// fetch('tasks.json')
//     .then(response => response.json())
//     .then(data => {
//
//         let selectFirstTask = false;
//         let selectSecondTask = false;
//         const tasks = data.tasks;  // Отримуємо список завдань
//         let currentTaskIndex = 0;  // Починаємо з першого завдання
//
//         // Функція для очищення старих ресурсів
//         function clearPreviousTaskResources() {
//             // Видаляємо всі старі скрипти
//             const scripts = document.querySelectorAll('script');
//             scripts.forEach(script => script.remove());
//
//             // Видаляємо всі старі стилі
//             const styles = document.querySelectorAll('style');
//             styles.forEach(style => style.remove());
//
//             // Видаляємо попередній HTML-контент
//             const taskContainer = document.querySelector('#task-container');
//             taskContainer.innerHTML = '';  // Очищаємо контейнер перед завантаженням нового контенту
//         }
//
//         // Функція для завантаження завдання
//         function loadTask(taskName) {
//             const task = tasks.find(t => t.task_id === taskName);
//
//             if (task) {
//                 // Перевірка на завдання з варіантами (1_1, 1_2, 2_1, 2_2)
//                 // if (task.task_id === '1_1' || task.task_id === '2_1') {
//                 //     const randomTask = Math.random() > 0.5 ? `${task.task_id.split('_')[0]}_1` : `${task.task_id.split('_')[0]}_2`;
//                 //     // Завантажуємо випадковий варіант завдання
//                 //     loadTask(randomTask);
//                 //     return;  // Зупиняємо виконання поточної функції
//                 // }
//                 //
//                 // // Якщо завдання 1_2 або 2_2, пропускаємо їх
//                 // if (task.task_id === '1_2' || task.task_id === '2_2') return;
//
//                 // Спочатку очищаємо старі ресурси
//                 clearPreviousTaskResources();
//
//                 // Завантажуємо HTML для поточного завдання
//                 fetch(task.file_name)
//                     .then(response => response.text())
//                     .then(htmlContent => {
//                         // Вставляємо HTML контент у контейнер
//                         document.querySelector('#task-container').innerHTML = htmlContent;
//
//                         // Завантажуємо та додаємо CSS
//                         fetch(task.css)
//                             .then(response => response.text())
//                             .then(cssContent => {
//                                 const styleTag = document.createElement('style');
//                                 styleTag.textContent = cssContent;
//                                 document.head.appendChild(styleTag);
//                             });
//
//                         // Завантажуємо та додаємо JS
//                         fetch(task.script)
//                             .then(response => response.text())
//                             .then(jsContent => {
//                                 // Обгортаємо код JS в IIFE для локальної області видимості
//                                 const scriptTag = document.createElement('script');
//                                 scriptTag.type = 'text/javascript';
//                                 scriptTag.textContent = `(function() { ${jsContent} })();`;
//                                 document.body.appendChild(scriptTag);
//                             });
//                     })
//                     .catch(error => console.error('Error loading HTML file', error));
//             }
//         }
//
//         // Завантажуємо перше завдання після натискання кнопки Play
//         document.getElementById('play-button').addEventListener('click', function() {
//             this.style.display = 'none';  // Сховати кнопку Play
//             // Завантажуємо перше завдання
//             loadTask(tasks[currentTaskIndex].task_id);
//
//             let taskInterval = setInterval(function() {
//                 if (window.isEnded) {  // Якщо завдання завершено
//                     currentTaskIndex++;  // Перехід до наступного завданн
//                     if (currentTaskIndex === 1 && !selectFirstTask) {
//                         selectFirstTask = true;
//                         // Вибір між 1_1 та 1_2
//                         currentTaskIndex = Math.random() > 0.5 ? 1 : 2;
//                     } else if (currentTaskIndex === 2 && selectFirstTask) {
//                         currentTaskIndex++;
//                     }
//
//                     // Перевірка для вибору між завданнями 2_1 і 2_2
//                     if (currentTaskIndex === 3 && !selectSecondTask) {
//                         selectSecondTask = true;
//                         // Вибір між 2_1 та 2_2
//                         currentTaskIndex = Math.random() > 0.5 ? 3 : 4;
//                     } else if (currentTaskIndex === 4 && selectSecondTask) {
//                         currentTaskIndex++;
//                     }
//                     // Перевірка, чи є ще завдання
//                     if (currentTaskIndex < tasks.length) {
//                         clearPreviousTaskResources();
//                         loadTask(tasks[currentTaskIndex].task_id);  // Завантажуємо наступне завдання
//                     } else {
//                         clearInterval(taskInterval);  // Якщо всі завдання завершено
//                         console.log('Всі завдання завершено!');
//                     }
//                 }
//             }, 5000);  // Завдання змінюються кожні 5 секунд (можна налаштувати)
//         });
//     })
//     .catch(error => console.error('Error loading JSON:', error));
let zeroTask = true;
window.addEventListener('load', () => {
    // const playButton = document.getElementById('play-button');

    // playButton.addEventListener('click', () => {
    //     document.querySelector("#main-screen").style.display = "none";
    //     console.log('Button clicked, starting task loading...');

        // Перевірка на наявність Service Worker
        if (navigator.serviceWorker) {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js')
                    .then((reg) => {
                        console.log('Service worker register success', reg);
                    })
                    .catch((e) => {
                        console.log('Service worker register fail');
                    });
            }
        }

    //     // Завантаження JSON файлу
    //     fetch('tasks.json')
    //         .then(response => {
    //             console.log('Response status:', response.status);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(tasks => {
    //             console.log('Tasks loaded:', tasks);
    //
    //             // Завантаження завдань по черзі
    //             loadTasksSequentially(tasks);
    //         })
    //         .catch(error => {
    //             console.error('Error loading or parsing the JSON file:', error);
    //         });
    // });
    //
    // function loadTasksSequentially(tasks) {
    //     let currentTaskIndex = 0;
    //
    //     function loadNextTask() {
    //         if (currentTaskIndex < tasks.tasks.length) {
    //             const task = tasks.tasks[currentTaskIndex];
    //             console.log(`Loading task ${task.task_id}...`);
    //
    //             // Завантажуємо завдання
    //             loadTask(task)
    //                 .then(() => {
    //                     // Чекаємо завершення завдання
    //                     console.log(`Waiting for task ${task.task_id} to end...`);
    //                     waitForTaskToEnd()
    //                         .then(() => {
    //                             currentTaskIndex++; // Переходимо до наступного завдання
    //                             loadNextTask();  // Завантажуємо наступне завдання
    //                         });
    //                 })
    //                 .catch(error => {
    //                     console.error(`Error loading task ${currentTaskIndex}:`, error);
    //                 });
    //         } else {
    //             console.log('All tasks completed.');
    //         }
    //     }
    //
    //     loadNextTask(); // Стартуємо завантаження завдань
    // }
    //
    // function loadTask(task) {
    //     return new Promise((resolve, reject) => {
    //         console.log(`Start loading task ${task.task_id}...`);
    //         clearPreviousContent(task.task_id);
    //
    //         // Завантаження HTML
    //         fetch(task.file_name)
    //                 .then(response => response.text())
    //                 .then(htmlContent => {
    //                     // Вставляємо HTML контент у контейнер
    //                     document.querySelector('#task-container').innerHTML = htmlContent;
    //
    //                     // Завантажуємо та додаємо CSS
    //                     fetch(task.css)
    //                         .then(response => response.text())
    //                         .then(cssContent => {
    //                             const styleTag = document.createElement('style');
    //                             styleTag.textContent = cssContent;
    //                             document.head.appendChild(styleTag);
    //                         });
    //
    //                     // Завантажуємо та додаємо JS
    //                     fetch(task.script)
    //                         .then(response => response.text())
    //                         .then(jsContent => {
    //                             // Обгортаємо код JS в IIFE для локальної області видимості
    //                             const scriptTag = document.createElement('script');
    //                             scriptTag.type = 'text/javascript';
    //                             scriptTag.textContent = `(function() { ${jsContent} })();`;
    //                             document.body.appendChild(scriptTag);
    //                         });
    //                 })
    //                 .catch(error => console.error('Error loading HTML file', error));
    //     });
    // }
    //
    // function waitForTaskToEnd() {
    //     return new Promise((resolve) => {
    //         const interval = setInterval(() => {
    //             if (window.isEnded) {
    //                 clearInterval(interval);
    //                 window.isEnded = false; // Скидаємо значення для наступного завдання
    //                 resolve();
    //             }
    //         }, 500); // Перевіряємо кожні 500 мс
    //     });
    // }
    //
    // // Функція для очищення попередньо доданих елементів
    // function clearPreviousContent(currentTaskId) {
    //     // Очищення стилів
    //     const existingStyles = document.querySelectorAll('style');
    //     existingStyles.forEach(style => style.remove());
    //     document.querySelector('#task-container').innerHTML = ''
    //     // Видалення скриптів, які належать поточному завданню
    //     const scriptToRemove = document.getElementById(`task-script-${currentTaskId}`);
    //     if (scriptToRemove) {
    //         console.log(`Removing script: task-script-${currentTaskId}`);
    //         scriptToRemove.remove();
    //     }
    // }

});

// Використовуємо fetch для отримання JSON файлу
fetch('tasks.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Парсимо відповідь як JSON
    })
    .then(data => {
        // Витягуємо об'єкт з файлами (HTML, CSS, JS) для кожної задачі
        const files = data.tasks.map(task => ({
            html: task.file_name,
            css: task.css,
            script: task.script
        }));

        console.log(files);  // Виводимо масив об'єктів з файлами
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

