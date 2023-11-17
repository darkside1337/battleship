const GameBoard = () => {
  // 10x10 array: array of 10 filled by ten arrays
  const gameBoard = Array.from({ length: 10 }, () => Array(10).fill(null));
  // shot register
  let shotRegister = [];
  // ship array
  const shipArray = [];
  // getters
  const getGameBoard = () => gameBoard;
  const getShipArray = () => shipArray;
  const getShotRegister = () => shotRegister;
  /// add ship to shipArray
  const addShipToArray = (ship) => {
    shipArray.push(ship);
  };
  // helper function: check if cell is inside the board
  const isInsideBoard = (x, y) => x >= 0 && x <= 9 && y >= 0 && y <= 9;
  // check if position is available
  // check if the cells are not taken && if the cells are inside the board
  const isAvailable = (x, y, length, isVertical) => {
    let board = getGameBoard();

    if (isVertical) {
      for (let i = 0; i < length; i++) {
        if (!isInsideBoard(x + i, y) || board[x + i][y] !== null) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (!isInsideBoard(x, y + i) || board[x][y + i] !== null) {
          return false;
        }
      }
    }
    return true;
  };
  // placeShip
  const placeShip = (ship, x, y, isVertical) => {
    // check if placement is valid, handle collision;
    // x row , y column
    /* const newShip = () */
    if (isAvailable(x, y, ship.getLength(), isVertical)) {
      if (isVertical) {
        for (let i = 0; i < ship.getLength(); i++) {
          if (i === 0) addShipToArray(ship);

          gameBoard[x + i][y] = ship;
        }
      } else {
        for (let i = 0; i < ship.getLength(); i++) {
          if (i === 0) addShipToArray(ship);
          gameBoard[x][y + i] = ship;
        }
      }
    } else {
      console.log("Unable to place ship");
      return false;
    }
  };
  // receive attack

  const receiveAttack = (x, y) => {
    let board = getGameBoard();
    // if shot in register, return and don't do anything
    // if the shot is a miss, add it to the register;
    // if its a hit, call hit() and add it to the register;

    // <=====()=====> //
    if (shotRegister.some((value) => value[0] === x && value[1] === y)) {
      return;
    }
    if (board[x][y] === null) {
      // shot is a miss
      console.log("Missed shot at:", x, y);
      shotRegister.push([x, y]);
    } else {
      // shot is a hit
      console.log("Hit shot at:", x, y);
      board[x][y].hit();
      shotRegister.push([x, y]);
    }
  };
  // all ships sunk
  const allShipsSunk = () => {
    const shipArray = getShipArray();
    return shipArray.every((ship) => {
      console.log(`${ship.getType()} is sunk: ${ship.isSunk()}`);
      return ship.isSunk();
    });
  };
  /// print board function
  const printGameBoard = (board = getGameBoard()) => {
    for (let row = 0; row < board.length; row++) {
      let rowString = "";
      for (let col = 0; col < board[row].length; col++) {
        const cell = board[row][col];
        rowString += cell ? "X " : "- ";
      }
      console.log(rowString);
    }
  };
  return {
    getGameBoard,
    isAvailable,
    placeShip,
    isInsideBoard,
    printGameBoard,
    receiveAttack,
    allShipsSunk,
    getShipArray,
    getShotRegister,
  };
};
export default GameBoard;
