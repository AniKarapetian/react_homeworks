function isValid(board: any, row: number, col: number) {
  for (let i = 0; i < row; i++) {
    if (board[i][col] === "Q") {
      return false;
    }
  }

  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === "Q") {
      return false;
    }
  }

  for (let i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
    if (board[i][j] === "Q") {
      return false;
    }
  }

  return true;
}

export function solveNQueens(n: number) {
  const board = new Array(n).fill([]).map(() => new Array(n).fill("0"));
  const solutions: any[] = [];

  function backtrack(row: number) {
    if (row === n) {
      solutions.push([...board.map((row) => row.join(""))]);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isValid(board, row, col)) {
        board[row][col] = "Q";
        backtrack(row + 1);
        board[row][col] = "0";
      }
    }
  }

  backtrack(0);

  return solutions;
}
