import { render, screen } from "@testing-library/react";
import { DcPage } from "../../../src/heroes/pages/DcPage";
import { MemoryRouter } from "react-router-dom";

describe("Test de <DcPage/> component", () => {
  test("Debe mostrarse el componente por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <DcPage />
      </MemoryRouter>
    );
    expect(screen.findAllByText("DC")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
