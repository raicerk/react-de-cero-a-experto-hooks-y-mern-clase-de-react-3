import { getHeroesByPublisher } from "../../../src/heroes/helpers/getHeroesByPublisher";

describe("Test de getHeroesByPublisher", () => {
  test("Debe traer los heroes según la busqueda de DC Comics", () => {
    const heroes = getHeroesByPublisher("DC Comics");
    expect(heroes.length).toBeGreaterThan(1);
  });

  test("Debe traer los heroes según la busqueda de DC", () => {
    expect(() => getHeroesByPublisher("DC")).toThrow(
      "DC is not valid publisher"
    );
  });
});
