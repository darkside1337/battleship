import gameInstance from "./game";
import GameBoard from "./gameboard";
const UI = () => {
  const renderBoard = (board, isShipPlacementBoard = false) => {
    const playerBoard = document.querySelector(".playerSection");
    const computerBoard = document.querySelector(".computerSection");
    const shipPlacementBoard = document.querySelector(".shipPlacementBoard");

    if (board.getOwner() === "player" && isShipPlacementBoard === false) {
      let currentBoard = board.getGameBoard();

      currentBoard.forEach((row, i) => {
        row.forEach((boardCell, j) => {
          // default cells
          const cell = document.createElement("div");
          cell.classList.add("cell", `row${i}`, `col${j}`);
          cell.dataset.x = j;
          cell.dataset.y = i;

          // cell if ship, if hit
          playerBoard.appendChild(cell);
        });
      });
    } else if (board.getOwner() === "computer") {
      let currentBoard = board.getGameBoard();

      currentBoard.forEach((row, i) => {
        row.forEach((boardCell, j) => {
          const cell = document.createElement("div");
          cell.classList.add("cell", `row${i}`, `col${j}`);
          cell.dataset.x = j;
          cell.dataset.y = i;
          computerBoard.appendChild(cell);
        });
      });
    } else if (board.getOwner() === "player" && isShipPlacementBoard === true) {
      let currentBoard = board.getGameBoard();

      currentBoard.forEach((row, i) => {
        row.forEach((boardCell, j) => {
          // default cells
          const cell = document.createElement("div");
          cell.classList.add("cell", `row${i}`, `col${j}`);
          cell.dataset.x = j;
          cell.dataset.y = i;
          // cell if ship, if hit
          shipPlacementBoard.appendChild(cell);
        });
      });
    }
  };
  const shipSelectionMenu = document.getElementById("shipPlacementDialog");
  const placeYourShips = () => {
    shipSelectionMenu.show();
  };
  const closeStartingShips = () => {
    shipSelectionMenu.close();
  };
  const displayHitOrMiss = (board) => {
    let container;
    let user = board.getOwner();
    let shotRegister = board.getShotRegister();
    let [x, y] = shotRegister[shotRegister.length - 1];
    /// container depends on input
    if (user === "player") {
      container = document.querySelector(".playerSection");
    } else {
      container = document.querySelector(".computerSection");
    }
    let cellStatus = board.getCellStatus(x, y);
    let targetCell = container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (cellStatus === "hit") {
      targetCell.classList.add("hit");
      targetCell.classList.remove("hidden");
    } else if (cellStatus === "miss") {
      targetCell.classList.add("miss");
    }
  };

  const updateBoard = (board, isShipPlacementBoard = false) => {
    let currentBoardArray = board.getGameBoard();
    let previousGameBoard = board.getPreviousBoard();
    const changedCells = getChangedCells(previousGameBoard, currentBoardArray);
    console.log(changedCells);
    let user = board.getOwner();
    let container;
    /// container depends on input
    if (isShipPlacementBoard) {
      container = document.querySelector(".shipPlacementBoard");
    } else if (user === "player") {
      container = document.querySelector(".playerSection");
    } else {
      container = document.querySelector(".computerSection");
    }
    console.log(`updated ${user}'s board`);
    // update the changed cells
    changedCells.forEach(([x, y]) => {
      const targetCell = container.querySelector(
        `[data-x="${x}"][data-y="${y}"]`
      );
      console.log(targetCell);
      if (targetCell) {
        let cellStatus = board.getCellStatus(x, y);
        /* console.log(`Updating cell [${x}, ${y}] with status: ${cellStatus}`); */
        //   if (currentBoardArray[y][x] !== null) {
        if (cellStatus === "hasShip") {
          targetCell.classList.add("ship");
          if (user === "computer") targetCell.classList.add("hidden");
        } else if (cellStatus === "hit") {
          targetCell.classList.add("hit");
        } else if (cellStatus === "miss") {
          targetCell.classList.add("miss");
        }
      } else {
        console.log(`Target cell [${x}, ${y}] not found.`);
      }
    });
  };

  // Helper function to get changed cells between two board states
  const getChangedCells = (previousBoard, currentBoard) => {
    const changedCells = [];
    for (let x = 0; x < currentBoard.length; x++) {
      for (let y = 0; y < currentBoard[x].length; y++) {
        if (previousBoard[x][y] !== currentBoard[x][y]) {
          changedCells.push([x, y]);
        }
      }
    }
    return changedCells;
  };
  const changeShipName = () => {
    const shipNameSpan = document.querySelector(".shipName");
    const currentShipIndex = gameInstance.getCurrentShipIndex();
    if (currentShipIndex >= 5) return;
    const shipArr = gameInstance.getCurrentPlayer().getShipArray();
    const currentShipName = shipArr[currentShipIndex].getType();
    console.log({ currentShipIndex, shipArr, currentShipName });
    shipNameSpan.textContent = currentShipName;
  };
  const disableComputerBoard = () => {
    const computerBoardDOM = document.querySelector(".computerSection.board");
    computerBoardDOM.style.pointerEvents = "none";
    computerBoardDOM.style.opacity = "0.5";
  };
  const enableComputerBoard = () => {
    const computerBoardDOM = document.querySelector(".computerSection.board");
    computerBoardDOM.style.pointerEvents = "auto";
    computerBoardDOM.style.opacity = "1";
  };
  const displayWinner = () => {
    const endGameDialog = document.getElementById("endGameDialog");
    endGameDialog.showModal();
  };
  const closeDisplayWinner = () => {
    const endGameDialog = document.getElementById("endGameDialog");
    endGameDialog.close();
  };
  const displayWinnerName = (name) => {
    name = name.toString();
    const winnerH1 = document.querySelector("div.endGameDialogContainer h1");
    winnerH1.textContent = name;
  };
  return {
    renderBoard,
    placeYourShips,
    closeStartingShips,
    updateBoard,
    changeShipName,
    displayHitOrMiss,
    disableComputerBoard,
    enableComputerBoard,
    displayWinner,
    closeDisplayWinner,
    displayWinnerName,
  };
};
const UIInstance = UI();
export default UIInstance;
