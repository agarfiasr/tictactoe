document.addEventListener("DOMContentLoaded", function() {
    const table = document.querySelector(".board-game");
    const cells = document.querySelectorAll(".cell");
    const newGameBtn = document.querySelector(".new-game");

    const WINNING_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
    ];

    const players = {
        x: "x",
        o: "o",
    };

    const playersMoved = {
        x: [],
        o: [],
    };

    const playersScore = {
        x: 0,
        o: 0,
    };

    let currentTurn = players.x;
    let isGameOver = false;

    function handleClick(event) {
        console.log("handleClick triggered");
        const cell = event.target;
        if (cell.textContent || isGameOver) return;
    
        console.log("Current Turn:", currentTurn); // Add this console log
    
        cell.textContent = currentTurn;
        playersMoved[currentTurn].push(Number(cell.dataset.index));
        const winningIndexs = checkWinning(playersMoved[currentTurn]);
    
        if (winningIndexs || playersMoved.x.length + playersMoved.o.length === 9) {
            return handleGameOver(winningIndexs);
        }
            if (currentTurn === players.x) {
        document.getElementById("playerXSound").play();
    } else {
        document.getElementById("playerOSound").play();
    }
    const currentPlayerSound = currentTurn === players.x ? document.getElementById("playerXSound") : document.getElementById("playerOSound");
    const clonedSound = currentPlayerSound.cloneNode(true);
    clonedSound.play();


    
        currentTurn = currentTurn === players.x ? players.o : players.x;
    }
    

    function checkWinning(playerMoved) {
        for (const winningIndexs of WINNING_COMBINATIONS) {
            const hasAll = winningIndexs.every(winningIndex => {
                return playerMoved.includes(winningIndex);
            });

            if (hasAll) return winningIndexs;
        }
        return false;
    }

    function handleGameOver(winningIndexs) {
        isGameOver = true;
        if (!winningIndexs) {
            document.getElementById("tieSound").play();
        } else {
            document.getElementById("gameOverSound").play();
            const score = ++playersScore[currentTurn];
            document.querySelector(`.score-${currentTurn} span`).textContent = score;
        }
    
        table.classList.add("game-over")
        winningIndexs.forEach(winningIndex => {
            document.querySelector(`[data-index="${winningIndex}"]`)
            .classList.add("winning-cell");
        });
    }

    function newGame() {
        isGameOver = false;
        playersMoved.x = [];
        playersMoved.o = [];

        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("winning-cell");
        });
        table.classList.remove("game-over");
        document.getElementById("newGameSound").play();
    };

    cells.forEach((cell) => cell.addEventListener("click", handleClick));
    newGameBtn.addEventListener("click", newGame);
});


