import { types } from "../../../src/auth/types/types";

describe("Test de types", () => {
  test("Debe retornat todo los types", () => {
    const typ = types;
    expect(typ).toEqual({ login: "[Auth] Login", logout: "[Auth] Logout" });
  });
});
