const BattleShip = (length, type = "default") => {
  // carrier battleship destroyer submarine patrol boat
  // ship length
  const shipLength = length;
  // ship type
  const shipType = type;
  // damageTaken
  let damageTaken = 0;
  // isSunk : check if ship is sunk
  const isSunk = () => {
    return damageTaken === length ? true : false;
  };
  // hit
  const hit = () => damageTaken++;
  // getters
  const getLength = () => shipLength;
  const getType = () => shipType;
  const getDamageTaken = () =>
    damageTaken >= shipLength ? shipLength : damageTaken;
  // return
  return {
    getLength,
    getType,
    getDamageTaken,
    isSunk,
    hit,
  };
};

export default BattleShip;
