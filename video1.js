window.isEnded = false
const video = document.getElementById('myVideo');
console.log("Video initialization");
video.muted = false;
video.volume = 1;
console.log('Volume:', video.volume);
console.log('Muted:', video.muted);

if (video) {

    video.addEventListener('loadeddata', () => {
        console.log("Video loaded");

        const checkVideoEnd = setInterval(() => {

            if (Math.abs(video.currentTime - video.duration) < 0.1 && video.duration > 0) {
                console.log('Відео відтворено повністю!');
                window.isEnded = true;

                clearInterval(checkVideoEnd);
            }
        }, 100); // Перевіряємо кожні 100 мс

        // Запускаємо відео
        video.play().catch(error => {
            console.error('Помилка відтворення відео:', error);
        });
    });
} else {
    console.error('Елемент відео не знайдено.');
}

// });
