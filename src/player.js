import createBattleShip from "./battleship";

const Player = (name = "computer", board) => {
  const userName = name.toString();
  const Carrier = createBattleShip(5, "carrier", `${userName}`);
  const BattleShip = createBattleShip(4, "battleship", `${userName}`);
  const Destroyer = createBattleShip(3, "destroyer", `${userName}`);
  const Submarine = createBattleShip(2, "submarine", `${userName}`);
  const PatrolBoat = createBattleShip(1, "patrolBoat", `${userName}`);
  const playerBoard = board;
  let previousAttacks = [];
  let shipArray = [Carrier, BattleShip, Destroyer, Submarine, PatrolBoat];
  // getters
  const getPlayerBoard = () => playerBoard;
  const getUserName = () => userName;
  const getShipArray = () => shipArray;
  const targetEnemy = (board, x, y) => {
    board.receiveAttack(x, y);
  };
  const generateAttackCoords = () => {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  };
  const randomAttack = () => {
    let target;
    do {
      target = generateAttackCoords();
    } while (
      previousAttacks.some((e) => e[0] === target[0] && e[1] === target[1])
    );
    previousAttacks.push(target);
    return target;
  };
  return {
    targetEnemy,
    getUserName,
    randomAttack,
    getShipArray,
    getPlayerBoard,
  };
};
export default Player;
