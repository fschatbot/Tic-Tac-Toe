class Game {
	constructor(gameOverCallback, renderBoard = true, firstPlayer = "O", againstComputer = false) {
		// Set default values
		this.board = [
			[-1, -1, -1],
			[-1, -1, -1],
			[-1, -1, -1],
		];
		this.gameOver = false;
		this.winner = null;
		this.history = [];

		// Set argument configuration
		if (firstPlayer === "O") this.chance = 0;
		else if (firstPlayer === "X") this.chance = 1;
		else throw new Error("Invalid first player");
		this.renderBoard = renderBoard;
		this.againstComputer = againstComputer;
		// Check if gameOverCallback is a function
		if (typeof gameOverCallback !== "function") throw new Error("Invalid callback type. Expected function got " + typeof gameOverCallback);
		this.gameOverCallback = gameOverCallback || function () {};
	}

	BestNextMove() {
		// Calculate the next best move using min-max
		
	}

	PlayMove(x, y) {
		this.history.push({ move: this.chance, xPos: x, yPos: y });
		this.board[x][y] = this.chance;
		this.checkState();
		this.chance = this.chance === 1 ? 0 : 1;
		// Play the move on the board
		if (this.renderBoard) this.render();
		if (this.againstComputer) this.BestNextMove();
	}

	checkState() {
		// Check if the game is over horizontally
		for (let i = 0; i < 3; i++) {
			if (board[i][0] !== -1 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
				this.gameOver = true;
				this.winner = board[i][0] === 0 ? "O" : "X";
				return this.gameOverCallback(this.winner);
			}
		}

		// Check if the game is over vertically
		for (let i = 0; i < 3; i++) {
			if (board[0][i] !== -1 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
				this.gameOver = true;
				this.winner = board[0][i] === 0 ? "O" : "X";
				return this.gameOverCallback(this.winner);
			}
		}

		// Check if the game is over diagonally
		if (board[0][0] !== -1 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
			this.gameOver = true;
			this.winner = board[0][0] === 0 ? "O" : "X";
			return this.gameOverCallback(this.winner);
		} else if (board[0][2] !== -1 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
			this.gameOver = true;
			this.winner = board[0][2] === 0 ? "O" : "X";
			return this.gameOverCallback(this.winner);
		}
	}

	render() {
		// Render the board
	}
}
