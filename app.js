"use strict";

// First O then X
let chance = 0;
let gameOver = false;
// -1: null, 0: O, 1: X
let board = [
	[-1, -1, -1],
	[-1, -1, -1],
	[-1, -1, -1],
];
document.querySelectorAll("td").forEach((td) => {
	td.addEventListener("click", () => {
		// Check if the game is over or the cell is already filled
		if (gameOver || td.getAttribute("played")) return;

		// Set the value to the cell in the board
		let value = chance === 1 ? "X" : "O";
		td.textContent = value;
		td.setAttribute("played", value);

		// Set the value in the memory board
		let reffer = td.getAttribute("reference").split(":");
		board[reffer[0] - 1][reffer[1] - 1] = chance;

		// Check if the game is over
		checkState();

		// Toggle the chance variable
		chance = chance === 1 ? 0 : 1;
	});
});

function checkState() {
	// Check if the game is over horizontally
	for (let i = 0; i < 3; i++) {
		if (board[i][0] !== -1 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
			setLine(false, 0, 1, i);
			return DeclareGameOver();
		}
	}

	// Check if the game is over vertically
	for (let i = 0; i < 3; i++) {
		if (board[0][i] !== -1 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
			setLine(false, 90, i);
			return DeclareGameOver();
		}
	}

	// Check if the game is over diagonally
	if (board[0][0] !== -1 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
		setLine(true, 45, 0.6);
		return DeclareGameOver();
	} else if (board[0][2] !== -1 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
		setLine(true, 135, 0.55);
		return DeclareGameOver();
	}
}

function DeclareGameOver() {
	gameOver = true;
	document.querySelector("#line").style.display = "block";
	document.querySelector("#reset").setAttribute("expand", "");
}

function reset() {
	gameOver = false;
	chance = 0;
	board = [
		[-1, -1, -1],
		[-1, -1, -1],
		[-1, -1, -1],
	];
	document.querySelectorAll("td").forEach((td) => {
		td.textContent = "";
		td.removeAttribute("played");
	});
	document.querySelector("#line").style.display = "none";
	document.querySelector("#reset").removeAttribute("expand");
}

function setLine(isDiagonal, rotation, horizontal_block, vertical_block = 1) {
	let line = document.querySelector(`#line`);

	line.style.setProperty("--width", `${isDiagonal ? 25 : 18}rem`);
	line.style.setProperty("--degree", `${rotation}deg`);
	line.style.setProperty("--horizontal_block", `${horizontal_block}`);
	line.style.setProperty("--vertical_block", `${vertical_block}`);
}

document.querySelector("#reset").addEventListener("click", reset);
