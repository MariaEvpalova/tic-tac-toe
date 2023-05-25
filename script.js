// Factory function for players
const Player = (name, symbol) => {
    return { name, symbol };
};

// Module for gameboard
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    const placeMark = (index, symbol) => {
        if (board[index] === '') {
            board[index] = symbol;
            return true;
        }
        return false;
    };

    return { getBoard, resetBoard, placeMark };
})();

// Module for display controller
const DisplayController = (() => {
    const gameboardElement = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-btn');

    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        Gameboard.resetBoard();
        renderBoard();
    }

    function renderBoard() {
        const board = Gameboard.getBoard();

        gameboardElement.innerHTML = '';

        board.forEach((symbol, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = symbol;
            cell.addEventListener('click', () => handleCellClick(index));

            gameboardElement.appendChild(cell);
        });
    }

    function handleCellClick(index) {
        const currentPlayer = GameController.getCurrentPlayer();

        if (Gameboard.placeMark(index, currentPlayer.symbol)) {
            renderBoard();

            if (GameController.checkWin(currentPlayer)) {
                alert(`Player ${currentPlayer.name} wins!`);
                resetGame();
            } else if (GameController.checkTie()) {
                alert("It's a tie!");
                resetGame();
            } else {
                GameController.switchPlayer();
            }
        }
    }

    return { renderBoard };
})();

// Module for game controller
const GameController = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer = player1;

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkWin = (player) => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // columns
            [0, 4, 8],
            [2, 4, 6], // diagonals
        ];

        return winningCombinations.some((combination) => {
            return (
                board[combination[0]] === player.symbol &&
                board[combination[1]] === player.symbol &&
                board[combination[2]] === player.symbol
            );
        });
    };

    const checkTie = () => {
        const board = Gameboard.getBoard();
        return board.every((cell) => cell !== '');
    };

    return { getCurrentPlayer, switchPlayer, checkWin, checkTie };
})();

DisplayController.renderBoard();
