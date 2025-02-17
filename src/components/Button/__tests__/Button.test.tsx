import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("renders button with children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies outline variant class", () => {
    render(<Button variant='outline'>Outline Button</Button>);
    const button = screen.getByText("Outline Button");
    expect(button.className).toContain("Button--outline");
  });

  it("applies disabled state", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("Button--disabled");
  });
});
