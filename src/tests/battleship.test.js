import BattleShip from "../battleship";

/*
    getLength getType getDamageTaken
    hit & is sunk

    test("", () => {
        const carrier = BattleShip(5, "Carrier")
    })
    
    ship is hit once
    ship is hit twice
    ship is sunk
*/

describe("BattleShip factory test:", () => {
  let carrier;
  beforeEach(() => (carrier = BattleShip(5, "Carrier")));

  test("Get the correct length of the ship", () => {
    expect(carrier.getLength()).toBe(5);
  });
  test("Get the correct ship type", () => {
    expect(carrier.getType()).toBe("Carrier");
  });
  test("ship starts with 0 damage taken", () => {
    expect(carrier.getDamageTaken()).toBe(0);
  });
  test("ship is hit once", () => {
    carrier.hit();
    expect(carrier.getDamageTaken()).toBe(1);
  });
  test("ship is hit twice", () => {
    carrier.hit();
    carrier.hit();
    expect(carrier.getDamageTaken()).toBe(2);
  });
  test("returns max damage taken if damage exceeds length", () => {
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.getDamageTaken()).toBe(5);
  });
  test("ship is not sunk yet", () => {
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.isSunk()).toBe(false);
  });
  test("ship is sunk", () => {
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.isSunk()).toBe(true);
  });
});
