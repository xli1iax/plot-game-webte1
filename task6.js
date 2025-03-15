// const background = document.querySelector("#background");
// const hero = document.querySelector('#hero');
// window.isEnded = false;
//
// let isMobile = false;
// const keys = {};
// let currentSeat = 0;
// let currentTable = 1;
//
// const selectedTables = [
//     {tableNumber: 1, totalSeats: 4, selectSrc: "plot/lecture-table1-selected.PNG", nonSelectSrc: "plot/lecture-table1.PNG", htmlElementId: "#table1"},
//     {tableNumber: 2, totalSeats: 4, selectSrc: "plot/lecture-table2-selected.PNG", nonSelectSrc: "plot/lecture-table2.PNG", htmlElementId: "#table2"},
//     {tableNumber: 3, totalSeats: 5, selectSrc: "plot/lecture-table3-selected.PNG", nonSelectSrc: "plot/lecture-table3.PNG", htmlElementId: "#table3"},
//     {tableNumber: 4, totalSeats: 5, selectSrc: "plot/lecture-table4-selected.PNG", nonSelectSrc: "plot/lecture-table4.PNG", htmlElementId: "#table4"}
// ];
//
// const selectedSeat = [
//     {seatNumber: 1, tableNumber: 1, htmlElementId: "#seat-a-1"},
//     {seatNumber: 2, tableNumber: 1, htmlElementId: "#seat-b-1"},
//     {seatNumber: 3, tableNumber: 1, htmlElementId: "#seat-c-1"},
//     {seatNumber: 4, tableNumber: 1, htmlElementId: "#seat-d-1"},
//     {seatNumber: 1, tableNumber: 2, htmlElementId: "#seat-a-2"},
//     {seatNumber: 2, tableNumber: 2, htmlElementId: "#seat-b-2"},
//     {seatNumber: 3, tableNumber: 2, htmlElementId: "#seat-c-2"},
//     {seatNumber: 4, tableNumber: 2, htmlElementId: "#seat-d-2"},
//     {seatNumber: 1, tableNumber: 3, htmlElementId: "#seat-a-3"},
//     {seatNumber: 2, tableNumber: 3, htmlElementId: "#seat-b-3"},
//     {seatNumber: 3, tableNumber: 3, htmlElementId: "#seat-c-3"},
//     {seatNumber: 4, tableNumber: 3, htmlElementId: "#seat-d-3"},
//     {seatNumber: 5, tableNumber: 3, htmlElementId: "#seat-e-3"},
//     {seatNumber: 1, tableNumber: 4, htmlElementId: "#seat-a-4"},
//     {seatNumber: 2, tableNumber: 4, htmlElementId: "#seat-b-4"},
//     {seatNumber: 3, tableNumber: 4, htmlElementId: "#seat-c-4"},
//     {seatNumber: 4, tableNumber: 4, htmlElementId: "#seat-d-4"},
//     {seatNumber: 5, tableNumber: 4, htmlElementId: "#seat-e-4"}
// ];
// let previousState = { table: currentTable, seat: currentSeat, row: 1 };
//
// function addRemoveSelectClass() {
//     const tableIndex = currentTable - 1;
//     const seatIndex = currentSeat - 1;
//     if (tableIndex < 0 || tableIndex >= selectedTables.length) return;
//     if (seatIndex < 0 || seatIndex >= selectedTables[tableIndex].totalSeats) return;
//
//     selectedTables.forEach((table, index) => {
//         const tableElement = document.querySelector(table.htmlElementId);
//
//         if (!tableElement) return;
//
//         if (index === tableIndex) {
//             tableElement.src = new URL(table.selectSrc, window.location.href).href;
//         } else {
//             tableElement.src = new URL(table.nonSelectSrc, window.location.href).href;
//         }
//     });
//
//     selectedSeat.forEach((seat) => {
//         const seatElement = document.querySelector(seat.htmlElementId);
//         if (!seatElement) return;
//
//         if (seat.tableNumber === currentTable) {
//             if (seat.seatNumber === currentSeat) {
//                 seatElement.src = new URL("plot/lecture-seat-selected.PNG", window.location.href).href;
//             } else {
//                 seatElement.src = new URL("plot/lecture-seat.PNG", window.location.href).href;
//             }
//         } else {
//             seatElement.src = new URL("plot/lecture-seat.PNG", window.location.href).href;
//         }
//     });
// }
//
// function moveHero() {
//     console.log(`Moving hero to Table: ${currentTable}, Seat: ${currentSeat}`);
//     addRemoveSelectClass();
//
//     if (generatedTable === null || generatedSeat === null) {
//         console.error("Target seat or table is not initialized!");
//         return;
//     }
//      window.isEnded = false
// //     if (currentTable === generatedTable && currentSeat === generatedSeat) {
// //         if (!window.isEnded) {
// //             window.isEnded = true;
// //             showWinPopup();
// //         }
// //
// //         // requestAnimationFrame(moveHero);
// // }
// }
// // moveHero();
// function checkAndMoveHero() {
//     if (previousState.table !== currentTable || previousState.seat !== currentSeat) {
//         // moveHero();
//
//         previousState.table = currentTable;
//         previousState.seat = currentSeat;
//     }
// }
//
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'ArrowUp') {
//         currentTable = currentTable === 4 ? 1 : currentTable + 1;
//         currentSeat = 1;
//     } else if (event.key === 'ArrowDown') {
//         currentTable = currentTable === 1 ? 4 : currentTable - 1;
//         currentSeat = 1;
//     } else if (event.key === 'ArrowLeft') {
//         if (currentSeat === 1) {
//             currentSeat = selectedTables[currentTable - 1].totalSeats;
//         } else {
//             currentSeat -= 1;
//         }
//     } else if (event.key === 'ArrowRight') {
//         if (currentSeat === selectedTables[currentTable - 1].totalSeats) {
//             currentSeat = 1;
//         } else {
//             currentSeat += 1;
//         }
//     }
//
//     checkAndMoveHero();
// });
//
//
// document.addEventListener('keyup', (event) => {
//     keys[event.key] = false;
// });
//
// let generatedSeat = null;
// let generatedTable = null;
//
//
// generateSeat();
// // function showWinPopup() {
// //     console.log("You won!");
// //     const winPopup = document.getElementById('win-popup');
// //     winPopup.classList.remove('hidden');
// //     const restartButton = document.getElementById('restart-button');
// //     restartButton.addEventListener('click', () => {
// //         winPopup.classList.add('hidden');
// //         generateSeat();
// //     });
// //     window.isEnded = true;
// // }
// navigator.permissions.query({ name: "gyroscope" }).then(function(permissionStatus) {
//     if (permissionStatus.state === 'granted') {
//         console.log("Доступ до гіроскопа надано.");
//     } else if (permissionStatus.state === 'denied') {
//         console.log("Доступ до гіроскопа відхилено.");
//     } else {
//         console.log("Доступ до гіроскопа очікується.");
//     }
// });
//
// if (window.matchMedia("(pointer: coarse)").matches) {
//     let sensor = new Gyroscope();
//     let x, y, z;
//
//     navigator.permissions.query({ name: 'gyroscope' }).then(function(permissionStatus) {
//         if (permissionStatus.state === 'granted') {
//             sensor.start();
//         } else {
//             console.log("Permission denied");
//         }
//     });
//
//     sensor.onreading = () => {
//         x = sensor.x * (90);
//         y = sensor.y * (60);
//         z = sensor.z * (-50);
//
//         if (screen.orientation.type === 'landscape-secondary') {
//             x *= -1;
//             y *= -1;
//         }
//
//         handleMovement(x, y);
//     };
//
//     sensor.onerror = errorHandler;
//
//     function errorHandler(event) {
//         console.log(event.error.name, event.error.message);
//     }
//
//     function handleMovement(x, y) {
//         if (Math.abs(x) > 10) {
//             if (x > 0) {
//                 moveRight();
//             } else {
//                 moveLeft();
//             }
//         }
//         if (Math.abs(y) > 10) {
//             if (y > 0) {
//                 moveDown();
//             } else {
//                 moveUp();
//             }
//         }
//     }
//
//     function moveUp() {
//         currentTable = currentTable === 1 ? 4 : currentTable - 1;
//         currentSeat = 1;
//         // moveHero();
//     }
//
//     function moveDown() {
//         currentTable = currentTable === 4 ? 1 : currentTable + 1;
//         currentSeat = 1;
//         // moveHero();
//     }
//
//     function moveLeft() {
//         if (currentSeat === 1) {
//             currentSeat = selectedTables[currentTable - 1].totalSeats;
//         } else {
//             currentSeat -= 1;
//         }
//         // moveHero();
//     }
//
//     function moveRight() {
//         if (currentSeat === selectedTables[currentTable - 1].totalSeats) {
//             currentSeat = 1;
//         } else {
//             currentSeat += 1;
//         }
//         // moveHero();
//     }
//
// } else {
//     // moveHero();
// }
// const tooltip = document.getElementById('tooltip');
// const showTooltipBtn = document.querySelector('.show-tooltip-btn');
//
// showTooltipBtn.addEventListener('click', () => {
//     tooltip.style.display = 'block';
//     setTimeout(() => {
//         tooltip.style.display = 'none';
//     }, 3000);
// });
// function generateSeat() {
//     const randomSeat = Math.floor(Math.random() * 5) + 1;
//     const randomTable = Math.floor(Math.random() * 4) + 1;
//     const seatLabel = ["A", "B", "C", "D", "E"][randomSeat - 1];
//
//     if (!seatLabel || !randomTable) {
//         console.error("Error generating seat or table.");
//         return;
//     }
//
//     console.log(`Generated Seat: ${seatLabel}, Table: ${randomTable}`);
//     generatedSeat = randomSeat;
//     generatedTable = randomTable;
//     // if(generatedSeat=== 5 && (generatedTable === 3 || generatedTable === 4)){
//     //     generateSeat()
//     // }else {console.log(`your seat \`${generatedSeat}\` arrow \`${generatedTable}\``)
//     // }
// }
// const gameLoop = () => {
//     requestAnimationFrame(gameLoop);
// };
// gameLoop();
const background = document.querySelector("#background");
const hero = document.querySelector('#hero');

let isMobile = false;
const keys = {};
let currentSeat = 0;
let currentTable = 1;
window.isEnded = false

const selectedTables = [
    {tableNumber: 1, totalSeats: 4, selectSrc: "plot/lecture-table1-selected.PNG", nonSelectSrc: "plot/lecture-table1.PNG", htmlElementId: "#table1"},
    {tableNumber: 2, totalSeats: 4, selectSrc: "plot/lecture-table2-selected.PNG", nonSelectSrc: "plot/lecture-table2.PNG", htmlElementId: "#table2"},
    {tableNumber: 3, totalSeats: 5, selectSrc: "plot/lecture-table3-selected.PNG", nonSelectSrc: "plot/lecture-table3.PNG", htmlElementId: "#table3"},
    {tableNumber: 4, totalSeats: 5, selectSrc: "plot/lecture-table4-selected.PNG", nonSelectSrc: "plot/lecture-table4.PNG", htmlElementId: "#table4"}
];

const selectedSeat = [
    {seatNumber: 1, tableNumber: 1, htmlElementId: "#seat-a-1"},
    {seatNumber: 2, tableNumber: 1, htmlElementId: "#seat-b-1"},
    {seatNumber: 3, tableNumber: 1, htmlElementId: "#seat-c-1"},
    {seatNumber: 4, tableNumber: 1, htmlElementId: "#seat-d-1"},
    {seatNumber: 1, tableNumber: 2, htmlElementId: "#seat-a-2"},
    {seatNumber: 2, tableNumber: 2, htmlElementId: "#seat-b-2"},
    {seatNumber: 3, tableNumber: 2, htmlElementId: "#seat-c-2"},
    {seatNumber: 4, tableNumber: 2, htmlElementId: "#seat-d-2"},
    {seatNumber: 1, tableNumber: 3, htmlElementId: "#seat-a-3"},
    {seatNumber: 2, tableNumber: 3, htmlElementId: "#seat-b-3"},
    {seatNumber: 3, tableNumber: 3, htmlElementId: "#seat-c-3"},
    {seatNumber: 4, tableNumber: 3, htmlElementId: "#seat-d-3"},
    {seatNumber: 5, tableNumber: 3, htmlElementId: "#seat-e-3"},
    {seatNumber: 1, tableNumber: 4, htmlElementId: "#seat-a-4"},
    {seatNumber: 2, tableNumber: 4, htmlElementId: "#seat-b-4"},
    {seatNumber: 3, tableNumber: 4, htmlElementId: "#seat-c-4"},
    {seatNumber: 4, tableNumber: 4, htmlElementId: "#seat-d-4"},
    {seatNumber: 5, tableNumber: 4, htmlElementId: "#seat-e-4"}
];
let previousState = { table: currentTable, seat: currentSeat, row: 1 };

function addRemoveSelectClass() {
    if (window.isTaken) return
    const tableIndex = currentTable - 1;
    const seatIndex = currentSeat - 1;
    if (tableIndex < 0 || tableIndex >= selectedTables.length) return;
    if (seatIndex < 0 || seatIndex >= selectedTables[tableIndex].totalSeats) return;

    selectedTables.forEach((table, index) => {
        const tableElement = document.querySelector(table.htmlElementId);

        if (!tableElement) return;

        if (index === tableIndex) {
            tableElement.src = new URL(table.selectSrc, window.location.href).href;
        } else {
            tableElement.src = new URL(table.nonSelectSrc, window.location.href).href;
        }
    });

    selectedSeat.forEach((seat) => {
        const seatElement = document.querySelector(seat.htmlElementId);

        if (seatElement) { // Перевірка на null
            if (seat.tableNumber === currentTable) {
                if (seat.seatNumber === currentSeat) {
                    seatElement.src = new URL("plot/lecture-seat-selected.PNG", window.location.href).href;
                } else {
                    seatElement.src = new URL("plot/lecture-seat.PNG", window.location.href).href;
                }
            } else {
                seatElement.src = new URL("plot/lecture-seat.PNG", window.location.href).href;
            }
        } else {
            console.error(`Element not found for selector: ${seat.htmlElementId}`);
        }

    });
}

function moveHero() {
    if (window.isTaken) return

    console.log(`Moving hero to Table: ${currentTable}, Seat: ${currentSeat}`);
    addRemoveSelectClass();

    if (currentTable === generatedTable && currentSeat === generatedSeat) {
        const scriptElement = document.querySelector('script[src="task6.js"]');
        if (scriptElement) {
            scriptElement.setAttribute('disabled', 'true');
            console.log("Script disabled");
        }

        window.isTaken = true;
        window.isEnded=true

    }
}

function checkAndMoveHero() {
    if (window.isTaken) return

    if (previousState.table !== currentTable || previousState.seat !== currentSeat) {
        moveHero();

        previousState.table = currentTable;
        previousState.seat = currentSeat;
    }
}

document.addEventListener('keydown', (event) => {
    if (window.isTaken) return

    if (event.key === 'ArrowUp') {
        currentTable = currentTable === 4 ? 1 : currentTable + 1;
        currentSeat = 1;
    } else if (event.key === 'ArrowDown') {
        currentTable = currentTable === 1 ? 4 : currentTable - 1;
        currentSeat = 1;
    } else if (event.key === 'ArrowLeft') {
        if (currentSeat === 1) {
            currentSeat = selectedTables[currentTable - 1].totalSeats;
        } else {
            currentSeat -= 1;
        }
    } else if (event.key === 'ArrowRight') {
        if (currentSeat === selectedTables[currentTable - 1].totalSeats) {
            currentSeat = 1;
        } else {
            currentSeat += 1;
        }
    }

    checkAndMoveHero();
});


document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

let generatedSeat = 0;
let generatedTable = 0;
const seatLabel = ["A", "B", "C", "D", "E"][generatedSeat - 1];

function generateSeat() {
    if (window.isTaken) return

    const randomSeat = Math.floor(Math.random() * 5) + 1;
    const randomTable = Math.floor(Math.random() * 4) + 1;
    generatedSeat = randomSeat;
    generatedTable = randomTable;

    if((generatedTable === 1|| generatedTable === 2) && generatedSeat === 5) {
       return generateSeat();
    }

}
const taskTooltip = document.getElementById('task-tooltip');
const showTaskTooltipBtn = document.getElementById('show-task-tooltip-btn');
showTaskTooltipBtn.addEventListener('click', () => {
    if (window.isTaken) return

    taskTooltip.innerText = `Your Seat: ${seatLabel} at Table: ${generatedTable}`;
    taskTooltip.style.display = 'block';
    setTimeout(() => {
        taskTooltip.style.display = 'none';
    }, 3000);
});
generateSeat();

function showWinPopup() {

    console.log("Pop-up triggered!");
    const winPopup = document.getElementById('win-popup');
    winPopup.classList.remove('hidden');

    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        winPopup.classList.add('hidden');
    });
