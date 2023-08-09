import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui/components/Navbar";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Test de <NavBar/>", () => {
  const contextValue = {
    logout: jest.fn(),
    login: jest.fn(),
  };

  test("Carga componente navbar con valores por defecto", () => {
    const { container } = render(
      <AuthContext.Provider
        value={{
          user: {
            name: "Juan",
          },
        }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText("user").innerHTML).toBe("Juan");
  });

  test("Carga componente navbar con valores por defecto y con una ruta seleccionada", () => {
    const routes = [
      { link: "/marvel", text: "Marvel" },
      { link: "/dc", text: "DC" },
      { link: "/search", text: "Search" },
    ];
    routes.forEach((route) => {
      const { container } = render(
        <AuthContext.Provider value={{}}>
          <MemoryRouter initialEntries={[route.link]}>
            <Navbar />
          </MemoryRouter>
        </AuthContext.Provider>
      );
      const element = container.getElementsByClassName("active");
      expect(element[0].innerHTML).toBe(route.text);
      expect(element.length).toBeGreaterThanOrEqual(1);
    });
  });

  test("Llamado al boton de logout", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const buttonLogout = screen.getByRole("button");
    fireEvent.click(buttonLogout);
    expect(contextValue.logout).toBeCalled();
  });

  test("Llamado al boton de logout donde se debe desloguear", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const buttonLogout = screen.getByRole("button");
    fireEvent.click(buttonLogout);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {
      replace: true,
    });
  });
});
