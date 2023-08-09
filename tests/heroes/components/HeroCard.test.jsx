import { render, screen } from "@testing-library/react";
import { HeroCard } from "../../../src/heroes/components/HeroCard";
import { MemoryRouter } from "react-router-dom";

describe("Test de <HeroCard/>", () => {
  const data = {
    id: "id",
    superhero: "superhero",
    publisher: "publisher",
    alter_ego: "alter_ego",
    first_appearance: "first_appearance",
    characters: "characters",
  };

  test("Carga componente con valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <HeroCard {...data} />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 5 }).innerHTML).toBe(
      data.superhero
    );
    expect(screen.getByRole("img").getAttribute("src")).toBe(
      `/assets/${data.id}.jpg`
    );
    expect(container).toMatchSnapshot();
  });
});