window.isTaken = true
    window.isEnded = true;
}
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
    let x, y, z;

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

        handleMovement(x, y);
    };

    sensor.onerror = errorHandler;

    function errorHandler(event) {
        console.log(event.error.name, event.error.message);
    }

    function handleMovement(x, y) {
        if (Math.abs(x) > 10) {
            if (x > 0) {
                moveRight();
            } else {
                moveLeft();
            }
        }
        if (Math.abs(y) > 10) {
            if (y > 0) {
                moveDown();
            } else {
                moveUp();
            }
        }
    }

    function moveUp() {
        currentTable = currentTable === 1 ? 4 : currentTable - 1;
        currentSeat = 1;
        moveHero();
    }

    function moveDown() {
        currentTable = currentTable === 4 ? 1 : currentTable + 1;
        currentSeat = 1;
        moveHero();
    }

    function moveLeft() {
        if (currentSeat === 1) {
            currentSeat = selectedTables[currentTable - 1].totalSeats;
        } else {
            currentSeat -= 1;
        }
        moveHero();
    }

    function moveRight() {
        if (currentSeat === selectedTables[currentTable - 1].totalSeats) {
            currentSeat = 1;
        } else {
            currentSeat += 1;
        }
        moveHero();
    }

} else {
    moveHero();
}
const tooltip = document.getElementById('tooltip');
const showTooltipBtn = document.querySelector('.show-tooltip-btn');

showTooltipBtn.addEventListener('click', () => {
    tooltip.style.display = 'block';
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 3000);
});


const gameLoop = () => {
    window.isEnded = false
    requestAnimationFrame(gameLoop);
};
gameLoop();