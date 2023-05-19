const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const clickedCell = e.target;

    if (clickedCell.textContent !== '') return;

    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    if (checkWin()) {
        alert(`Player ${currentPlayer} wins!`);
        resetBoard();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
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
            cells[combination[0]].textContent === currentPlayer &&
            cells[combination[1]].textContent === currentPlayer &&
            cells[combination[2]].textContent === currentPlayer
        );
    });
}

function resetBoard() {
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });

    currentPlayer = 'X';
}
