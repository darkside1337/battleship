import BattleShip from "../battleship";
import GameBoard from "../gameboard";

describe("GameBoard factory function test", () => {
  let board;
  let carrier;
  let battleship;
  beforeEach(() => {
    board = GameBoard();
    carrier = BattleShip(5, "carrier", "player");
    battleship = BattleShip(4, "battleship", "player");
  });
  test("properly generates the starting board array", () => {
    expect(board.getGameBoard()).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });
  test("places ship at correct position", () => {
    board.placeShip(carrier, 5, 5, true);
    let gameboard = board.getGameBoard();
    expect(gameboard[5][5]).toEqual(carrier);
  });
  test("cannot place ship outside the gameBoard", () => {
    expect(board.isInsideBoard(10, 0)).toBe(false);
  });
  test("prevents collision", () => {
    board.placeShip(carrier, 5, 5, true);
    expect(board.placeShip(battleship, 5, 5, true)).toBe(false);
  });
  test("places multiple ships without collision", () => {
    board.placeShip(carrier, 5, 5, true);
    board.placeShip(battleship, 0, 0, false);
    let gameboard = board.getGameBoard();
    expect(gameboard[5][5]).toEqual(carrier);
    expect(gameboard[0][0]).toEqual(battleship);
  });
  test("Receive attack works properly", () => {
    board.placeShip(carrier, 5, 5, true);
    board.placeShip(battleship, 0, 0, false);
    let gameboard = board.getGameBoard();
    // attack the carrier
    board.receiveAttack(5, 5);
    expect(carrier.getDamageTaken()).toBe(1);
    // attack an empty spot
    board.receiveAttack(1, 1);
    // damage is still the same
    expect(carrier.getDamageTaken()).toBe(1);
  });
  test("correctly registers hits", () => {
    // register a hit, register a miss,
    // a hit
    board.placeShip(carrier, 5, 5, true);
    board.placeShip(battleship, 0, 0, false);
    let gameboard = board.getGameBoard();
    // registers a hit
    board.receiveAttack(5, 5);
    let shotRegister = board.getShotRegister();
    expect(shotRegister.some((e) => e[0] === 5 && e[1] === 5)).toBe(true);
  });
  test("correctly registers misses", () => {
    board.placeShip(carrier, 5, 5, true);
    board.placeShip(battleship, 0, 0, false);
    let gameboard = board.getGameBoard();
    // a missed shot:
    board.receiveAttack(1, 0);
    let shotRegister = board.getShotRegister();
    expect(shotRegister.some((e) => e[0] === 1 && e[1] === 0)).toBe(true);
  });
  test("detects if not all ships are sunk", () => {
    // Arrange: Set up the game board and place ships
    const board = GameBoard();
    const carrier = BattleShip(5, "carrier", "player");
    const battleship = BattleShip(4, "battleship", "player");

    board.placeShip(carrier, 0, 0, true);
    board.placeShip(battleship, 2, 2, false);

    // Act: Perform actions to make some, but not all, ships sunk
    board.receiveAttack(0, 0); // Hit carrier
    board.receiveAttack(1, 0); // Hit carrier (additional hit)
    board.receiveAttack(2, 2); // Hit battleship
    board.receiveAttack(3, 2); // Hit battleship (additional hit)

    // Assert: Check that the function correctly detects not all ships are sunk
    expect(board.allShipsSunk()).toBe(false);
  });
  test("detects all ships are sunk", () => {
    // Arrange: Set up the game board and place ships
    /*  board = GameBoard();
    carrier = BattleShip(5, "carrier", "player");
    battleship = BattleShip(4, "battleship", "player"); */

    board.placeShip(carrier, 0, 0, true);
    board.placeShip(battleship, 2, 2, false);

    // Act: destroy both ships
    board.placeShip(carrier, 5, 5, true);
    board.placeShip(battleship, 1, 1, false);
    board.printGameBoard();
    board.receiveAttack(5, 5);
    board.receiveAttack(6, 5);
    board.receiveAttack(7, 5);
    board.receiveAttack(8, 5);
    board.receiveAttack(9, 5);
    console.log(`Carrier Has Sunk: ${carrier.isSunk()}`);
    console.log(`All ships have sunk: ${board.allShipsSunk()}`);
    board.receiveAttack(1, 1);
    board.receiveAttack(1, 2);
    board.receiveAttack(1, 3);
    board.receiveAttack(1, 4);
    console.log(`Battleship Has Sunk: ${battleship.isSunk()}`);
    console.log(`All ships have sunk: ${board.allShipsSunk()}`);

    // Assert: Check that the function correctly detects all ships are sunk
    expect(board.allShipsSunk()).toBe(true);
  });

  /*
   getGameBoard,*
    isAvailable,*
    placeShip,*
    isInsideBoard,*
    receiveAttack, *
    allShipsSunk,
*/
});
