import UIInstance from "./createUI";
import gameInstance from "./game";

const placeEventListeners = () => {
  /// highlight ship event listener
  function placeHighlightShip() {
    const cells = document.querySelectorAll(".shipPlacementBoard .cell");

    cells.forEach((cell) => {
      // remove previous el
      cell.removeEventListener("mouseover", highLightShip);
      cell.removeEventListener("mouseout", removeHighlightShipEL);
      // add new el
      cell.addEventListener("mouseover", highLightShip);
      cell.addEventListener("mouseout", removeHighlightShipEL);
    });
  }
  function highLightShip(e) {
    const length = gameInstance.getCurrentShip().getLength();
    const isVertical = gameInstance.getOrientation();
    const { x, y } = e.target.dataset;
    for (let i = 0; i < length; i++) {
      let targetX = isVertical ? String(Number(x) + i) : x;
      let targetY = isVertical ? y : String(Number(y) + i);
      //  let targetX = isVertical ? x : String(Number(x) + i);
      //  let targetY = isVertical ? String(Number(y) + i) : y;

      let target = document.querySelector(
        `.shipPlacementBoard [data-x="${targetX}"][data-y="${targetY}"]`
      );

      if (target) {
        target.classList.toggle("highlighted");
      }
    }
  }
  function removeHighlightShipEL() {
    const highlightedCells = document.querySelectorAll(
      ".shipPlacementBoard .highlighted"
    );
    highlightedCells.forEach((highlightedCell) => {
      highlightedCell.classList.remove("highlighted");
    });
  }
  // placeShip event listener
  function placeShipOnBoard(e) {
    const { x, y } = e.target.dataset;
    console.log(x, y);
    let orientation = gameInstance.getOrientation();
    let currentShip = gameInstance.getCurrentShip();
    let shipLength = currentShip.getLength();
    let currentPlayerBoard = gameInstance.getHumanBoard();
    let spotIsAvailable = currentPlayerBoard.isAvailable(
      x,
      y,
      shipLength,
      orientation
    );
    if (!spotIsAvailable) {
      console.log("cannot place ship here!");
      return;
    } else {
      currentPlayerBoard.placeShip(currentShip, x, y, orientation);
      UIInstance.updateBoard(gameInstance.getHumanBoard());
      UIInstance.updateBoard(gameInstance.getHumanBoard(), true);
      gameInstance.nextShip();
      console.log("before");
      UIInstance.changeShipName();

      if (gameInstance.getCurrentShipIndex() >= 5) {
        console.log("executed if statement");
        gameInstance.placeComputerShips();
        UIInstance.updateBoard(gameInstance.getComputerBoard());
        UIInstance.closeStartingShips();
      }
      console.log("spot is available, ship placed");
    }
  }

  /// place event listeners
  function placeShipEventListener() {
    const cells = document.querySelectorAll(".shipPlacementBoard .cell");
    cells.forEach((cell) => cell.addEventListener("click", placeShipOnBoard));
  }
  function placeChangeOrientation() {
    const rotateBtn = document.getElementById("rotate");
    rotateBtn.addEventListener("click", changeOrientation);
  }
  function changeOrientation() {
    gameInstance.changeOrientation();
    let newOrientation = gameInstance.getOrientation();
    let currentShip = gameInstance.getCurrentShip();
    console.log(
      `isVertical : ${newOrientation}, shipLength: ${currentShip.getLength()}`
    );
    placeHighlightShip();
  }
  function computerTurn() {
    const computer = gameInstance.getComputerPlayer();
    const attackCoords = computer.randomAttack();
    let [x, y] = attackCoords;
    const humanBoard = gameInstance.getHumanBoard();
    gameInstance.computerAttack(x, y);

    UIInstance.displayHitOrMiss(humanBoard);
    gameInstance.checkWinner();
  }
  function attackShip(e) {
    const { x, y } = e.target.dataset;
    const computerBoard = gameInstance.getComputerBoard();

    if (computerBoard.receiveAttack(x, y)) {
      UIInstance.displayHitOrMiss(computerBoard);
      gameInstance.checkWinner();
      computerTurn();
    }
  }
  function placeAttackShipListener() {
    const computerBoardDOM = document.querySelectorAll(
      ".computerSection .cell"
    );

    computerBoardDOM.forEach((cell) => {
      cell.addEventListener("click", attackShip);
    });
  }
  return {
    placeHighlightShip,
    placeChangeOrientation,
    placeShipEventListener,
    placeAttackShipListener,
  };
};

const eventListeners = placeEventListeners();
export default eventListeners;
