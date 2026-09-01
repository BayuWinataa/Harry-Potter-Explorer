import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CharacterDetail } from "@/components/character-detail";
import type { Character } from "@/types/hp";

function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    id: "c1",
    name: "Hermione Granger",
    alternate_names: [],
    alternate_actors: [],
    ...overrides,
  };
}

describe("CharacterDetail", () => {
  test("hides Status row when alive is unknown", () => {
    render(<CharacterDetail character={makeCharacter({ alive: null })} />);
    expect(screen.queryByText("Status")).toBeNull();
  });

  test("shows Deceased when alive is false", () => {
    render(<CharacterDetail character={makeCharacter({ alive: false })} />);
    expect(screen.getByText("Deceased")).toBeDefined();
  });

  test("shows Alive when alive is true", () => {
    render(<CharacterDetail character={makeCharacter({ alive: true })} />);
    expect(screen.getByText("Alive")).toBeDefined();
  });
});
