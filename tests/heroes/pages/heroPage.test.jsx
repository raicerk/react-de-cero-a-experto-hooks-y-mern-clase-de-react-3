import { fireEvent, render, screen } from "@testing-library/react";
import { HeroPage } from "../../../src/heroes/pages/HeroPage";
import rrd, { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    heroId: "dc-batman",
  }),
  useNavigate: () => mockNavigate,
}));

describe("Prueba del componente <heroPage/>", () => {
  test("Mostrar componente por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <HeroPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 3 }).innerHTML).toContain(
      "Batman"
    );
    expect(container).toMatchSnapshot();
  });

  test("Debe llamarse a la funcion de volver atrás", () => {
    render(
      <MemoryRouter>
        <HeroPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockNavigate).toBeCalled();
  });

  test("No debe cargar el componente por no recibir el useParam correcto", () => {
    jest.spyOn(rrd, "useParams").mockImplementation(() => {
      return {
        heroId: "",
      };
    });

    const { container } = render(
      <MemoryRouter>
        <HeroPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
