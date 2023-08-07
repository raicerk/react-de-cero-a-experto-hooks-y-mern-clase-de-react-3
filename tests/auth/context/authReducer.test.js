import { authReducer } from "../../../src/auth/context/AuthReducer";
import { types } from "../../../src/auth/types/types";

describe("Test de authReducer", () => {
  test("Validación de los datos en case de login", () => {
    const reducer = authReducer(
      {},
      {
        type: types.login,
        payload: {
          name: "juan",
          id: "123asd",
        },
      }
    );
    expect(reducer.logged).toBeTruthy();
    expect(reducer).toEqual({
      logged: true,
      user: { name: "juan", id: "123asd" },
    });
  });

  test("Validación de los datos en case de logout", () => {
    const reducer = authReducer(
      {},
      {
        type: types.logout,
        payload: {
          name: "juan",
          id: "123asd",
        },
      }
    );
    expect(reducer.logged).toBeFalsy();
    expect(reducer).toEqual({
      logged: false,
      user: { name: "juan", id: "123asd" },
    });
  });

  test("Validación de los datos en case de logout", () => {
    const reducer = authReducer(undefined, {});
    expect(reducer.logged).toBeFalsy();
    expect(reducer).toEqual({});
  });
});
