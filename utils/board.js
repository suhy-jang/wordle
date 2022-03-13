export default class Board {
  board = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  updateBoard = ({ point: { row, col }, value }) => {
    this.board[row][col] = value;
  };
}
