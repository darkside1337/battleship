import UIInstance from "./createUI";
import GameBoard from "./gameboard";
import eventListeners from "./eventlisteners";
import Player from "./player";

const game = () => {
  let playerBoard;
  let computerBoard;
  let player;
  let computer;
  let currentShipIndex;
  let currentComputerShipIndex;
  let players;
  let currentPlayer;
  let isVertical;
  const start = () => {
    playerBoard = GameBoard("player");
    computerBoard = GameBoard("computer");
    player = Player("player", playerBoard);
    computer = Player("computer", computerBoard);
    players = [player, computer];
    isVertical = true;
    currentPlayer = players[0];
    currentShipIndex = 0;
    currentComputerShipIndex = 0;
    UIInstance.renderBoard(playerBoard);
    UIInstance.renderBoard(playerBoard, true);
    UIInstance.renderBoard(computerBoard);
    UIInstance.placeYourShips();
    /// rectify
    eventListeners.placeHighlightShip();
    eventListeners.placeChangeOrientation();
    eventListeners.placeShipEventListener();
    eventListeners.placeAttackShipListener();
  };
  /// getters
  const getPlayers = () => players;
  const getCurrentPlayer = () => currentPlayer;
  const getCurrentShipIndex = () => currentShipIndex;
  const getCurrentShip = () => {
    let playerShips = currentPlayer.getShipArray();
    return playerShips[currentShipIndex];
  };
  // get opponent
  const getOpponent = () =>
    currentPlayer === players[0] ? players[1] : players[0];
  // go to next turn
  const nextTurn = () =>
    currentPlayer === players[0]
      ? (currentPlayer = players[1])
      : (currentPlayer = players[0]);
  ///
  const getHumanBoard = () => players[0].getPlayerBoard();
  const getOrientation = () => isVertical;
  const nextShip = () => currentShipIndex++;
  const getComputerBoard = () => players[1].getPlayerBoard();
  const changeOrientation = () =>
    isVertical === false ? (isVertical = true) : (isVertical = false);
  const placeComputerShips = () => {
    let computerBoard = players[1].getPlayerBoard();
    let shipArray = players[1].getShipArray();
    let computerBoardArray = computerBoard.getGameBoard();
    while (currentComputerShipIndex < shipArray.length) {
      let currentShip = shipArray[currentComputerShipIndex];
      let currentShipLength = shipArray[currentComputerShipIndex].getLength();
      let isVertical = Math.random() * 10 <= 5 ? true : false;
      let [x, y] = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
      if (computerBoard.isAvailable(x, y, currentShipLength, isVertical)) {
        computerBoard.placeShip(currentShip, x, y, isVertical);
        currentComputerShipIndex++;
      }
    }
    computerBoard.printGameBoard();
  };
  const checkWinner = () => {
    const playerBoard = gameInstance.getHumanBoard();
    const computerBoard = gameInstance.getComputerBoard();
    let allPlayerShipsSunk = playerBoard.allShipsSunk();
    let allComputerShipsSunk = computerBoard.allShipsSunk();

    if (allComputerShipsSunk) {
      UIInstance.displayWinnerName("Congratulations, you won!");
      UIInstance.displayWinner();
      console.log("Congratulations, you won!");
    }
    if (allPlayerShipsSunk) {
      UIInstance.displayWinnerName("You lost, try again!");
      UIInstance.displayWinner();
      console.log("You lost, try again!");
    }
  };
  const getComputerPlayer = () => {
    return players[1];
  };
  const computerAttack = (x, y) => {
    const playerBoard = getHumanBoard();
    UIInstance.disableComputerBoard();
    playerBoard.receiveAttack(x, y);
    UIInstance.enableComputerBoard();
  };
  /// return values
  return {
    start,
    nextTurn,
    getCurrentPlayer,
    getPlayers,
    getCurrentShip,
    getHumanBoard,
    getOpponent,
    getOrientation,
    changeOrientation,
    nextShip,
    getCurrentShipIndex,
    placeComputerShips,
    getComputerBoard,
    computerAttack,
    getComputerPlayer,
    checkWinner,
  };
};

const gameInstance = game();
export default gameInstance;
