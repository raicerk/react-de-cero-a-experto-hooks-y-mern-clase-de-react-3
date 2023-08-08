import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Test de <LoginPage/>", () => {
  const contextValue = {
    logout: jest.fn(),
    login: jest.fn(),
  };
  test("Carga componente por defecto", () => {
    const { container } = render(
      <AuthContext.Provider value={{}}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByRole("button").innerHTML).toBe("Login");
    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBe(
      "LoginPage"
    );
  });

  test("Llamado al login", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(contextValue.login).toBeCalled();
  });

  test("Hacer clic en login", () => {
    const route = "/marvel";
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(route);

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockedUseNavigate).toHaveBeenCalledWith(route, {
      replace: true,
    });
  });
});
