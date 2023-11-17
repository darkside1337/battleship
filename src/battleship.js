const BattleShip = (length, type = "default", userName = "player") => {
  // carrier battleship destroyer submarine patrol boat
  //    5        4         3          2        1
  // ship length
  const shipLength = length;
  // ship type
  const shipType = type;
  // damageTaken
  let damageTaken = 0;
  // isSunk : check if ship is sunk
  const isSunk = () => {
    return damageTaken >= shipLength;
  };
  // player // ai
  const user = userName;
  // hit
  const hit = () => damageTaken++;
  // getters
  const getLength = () => shipLength;
  const getType = () => shipType;
  const getDamageTaken = () =>
    damageTaken >= shipLength ? shipLength : damageTaken;
  const getUser = () => user;
  // return
  return {
    getLength,
    getType,
    getDamageTaken,
    getUser,
    isSunk,
    hit,
  };
};

export default BattleShip;
